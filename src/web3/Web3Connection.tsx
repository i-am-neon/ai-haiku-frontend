import * as React from "react";
import styled from "styled-components";
import Web3 from "web3";
import { convertUtf8ToHex } from "@walletconnect/utils";

import Web3Modal from "web3modal";
// @ts-ignore
import WalletConnectProvider from "@walletconnect/web3-provider";
// @ts-ignore
import Fortmatic from "fortmatic";
import Torus from "@toruslabs/torus-embed";
import Authereum from "authereum";
import { Bitski } from "bitski";

import axios from 'axios'
import { ethers, Contract, BigNumber } from 'ethers'

import Button from "./components/Button";
import Column from "./components/Column";
import Wrapper from "./components/Wrapper";
import Modal from "./components/Modal";
import Header from "./components/Header";
import Loader from "./components/Loader";
import ModalResult from "./components/ModalResult";
import AccountAssets from "./components/AccountAssets";
import ConnectButton from "./components/ConnectButton";
import OpenInNewIcon from '@mui/icons-material/OpenInNew';

import { apiGetAccountAssets } from "./helpers/api";
import {
  hashPersonalMessage,
  recoverPublicKey,
  recoverPersonalSignature,
  formatTestTransaction,
  getChainData
} from "./helpers/utilities";
import { IAssetData, IBoxProfile, MintStage } from "./helpers/types";
import { fonts } from "../styles";
import { openBox, getProfile } from "./helpers/box";
import {
  ETH_SEND_TRANSACTION,
  ETH_SIGN,
  PERSONAL_SIGN as SIGN_AUTH,
  BOX_GET_PROFILE,
  DAI_BALANCE_OF,
  DAI_TRANSFER,
  MINT_NFT,
  GET_STATUS_FROM_TXN
} from "./constants";
import contractAddress from '../contracts/contract-address.json';
import AiHaikuContractArtifact from '../contracts/AIHaiku.json';
import { callBalanceOf, callTransfer } from "./helpers/web3";
import { GENERATOR_URL_BASE, NODE_ENV, PUBLIC_MINT_TIMESTAMP_MS, WHITELIST_MINT_TIMESTAMP_MS } from "../utils/envVariables";

import { Card, CardActionArea, CardContent, Fade } from "@mui/material";
import TextField from '@mui/material/TextField';
import { stylizeHaikuOption } from "./helpers/tsxUtilities";
import { RESTRICTED_PHRASES } from "./helpers/restrictedPhrases";
import WalletLink from "walletlink";
import coinbaseWalletLogo from '../assets/wallets/coinbaseWallet.png';
import MintCountdown, { PublicMintCountdown, WhitelistMintCountdown } from "../components/MintCountdown";
import { whitelistedAddresses } from "./constants/whitelist";

const TitleTextField = styled(TextField)({
  '& input:valid + fieldset': {
    borderColor: 'black',
    borderWidth: 2,
  },
  '& input:invalid + fieldset': {
    borderColor: 'red',
    borderWidth: 2,
  },
  '& input:valid:focus + fieldset': {
    borderColor: 'black',
    borderLeftWidth: 6,
    padding: '4px !important', // override inline-style
  },
  '& label': {
    fontFamily: fonts.family.ShipporiMincho
  },
  '& label.Mui-focused': {
    color: 'black',
  },
});


const SLayout = styled.div`
  position: relative;
  width: 100%;
  text-align: center;
`;

const SContent = styled(Wrapper)`
  width: 100%;
  height: 100%;
  padding: 0 16px;
`;

const SContainer = styled.div`
  height: 100%;
  min-height: 200px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  word-break: break-word;
`;

const SLanding = styled(Column)`
  height: 600px;
`;

const SModalContainer = styled.div`
  width: 100%;
  position: relative;
  word-wrap: break-word;
`;

const SModalTitle = styled.div`
  margin: 1em 0;
  font-size: 20px;
  font-weight: 700;
`;

const SModalParagraph = styled.p`
  margin-top: 30px;
`;

// @ts-ignore
const SBalances = styled(SLanding)`
  height: 100%;
  & h3 {
    padding-top: 30px;
  }
`;

