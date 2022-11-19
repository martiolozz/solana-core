import React from 'react'
import '../styles/Header.css'
import {
    WalletMultiButton
} from '@solana/wallet-adapter-react-ui';

import { useWallet } from '@solana/wallet-adapter-react';

function Header(props: any) {

  const { publicKey } = useWallet();

  return (
    <div>
      {publicKey ? 
        <div className='Header'>
          <WalletMultiButton className='WalletBtn'/>
        </div>:
        <div className='HeaderAdvice'>
          <WalletMultiButton className='WalletBtn'/>
        </div> 
      }
    </div>
    
  )
}

export default Header