import React, {useState} from 'react';
import { useRouter } from 'next/router';
import Button from '../../components/button'
import styles from "../../app/page.module.css";
import Web3 from "web3"

declare global {
  interface Window {
    ethereum?: any;
    web3?: any;
  }
}

const AddressPage = () => {
  let web3: Web3;
// Check if Metamask is installed
  if (typeof window!== 'undefined' && window && typeof window?.ethereum !== 'undefined') {
    // Use MetaMask's provider
    window.web3 = new Web3(window.ethereum);
    web3 = window.web3
    // Request account access if needed
    window.ethereum.enable().then(function (accounts) {
      console.log('Metamask connected:', accounts[0]);
      setAccounts(accounts);
    }).catch(function (error) {
      console.error('Error connecting to Metamask:', error);
    });
    } else {
      console.error('Please install Metamask to use this application.');
  }


  const router = useRouter();
  const { id } = router.query;  // Get the id from the query params


  const [accounts, setAccounts] = useState([]);
  const [number, setNumber] = useState(0);  // Initialize state to hold a number

  const handleChange = (event) => {
    const newValue = event.target.value;
        setNumber(newValue === '' ? '' : Number(newValue));
  };
  const sendTransaction = async () => {
    console.log('Sending funds to business #1');
    console.log('Amount:', number);

    let maxFeePerGas = Number((await web3.eth.getBlock()).baseFeePerGas)*2;
    
    // sign transaction off chain

    // const transaction = {
    //   from: accounts[0] as string,
    //   to:id as string,
    //   value: number,
    //   maxFeePerGas,
    //   maxPriorityFeePerGas: 10,
    //   gasLimit: 21000,
    //   nonce: await web3.eth.getTransactionCount(accounts[0] as string, 'latest'),
    // }
    const block = await web3.eth.getBlock();
    maxFeePerGas = Number(block.baseFeePerGas)*2
    const transaction = {
      from: accounts[0] as string,
      to:id as string,
      value: "0x1",
      maxFeePerGas , //updated depending on the network
      maxPriorityFeePerGas: 100000, //high
    }
    await web3.eth.sendTransaction(transaction);
    // const signedTransaction = await web3.eth.signTransaction(transaction);
    // console.log(signedTransaction)
  }

  return (
    <main >
      <div className={styles.description}>

        <h1>Client #1 Details</h1>
        {/* <p>Address:  {accounts}</p> */}
        <h2>Address to send funds to business #1: {id}</h2>  {/* Display the address */}
        
      </div>

      {/* <Button 
            text="Send funds" 
            onClick={sendTransaction}
            style={{ backgroundColor: 'purple', fontSize: '20px' }}
          /> */}
    </main>
  );
};



// {/* <div style={{ margin: '20px' }}>
// <label htmlFor="numberInput" style={{ marginRight: '10px' }}>Amount of eth to send:</label>
// <input
//     type="number"
//     id="numberInput"
//     value={number}
//     onChange={handleChange}
//     style={{
//         padding: '10px',
//         border: '2px solid #0070f3',
//         borderRadius: '5px',
//         width: '200px'
//     }}
//     placeholder='0.00'
// />
// <p>Eth to send: {number}</p>  {/* Display the current state */}
// </div> */}

export default AddressPage;