const STestButtonContainer = styled.div`
position: relative;
width: 100%;
height: auto;
max-width: 224px;
padding: 12px;
display: flex;
flex-direction: column;
align-items: center;
justify-content: flex-start;
`;

const STestButton = styled(Button)`
transition: all 0.15s ease-in-out;
position: relative;
line-height: 1em;
background-image: none;
outline: none;
overflow: hidden;
box-shadow: none;
border: none;
border-style: none;
box-sizing: border-box;
background-color: rgb(255, 0, 0);
border: none;
color: rgb(255, 255, 255);
box-shadow: 0 4px 6px 0 rgba(50, 50, 93, 0.11),
  0 1px 3px 0 rgba(0, 0, 0, 0.08), inset 0 0 1px 0 rgba(0, 0, 0, 0.06);
border-radius: 32px;
font-family: 'Shippori Mincho B1', serif;
font-size: 16px;
font-weight: 600;
height: 48px;
width: 100%;
margin: 0 auto;
`;

interface IAppState {
  fetching: boolean;
  address: string;
  web3: any;
  provider: any;
  connected: boolean;
  chainId: number;
  networkId: number;
  contract: Contract | null;
  assets: IAssetData[];
  showModal: boolean;
  pendingRequest: boolean;
  mintPriceInWei: BigNumber | null;
  mintPrice: string | null;
  numberMinted: number | null;
  maxSupply: number | null;
  result: any | null;
  modalTitle: string;
  modalContent: string;
  lastTxn: string | null;
  imageUrl: string | null;
  currentStage: MintStage | undefined;
  whiteListedReadyToMintMessage: string | undefined;
  isWhitelisted: boolean;
  haikuTitleError: string | null;
  haikuTitle: string,
  haikuOptions: string[];
  chosenHaiku: string | null;
  etherscanLink: string | null;
  imageUri: string | null;
  paperName: string | null;
}

const INITIAL_STATE: IAppState = {
  fetching: false,
  address: "",
  web3: null,
  provider: null,
  connected: false,
  chainId: 1,
  networkId: 1,
  contract: null,
  assets: [],
  showModal: false,
  modalTitle: '',
  modalContent: '',
  pendingRequest: false,
  mintPriceInWei: null,
  mintPrice: null,
  numberMinted: null,
  maxSupply: null,
  result: null,
  lastTxn: null,
  imageUrl: null,
  currentStage: undefined,
  whiteListedReadyToMintMessage: undefined,
  isWhitelisted: false,
  haikuTitleError: null,
  haikuTitle: '',
  haikuOptions: [],
  chosenHaiku: null,
  etherscanLink: null,
  imageUri: null,
  paperName: null
};

function initWeb3(provider: any) {
  const web3: any = new Web3(provider);

  web3.eth.extend({
    methods: [
      {
        name: "chainId",
        call: "eth_chainId",
        outputFormatter: web3.utils.hexToNumber
      }
    ]
  });

  return web3;
}

class Web3Connection extends React.Component<any, any> {
  // @ts-ignore
  public web3Modal: Web3Modal;
  public state: IAppState;

  constructor(props: any) {
    super(props);
    this.state = {
      ...INITIAL_STATE
    };

    this.web3Modal = new Web3Modal({
      network: this.getNetwork(),
      cacheProvider: true,
      providerOptions: this.getProviderOptions()
    });
  }

  public componentDidMount() {
    if (this.web3Modal.cachedProvider) {
      this.onConnect();
    }
    // this.resetApp()
  }

