import * as React from 'react';
import Fade from '@mui/material/Fade';
import { initialGreeting } from './speech';

function fadeIn(speech: string) {
    return (
        <Fade in={true} timeout={1000}>
            <span>{speech}</span>
        </Fade>
    )
}


interface InteractionProps {

}

interface InteractionState {
    currentSpeech: string,
    indexToFade: number
}

class Interaction extends React.Component<InteractionProps, InteractionState> {
    state = {
        currentSpeech: '',
        indexToFade: -1
    }

    async componentDidMount() {
        await this.sleep(3000);
        this.setState({ currentSpeech: initialGreeting });
        for (let index = 0; index < this.state.currentSpeech.length; index++) {
            await this.sleep(100);
            this.setState({ indexToFade: index });
            
        }
    }

    createFadeIn(speech: string): JSX.Element[] {
        const speechArray = speech.split(' ');
        const ret: JSX.Element[] = []
        for (let i = 0; i < speechArray.length; i++) {
            const n = <Fade in={this.state.indexToFade >= i}><span>{speechArray[i] + ' '}</span></Fade>
            ret.push(n);
        }

        return ret;
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