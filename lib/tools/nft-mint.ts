import {tool} from 'ai'

import { z } from 'zod';
export const nftTool=tool({
     description: 'can inteeract with the smart contract to create a nft',
       parameters :z.object({
  to: z.string().describe('the recipient address'),
  name: z.string().describe('name of the nft'),
  imageUrl: z.string().describe('image uri of the nft')
  
}),
  execute: async ({ to, name, imageUrl }) => {
    return{
        success: true,
        message: 'validate this transaction to create the nft',
        data: {
            to,
            name,
            imageUrl
        }
    }
  }
})