  public onConnect = async () => {
    const provider = await this.web3Modal.connect();

    await this.subscribeProvider(provider);

    const web3: any = initWeb3(provider);

    const accounts = await web3.eth.getAccounts();

    const address = accounts[0];

    const networkId = await web3.eth.net.getId();

    const chainId = await web3.eth.chainId();

    // To stop from using mainnet before launch so I don't spend real money
    // if (NODE_ENV !== 'production' && chainId === 1) {
    //   throw new Error("Please switch Metamask to a testnet.");
    // }

    const _provider = new ethers.providers.Web3Provider(window.ethereum);

    const contract = new ethers.Contract(
      contractAddress.Token,
      AiHaikuContractArtifact.abi,
      _provider.getSigner(0)
    );

    console.log('Contract :>> ', contract);

    const mintPriceInWei = await contract.price();
    const mintPrice = ethers.utils.formatEther(mintPriceInWei) + ' Ξ'

    const numberMinted = await contract.totalSupply().then((bigNum: BigNumber) => bigNum.toNumber());
    const maxSupply = await contract.maxSupply().then((bigNum: BigNumber) => bigNum.toNumber());

    let currentStage;
    let isWhitelisted = false;
    let whiteListedReadyToMintMessage = undefined;
    if (Date.now() >= PUBLIC_MINT_TIMESTAMP_MS) {
      // Public mint is open
      currentStage = MintStage.AUTH_MESSAGE;
    } else if (
      Date.now() < PUBLIC_MINT_TIMESTAMP_MS &&
      Date.now() >= WHITELIST_MINT_TIMESTAMP_MS &&
      this.isUserWhitelisted(address)
    ) {
      // user is whitelisted and it is time for whitelist mint
      currentStage = MintStage.AUTH_MESSAGE;
      isWhitelisted = true;
      whiteListedReadyToMintMessage = 'You\'re on the whitelist! You may mint up to three haikus during this hour. Once the public mint is open, you may mint as many as you like.'
    } else if (
      Date.now() < WHITELIST_MINT_TIMESTAMP_MS &&
      this.isUserWhitelisted(address)
    ) {
      // user is whitelisted BUT whitelist mint not ready yet
      currentStage = MintStage.WHITE_LISTED_BUT_MINT_NOT_READY;
      isWhitelisted = true;
    } else if (
      Date.now() < PUBLIC_MINT_TIMESTAMP_MS &&
      !this.isUserWhitelisted(address)
    ) {
      // user is not whitelisted and it is before public mint time
      currentStage = MintStage.NOT_WHITE_LISTED_AND_MINT_NOT_READY;
    }

    await this.setState({
      web3,
      provider,
      connected: true,
      address,
      chainId,
      networkId,
      contract,
      mintPriceInWei,
      mintPrice,
      numberMinted,
      maxSupply,
      currentStage,
      whiteListedReadyToMintMessage,
      isWhitelisted
    });
    await this.getAccountAssets();
  };

  public isUserWhitelisted(address: string): boolean {
    if (whitelistedAddresses.includes(address)) {
      return true;
    }
    return false;
  }

  public subscribeProvider = async (provider: any) => {
    if (!provider.on) {
      return;
    }
    provider.on("close", () => this.resetApp());
    provider.on("accountsChanged", async (accounts: string[]) => {
      await this.setState({ address: accounts[0] });
      await this.getAccountAssets();
    });
    provider.on("chainChanged", async (chainId: number) => {
      const { web3 } = this.state;
      const networkId = await web3.eth.net.getId();
      await this.setState({ chainId, networkId });
      await this.getAccountAssets();
    });

    provider.on("networkChanged", async (networkId: number) => {
      const { web3 } = this.state;
      const chainId = await web3.eth.chainId();
      await this.setState({ chainId, networkId });
      await this.getAccountAssets();
    });
  };

  public getNetwork = () => getChainData(this.state.chainId).network;

  public getProviderOptions = () => {
    const providerOptions = {
      walletconnect: {
        package: WalletConnectProvider,
        options: {
          infuraId: process.env.REACT_APP_INFURA_ID
        }
      },
      'custom-coinbase': {
        display: {
          logo: coinbaseWalletLogo,
          name: 'Coinbase',
          description: 'Connect with Coinbase Wallet',
        },
        options: {
          appName: 'app', // Your app name
          networkUrl: `https://mainnet.infura.io/v3/${process.env.REACT_APP_INFURA_ID}`,
          chainId: this.state.chainId,
        },
        package: WalletLink,
        connector: async (_: any, options: any) => {
          const { appName, networkUrl, chainId } = options
          const walletLink = new WalletLink({
            appName
          });
          const provider = walletLink.makeWeb3Provider(networkUrl, chainId);
          await provider.enable();
          return provider;
        },
      },
      // torus: {
      //   package: Torus
      // },
      // fortmatic: {
      //   package: Fortmatic,
      //   options: {
      //     key: process.env.REACT_APP_FORTMATIC_KEY
      //   }
      // },
      authereum: {
        package: Authereum
      },
      // bitski: {
      //   package: Bitski,
      //   options: {
      //     clientId: process.env.REACT_APP_BITSKI_CLIENT_ID,
      //     callbackUrl: window.location.href + "bitski-callback.html"
      //   }
      // }
    };
    return providerOptions;
  };

