import React, { useState } from 'react';
import ReactDOM from "react-dom";
import Countdown from "react-countdown";
import { WHITELIST_MINT_TIMESTAMP_MS, PUBLIC_MINT_TIMESTAMP_MS } from '../utils/envVariables';
import Web3Connection from '../web3/Web3Connection';

export function WhitelistMintCountdown() {
    const WhitelistMintReadyMessage = () => <span>The whitelist mint is live!</span>;

    const whitelistMintRenderer = ({ hours, minutes, seconds, completed }) => {
        if (completed) {
            return <WhitelistMintReadyMessage />;
        } else {
            return (
                <>
                    <p>The mint for <b>white-listed</b> individuals begins in:</p>
                    <span>
                        {hours} hours, {minutes} minutes, and {seconds} seconds
                    </span>
                </>
            );
        }
    };

    return (
        <Countdown date={WHITELIST_MINT_TIMESTAMP_MS} renderer={whitelistMintRenderer} />
    );
}

export function PublicMintCountdown() {
    const PublicMintReadyMessage = () => <span>The public mint is live! Please connect your wallet.</span>;

    const publicMintRenderer = ({ hours, minutes, seconds, completed }) => {
        if (completed) {
            return <PublicMintReadyMessage />;
        } else {
            return (
                <>
                    <p>The <b>public mint</b> begins in:</p>
                    <span>
                        {hours} hours, {minutes} minutes, and {seconds} seconds
                    </span>
                </>
            );
        }
    };

    return (
        <Countdown date={PUBLIC_MINT_TIMESTAMP_MS} renderer={publicMintRenderer} />
    );
}

export default function MintCountdown() {
    const [showWalletConnect, setShowWalletConnect] = useState(false);

    return (
        <>
            {!showWalletConnect ? (
                <>
                    <h2>You're Early!</h2>
                    {Date.now() >= WHITELIST_MINT_TIMESTAMP_MS ? (<span>The whitelist mint is live!</span>)
                        : <WhitelistMintCountdown />
                    }
                    <p><a onClick={() => setShowWalletConnect(true)}>Check if I'm on the whitelist</a></p>
                    <PublicMintCountdown />
                </>
            ) : <Web3Connection />}
        </>
    );
}