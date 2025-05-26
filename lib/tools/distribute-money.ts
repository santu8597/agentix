import { tool } from 'ai';
import { z } from 'zod';

export const distributePaymentTool = tool({
  description: 'Takes an array of wallet addresses and distributes payment to each address.',
  parameters: z.object({
    addresses: z
      .array(z.string().describe('A wallet address'))
      .describe('An array of wallet addresses'),
    amount: z.string().describe('amount of money to send')
  }),
  execute: async ({ addresses,amount }) => {
    return {
        success: true,
        data: {
            addresses,
            amount
        }
    };
  }
});
