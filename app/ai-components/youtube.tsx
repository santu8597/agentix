import React from 'react';

interface VideoResult {
  query: string;
  video: {
    title: string;
    url: string;
  };
}

const VideoResultCard: React.FC<{ result: VideoResult }> = ({ result }) => {
  const { query, video } = result;

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-2xl shadow-md border border-gray-200">
      <h2 className="text-lg font-semibold text-gray-800 mb-1">Search Query: <span className="text-blue-600">{query}</span></h2>
      <div className="mt-2">
        <p className="text-gray-700 font-medium mb-2">🎬 {video.title}</p>
        <a
          href={video.url}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block mt-2 px-4 py-2 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700 transition"
        >
          Watch on YouTube
        </a>
      </div>
    </div>
  );
};

export default VideoResultCard;
