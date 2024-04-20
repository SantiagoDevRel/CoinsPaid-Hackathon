import logo from "./logo.svg";
import "./App.css";
import { ConnectionCloseError, Web3 } from "web3";
import { useEffect, useState } from "react";

function App() {
  const [balanceAvailableToWithdraw, setBalanceAvailableToWithdraw] = useState("0x");
  const [balanceOfBizWallet, setBalanceOfBizWallet] = useState("0x");
  const [clientAddresses, setClientAddresses] = useState([]);
  const [wallet, setWallet] = useState("0x");
  let web3, accounts, contract;

  //Connect metamask, request accounts and initialize contract
  async function connect() {
    web3 = new Web3(window.ethereum);
    accounts = await web3.eth.requestAccounts();

    //TODO
    //initialize contract
    //contract = new web3.eth.Contract(ABI, ADDRESS)
  }

  async function updateBalanceAvailableToWithdraw() {
    await connect();
    //TODO
    //run a for loop over the belonging addresses to this business with a `getBalance()`
    //so we can get the total balance belonging to this business
    let balanceAvailable = 0;
    for (let i = 0; i < clientAddresses.length; i++) {
      const balance = Number(await web3.eth.getBalance(clientAddresses[i]));
      balanceAvailable = balance + balanceAvailable;
    }
    setBalanceAvailableToWithdraw(String(balanceAvailable));
  }

  async function createAddress() {
    await connect();
    const newAccount = web3.eth.accounts.create();
    //TODO
    //somehow store the PK of this accounts in the plugin or somewhere
    //so coinspaid is able to manage this accounts
    setClientAddresses((prevAddresses) => [...prevAddresses, newAccount.address]);
    console.log(clientAddresses);
  }

  async function withdraw() {
    //TODO
    //send funds from the client addresses to the business
  }

  async function updateCurrentBalanceOnChain() {
    await connect();
    let balance = await web3.eth.getBalance(accounts[0]);
    balance = Number(web3.utils.fromWei(balance, "ether")).toFixed(3);
    setBalanceOfBizWallet(String(balance));
  }

  return (
    <div className="App">
      <header className="App-header">
        <button className="button" onClick={updateBalanceAvailableToWithdraw}>
          Update Balance Available to Withdraw
        </button>
        <button className="button" onClick={updateCurrentBalanceOnChain}>
          Update Balance Of Biz Wallet
        </button>
        <button className="button" onClick={withdraw}>
          Withdraw Funds
        </button>
        <p className="balance-info">Balance available to withdraw: {balanceAvailableToWithdraw}</p>
        <p className="balance-info">Balance of business wallet: {balanceOfBizWallet}</p>
        <button className="button" onClick={createAddress}>
          Generate new address
        </button>
        <ul className="address-list">
          {clientAddresses.map((address, index) => (
            <li key={index}>{address}</li>
          ))}
        </ul>
      </header>
    </div>
  );
}

export default App;
