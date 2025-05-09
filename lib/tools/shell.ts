// tools/shell-tool.ts
import { tool } from 'ai';
import { z } from 'zod';
import { exec } from 'node:child_process';
import { promisify } from 'node:util';

const execAsync = promisify(exec);

export const executeShell = tool({
  
  description: 'Execute a shell command and return its output',
  parameters: z.object({
    command: z.string().describe('Shell command to execute'),
  }),
  execute: async ({ command }) => {
    try {
      const { stdout, stderr } = await execAsync(command, { timeout: 10000 });

      return {
        success: true,
        output: stdout || stderr || 'Command executed with no output.',
      };
    } catch (error: any) {
      return {
        success: false,
        output: error.message || 'Failed to execute command.',
      };
    }
  },
});
