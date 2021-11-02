import React, { Suspense, lazy } from 'react';
import './App.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Home from './components/Home';

const Web3Connection = lazy(() => import('./web3/Web3Connection'));

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Suspense fallback={<div>Loading...</div>}>
          <Switch>
            <Route path='/mint' component={Web3Connection}></Route>
            <Route path='/' component={Home}></Route>
          </Switch>
        </Suspense>
      </BrowserRouter>
    </div>
  );
}

export default App;
