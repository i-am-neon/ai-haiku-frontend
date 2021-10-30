import * as React from 'react';
import Arweave from 'arweave';
import { BlockData } from 'arweave/node/blocks';
import { Button } from '@mui/material';
import TextField from '@mui/material/TextField';
import Transaction from 'arweave/node/lib/transaction';

import dogePicture from '../assets/doge.jpg';
import { TransactionStatusResponse } from 'arweave/node/transactions';

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
    transactionStatus: TransactionStatusResponse | null
}

class HelloArweave extends React.Component<HelloArweaveProps, HelloArweaveState> {
    constructor(props: HelloArweaveProps) {
        super(props);
        this.state = {
            arweave: Arweave.init({ host: 'arweave.net' }),
            block: null,
            transaction: null,
            transactionStatus: null
        }
    }

    componentDidMount() {
        // const apiUrl = 'http://localhost:6060/arweave';
        const apiUrl = 'https://eth-arweave-base-generator.herokuapp.com/arweave';
        const formData = new FormData();
        formData.append('data', 'hi from react ✌🏻');
        const data = {
            "data": "hi from react ✌🏻"
        }
        fetch(apiUrl, {
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
            .then((response) => response.json())
            .then((data) => console.log('This is your data', data));
    }

    getCurrentArweaveBlock = async () => {
        this.state.arweave.blocks.getCurrent().then((res) => {
            this.setState({ block: res });
        }, (error) => {
            console.log('error :>> ', error);
        });
    }

    createArweaveTransaction = async () => {
        const arweave = this.state.arweave;
        let key = await arweave.wallets.generate();

        let transaction = await arweave.createTransaction({ data: dogePicture }, key);
        transaction.addTag('Content-Type', 'application/jpg');

        await arweave.transactions.sign(transaction, key);

        let uploader = await arweave.transactions.getUploader(transaction);

        while (!uploader.isComplete) {
            await uploader.uploadChunk();
            console.log(`${uploader.pctComplete}% complete, ${uploader.uploadedChunks}/${uploader.totalChunks}`);
        }

        this.setState({ transaction });
    }

    getTransactionStatus = async (txnId: string | undefined) => {
        if (!txnId) {
            return;
        }

        const status = await this.state.arweave.transactions.getStatus(txnId);

        this.setState({ transactionStatus: status });
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
                <h3>Transaction:</h3>
                <Button variant="contained" onClick={this.createArweaveTransaction}>
                    Create a new transaction
                </Button>
                <p>Transaction:</p>
                <LongOutput value={JSON.stringify(this.state.transaction)} />
                <Button variant="contained" onClick={() => this.getTransactionStatus(this.state.transaction?.id)}>
                    Get the status of that transaction
                </Button>
                <p>Transaction:</p>
                <LongOutput value={JSON.stringify(this.state.transactionStatus)} />
                <hr />
            </>
        );
    }
}

export default HelloArweave;