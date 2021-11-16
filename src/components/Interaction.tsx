import * as React from 'react';
import Fade from '@mui/material/Fade';
import { initialGreeting } from './speech';

interface InteractionState {
    currentSpeech: string,
    indexToFade: number
}

class Interaction extends React.Component<{}, InteractionState> {
    state = {
        currentSpeech: '',
        indexToFade: -1
    }

    async componentDidMount() {
        await this.sleep(3000);
        this.setState({ currentSpeech: initialGreeting });
        await this.fadeInCurrentSpeech();
    }

    createFadeIn(speech: string): JSX.Element[] {
        const speechArray = speech.split('');
        const ret: JSX.Element[] = []
        for (let i = 0; i < speechArray.length; i++) {
            const n = <Fade in={this.state.indexToFade >= i} key={i}><span>{speechArray[i]}</span></Fade>
            ret.push(n);
        }
        return ret;
    }

    async fadeInCurrentSpeech() {
        for (let index = 0; index < this.state.currentSpeech.length; index++) {
            await this.sleep(50);
            this.setState({ indexToFade: index });
        }
    }

    async sleep(ms: number) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    render() {
        return (
            <>
                {this.createFadeIn(this.state.currentSpeech)}
            </>
        );
    }
}

export default Interaction;