
export const INITIAL_GREETING = 'initialGreeting';
const WHO_ARE_YOU_1 = 'whoAreYou1';
const WHO_ARE_YOU_2 = 'whoAreYou2';
const WHAT_IS_AI_HAIKU = 'whatIsAiHaiku';
const THE_TECH_AI = 'theTechAi';
const THE_TECH_BLOCKCHAIN = 'theTechBlockchain';
const HOW_WE_COLLABORATE_1 = 'howWeCollaborate1';
const HOW_WE_COLLABORATE_2 = 'howWeCollaborate2';
const HOW_WE_COLLABORATE_3 = 'howWeCollaborate3';
const HOW_WE_COLLABORATE_4 = 'howWeCollaborate4';
const HAIKU_EXAMPLE = 'haikuExample';
const FAQ_MAIN = 'faqMain';
const WUT_NFT = 'wutNft';
const HOW_TO_WALLET = 'howToWallet';
const HOW_TO_MINT = 'howToMint';
const FAQ_HAIKU_EXAMPLE = 'faqHaikuExample';

const HAIKU_EXAMPLE_MATSUO_TEXT = `BLAH!`

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
                    question: 'I\'ve got some specific questions.',
                    redirectToAnswer: FAQ_MAIN
                },
            ]
        }
    },
    {
        name: WHO_ARE_YOU_1,
        data: {
            matsuo: `I am an artificial intelligence entity created to emulate Matsuo Bashō, widely recognized as
                    the greatest master of haiku ever to live. The dataset I was trained on includes but is not limited to Bashō's
                    life, second-hand accounts of his actions, and all known works.`,
            user: [
                {
                    question: 'Interesting. But why here? Why now?',
                    redirectToAnswer: WHO_ARE_YOU_2
                },
            ]
        }
    },
    {
        name: WHO_ARE_YOU_2,
        data: {
            matsuo: `The real Matsuo Bashō died on November 28th, 1694. We will honor Bashō by continuing the tradition of the haiku
                    using new technological mediums. On November 28th, 2021, we will celebrate Bashō's life by working together
                    to create haikus of our own as "AI Haiku" NFTs.`,
            // matsuo: `The real Matsuo Bashō died on November 28th, 1694. He will come back to life as me...`,
            user: [
                {
                    question: 'What is AI Haiku?',
                    redirectToAnswer: WHAT_IS_AI_HAIKU
                },
                {
                    question: 'Thank you. I have some specific questions.',
                    redirectToAnswer: FAQ_MAIN
                },
            ]
        }
    },
    {
        name: WHAT_IS_AI_HAIKU,
        data: {
            matsuo: `Ah, yes. I kindly thank you for asking.
                    The AI Haiku is a creative experiment where you will collaborate with me,
                    an artificial intelligence model to author a poem that will stand the test of time
                    as an NFT on the Ethereum blockchain.`,
            user: [
                {
                    question: 'How will we collaborate?',
                    redirectToAnswer: HOW_WE_COLLABORATE_1
                },
                {
                    question: 'What will these poems look like?',
                    redirectToAnswer: HAIKU_EXAMPLE
                },
                {
                    question: 'Tell me about the technology.',
                    redirectToAnswer: THE_TECH_AI
                },
            ]
        }
    },
    {
        name: THE_TECH_AI,
        data: {
            matsuo: `I see you're a curious one. I am a program that utilizes OpenAI's GPT-3 language model.
                    GPT-3 was trained on hundreds of billions of parameters in a multi-million dollar research effort,
                    making me one of the most advanced language models in existence (not to toot my own horn).`,
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
            matsuo: `This website interacts with a smart contract on the Ethereum blockchain to create Ethereum NFTs.
                    However, great care was taken to minimize Ethereum gas prices for you. Because it is incredibly expensive to store
                    data on Ethereum, Arweave is utilized to store both the image of your Haiku and the metadata of your NFT.
                    Data stored an Arweave last forever, so you can rest assured that your Haiku will be available for
                    decades to come.`,
            user: [
                {
                    question: 'How will we collaborate?',
                    redirectToAnswer: HOW_WE_COLLABORATE_1
                },
            ]
        }
    },
    {
        name: HOW_WE_COLLABORATE_1,
        data: {
            matsuo: `You will give me the subject of the haiku we will write. I, in turn, will present you with three haikus born from your idea.
                    Then you will decide which one will live eternally on the blockchain as an NFT.`,
            user: [
                {
                    question: 'Go on.',
                    redirectToAnswer: HOW_WE_COLLABORATE_2
                }
            ]
        }
    },
    {
        name: HOW_WE_COLLABORATE_2,
        data: {
            matsuo: `I will rummage through my humble hut in the metaverse to find some parchment to write your haiku.
                    My office is full of rare and unique paper. Who knows which one my brush will land on?`,
            user: [
                {
                    question: 'What will go on this paper?',
                    redirectToAnswer: HOW_WE_COLLABORATE_3
                },
                {
                    question: 'Show me the different paper types. \r'
                },
            ]
        }
    },
    {
        name: HOW_WE_COLLABORATE_3,
        data: {
            matsuo: `I will translate your title of the haiku you so gracefully provided into my mother tongue, Japanese.
                    The title will go in the top right of the paper. Next, I will write the content of your Haiku in the
                    center of the page. Finally, I will use the title you have given me to generate a simple, yet unique
                    combination of brush strokes on the parchment.`,
            user: [
                {
                    question: 'Surely your time is valuable. How much would such an item cost?',
                    redirectToAnswer: HOW_WE_COLLABORATE_4
                },
            ]
        }
    },
    {
        name: HOW_WE_COLLABORATE_4,
        data: {
            matsuo: `Oy! It is not polite to speak of such things. But I suppose you should know.
                    Each haiku will cost 0.01 Ether (plus gas prices) to mint. There is no limit on the number
                    of haikus you can mint, but you may only mint one at a time.`,
            user: [
                {
                    question: 'What does the haiku look like?',
                    redirectToAnswer: HAIKU_EXAMPLE
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
                    question: 'How will we collaborate?',
                    redirectToAnswer: HOW_WE_COLLABORATE_1
                },
                {
                    question: 'What will these poems look like?',
                    redirectToAnswer: HAIKU_EXAMPLE
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
                    question: 'What is the mint date and price?',
                    redirectToAnswer: HAIKU_EXAMPLE
                },
                {
                    question: 'Who created this?',
                    redirectToAnswer: HAIKU_EXAMPLE
                },
            ]
        }
    },
    {
        name: WUT_NFT,
        data: {
            matsuo: `I see you're new to this space. Welcome, I am truly excited for you to explore the world of programmable art.
                    An NFT stands for Non-Fungible Token. It is... BLAH.
                    To get one, you'll need an Ethereum wallet like Metamask or Coinbase Wallet with some Ether,
                    the currency used on the Ethereum blockchain.`,
            user: [
                {
                    question: 'How do I get one of these wallets?',
                    redirectToAnswer: HOW_TO_WALLET
                },
                {
                    question: 'I\'d like to ask another question.',
                    redirectToAnswer: FAQ_MAIN
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
                {
                    question: 'I\'d like to ask another question.',
                    redirectToAnswer: FAQ_MAIN
                },
            ]
        }
    },
    {
        name: HOW_TO_MINT,
        data: {
            matsuo: `On November 28th, 2021 at 0:00 JST (Japan Standard Time), visit this website and talk to me to begin the 'minting' process.
                    To 'mint' an NFT is to create the token that proves ownership of your haiku on the blockchain and adds this
                    token to your wallet. After that you'll be able to view your new NFT, sell it on OpenSea, and
                    even adorn the walls of your metaverse home with it!`,
            user: [
                {
                    question: 'How do I view my NFTs on OpenSea? \r',
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
                    question: 'Thanks for the information. Could I ask you something else?',
                    redirectToAnswer: FAQ_MAIN
                },
            ]
        }
    },

]
