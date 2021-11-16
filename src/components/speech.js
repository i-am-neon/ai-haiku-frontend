
export const INITIAL_GREETING = 'initialGreeting';
export const WHO_ARE_YOU = 'whoAreYou';

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
                    redirectToAnswer: WHO_ARE_YOU
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
    }
]

// export const whoAreYou = {
//     matsuo: 'I was born blah blah blah...',
//     user: [
//         {
//             question: 'Thank you.',
//             redirectToAnswer: INITIAL_GREETING
//         },
//     ]
// };

// export const initialGreeting = {
//     matsuo: 'Hello, there. My name is Matsuo. How can I help you, my friend?',
//     user: [
//         {
//             question: 'Who are you?',
//             redirectToAnswer: WHO_ARE_YOU
//         },
//         {
//             question: 'What is AI Haiku?',
//             redirectToAnswer: WHO_ARE_YOU
//         },
//         {
//             question: 'I\'ve got some specific questions.',
//             redirectToAnswer: WHO_ARE_YOU
//         },
//     ]
// };

