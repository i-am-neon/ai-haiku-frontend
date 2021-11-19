import React, { Suspense, lazy } from 'react';
import './App.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Home from './components/Home';
import NavBar from './components/NavBar';
import TermsAndConditions from './components/TermsAndConditions';
import Paper from './components/Paper';
import Footer from './components/Footer';

const Web3Connection = lazy(() => import('./web3/Web3Connection'));

interface AppProps {
  
}
 
interface AppState {
  
}
 
export default class App extends React.Component<AppProps, AppState> {
  
  componentDidMount() {
    window.addEventListener('load', this.handleLoad);
  }

  handleLoad() {
    console.log('LOADED!');
    const loadingText = document.getElementById('loadingText');
    loadingText?.remove();
   }
  
  render() { 
    return (
      <div className="App">
        <BrowserRouter>
          <NavBar />
          <Suspense fallback={<div>Loading...</div>}>
            <Switch>
              <Route path='/mint' component={Web3Connection}></Route>
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
 
