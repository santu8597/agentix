import { tool } from 'ai';
import { z } from 'zod';
import path from 'path';
import fs from 'fs';


function getFolderStructure(dirPath: string): any {
  const structure: any = {};
  const items = fs.readdirSync(dirPath, { withFileTypes: true });

  for (const item of items) {
    const fullPath = path.join(dirPath, item.name);
    if (item.isDirectory()) {
      structure[item.name] = getFolderStructure(fullPath);
    } else {
      if (!structure.files) structure.files = [];
      structure.files.push(item.name);
    }
  }

  return structure;
}

export const analyzeSrcStructureTool = tool({
  
  description: 'Analyzes the src folder of a Next.js project and returns folder/file structure',
  parameters: z.object({}),
  
  execute: async () => {
    const srcPath = path.join(process.cwd());
    const structure = getFolderStructure(srcPath);
    console.log('Folder structure:', JSON.stringify(structure, null, 2));
    return {structure: structure};
  },
});
