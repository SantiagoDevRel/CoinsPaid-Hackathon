"use client"
import React, { useState, useEffect, use } from 'react';
import Image from "next/image";
import styles from "./page.module.css";
import Web3 from "web3";
import Button  from '../components/button';
import List from '../components/list';


const decFormat = (number:string) => {
  return Number(number).toFixed(4);
}

const web3 = new Web3("https://public.stackup.sh/api/v1/node/base-sepolia");

// const vaultContract = new web3.eth.Contract(vaultAbi, "0x48c6AA82817D75bE270A353A3D3260C933a3943a");
// const owner = await vaultContract.methods.owner().call();
// console.log("owner: ", owner)
interface Account {
  address: string;
  privateKey: string;  // Defined as string, assuming it will always be provided
}

export default function Home() {
  // states
  const [accounts, setAccounts] = useState<Account[]>([]);
  const [addressList, setList] = useState([]);
  const [balance, setBalance] = useState("0"); // Initialize balance state
  const [businessBalance, setBusinessBalance] = useState("0"); // Initialize balance state
  useEffect(() => {
    // Define an async function inside the effect to use await
    // const pk = process.env.testPK1 as string;
    const fetchAccounts = async () => {
      setAccounts([
        {
            address: "0x35E8E695AE06eFd6227bBEbC99856D292fE9Ef34",
            privateKey:  process.env.testPK1 as string
        },
        {
            address: "0x3a7C04Cfc376F0bb21466f5C594eeBd559705BaC",
            privateKey: process.env.testPK2 as string
        }
    ]);
    }
    fetchAccounts();
    
  }, []); // Empty dependency array means this effect only runs once, similar to componentDidMount


  useEffect(() => {
    const businessBalance = async () => {
      const bal = await web3.eth.getBalance("0xfdee38d8ca7a578437A4f183a90959EE6f85F214");
      setBusinessBalance(decFormat(web3.utils.fromWei(bal, 'ether'))); // Convert balance to Ether from Wei
    }
    businessBalance();

    const fetchBalance = async () => {
      let sum = 0;

      // Map each account to a promise to get its balance
      const balancePromises = accounts.map(account => {
        return web3.eth.getBalance(account.address);
      });

      // Wait for all balance promises to resolve
      const balances = await Promise.all(balancePromises);

      // Calculate the total sum
      balances.forEach(bal => {
        sum += Number(bal);
      });

      // Update the state with the total balance converted from Wei to Ether
      setBalance(decFormat(web3.utils.fromWei(sum.toString(), 'ether')));
    };
    fetchBalance();
  })

  const handleClick = () => {
    const account = web3.eth.accounts.create();
    console.log(account)
    setList(prev => [...prev, account.address]);
  };

  const withdrawClick = async () => {
    // for loop through accounts and sign transactions off chain to send to business address
    accounts.forEach(async (account) => {
      console.log(account)
      console.log('Sending funds to business #1');
      let maxFeePerGas = Number((await web3.eth.getBlock()).baseFeePerGas)*2;
      const feeData = await web3.eth.calculateFeeData()
      console.log("fee ",feeData);
      const nonce =  await web3.eth.getTransactionCount(account.address) //optional - get the current nonce of the account 
      // console.log(maxFeePerGas)
      const value = await web3.eth.getBalance(account.address)- BigInt(maxFeePerGas)- BigInt(10000000000000);
      const transaction = {
        from: account.address,
        value, 
        to: "0xfdee38d8ca7a578437A4f183a90959EE6f85F214",
        maxFeePerGas: feeData.maxFeePerGas , //updated depending on the network
        maxPriorityFeePerGas: feeData.maxPriorityFeePerGas, //high,
        nonce,
        gasLimit: 2000000
      }
      const signedTransaction = await web3.eth.accounts.signTransaction(transaction, account.privateKey);
      const s = await web3.eth.sendSignedTransaction(signedTransaction.rawTransaction);
      console.log(s)
      // console.log(a)
      // await web3.eth.sendTransaction(transaction);
    });

  }
  return (
    <main className={styles.main}>
      <div className={styles.description}>
        <p>
          CoinsPaid business Address: 0xfdee38d8ca7a578437A4f183a90959EE6f85F214 
        </p>
        <p> Eth: {businessBalance}</p>
        <div>
          
        </div>
      </div>

      <div className={styles.center}>
      <div className={styles.header}>
          <h2>Create a new Client address</h2>
          <Button 
            text="Generate address" 
            onClick={handleClick}
            style={{ backgroundColor: 'purple', fontSize: '20px' }}
          />
      </div>
      <List items={addressList}/>
        <div className={styles.header}>
          <h2> Total balance</h2>
          <p> {balance} </p>
          <Button 
              text="Withdraw funds" 
              onClick={withdrawClick}
              style={{ backgroundColor: 'purple', fontSize: '20px' }}
            />
          </div>
      </div>

      <div className={styles.grid}>
      </div>
    </main>
  );
}
