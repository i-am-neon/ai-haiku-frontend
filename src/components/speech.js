
export const INITIAL_GREETING = 'initialGreeting';
const WHO_ARE_YOU_1 = 'whoAreYou1';
const WHO_ARE_YOU_2 = 'whoAreYou2';
const WHAT_IS_AI_HAIKU = 'whatIsAiHaiku';
const THE_TECH_AI = 'theTechAi';
const THE_TECH_BLOCKCHAIN = 'theTechBlockchain';
const HOW_WE_COLLABORATE = 'howWeCollaborate';
const MINT_PRICE = 'mintPrice';
export const HAIKU_EXAMPLE = 'haikuExample';
const FAQ_MAIN = 'faqMain';
const WUT_NFT = 'wutNft';
const HOW_TO_WALLET = 'howToWallet';
const HOW_TO_MINT = 'howToMint';
export const FAQ_HAIKU_EXAMPLE = 'faqHaikuExample';
const FAQ_WHAT_GET_WHEN_MINT_1 = 'whatGetWhenMint1';
const FAQ_WHAT_GET_WHEN_MINT_2 = 'whatGetWhenMint2';
const MINT_DEETS = 'mintDeets';
const WHO_DUNNIT = 'whoDunnit';
const READY_TO_MINT = 'readyToMint';
const EXPLAIN_MINT = 'explainMint';

const HAIKU_EXAMPLE_MATSUO_TEXT = `This is a haiku I recently created entitled, "The Milky Way".
                    The background will be one of four types of traditional handmade Japanese paper.
                    I will translate the haiku title you so gracefully provide into my mother tongue, Japanese. The title will go in the top right of the paper.
                    The center contains the haiku you choose of the three I create given the inspiration of your title.
                    Finally, the bottom left will be a piece of generative art; brush strokes created with randomness taken from your haiku title and chosen haiku content.
                    These properties will create endless possibilities. No two haikus will be the same.
                    Your haiku will be a digital fingerprint of your creativity enhanced by cutting-edge technology to celebrate the age-old tradition of poetry and art.`;
const WHAT_GET_WHEN_MINT_MATSUO_TEXT_1 = `Upon minting an AI Haiku, you will recieve the high resolution image of the haiku you and I created as an NFT, digital proof that you own the haiku.
                    Because you played a key role in the haiku's creation, the you will own the intellectual property and
                    commercial rights of your AI Haiku. If you sell your work, those rights are transferred to the new owner.
                    Your haiku will live immutably on the blockchain forever. Such an art form should be cherished and may even be
                    passed down to the next generation.`;                
const WHAT_GET_WHEN_MINT_MATSUO_TEXT_2 = `I'm glad you asked. Additionally, you are entitled to a physical copy of your haiku.
                    It will be printed on paper handmade in Japan and include a QR code that points to the NFT version of the work.
                    I will ship your haiku anywhere in the world for free. However, if you do not opt in to receiving a physical
                    copy, I will donate the funds it would have cost to create your paper haiku to a charity voted on by the community.`;                

