import * as React from 'react';
import Fade from '@mui/material/Fade';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import { FAQ_HAIKU_EXAMPLE, HAIKU_EXAMPLE, INITIAL_GREETING, speech } from './speech';
import { IS_MINT_READY } from '../utils/envVariables';

interface InteractionProps {
    setShowExampleHaiku: any
}

interface InteractionState {
    matsuosSpeech: string,
    matsuosSpeechIndexToFade: number,
    userSpeech: any[],
    userSpeechIndexToFade: number,
    currentInteraction: string | null,
    interactionHistory: string[]
}

class Interaction extends React.Component<InteractionProps, InteractionState> {
    constructor(props: InteractionProps) {
        super(props);
        this.state = {
            matsuosSpeech: '',
            matsuosSpeechIndexToFade: -1,
            userSpeech: [''],
            userSpeechIndexToFade: -1,
            currentInteraction: null,
            interactionHistory: []
        }
    }

    async componentDidMount() {
        await this.sleep(4000);
        const initialGreeting = this.getSpeechByName(INITIAL_GREETING);
        this.setState({
            matsuosSpeech: initialGreeting.matsuo,
            userSpeech: initialGreeting.user,
            currentInteraction: INITIAL_GREETING,
            interactionHistory: [...this.state.interactionHistory, INITIAL_GREETING]
        });
        await this.fadeInCurrentSpeech();
    }

    async goToPreviousInteraction() {
        const interactionHistoryCopy = this.state.interactionHistory;
        interactionHistoryCopy.pop()
        this.setState(
            { interactionHistory: interactionHistoryCopy },
            async () => await this.updateInteraction(this.state.interactionHistory[this.state.interactionHistory.length - 1])
        );
    }

    async updateInteraction(newSpeechName: string) {
        // Set state for previous interaction
        if (newSpeechName === INITIAL_GREETING) {
            this.setState({
                currentInteraction: INITIAL_GREETING,
                interactionHistory: [INITIAL_GREETING]
            });
            // Else if user did not just go back
        } else if (newSpeechName !== this.state.interactionHistory[this.state.interactionHistory.length - 1]) {
            // User did not hit back, adding new interaction to history
            this.setState({
                currentInteraction: newSpeechName,
                interactionHistory: [...this.state.interactionHistory, newSpeechName]
            });
        } else {
            // User went back
            this.setState({
                currentInteraction: newSpeechName,
            });
        }

        // Set setShowExampleHaiku
        if (newSpeechName === HAIKU_EXAMPLE || newSpeechName === FAQ_HAIKU_EXAMPLE) {
            this.props.setShowExampleHaiku(true);
        } else {
            this.props.setShowExampleHaiku(false);
        }

        // Fade in new speech for interaction
        const newSpeech = this.getSpeechByName(newSpeechName);
        this.setState({
            matsuosSpeechIndexToFade: -1,
            userSpeechIndexToFade: -1,
        });
        await this.sleep(500);
        this.setState({
            matsuosSpeech: newSpeech.matsuo,
            userSpeech: newSpeech.user
        });
        await this.fadeInCurrentSpeech();
    }

    buildMatsuosSpeech(speech: string): JSX.Element[] {
        const speechArray = speech.split('');
        const ret: JSX.Element[] = []
        for (let i = 0; i < speechArray.length; i++) {
            let n;
            if (speechArray[i] === '\n') {
                // New line
                n = (<><br key={i} /></>)
            } else {
                n = (
                    <Fade in={this.state.matsuosSpeechIndexToFade >= i} key={i}>
                        <span>{speechArray[i]}</span>
                    </Fade>
                )
            }
            ret.push(n);
        }
        return ret;
    }

    buildUserSpeech(userSpeechList: any[]): JSX.Element[] {
        const ret: JSX.Element[] = []
        for (let i = 0; i < userSpeechList.length; i++) {
            let n;
            if (userSpeechList[i]?.question?.includes('\r')) {
                // For 'open in new tab' icon
                let redirectLink = '';
                if (userSpeechList[i]?.question?.toLowerCase().includes('paper')) {
                    redirectLink = '/paper';
                }
                if (userSpeechList[i]?.question?.toLowerCase().includes('metamask')) {
                    redirectLink = 'https://metamask.io';
                }
                if (userSpeechList[i]?.question?.toLowerCase().includes('opensea')) {
                    redirectLink = 'https://opensea.io/account';
                }
                if (userSpeechList[i]?.question?.toLowerCase().includes('twitter')) {
                    redirectLink = 'https://twitter.com/0xNeon';
                }
                n = (
                    <>
                        <Fade in={this.state.userSpeechIndexToFade >= i} key={i}>
                            <p><a href={redirectLink} target="_blank" rel="noreferrer">
                                {userSpeechList[i].question} <OpenInNewIcon fontSize="small" />
                            </a></p>
                        </Fade>
                    </>
                );
            } else {
                n = (
                    <>
                        <Fade in={this.state.userSpeechIndexToFade >= i} key={i}>
                            <p><a onClick={async () => await this.updateInteraction(userSpeechList[i].redirectToAnswer)}>
                                {userSpeechList[i].question}
                            </a></p>
                        </Fade>
                    </>
                )
            }
            ret.push(n);

            if (IS_MINT_READY && userSpeechList[i]?.question?.includes('\t')) {
                const mintLink = (
                    <>
                        <Fade in={this.state.userSpeechIndexToFade >= i + 1} key={i + 1}>
                            <p><a href='/mint'>
                                No thank you, I'm ready to mint now
                            </a></p>
                        </Fade>
                    </>
                );
                ret.push(mintLink)
            }
            // Add back button at the end when not on initial interaction
            if (i === userSpeechList.length - 1 && this.state.currentInteraction !== INITIAL_GREETING) {
                const backButton = (
                    <>
                        <Fade in={this.state.userSpeechIndexToFade >= i + 1} key={i + 1}>
                            <p><a onClick={async () => await this.goToPreviousInteraction()}>
                                <i>Go back</i>
                            </a></p>
                        </Fade>
                    </>
                )
                ret.push(backButton)
            }
        }
        return ret;
    }

    async fadeInCurrentSpeech() {
        // Fade in Matsuo's speech
        for (let index = 0; index < this.state.matsuosSpeech.length; index++) {
            if (this.state.matsuosSpeech[index] !== '\n') {
                // Don't wait on new lines. For some reason it throws off the cadence.
                await this.sleep(25);
            }
            this.setState({ matsuosSpeechIndexToFade: index });
        }
        await this.sleep(500);
        // Fade in user's questions, + 1 for the back button.
        for (let index = 0; index <= this.state.userSpeech.length; index++) {
            await this.sleep(500);
            this.setState({ userSpeechIndexToFade: index });
        }
    }

    async sleep(ms: number) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    render() {
        return (
            <>
                <p>{this.buildMatsuosSpeech(this.state.matsuosSpeech)}</p>
                {this.buildUserSpeech(this.state.userSpeech)}
            </>
        );
    }

    private getSpeechByName(name: string) {
        let retSpeech = { matsuo: '', user: [{}] };
        speech.forEach(obj => {
            if (obj.name === name) {
                retSpeech = obj.data;
            }
        });
        return retSpeech;
    }
}

export default Interaction;