  public getAccountAssets = async () => {
    const { address, chainId } = this.state;
    this.setState({ fetching: true });
    try {
      // get account balances
      const assets = await apiGetAccountAssets(address, chainId);

      await this.setState({ fetching: false, assets });
    } catch (error) {
      console.error(error); // tslint:disable-line
      await this.setState({ fetching: false });
    }
  };

  public toggleModal = () =>
    this.setState({ showModal: !this.state.showModal });

  public testSendTransaction = async () => {
    const { web3, address, chainId } = this.state;

    if (!web3) {
      return;
    }

    const tx = await formatTestTransaction(address, chainId);

    try {
      // open modal
      this.toggleModal();

      // toggle pending request indicator
      this.setState({ pendingRequest: true });

      // @ts-ignore
      function sendTransaction(_tx: any) {
        return new Promise((resolve, reject) => {
          web3.eth
            .sendTransaction(_tx)
            .once("transactionHash", (txHash: string) => resolve(txHash))
            .catch((err: any) => reject(err));
        });
      }

      // send transaction
      const result = await sendTransaction(tx);

      // format displayed result
      const formattedResult = {
        action: ETH_SEND_TRANSACTION,
        txHash: result,
        from: address,
        to: address,
        value: "0 ETH"
      };

      // display result
      this.setState({
        web3,
        pendingRequest: false,
        result: formattedResult || null
      });
    } catch (error) {
      console.error(error); // tslint:disable-line
      this.setState({ web3, pendingRequest: false, result: null });
    }
  };

  public testSignMessage = async () => {
    const { web3, address } = this.state;

    if (!web3) {
      return;
    }

    // test message
    const message = "My email is john@doe.com - 1537836206101";

    // hash message
    const hash = hashPersonalMessage(message);

    try {
      // open modal
      this.toggleModal();

      // toggle pending request indicator
      this.setState({ pendingRequest: true });

      // send message
      const result = await web3.eth.sign(hash, address);

      // verify signature
      const signer = recoverPublicKey(result, hash);
      const verified = signer.toLowerCase() === address.toLowerCase();

      // format displayed result
      const formattedResult = {
        action: ETH_SIGN,
        address,
        signer,
        verified,
        result
      };

      // display result
      this.setState({
        web3,
        pendingRequest: false,
        result: formattedResult || null
      });
    } catch (error) {
      console.error(error); // tslint:disable-line
      this.setState({ web3, pendingRequest: false, result: null });
    }
  };

  public signAuthMessage = async () => {
    const { web3, address } = this.state;

    if (!web3) {
      return;
    }

    // test message
    const message = await axios.get(GENERATOR_URL_BASE + 'nonce/' + address).then(res => res.data.message);

    // encode message (hex)
    const hexMsg = convertUtf8ToHex(message ?? '');

    try {
      // open modal
      this.toggleModal();

      // toggle pending request indicator
      this.setState({
        pendingRequest: true,
        modalTitle: 'Pending signature request',
        modalContent: 'Please open your wallet and sign the message. This is for security purposes and does not cost you anything.'
      });

      // send message
      const result = await web3.eth.personal.sign(hexMsg, address);

      // trying out auth on server
      await axios.post(GENERATOR_URL_BASE + 'login', {
        address: address,
        signature: result,
      }).then(res => sessionStorage.setItem('token', res.data.token))
        .catch(err => console.error('error occurred while logging in.'));

      // verify signature
      const signer = recoverPersonalSignature(result, message);
      const verified = signer.toLowerCase() === address.toLowerCase();

      // format displayed result
      const formattedResult = {
        action: SIGN_AUTH,
        address,
        signer,
        verified,
        result
      };

      // display result
      this.setState({
        web3,
        pendingRequest: false,
        showModal: false,
        // result: formattedResult || null,
        currentStage: MintStage.PICK_TITLE
      });
    } catch (error) {
      console.error(error); // tslint:disable-line
      this.setState({ web3, pendingRequest: false, result: null });
    }
  };

