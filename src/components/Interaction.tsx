import * as React from 'react';
import Fade from '@mui/material/Fade';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import { INITIAL_GREETING, speech } from './speech';

interface InteractionState {
    matsuosSpeech: string,
    matsuosSpeechIndexToFade: number,
    userSpeech: any[],
    userSpeechIndexToFade: number
}

class Interaction extends React.Component<{}, InteractionState> {
    state = {
        matsuosSpeech: '',
        matsuosSpeechIndexToFade: -1,
        userSpeech: [''],
        userSpeechIndexToFade: -1
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
        console.log('speechArray :>> ', speechArray);
        const ret: JSX.Element[] = []
        for (let i = 0; i < speechArray.length; i++) {
            let n;
            if (speechArray[i] === '\n') {
                // New line
                console.log('speechArray[i] :>> ', speechArray[i]);
                n = (<><br /></>)
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
                n = (
                    <>
                        <Fade in={this.state.userSpeechIndexToFade >= i} key={i}>
                            <p><a href="/paper" target="_blank">
                                {userSpeechList[i].question} <OpenInNewIcon fontSize="small" />
                            </a></p>
                        </Fade>
                    </>
                )
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
            await this.sleep(25);
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