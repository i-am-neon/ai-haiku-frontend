
export const INITIAL_GREETING = 'initialGreeting';
export const WHO_ARE_YOU = 'whoAreYou';
export const WHAT_IS_AI_HAIKU = 'whatIsAiHaiku';
export const THE_TECH_AI = 'theTechAi';
export const THE_TECH_BLOCKCHAIN = 'theTechBlockchain';
export const HOW_WE_COLLABORATE = 'howWeCollaborate';
export const HAIKU_EXAMPLE = 'haikuExample';

export const speech = [
    {
        name: INITIAL_GREETING,
        data: {
            matsuo: 'Hello, there. My name is Matsuo. How can I help you, my friend?',
            user: [
                {
                    question: 'Who are you?',
                    redirectToAnswer: WHO_ARE_YOU
                },
                {
                    question: 'What is AI Haiku?',
                    redirectToAnswer: WHAT_IS_AI_HAIKU
                },
                {
                    question: 'I\'ve got some specific questions.',
                    redirectToAnswer: WHO_ARE_YOU
                },
            ]
        }
    },
    {
        name: WHO_ARE_YOU,
        data: {
            matsuo: 'I was born blah blah blah...',
            user: [
                {
                    question: 'Thank you.',
                    redirectToAnswer: INITIAL_GREETING
                },
            ]
        }
    },
    {
        name: WHAT_IS_AI_HAIKU,
        data: {
            matsuo: `Ah, yes. I kindly thank you for asking.
                    The AI Haiku is a creative experiment where you will collaborate with me,
                    an artificial intelligence model to author a poem that will stand the test of time.`,
            user: [
                {
                    question: 'How will we collaborate?.',
                    redirectToAnswer: HOW_WE_COLLABORATE
                },
                {
                    question: 'What will these poems look like?.',
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
                    GPT-3 is an autoregressive language model that uses deep learning to produce human-like text.
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
                    redirectToAnswer: HOW_WE_COLLABORATE
                },
            ]
        }
    },
    {
        name: HOW_WE_COLLABORATE,
        data: {
            matsuo: `You will give me the subject of the haiku we will write. I, in turn, will present you with three haikus born from your idea.
                    Then you will decide which one will live eternally on the blockchain as an NFT.`,
            user: [
                {
                    question: 'How will we collaborate?',
                    redirectToAnswer: HOW_WE_COLLABORATE
                },
                {
                    question: 'What will these poems look like?.',
                    redirectToAnswer: HAIKU_EXAMPLE
                },
            ]
        }
    },
    {
        name: HAIKU_EXAMPLE,
        data: {
            matsuo: `🍑🍑🍑🍑🍑🍑🍑🍑🍑🍑🍑🍑🍑🍑`,
            user: [
                {
                    question: 'How will we collaborate?',
                    redirectToAnswer: HOW_WE_COLLABORATE
                },
                {
                    question: 'What will these poems look like?.',
                    redirectToAnswer: HAIKU_EXAMPLE
                },
            ]
        }
    },
]
