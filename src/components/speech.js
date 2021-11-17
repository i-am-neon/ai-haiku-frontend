
export const INITIAL_GREETING = 'initialGreeting';
export const WHO_ARE_YOU_1 = 'whoAreYou1';
export const WHO_ARE_YOU_2 = 'whoAreYou2';
export const WHAT_IS_AI_HAIKU = 'whatIsAiHaiku';
export const THE_TECH_AI = 'theTechAi';
export const THE_TECH_BLOCKCHAIN = 'theTechBlockchain';
export const HOW_WE_COLLABORATE_1 = 'howWeCollaborate1';
export const HOW_WE_COLLABORATE_2 = 'howWeCollaborate2';
export const HOW_WE_COLLABORATE_3 = 'howWeCollaborate3';
export const HOW_WE_COLLABORATE_4 = 'howWeCollaborate4';
export const HAIKU_EXAMPLE = 'haikuExample';

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
                    redirectToAnswer: WHO_ARE_YOU_1
                },
            ]
        }
    },
    {
        name: WHO_ARE_YOU_1,
        data: {
            matsuo: `I am an artificial intelligence entity created to emulate Matsuo Bashō, widely recognized as
                    the greatest master of haiku. The dataset I was trained on includes but is not limited to Bashō's
                    life, second-hand accounts of his actions, and all known works.`,
            user: [
                {
                    question: 'Interesting. But why here? Why now?',
                    redirectToAnswer: INITIAL_GREETING
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
            user: [
                {
                    question: 'What is AI Haiku?',
                    redirectToAnswer: WHAT_IS_AI_HAIKU
                },
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
                    an artificial intelligence model to author a poem that will stand the test of time
                    as an NFT on the Ethereum blockchain.`,
            user: [
                {
                    question: 'How will we collaborate?.',
                    redirectToAnswer: HOW_WE_COLLABORATE_1
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
            matsuo: `🍑🍑🍑🍑🍑🍑🍑🍑🍑🍑🍑🍑🍑🍑`,
            user: [
                {
                    question: 'How will we collaborate?',
                    redirectToAnswer: HOW_WE_COLLABORATE_1
                },
                {
                    question: 'What will these poems look like?.',
                    redirectToAnswer: HAIKU_EXAMPLE
                },
            ]
        }
    },
]
