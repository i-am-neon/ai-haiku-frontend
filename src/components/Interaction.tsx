import * as React from 'react';
import Fade from '@mui/material/Fade';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import { FAQ_HAIKU_EXAMPLE, HAIKU_EXAMPLE, INITIAL_GREETING, speech } from './speech';

interface InteractionProps {
    setShowExampleHaiku: any
}

interface InteractionState {
    matsuosSpeech: string,
    matsuosSpeechIndexToFade: number,
    userSpeech: any[],
    userSpeechIndexToFade: number
}

class Interaction extends React.Component<InteractionProps, InteractionState> {
    constructor(props: InteractionProps) {
        super(props);
        this.state = {
            matsuosSpeech: '',
            matsuosSpeechIndexToFade: -1,
            userSpeech: [''],
            userSpeechIndexToFade: -1
        }
    }

    async componentDidMount() {
        await this.sleep(4000);
        const initialGreeting = this.getSpeechByName(INITIAL_GREETING);
        this.setState({
            matsuosSpeech: initialGreeting.matsuo,
            userSpeech: initialGreeting.user
        });
        await this.fadeInCurrentSpeech();
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

    async updateInteraction(newSpeechName: string) {

        if (newSpeechName === HAIKU_EXAMPLE || newSpeechName === FAQ_HAIKU_EXAMPLE) {
            this.props.setShowExampleHaiku(true);
        } else {
            this.props.setShowExampleHaiku(false);
        }
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
                            <p><a href={redirectLink} target="_blank">
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
        // Fade in user's questions
        for (let index = 0; index < this.state.userSpeech.length; index++) {
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
}

export default Interaction;