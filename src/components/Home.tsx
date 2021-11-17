import * as React from 'react';
import Interaction from './Interaction';
import MatsuoRenderer from './Matsuo/MatsuoRenderer';

interface HomeProps {}

interface HomeState {
    showExampleHaiku: boolean
}

export default class Home extends React.Component<HomeProps, HomeState> {
    constructor(props: HomeProps) {
        super(props);
        this.state = { showExampleHaiku: false };
        this.setShowExampleHaiku = this.setShowExampleHaiku.bind(this);
    }

    setShowExampleHaiku(b: boolean): void {
        console.log(`setting haiku home state to:`, b)
        this.setState({ showExampleHaiku: b },  () => {
            console.log(`this.state.showExampleHaiku`, this.state.showExampleHaiku);
          });
    }

    render() {
        return (
            <>
                <MatsuoRenderer showExampleHaiku={this.state.showExampleHaiku} />
                <Interaction setShowExampleHaiku={this.setShowExampleHaiku} />
            </>
        );
    }
}
