import React, { Suspense, lazy } from 'react';
import './App.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Home from './components/Home';
import NavBar from './components/NavBar';
import TermsAndConditions from './components/TermsAndConditions';
import Paper from './components/Paper';
import Footer from './components/Footer';
import { isMobile, isSafari, isFirefox } from 'react-device-detect';
import { PUBLIC_MINT_TIMESTAMP_MS } from './utils/envVariables';
import MintCountdown from './components/MintCountdown';
import MintClosed from './components/MintClosed';

const Web3Connection = lazy(() => import('./web3/Web3Connection'));

interface AppProps {

}

interface AppState {

}

export default class App extends React.Component<AppProps, AppState> {

  componentDidMount() {
    if (isMobile || isSafari || isFirefox) {
      const loadingText = document.getElementById('loadingText');
      loadingText?.remove();
    } else {
      window.addEventListener('load', this.handleLoad);
    }
  }

  componentWillUnmount() {
    window.removeEventListener('load', this.handleLoad);
  }

  handleLoad() {
    const loadingText = document.getElementById('loadingText');
    loadingText?.remove();
  }

  isMintReady(): boolean {
    // return Date.now() >= PUBLIC_MINT_TIMESTAMP_MS;
    // Minting is now closed.
    return false;
  }

  render() {
    return (
      <div className="App">
        <BrowserRouter>
          <NavBar />
          <Suspense fallback={<></>}>
            <Switch>
              {/* <Route path='/mint' component={this.isMintReady() ? Web3Connection : MintCountdown}></Route> */}
              <Route path='/mint' component={this.isMintReady() ? Web3Connection : MintClosed}></Route>
              <Route path='/terms' component={TermsAndConditions}></Route>
              <Route path='/paper' component={Paper}></Route>
              <Route path='/' component={Home}></Route>
            </Switch>
          </Suspense>
          <Footer />
        </BrowserRouter>
      </div>
    );
  }
}