export const speech = [
    {
        name: INITIAL_GREETING,
        data: {
            matsuo: 'Hello, there. My name is Matsuo. How can I help you, my friend?',
            user: [
                {
                    question: 'Who are you?',
                    redirectToAnswer: WHO_ARE_YOU_1
                },
                {
                    question: 'What is AI Haiku?',
                    redirectToAnswer: WHAT_IS_AI_HAIKU
                },
                {
                    question: 'I\'ve got some specific questions',
                    redirectToAnswer: FAQ_MAIN
                },
                // {
                //     question: 'I\'m ready to mint my AI Haiku',
                //     redirectToAnswer: READY_TO_MINT
                // },
            ]
        }
    },
    {
        name: WHO_ARE_YOU_1,
        data: {
            matsuo: `I am an artificial intelligence entity created to emulate Matsuo Bashō, widely recognized as
                    the greatest haiku poet ever to live. The dataset I was trained on includes but is not limited to Bashō's
                    life, second-hand accounts of his actions, and all known works.`,
            user: [
                {
                    question: 'What are you doing here?',
                    redirectToAnswer: WHO_ARE_YOU_2
                },
            ]
        }
    },
    {
        name: WHO_ARE_YOU_2,
        data: {
            matsuo: `You're a curious one.
                    The flesh and blood Matsuo Bashō died on November 28th, 1694. We will honor Bashō by continuing the tradition of the haiku
                    using new technological mediums. On November 28th, 2021, we shall celebrate Bashō's life by forging a partnership
                    between AI and humans to create art known as "AI Haikus" stored immutably as NFTs.`,
            // matsuo: `The real Matsuo Bashō died on November 28th, 1694. He will come back to life as me...`,
            user: [
                {
                    question: 'I\'d like to ask some other questions',
                    redirectToAnswer: INITIAL_GREETING
                },
            ]
        }
    },
    {
        name: WHAT_IS_AI_HAIKU,
        data: {
            matsuo: `AI Haiku is a creative experience where you will collaborate with me, an intelligent computing system, to author a haiku.
                    Your humanity: pure emotion, creativity, and life will combine with the immense literary knowledge I hold to create something truly unique.
                    You will have the opportunity to become part of a historical moment that redefines the way humans and computers collaborate.
                    Together we shall create haikus that will stand the test of time.`,
            user: [
                {
                    question: 'How will we collaborate?',
                    redirectToAnswer: HOW_WE_COLLABORATE
                },
                {
                    question: 'Tell me about the technology',
                    redirectToAnswer: THE_TECH_AI
                },
            ]
        }
    },
    {
        name: THE_TECH_AI,
        data: {
            matsuo: `You are quite inquisitive. Such a trait will serve you well as you move forward in this world.
                    I am a program that utilizes OpenAI's GPT-3 language model.
                    GPT-3 was trained on hundreds of billions of parameters in a multi-million dollar research effort,
                    making me one of the most advanced language models in existence.`,
            user: [
                {
                    question: 'How about the blockchain?',
                    redirectToAnswer: THE_TECH_BLOCKCHAIN
                },
            ]
        }
    },
    {
        name: THE_TECH_BLOCKCHAIN,
        data: {
            matsuo: `This website interacts with a smart contract on the Ethereum blockchain to create NFTs.
                    However, great care was taken to minimize gas prices (thus, energy used by the network) for you.
                    Because it is incredibly expensive and energy-intensive to store data on Ethereum, Arweave is utilized to store both the image of your Haiku and the metadata of your NFT.
                    Data stored an Arweave lasts forever, so you can rest assured that your Haiku will be available for decades if not centuries to come.`,
            user: [
                {
                    question: 'How will we collaborate?',
                    redirectToAnswer: HOW_WE_COLLABORATE
                },
            ]
        }
    },
    {
        name: HOW_WE_COLLABORATE,
        data: {
            matsuo: `You will give me the subject of the haiku we will write. I, in turn, will present you with three haikus born from your idea.
                    Then you will decide which one will live eternally on the blockchain as your NFT.
                    I will rummage through my humble hut in the metaverse to find some parchment to write your haiku.
                    My office is full of rare and unique paper. Who knows which one my brush will land on?`,
            user: [
                {
                    question: 'What will go on this paper?',
                    redirectToAnswer: HAIKU_EXAMPLE
                },
                {
                    question: 'Show me the different paper types \r'
                },
            ]
        }
    },
    {
        name: HAIKU_EXAMPLE,
        data: {
            matsuo: HAIKU_EXAMPLE_MATSUO_TEXT,
            user: [
                {
                    question: 'Surely your time is valuable. How much would such an item cost?',
                    redirectToAnswer: MINT_PRICE
                },
            ]
        }
    },
    {
        name: MINT_PRICE,
        data: {
            matsuo: `Oy! It is not polite to speak of such things. But I suppose you should know.
                    Each haiku will cost 0.01 Ether (plus gas fees) to mint. This price ensures accessibility to a large part the community.
                    There is no limit on the number of haikus you can mint, but you may only mint one at a time.
                    There will only be 575 AI Haikus ever created.`,
            user: [
                {
                    question: 'I have some other questions to ask',
                    redirectToAnswer: INITIAL_GREETING
                },
            ]
        }
    },
    {
        name: FAQ_MAIN,
        data: {
            matsuo: `Yes of course. What are you interested in learning?`,
            user: [
                {
                    question: 'What is an NFT and how do I buy one?',
                    redirectToAnswer: WUT_NFT
                },
                {
                    question: 'What do the NFTs look like, and what do I get when I mint one?',
                    redirectToAnswer: FAQ_HAIKU_EXAMPLE
                },
                {
                    question: 'What is the mint date, price and total supply?',
                    redirectToAnswer: MINT_DEETS
                },
                {
                    question: 'Who created this?',
                    redirectToAnswer: WHO_DUNNIT
                },
            ]
        }
    },
    {
        name: WUT_NFT,
        data: {
            matsuo: `I see you're new to this space. Welcome, I am truly excited for you to explore the world of programmable art.
                    An NFT stands for Non-Fungible Token. These tokens are essentially digital items that live in the blockchain.
                    In this case, the token is a one-of-a-kind piece of art that has been “minted” on Ethereum and is fully yours to own.
                    To get one, you'll need an Ethereum wallet like Metamask or Coinbase Wallet with some Ether,
                    the currency used on the Ethereum blockchain.`,
            user: [
                {
                    question: 'How do I get one of these wallets?',
                    redirectToAnswer: HOW_TO_WALLET
                },
            ]
        }
    },
    {
        name: HOW_TO_WALLET,
        data: {
            matsuo: `First you'll need Ether. Create an account on an exchange such as Coinbase, Kraken, or FTX and connect your bank account.
                    If you used Coinbase, you can follow their instructions on how to use their browser extension wallet.
                    Otherwise, I'd recommend creating a Metamask wallet and transfering some Ether to it. Don't forget
                    to have a bit more on hand for the gas price! That is the fee associated with any transaction that happens on Ethereum.`,
            user: [
                {
                    question: 'Tell me how to create a Metamask wallet. \r',
                    redirectToAnswer: HOW_TO_WALLET
                },
                {
                    question: 'What do I do after that?',
                    redirectToAnswer: HOW_TO_MINT
                },
            ]
        }
    },
    {
        name: HOW_TO_MINT,
        data: {
            matsuo: `On November 28th, 2021 at 9pm EST (11/29 at 2am UTC), visit this website and talk to me to begin the "minting" process.
                    To mint an NFT is to create the token that proves ownership of your haiku on the blockchain and adds this
                    token to your wallet. After that you'll be able to view your new NFT, sell it on OpenSea, and
                    even adorn the walls of your metaverse home with it!`,
            user: [
                {
                    question: 'I\'d like to view my NFTs on OpenSea. \r',
                    redirectToAnswer: HOW_TO_WALLET
                },
                {
                    question: 'Thanks for the information. Could I ask you something else?',
                    redirectToAnswer: FAQ_MAIN
                },
            ]
        }
    },
    {
        name: FAQ_HAIKU_EXAMPLE,
        data: {
            matsuo: HAIKU_EXAMPLE_MATSUO_TEXT,
            user: [
                {
                    question: 'Beautiful. And what do I get when I mint one?',
                    redirectToAnswer: FAQ_WHAT_GET_WHEN_MINT_1
                },
                {
                    question: 'Show me the different paper types. \r'
                },
            ]
        }
    },
    {
        name: FAQ_WHAT_GET_WHEN_MINT_1,
        data: {
            matsuo: WHAT_GET_WHEN_MINT_MATSUO_TEXT_1,
            user: [
                {
                    question: 'Is this a purely digital form of art?',
                    redirectToAnswer: FAQ_WHAT_GET_WHEN_MINT_2
                },
            ]
        }
    },
    {
        name: FAQ_WHAT_GET_WHEN_MINT_2,
        data: {
            matsuo: WHAT_GET_WHEN_MINT_MATSUO_TEXT_2,
            user: [
                {
                    question: 'Thanks for the information. Could I ask you something else?',
                    redirectToAnswer: FAQ_MAIN
                },
            ]
        }
    },
    {
        name: MINT_DEETS,
        data: {
            matsuo: `On November 28th, 2021 at 9pm EST (11/29 at 2am UTC), visit this website and talk to me to begin the "minting" process.
                    Each haiku will cost 0.01 Ether (plus gas fees) to mint. There is no limit on the numberof haikus you can mint,
                    but you may only mint one at a time. There will only be 575 AI Haikus ever created.`,
            user: [{}]
        }
    },
    {
        name: WHO_DUNNIT,
        data: {
            matsuo: `This project was authored by NΞ◎N.`,
            user: [
                {
                    question: 'I\'d like to see what NΞ◎N is up to on Twitter \r',
                },
            ]
        }
    },
    {
        name: READY_TO_MINT,
        data: {
            matsuo: `I see you're ready to create your haiku.
                    Would you like me to explain how this process will work?`,
            user: [
                {
                    question: 'Yes, tell me \t', // \t is code for: mint link after this line
                    redirectToAnswer: EXPLAIN_MINT
                },
            ]
        }
    },
    {
        name: EXPLAIN_MINT,
        data: {
            matsuo: `BLAH`,
            user: [
                {},
            ]
        }
    },
]
