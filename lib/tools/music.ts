// tools/music-mood.ts
import { tool } from 'ai';
import { z } from 'zod';
import { exec } from 'child_process';
import util from 'util';

const execAsync = util.promisify(exec);

export const musicMood = tool({
  
  description: 'Suggest a Spotify playlist based on a user’s mood. Optionally opens the Spotify app.',
  parameters: z.object({
    mood: z.string().describe("User's mood or activity like 'happy', 'sad', 'study', 'workout'"),
    openApp: z.boolean().optional().default(false),
  }),
  execute: async ({ mood, openApp }) => {
    const moodMap: Record<string, { name: string; link: string }> = {
      happy: { name: "Feel-Good Hits", link: "https://open.spotify.com/playlist/37i9dQZF1DXdPec7aLTmlC" },
      sad: { name: "Life Sucks", link: "https://open.spotify.com/playlist/37i9dQZF1DX3YSRoSdA634" },
      study: { name: "Lo-Fi Beats", link: "https://open.spotify.com/playlist/37i9dQZF1DX8Uebhn9wzrS" },
      chill: { name: "Chill Vibes", link: "https://open.spotify.com/playlist/37i9dQZF1DX4WYpdgoIcn6" },
      workout: { name: "Beast Mode", link: "https://open.spotify.com/playlist/37i9dQZF1DX76Wlfdnj7AP" },
      energetic: { name: "Power Workout", link: "https://open.spotify.com/playlist/37i9dQZF1DX70RN3TfWWJh" },
      love: { name: "Love Pop", link: "https://open.spotify.com/playlist/37i9dQZF1DWYmmr74INQlb" },
      angry: { name: "Rock Hard", link: "https://open.spotify.com/playlist/37i9dQZF1DWZQaaqNMbbXa" },
    };

    const key = Object.keys(moodMap).find(m => mood.toLowerCase().includes(m)) || 'chill';
    const selected = moodMap[key];

    let message = 'Playlist suggested successfully.';
    let status = 'success';

    if (openApp) {
      const command = `start ${selected.link}`; // Windows only
      try {
        await execAsync(command);
        message += ' Opened Spotify with the playlist.';
      } catch (err: any) {
        message += ' Failed to open Spotify.';
        status = 'partial';
      }
    }

    return {
      playlistName: selected.name,
      playlistLink: selected.link,
      moodCategory: key,
      status,
      message,
    };
  },
});
