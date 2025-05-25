import {tool} from 'ai'

import { z } from 'zod';
export const MoneySendTool=tool({
     description: 'can interact with the smart contract to send money to an address',
       parameters :z.object({
  to: z.string().describe('the recipient address'),
  amount: z.string().describe('amount of money to send')
  
}),
  execute: async ({ to, amount }) => {
    return{
        success: true,
        message: 'validate this transaction to send the money',
        data: {
            to,
            amount,
            
        }
    }
  }
})



