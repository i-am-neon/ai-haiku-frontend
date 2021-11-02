import React from 'react';
import logo from './logo.svg';
import './App.css';
import HelloArweave from './components/HelloArweave';
import ConnectWalletButton from './components/ConnectWalletButton';
import Web3Connection from './web3/Web3Connection';

function App() {
  return (
    <div className="App">
      {/* <ConnectWalletButton /> */}
      <Web3Connection />
      <HelloArweave />
    </div>
  );
}

export default App;
