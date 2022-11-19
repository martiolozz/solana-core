import { useState } from 'react'
import { Movie } from '../models/Movie';
import '../styles/MovieReviewContainer.css'

import * as web3 from '@solana/web3.js'
import { useConnection, useWallet } from '@solana/wallet-adapter-react'

const MOVIE_REVIEW_PROGRAM_ID = 'CenYq6bDRB7p73EjsPEpiYN7uveyPUTdXkDkgUduboaN'

function MovieReviewContainer() {
  const [title, setTitle] = useState('')
  const [rating, setRating] = useState(0)
  const [message, setMessage] = useState('')

  const { connection } = useConnection();
	const { publicKey, sendTransaction } = useWallet();

  function handleTitle(event: any) {
    setTitle(event.target.value);
  }

  function handleRating(event: any) {
    setRating(event.target.value);
  }

  function handleMessage(event: any) {
    setMessage(event.target.value);
  }

  const handleSubmit = (event: any) => {
    event.preventDefault()
    console.log(title, rating, message);
    
    const movie = new Movie(title, rating, message)
    handleTransactionSubmit(movie)
  }

  const handleTransactionSubmit = async (movie: Movie) => {
    if (!publicKey) {
        alert('Please connect your wallet!')
        return
    }

    const buffer = movie.serialize()
    const transaction = new web3.Transaction()

    const [pda] = await web3.PublicKey.findProgramAddress(
        [publicKey.toBuffer(), new TextEncoder().encode(movie.title)],
        new web3.PublicKey(MOVIE_REVIEW_PROGRAM_ID)
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
        programId: new web3.PublicKey(MOVIE_REVIEW_PROGRAM_ID)
    })

    transaction.add(instruction)

    try {
        let txid = await sendTransaction(transaction, connection)
        console.log(`Transaction submitted: https://explorer.solana.com/tx/${txid}?cluster=devnet`)
    } catch (e) {
        alert(JSON.stringify(e))
    }
  }

  return (
    <div className='MovieReviewContainer'>
        <h2>Add a Movie Review</h2>
        <h3>Movie Title: </h3>
        <input className='Input' type="text" onChange={handleTitle}/>
        <h3>Add your review: </h3>
        <textarea className='ReviewInput' onChange={handleMessage}/>
        <h3>Rating: </h3>
        <input className='RatingInput' type="number" min="1" max="5" onChange={handleRating}/>
        <div className='BtnContainer'>
            <button className='SubmitReview' onClick={handleSubmit}>Submit Review</button>
        </div>
    </div>
  )
}

export default MovieReviewContainer