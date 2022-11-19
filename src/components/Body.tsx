import React from 'react'
import '../styles/Body.css'

import { useWallet } from '@solana/wallet-adapter-react';

import ServiceContainer from './ServiceContainer';
import MovieReviewContainer from './MovieReviewContainer';
import MoviesContainer from './MoviesContainer';
import StudentIntroContainer from './StudentIntroContainer';
import StudentsContainer from './StudentsContainer';

function Body() {
  const { publicKey } = useWallet();

  return (
    <div>
      {publicKey ? 
        <div className='Body'>
          <ServiceContainer />
          <MovieReviewContainer />
          <MoviesContainer />
          <StudentIntroContainer />
          <StudentsContainer />
        </div> :
        <div className='BodyAdvice'>
          <h1>You must connect your wallet</h1>
        </div> 
      }
    </div>
  )
}

export default Body