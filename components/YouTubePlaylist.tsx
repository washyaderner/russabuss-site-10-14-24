"use client"

import { useState, useEffect } from 'react';

const YouTubePlaylist = () => {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) return null;

  return (
    <div className="max-w-[1280px] mx-auto">
      <div className="aspect-w-16 aspect-h-9">
        <iframe
          width="1280"
          height="720"
          src="https://www.youtube.com/embed/heoWhBBSfkI?si=ttxvDd0tqfKg9ec_"
          title="YouTube video player"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
          className="w-full h-full rounded-lg shadow-lg"
        ></iframe>
      </div>
    </div>
  );
};

export default YouTubePlaylist;