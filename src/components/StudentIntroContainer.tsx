import { useState } from 'react'
import { Student } from '../models/Student'
import '../styles/StudentIntroContainer.css'

import * as web3 from '@solana/web3.js'
import { useConnection, useWallet } from '@solana/wallet-adapter-react'

const STUDENT_INTRO_PROGRAM_ID = 'HdE95RSVsdb315jfJtaykXhXY478h53X6okDupVfY9yf'

function StudentIntroContainer() {

    const [ name, setName ] = useState("")
    const [ message, setMessage ] = useState("")

    const { connection } = useConnection();
    const { publicKey, sendTransaction } = useWallet();

    function handleName(event: any) {
        setName(event.target.value);
    }

    function handleMessage(event: any) {
        setMessage(event.target.value);
    }

    const handleSubmit = (event: any) => {
        event.preventDefault()
        console.log(name, message);
        
        const student = new Student(name, message)
        handleTransactionSubmit(student)
    }

    const handleTransactionSubmit = async (student: Student) => {
        if (!publicKey) {
            alert('Please connect your wallet!')
            return
        }
    
        const buffer = student.serialize()
        const transaction = new web3.Transaction()
    
        const [pda] = await web3.PublicKey.findProgramAddress(
            [publicKey.toBuffer()],
            new web3.PublicKey(STUDENT_INTRO_PROGRAM_ID)
        )
    
        console.log(pda.toBase58());
        
    
        const instruction = new web3.TransactionInstruction({
            keys: [
                {
                    // Your account will pay the fees, so it's writing to the network
                    pubkey: publicKey,
                    isSigner: true,
                    isWritable: false,
                },
                {
                    // The PDA will store the movie review 
                    pubkey: pda,
                    isSigner: false,
                    isWritable: true
                },
                {
                    // The system program will be used for creating the PDA
                    pubkey: web3.SystemProgram.programId,
                    isSigner: false,
                    isWritable: false
                }
            ],
            // Here's the most important part!
            data: buffer,
            programId: new web3.PublicKey(STUDENT_INTRO_PROGRAM_ID)
        })
    
        transaction.add(instruction)
    
        try {
            let txid = await sendTransaction(transaction, connection)
            alert(`Transaction submitted: https://explorer.solana.com/tx/${txid}?cluster=devnet`)
            console.log(`Transaction submitted: https://explorer.solana.com/tx/${txid}?cluster=devnet`)
        } catch (e) {
            console.log(JSON.stringify(e))
            alert(JSON.stringify(e))
        }
      }

  return (
    <div className='StudentIntroContainer'>
        <h2>Introduce yourself to Builspace fam</h2>
        <h3>What's your name:</h3>
        <input className='Input' type="text" onChange={handleName}/>
        <h3>Describe yourself:</h3>
        <textarea className='ReviewInput' onChange={handleMessage}/>
        <div className='BtnContainer'>
            <button className='SubmitReview' onClick={handleSubmit}>Submit</button>
        </div>
    </div>
  )
}

export default StudentIntroContainer