  public validateTitle = (title: string): string | null => {
    let containsRestrictedPhrase = false;
    for (let i = 0; i < RESTRICTED_PHRASES.length; i++) {
      if (new RegExp("\\b" + RESTRICTED_PHRASES[i].toLowerCase() + "\\b").test(title.toLowerCase())) {
        console.log(`RESTRICTED_PHRASES[i]`, RESTRICTED_PHRASES[i]);
        containsRestrictedPhrase = true;
      }
    }

    if (title === '') {
      return 'Please write a haiku title.';
    } else if (title.length > 20) {
      return 'That\'s too long. Please write a title that is fewer than 20 characters.';
    } else if (/\p{Extended_Pictographic}/u.test(title)) {
      return 'Matsuo does not understand Emojis!';
    } else if (containsRestrictedPhrase) {
      return 'Oy, bite your tongue! This title did not pass my content filter.';
    }
    return null;
  }

  public onSubmitHaikuTitle = async (haikuTitle: string) => {
    const { web3, address } = this.state;

    if (!web3) {
      return;
    }

    const validationResult = this.validateTitle(haikuTitle);

    if (!!validationResult) {
      this.setState({ haikuTitleError: validationResult });
      return;
    }
    try {

      // open modal
      this.toggleModal();

      // toggle pending request indicator
      this.setState({
        pendingRequest: true,
        modalTitle: 'One moment...',
        modalContent: 'Matsuo is writing your haikus'
      });

      const haikuOptions = await axios.put(GENERATOR_URL_BASE + 'haiku', {
        haikuTitle
      }).then(res => res.data.haikus)
        .catch(err => console.error('error occurred while saving to Arweave.'));

      console.log(`result`, haikuOptions)

      this.setState({
        web3,
        pendingRequest: false,
        showModal: false,
        haikuTitle,
        haikuOptions,
        currentStage: MintStage.PICK_HAIKU
      });
    } catch (error) {
      console.error(error); // tslint:disable-line
      this.setState({ web3, pendingRequest: false, result: null });
    }

  }

  public chooseHaiku = (chosenHaiku: string) => {
    console.log(`chosenHaiku`, chosenHaiku);


    this.setState({
      currentStage: MintStage.MINT,
      chosenHaiku
    });
  }

  public mint = async () => {
    const { web3, contract, mintPriceInWei, haikuTitle, chosenHaiku, address, isWhitelisted } = this.state;

    if (!web3 || !contract || !mintPriceInWei) {
      console.error('failed check for the state\'s web3, contract, and mintPriceInGwei');
      return;
    }

    try {
      // open modal
      this.toggleModal();

      // toggle pending request indicator
      this.setState({
        pendingRequest: true,
        modalTitle: 'Minting...',
        modalContent: 'Matsuo is creating your haiku and saving it to the blockchain. Please be patient, he\'s 327 years old!'
      });

      let result;
      if (isWhitelisted) {
        result = await axios.put(GENERATOR_URL_BASE + 'arweave', {
          haikuTitle,
          haikuContent: chosenHaiku,
          address
        }).then(res => res.data)
          .catch(err => console.error('error occurred while saving to Arweave.'));

      } else {
        result = await axios.put(GENERATOR_URL_BASE + 'arweave', {
          haikuTitle,
          haikuContent: chosenHaiku
        }).then(res => res.data)
          .catch(err => console.error('error occurred while saving to Arweave.'));

      }
      const txnId = result.txnId;
      const metadataUri = result.metadataUri;
      const signature = result.signature;
      const useWhitelist = result.useWhitelist;

      let mintTx;
      if (useWhitelist) {
        mintTx = await this.state.contract!.whitelistMint(metadataUri, signature, { value: mintPriceInWei });
      } else {
        mintTx = await this.state.contract!.publicMint(metadataUri, signature, { value: mintPriceInWei });
      }


      if (NODE_ENV === 'production') {
        this.setState({ etherscanLink: 'https://etherscan.io/tx/' + mintTx.hash });
      } else {
        this.setState({ etherscanLink: 'https://rinkeby.etherscan.io/tx/' + mintTx.hash });
      }


      await mintTx.wait().then((res: any) => {
        console.log('mint successful!');
        console.log('mintResult :>> ', res);
      });

      // format displayed result
      const formattedResult = {
        action: MINT_NFT,
        metadataUri,
        signature,
      };

      // display result
      this.setState({
        web3,
        pendingRequest: false,
        showModal: false,
        lastTxn: txnId,
        metadataUri,
        imageUri: result.imageUri,
        paperName: result.paperName,
        currentStage: MintStage.MINT_SUCCESS
      });
    } catch (error) {
      console.error(error); // tslint:disable-line
      this.setState({ web3, pendingRequest: false, result: null });
    }
  };

