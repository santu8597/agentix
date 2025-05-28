'use client';

import React from 'react';

interface VideoResult {
  query: string;
  video: {
    title: string;
    url: string;
  };
}

// Helper to check if it's a YouTube URL
const isYouTubeUrl = (url: string) => {
  return /^(https?:\/\/)?(www\.)?(youtube\.com|youtu\.be)\//.test(url);
};

// Extract YouTube video ID
const extractYouTubeId = (url: string) => {
  const regExp = /(?:youtube\.com\/(?:watch\?v=|embed\/)|youtu\.be\/)([\w-]{11})/;
  const match = url.match(regExp);
  return match ? match[1] : null;
};

const VideoResultCard: React.FC<{ result: VideoResult }> = ({ result }) => {
  const { query, video } = result;
  const isYouTube = isYouTubeUrl(video.url);
  const youTubeId = isYouTube ? extractYouTubeId(video.url) : null;

  return (
    <div className="max-w-md p-6 bg-white dark:bg-black rounded-2xl shadow-md border border-gray-200 dark:border-gray-700 my-2">
      <h2 className="text-lg font-semibold text-gray-800 dark:text-white mb-1">
        Search Query: <span className="text-blue-600">{query}</span>
      </h2>
      <div className="mt-2">
        <p className="text-gray-700 dark:text-white font-medium mb-2">🎬 {video?.title}</p>

        {isYouTube && youTubeId ? (
          <iframe
            className="w-full h-64 rounded-lg mt-2"
            src={`https://www.youtube.com/embed/${youTubeId}`}
            title={video.title}
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        ) : (
          <video
            className="w-full rounded-lg mt-2"
            controls
            preload="metadata"
          >
            <source src={video.url} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        )}
      </div>
    </div>
  );
};

export default VideoResultCard;
