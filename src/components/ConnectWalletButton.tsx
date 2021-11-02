import * as React from 'react';
import Web3 from "web3";
import Web3Modal from "web3modal";
import WalletConnectProvider from "@walletconnect/web3-provider";
import Fortmatic from "fortmatic";
import Torus from "@toruslabs/torus-embed";
import Portis from "@portis/web3";
import Authereum from "authereum";
import { Bitski } from "bitski";

interface ConnectWalletButtonProps {

}

interface ConnectWalletButtonState {

}

class ConnectWalletButton extends React.Component<ConnectWalletButtonProps, ConnectWalletButtonState> {
  // state = { :  }

  connectWallet = async () => {
    const providerOptions = {
      walletconnect: {
        package: WalletConnectProvider,
        options: {
          infuraId: process.env.REACT_APP_INFURA_ID
        }
      },
      torus: {
        package: Torus
      },
      fortmatic: {
        package: Fortmatic,
        options: {
          key: process.env.REACT_APP_FORTMATIC_KEY
        }
      },
      authereum: {
        package: Authereum
      },
      bitski: {
        package: Bitski,
        options: {
          clientId: process.env.REACT_APP_BITSKI_CLIENT_ID,
          callbackUrl: window.location.href + "bitski-callback.html"
        }
      }
    }; const web3Modal = new Web3Modal({
      network: "mainnet", // optional
      cacheProvider: true, // optional
      providerOptions // required
    });

    const provider = await web3Modal.connect();

    const web3 = new Web3(provider);
  }
  render() {
    return (<button onClick={this.connectWallet}>Connect wallet</button>);
  }
}

export default ConnectWalletButton;