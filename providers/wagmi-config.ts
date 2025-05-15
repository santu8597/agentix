'use client'

import { mainnet, baseSepolia, sepolia, polygon, optimism, arbitrum, base, } from 'wagmi/chains'
import { http, createConfig } from 'wagmi'
import { defineChain } from 'viem'


// export const educhain = defineChain({
//   id: 656476,
//   name: "Educhain",
//   network: "educhain",
//   nativeCurrency: {
//     decimals: 18,
//     name: "EduToken",
//     symbol: "EDU",
//   },
//   rpcUrls: {
//     default: {
//       http: ["https://rpc.open-campus-codex.gelato.digital/"],
//     },
//   },

//   blockExplorers: {
//     default: { name: "OpenCampusCodex", url: "https://opencampus-codex.blockscout.com/" },
//   },
//   testnet: true, // Set to false if it's a mainnet deployment
// });
export const config = createConfig({
  chains: [baseSepolia, mainnet, sepolia, polygon, optimism, arbitrum, base],
  transports: {
    [baseSepolia.id]: http(),
    [mainnet.id]: http(),
    [sepolia.id]: http(),
    [polygon.id]: http(),
    [arbitrum.id]: http(),
    [base.id]: http(),
    [optimism.id]: http(),
    
  },
  ssr: true,
});