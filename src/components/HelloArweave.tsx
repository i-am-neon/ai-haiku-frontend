import * as React from 'react';
import * as fs from 'fs';
import Arweave from 'arweave';
import { BlockData } from 'arweave/node/blocks';
import { Button } from '@mui/material';
import TextField from '@mui/material/TextField';
import Transaction from 'arweave/node/lib/transaction';

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
    block: BlockData | null,
    transaction: Transaction | null,
}

class HelloArweave extends React.Component<HelloArweaveProps, HelloArweaveState> {
    constructor(props: HelloArweaveProps) {
        super(props);
        this.state = {
            arweave: Arweave.init({ host: 'arweave.net' }),
            block: null,
            transaction: null,
        }
    }

    getCurrentArweaveBlock = async () => {
        this.state.arweave.blocks.getCurrent().then((res) => {
            this.setState({ block: res });
        }, (error) => {
            console.log('error :>> ', error);
        });
    }

    createArweaveTransaction = async () => {
        let key = await this.state.arweave.wallets.generate();
        let data = fs.readFileSync('');
        // Plain text
        let transaction = await this.state.arweave.createTransaction({
            data: data
        }, key);

        transaction.addTag('myTagName', 'myTagContent');

        await this.state.arweave.transactions.sign(transaction, key);

        this.setState({ transaction });
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
                <h3>Current block:</h3>
                <Button variant="contained" onClick={this.createArweaveTransaction}>
                    Create a new transaction
                </Button>
                <p>Transaction:</p>
                <LongOutput value={JSON.stringify(this.state.transaction)} />
                <hr />
            </>
        );
    }
}

export default HelloArweave;