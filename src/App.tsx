import React from 'react';
import './App.css';
import { SendUSDC } from './components/GetUSDC';
import { AccountCreator } from './components/PrivateKeyCreator';
import { SendMoney } from './components/SendMoney';

function App() {
  return (
    <div className="App">
      <header className="App-header">
       <AccountCreator/>
      <SendUSDC />
      <SendMoney />
      </header>
    </div>
  );
}

export default App;
