import { useCallback, useEffect, useState } from 'react'
import '../styles/ServiceContainer.css'

import { WalletNotConnectedError } from '@solana/wallet-adapter-base';
import { useConnection, useWallet } from '@solana/wallet-adapter-react';
import { Keypair, LAMPORTS_PER_SOL, SystemProgram, Transaction, PublicKey } from '@solana/web3.js';

function ServiceContainer() {

    const [amount, setAmount] = useState(0);
    const [toAddress, setToAddress] = useState("");

    const { connection } = useConnection();
    const { publicKey, sendTransaction } = useWallet();

    function handleAmount(event: any) {
        setAmount(event.target.value);
        console.log(event.target.value);
    }

    function handleAddress(event: any) {
        setToAddress(event.target.value)
        console.log(toAddress);
    }

    async function onClick(amount: number, toAddress: string) {
        if (!publicKey) throw new WalletNotConnectedError();
        
        try {
            const lamports = amount * LAMPORTS_PER_SOL;
    
            const transaction = new Transaction().add(
                SystemProgram.transfer({
                    fromPubkey: publicKey,
                    toPubkey: new PublicKey(toAddress),
                    lamports,
                })
            );
    
            const {
                context: { slot: minContextSlot },
                value: { blockhash, lastValidBlockHeight }
            } = await connection.getLatestBlockhashAndContext();
    
            const signature = await sendTransaction(transaction, connection, { minContextSlot });
    
            await connection.confirmTransaction({ blockhash, lastValidBlockHeight, signature });
        } catch (error) {
            alert(error);
        }
    }

  return (
    <div className='ServiceContainer'>
        <h2>Send SOL to another Account</h2>
        <h3>Amount in SOL to send: </h3>
        <input className='AmountInput' type="number" min="0" step="0.1" onChange={handleAmount} />
        <h3>Send SOL to: </h3>
        <input className='Input' type="text" onChange={handleAddress} />
        <div className='BtnContainer'>
            <button className='SendSolBtn' onClick={() => onClick(amount, toAddress)}>Send SOL</button>
        </div>
    </div>
  )
}

export default ServiceContainer