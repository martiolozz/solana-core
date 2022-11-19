import { useMemo, useState } from 'react';
import { ConnectionProvider, WalletProvider } from '@solana/wallet-adapter-react';
import { WalletAdapterNetwork } from '@solana/wallet-adapter-base';
import { WalletModalProvider } from '@solana/wallet-adapter-react-ui';
import {
  SolflareWalletAdapter,
  PhantomWalletAdapter
} from "@solana/wallet-adapter-wallets";

import { clusterApiUrl } from '@solana/web3.js';

import Header from './components/Header'
import Body from './components/Body';


// Default styles that can be overridden by your app
require('@solana/wallet-adapter-react-ui/styles.css');
// import './App.css';

function App() {

  // The network can be set to 'devnet', 'testnet', or 'mainnet-beta'.
  const network = WalletAdapterNetwork.Devnet;

  // You can also provide a custom RPC endpoint.
  const endpoint = useMemo(() => clusterApiUrl(network), [network]);

  const wallets = useMemo(
      () => [
        new PhantomWalletAdapter(),
        new SolflareWalletAdapter()
      ],
      // eslint-disable-next-line react-hooks/exhaustive-deps
      [network]
  );

  return (
      <ConnectionProvider endpoint={endpoint}>
          <WalletProvider wallets={wallets} autoConnect>
              <WalletModalProvider>
                  <Header />
                  <Body />
              </WalletModalProvider>
          </WalletProvider>
      </ConnectionProvider>
  );
}

export default App;
