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
    currentSpeech: JSX.Element[]
}

class Interaction extends React.Component<InteractionProps, InteractionState> {
    state = { currentSpeech: [] }

    async componentDidMount() {
        await this.sleep(3000);
        this.createSpeech(initialGreeting.split(''));
    }

    createSpeech = async (speech: string[]) => {
        for (let i = 0; i < speech.length; i++) {
            await this.sleep(100);
            console.log('adding word:', speech[i]);
            this.setState({ currentSpeech: [...this.state.currentSpeech, fadeIn(speech[i])] });
        }
    }

    async sleep(ms: number) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    render() {
        return (<p>{this.state.currentSpeech}</p>);
    }
}

export default Interaction;