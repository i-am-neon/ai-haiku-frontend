import * as React from 'react';
import Arweave from 'arweave';
import { BlockData } from 'arweave/node/blocks';
import { Button } from '@mui/material';
import TextField from '@mui/material/TextField';

interface LongOutputProps {
    value: string
}

function LongOutput(props: LongOutputProps) {
    return (
        <>
            <br />
            <TextField
                id="outlined-multiline-static"
                multiline
                rows={4}
                value={props.value}
                margin="normal"
                sx={{ width: '80%' }}
            />
            <br />
        </>
    )
}

interface HelloArweaveProps {

}

interface HelloArweaveState {
    arweave: Arweave,
    block: BlockData | undefined
}

class HelloArweave extends React.Component<HelloArweaveProps, HelloArweaveState> {
    constructor(props: HelloArweaveProps) {
        super(props);
        this.state = {
            arweave: Arweave.init({}),
            block: undefined
        }
    }

    getCurrentArweaveBlock = async () => {
        this.state.arweave.blocks.getCurrent().then((res) => {
            this.setState({ block: res });
        }, (error) => {
            console.log('error :>> ', error);
        });
    }

    render() {
        return (
            <>
                <h1>Hello, Arweave!</h1>
                <h3>Arweave instance:</h3>
                <LongOutput value={JSON.stringify(this.state.arweave)} />
                <hr />
                <h3>Current block:</h3>
                <Button variant="contained" onClick={this.getCurrentArweaveBlock}>
                    Get current block
                </Button>
                <LongOutput value={JSON.stringify(this.state.block)} />
                <hr />
            </>
        );
    }
}

export default HelloArweave;