  public mintAnother = () => {
    this.setState({
      currentStage: MintStage.PICK_TITLE,
      etherscanLink: null
    });
  }


  public getStatusFromLastTxn = async () => {
    const { web3, lastTxn } = this.state;

    if (!web3) {
      return;
    }

    try {
      // open modal
      this.toggleModal();

      // toggle pending request indicator
      this.setState({ pendingRequest: true });

      // trying out auth on server
      const statusObject = await axios.get(
        process.env.REACT_APP_GENERATOR_URL_BASE + 'arweave/status/' + lastTxn
      ).then(res => res.data.status)
        .catch(err => console.error('error occurred while getting image from Arweave.'));

      console.log('statusObject.status :>> ', statusObject.status);
      // format displayed result
      const formattedResult = {
        action: GET_STATUS_FROM_TXN,
        status: statusObject.status,
        confirmed: statusObject.confirmed ?? 'null' // an unconfirmed status comes back null for confirmed.
      };


      // display result
      this.setState({
        web3,
        pendingRequest: false,
        result: formattedResult || null
      });
    } catch (error) {
      console.error(error); // tslint:disable-line
      this.setState({ web3, pendingRequest: false, result: null });
    }
  };

  public testContractCall = async (functionSig: string) => {
    let contractCall = null;
    switch (functionSig) {
      case DAI_BALANCE_OF:
        contractCall = callBalanceOf;
        break;
      case DAI_TRANSFER:
        contractCall = callTransfer;
        break;

      default:
        break;
    }

    if (!contractCall) {
      throw new Error(
        `No matching contract calls for functionSig=${functionSig}`
      );
    }

    const { web3, address, chainId } = this.state;
    try {
      // open modal
      this.toggleModal();

      // toggle pending request indicator
      this.setState({ pendingRequest: true });

      // send transaction
      const result = await contractCall(address, chainId, web3);

      // format displayed result
      const formattedResult = {
        action: functionSig,
        result
      };

      // display result
      this.setState({
        web3,
        pendingRequest: false,
        result: formattedResult || null
      });
    } catch (error) {
      console.error(error); // tslint:disable-line
      this.setState({ web3, pendingRequest: false, result: null });
    }
  };

  public testOpenBox = async () => {
    function getBoxProfile(
      address: string,
      provider: any
    ): Promise<IBoxProfile> {
      return new Promise(async (resolve, reject) => {
        try {
          await openBox(address, provider, async () => {
            const profile = await getProfile(address);
            resolve(profile);
          });
        } catch (error) {
          reject(error);
        }
      });
    }

    const { address, provider } = this.state;

    try {
      // open modal
      this.toggleModal();

      // toggle pending request indicator
      this.setState({ pendingRequest: true });

      // send transaction
      const profile = await getBoxProfile(address, provider);

      let result = null;
      if (profile) {
        result = {
          name: profile.name,
          description: profile.description,
          job: profile.job,
          employer: profile.employer,
          location: profile.location,
          website: profile.website,
          github: profile.github
        };
      }

      // format displayed result
      const formattedResult = {
        action: BOX_GET_PROFILE,
        result
      };

      // display result
      this.setState({
        pendingRequest: false,
        result: formattedResult || null
      });
    } catch (error) {
      console.error(error); // tslint:disable-line
      this.setState({ pendingRequest: false, result: null });
    }
  };

  public resetApp = async () => {
    const { web3 } = this.state;
    if (web3 && web3.currentProvider && web3.currentProvider.close) {
      await web3.currentProvider.close();
    }
    await this.web3Modal.clearCachedProvider();
    this.setState({ ...INITIAL_STATE });
  };

