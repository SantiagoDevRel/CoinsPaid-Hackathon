import React, {useEffect, useState} from 'react';
import Button from './button';
import Link from 'next/link';  // Import Link from Next.js
import Web3 from 'web3';

const decFormat = (number:string) => {
    return Number(number).toFixed(4);
}

const VerticalList = ({ items }) => {
    const endpoint=  "https://public.stackup.sh/api/v1/node/base-sepolia";
    const web3 = new Web3(endpoint);
    const [balance, setBalance] = useState("0"); // Initialize balance state
    const [balance2, setBalance2] = useState("0"); // Initialize balance state

    useEffect(() => {
        // Define an async function inside the effect to use await
        const fetchBalance = async () => {
            const bal = await web3.eth.getBalance("0x35E8E695AE06eFd6227bBEbC99856D292fE9Ef34");
            setBalance(decFormat(web3.utils.fromWei(bal, 'ether'))); // Convert balance to Ether from Wei
        };
        const fetchBalance2 = async () => {
            const bal = await web3.eth.getBalance("0x3a7C04Cfc376F0bb21466f5C594eeBd559705BaC");
            setBalance2(decFormat(web3.utils.fromWei(bal, 'ether'))); // Convert balance to Ether from Wei
        };
        fetchBalance();
        fetchBalance2();
    }, []); // Empty dependency array means this effect only runs once, similar to componentDidMount


    const handleClick = () => {
      };

  return (
    <div className="list-container">
        <div key={0} className="list-item">
                    <p>
                    Client 0 </p>
                    <p>
                    Balance : {balance}
                    </p>
                    {/* Wrap Button in Link */}
                    <Link href={`/address/0x35E8E695AE06eFd6227bBEbC99856D292fE9Ef34`} passHref>
                        <Button as="a" text="Receive funds" style={{ backgroundColor: 'purple', fontSize: '20px' }}/>
                    </Link>
                </div>
        <div key={1} className="list-item">
            <p>
            Client 1 </p>
            <p>
            Balance : {balance2}
            </p>
            {/* Wrap Button in Link */}
            <Link href={`/address/0x3a7C04Cfc376F0bb21466f5C594eeBd559705BaC`} passHref>
                <Button as="a" text="Receive funds" style={{ backgroundColor: 'purple', fontSize: '20px' }}/>
            </Link>
        </div>
      {items.map((item, index) => (
                <div key={index+2} className="list-item">
                    <p>
                    Client {index+2} </p>
                    <p>
                    Balance : 0
                    </p>
                    {/* Wrap Button in Link */}
                    <Link href={`/address/${item}`} passHref>
                        <Button as="a" text="Receive funds" style={{ backgroundColor: 'purple', fontSize: '20px' }}/>
                    </Link>
                </div>
            ))}
      <style jsx>{`
        
        .list-container {
            width: 100%;
            padding: 20px;
            background-color: #fff;  /* White background for the list */
            border: 1px solid #ccc;  /* Light grey border for the list */
            border-radius: 8px;
        }
        
        .list-item {
            display: flex;
            flex-direction: row;
            align-items: center;
            margin: 10px 0;
            color: #333;  /* Dark grey color for list items */
            font-size: 16px;
            justify-content: space-between;
        }
        .lst {
            display: flex;
            flex-direction: row;
            align-items: center;
        }
      `}</style>
    </div>
  );
};



export default VerticalList;