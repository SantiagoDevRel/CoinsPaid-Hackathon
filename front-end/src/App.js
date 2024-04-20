import logo from "./logo.svg";
import "./App.css";
import { ConnectionCloseError, Web3 } from "web3";
import { useEffect, useState } from "react";

function App() {
  const [balanceAvailableToWithdraw, setBalanceAvailableToWithdraw] = useState("0x");
  const [balanceOfBizWallet, setBalanceOfBizWallet] = useState("0x");
  const [wallet, setWallet] = useState("0x");
  let web3, accounts, contract;

  //Connect metamask, request accounts and initialize contract
  async function connect() {
    web3 = new Web3(window.ethereum);
    accounts = await web3.eth.requestAccounts();
    //contract = new web3.eth.Contract(ABI, ADDRESS)
  }

  async function updateBalanceAvailableToWithdraw() {
    //run a for loop over the belonging addresses to this business with a `getBalance()`
    //so we can get the total balance belonging to this business
  }

  async function createAddress() {}

  async function withdraw() {}

  async function updateCurrentBalanceOnChain() {
    await connect();
    let balance = await web3.eth.getBalance(accounts[0]);
    balance = Number(web3.utils.fromWei(balance, "ether")).toFixed(3);
    setBalanceOfBizWallet(String(balance));
  }

  return (
    <div className="App">
      <header className="App-header">
        <button onClick={updateBalanceAvailableToWithdraw}>Update Balance Available to Withdraw</button>
        <button onClick={updateCurrentBalanceOnChain}>Update Balance Of Biz Wallet</button>
        <button onClick={withdraw}>Withdraw Funds</button>
        <button onClick={createAddress}>Generate new address</button>
        <button onClick={withdraw}>Withdraw Funds</button>
        <p>Balance available to withdraw: {balanceAvailableToWithdraw}</p>
        <p>Balance of business wallet: {balanceOfBizWallet}</p>
      </header>
    </div>
  );
}

export default App;