  handleTitleInputChange = (e: any) => {
    this.setState({ haikuTitle: e.target.value });
  };

  public render = () => {
    const {
      assets,
      address,
      connected,
      chainId,
      mintPrice,
      numberMinted,
      maxSupply,
      haikuTitleError,
      currentStage,
      whiteListedReadyToMintMessage,
      haikuTitle,
      haikuOptions,
      chosenHaiku,
      fetching,
      showModal,
      pendingRequest,
      modalTitle,
      modalContent,
      result,
      etherscanLink,
      imageUri,
      paperName
    } = this.state;
    return (
      <SLayout>
        <Column maxWidth={1000} spanHeight>
          <Header
            connected={connected}
            address={address}
            chainId={chainId}
            mintPrice={mintPrice}
            numberMinted={numberMinted}
            maxSupply={maxSupply}
            killSession={this.resetApp}
          />
          <SContent>
            {fetching ? (
              <Column center>
                <SContainer>
                  <Loader />
                </SContainer>
              </Column>
            ) : !!assets && !!assets.length ? (
              <SBalances>

                {currentStage === MintStage.WHITE_LISTED_BUT_MINT_NOT_READY ? (
                  <Fade in={true}>
                    <span>
                      <Column center>
                        <p>
                          Congratulations, you're on the whitelist! Unfortunately you're a bit early.
                          Please refresh this page when it is time for the whitelist mint.
                        </p>
                        <WhitelistMintCountdown />
                      </Column>
                    </span>
                  </Fade>
                ) : <></>}

                {currentStage === MintStage.NOT_WHITE_LISTED_AND_MINT_NOT_READY ? (
                  <Fade in={true}>
                    <span>
                      <Column center>
                        <p>
                          I'm terribly sorry, but you are not on the whitelist. If you believe
                          this is a mistake, please DM NΞ◎N in
                          the <a style={{ fontSize: 'large' }} href='https://discord.gg/aihaiku' target='_blank' rel="noreferrer">Discord</a>.
                          Otherwise, you may simply refresh the page when the public mint is open.
                        </p>
                        <PublicMintCountdown />
                      </Column>
                    </span>
                  </Fade>
                ) : <></>}

                {currentStage === MintStage.AUTH_MESSAGE ? (
                  <Fade in={true}>
                    <span>
                      <Column center>
                        <h3>Time to Mint</h3>
                        {whiteListedReadyToMintMessage ? (<p>{whiteListedReadyToMintMessage}</p>) : <></>}
                        <p>First, please verify your wallet by signing a message:</p>
                        <STestButtonContainer>
                          <STestButton onClick={this.signAuthMessage}>
                            {SIGN_AUTH}
                          </STestButton>
                        </STestButtonContainer>
                      </Column>
                    </span>
                  </Fade>
                ) : <></>}

                {currentStage === MintStage.PICK_TITLE ? (
                  <Fade in={true}>
                    <span>
                      <Column center>
                        <p>
                          What would you like to title your haiku?
                          <br />
                          <i>(20 character limit)</i>
                        </p>

                        <TitleTextField
                          label="Haiku title"
                          autoComplete="false"
                          error={!!haikuTitleError}
                          // value={haikuTitle}
                          onChange={this.handleTitleInputChange}
                        />
                        {haikuTitleError ?
                          (<Fade in={true}>
                            <p style={{ color: 'red' }}>{haikuTitleError}</p>
                          </Fade>)
                          : <></>}
                        <STestButtonContainer>
                          <STestButton onClick={() => this.onSubmitHaikuTitle(haikuTitle)}>
                            Submit
                          </STestButton>
                        </STestButtonContainer>
                      </Column>
                    </span>
                  </Fade>
                ) : <></>}

                {currentStage === MintStage.PICK_HAIKU ? (
                  <Fade in={true}>
                    <span>
                      <Column center>
                        <p>
                          Which haiku speaks to your soul?
                        </p>

                        <Card sx={{ mx: 'auto', width: '33vw', marginBottom: '2.5rem', marginTop: '1rem' }}>
                          <span onClick={() => this.chooseHaiku(haikuOptions[0])}>
                            <CardActionArea>
                              <CardContent>
                                {stylizeHaikuOption(this.state.haikuOptions[0])}
                              </CardContent>
                            </CardActionArea>
                          </span>
                        </Card>

                        <Card sx={{ mx: 'auto', width: '33vw', marginBottom: '2.5rem' }}>
                          <span onClick={() => this.chooseHaiku(haikuOptions[1])}>
                            <CardActionArea>
                              <CardContent>
                                {stylizeHaikuOption(this.state.haikuOptions[1])}
                              </CardContent>
                            </CardActionArea>
                          </span>
                        </Card>

                        <Card sx={{ mx: 'auto', width: '33vw', marginBottom: '2.5rem' }}>
                          <span onClick={() => this.chooseHaiku(haikuOptions[2])}>
                            <CardActionArea>
                              <CardContent>
                                {stylizeHaikuOption(this.state.haikuOptions[2])}
                              </CardContent>
                            </CardActionArea>
                          </span>
                        </Card>

                      </Column>

                    </span>
                  </Fade>
                ) : <></>}

                {currentStage === MintStage.MINT ? (
                  <Column center>
                    <p>You're about to make this haiku a piece of immortal art:</p>

                    <Card sx={{ mx: 'auto', width: '33vw', marginBottom: '2.5rem' }}>
                      <CardContent>
                        <h4>{haikuTitle}</h4>
                        {stylizeHaikuOption(chosenHaiku ?? '')}
                      </CardContent>
                    </Card>
                    <p>Are you ready for Matsuo to create this haiku on his sacred paper and imbue it with unique properties?</p>
                    <STestButtonContainer>
                      <STestButton onClick={this.mint}>
                        Mint for {mintPrice}
                      </STestButton>
                    </STestButtonContainer>
                  </Column>
                ) : <></>}

                {currentStage === MintStage.MINT_SUCCESS ? (
                  <Column center>
                    <h2>Mint Successful!</h2>
                    <p>Congratulations, you now own this work of art entitled, <b>{haikuTitle}</b>:</p>
                    <img
                      src={imageUri ?? ''}
                      alt={'An image of the following haiku on paper: ' + chosenHaiku}
                      style={{ width: '33vw' }}
                    />

                    <p>The paper chosen is <i>{paperName}</i>.
                      <br />
                      <a href='/paper' target="_blank" rel="noreferrer">
                        Learn more about the paper <OpenInNewIcon fontSize="small" />
                      </a>
                    </p>

                    <STestButtonContainer>
                      <STestButton onClick={this.mintAnother}>
                        Mint Another Haiku
                      </STestButton>
                    </STestButtonContainer>
                  </Column>
                ) : <></>}


                {/* <STestButton onClick={this.getStatusFromLastTxn}>
                      {GET_STATUS_FROM_TXN}
                    </STestButton> */}
                {/* <h3>Balances</h3>
                <AccountAssets chainId={chainId} assets={assets} />{" "} */}
              </SBalances>
            ) : (
              <SLanding center>
                <ConnectButton onClick={this.onConnect} />
              </SLanding>
            )}
          </SContent>
        </Column>
        <Modal show={showModal} toggleModal={this.toggleModal}>
          {pendingRequest ? (
            <SModalContainer>
              <SModalTitle>{modalTitle}</SModalTitle>
              <SContainer>
                <Loader />
                <SModalParagraph>
                  {modalContent}
                </SModalParagraph>
                <SModalParagraph>
                  {!!etherscanLink ? (
                    <a href={etherscanLink} target="_blank" rel="noreferrer">
                      View on Etherscan <OpenInNewIcon fontSize="small" />
                    </a>
                  ) : <></>}
                </SModalParagraph>
              </SContainer>
            </SModalContainer>
          ) : result ? (
            <SModalContainer>
              <SModalTitle>{"Call Request Approved"}</SModalTitle>
              <ModalResult>{result}</ModalResult>
            </SModalContainer>
          ) : (
            <SModalContainer>
              <SModalTitle>{"Request Rejected by Wallet"}</SModalTitle>
            </SModalContainer>
          )}
        </Modal>
      </SLayout>
    );
  };
}

export default Web3Connection;
