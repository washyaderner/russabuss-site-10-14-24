"use client"

import React, { useState, useEffect, useRef } from 'react';
import { Play, Pause, SkipBack, SkipForward, Repeat, Shuffle, StopCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';

const tracks = [
  { id: 1, title: 'Beat 1', src: '/audio/beat1.mp3', art: '/images/album-art-1.jpg' },
  { id: 2, title: 'Beat 2', src: '/audio/beat2.mp3', art: '/images/album-art-2.jpg' },
  // Add more tracks as needed
];

const MusicPlayer = () => {
  const [currentTrack, setCurrentTrack] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [repeat, setRepeat] = useState('none'); // 'none', 'one', 'all'
  const [shuffle, setShuffle] = useState(false);

  const audioRef = useRef(new Audio(tracks[currentTrack].src));
  const animationRef = useRef();

  useEffect(() => {
    const audio = audioRef.current;

    const setAudioData = () => {
      setDuration(audio.duration);
      setCurrentTime(audio.currentTime);
    }

    const setAudioTime = () => {
      setCurrentTime(audio.currentTime);
    }

    // Add event listeners
    audio.addEventListener('loadeddata', setAudioData);
    audio.addEventListener('timeupdate', setAudioTime);

    // Start playing if isPlaying is true
    if (isPlaying) audio.play();

    // Cleanup function
    return () => {
      audio.removeEventListener('loadeddata', setAudioData);
      audio.removeEventListener('timeupdate', setAudioTime);
    }
  }, [isPlaying, currentTrack]);

  const handlePlayPause = () => {
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  const handleStop = () => {
    audioRef.current.pause();
    audioRef.current.currentTime = 0;
    setIsPlaying(false);
  };

  const handlePrevious = () => {
    setCurrentTrack(prev => (prev === 0 ? tracks.length - 1 : prev - 1));
    audioRef.current.src = tracks[currentTrack].src;
    if (isPlaying) audioRef.current.play();
  };

  const handleNext = () => {
    setCurrentTrack(prev => (prev === tracks.length - 1 ? 0 : prev + 1));
    audioRef.current.src = tracks[currentTrack].src;
    if (isPlaying) audioRef.current.play();
  };

  const handleRepeat = () => {
    setRepeat(prev => {
      switch(prev) {
        case 'none': return 'all';
        case 'all': return 'one';
        case 'one': return 'none';
        default: return 'none';
      }
    });
  };

  const handleShuffle = () => {
    setShuffle(prev => !prev);
  };

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  return (
    <div className="flex flex-col items-center">
      <div className="relative w-full max-w-[480px] aspect-video mb-4">
        <img 
          src={tracks[currentTrack].art} 
          alt="Album Art" 
          className="w-full h-full object-cover rounded-lg"
        />
        <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <h2 className="text-white text-2xl font-bold">{tracks[currentTrack].title}</h2>
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-purple-500 via-blue-500 to-teal-500 opacity-20 animate-pulse"></div>
      </div>
      <div className="w-full max-w-[480px]">
        <input 
          type="range" 
          value={currentTime}
          max={duration}
          onChange={(e) => {
            audioRef.current.currentTime = e.target.value;
          }}
          className="w-full"
        />
        <div className="flex justify-between text-sm">
          <span>{formatTime(currentTime)}</span>
          <span>{formatTime(duration)}</span>
        </div>
      </div>
      <div className="flex space-x-4 mt-4">
        <Button onClick={handleShuffle} variant="ghost">
          <Shuffle size={24} className={shuffle ? "text-primary" : ""} />
        </Button>
        <Button onClick={handlePrevious} variant="ghost">
          <SkipBack size={24} />
        </Button>
        <Button onClick={handlePlayPause} variant="ghost">
          {isPlaying ? <Pause size={24} /> : <Play size={24} />}
        </Button>
        <Button onClick={handleStop} variant="ghost">
          <StopCircle size={24} />
        </Button>
        <Button onClick={handleNext} variant="ghost">
          <SkipForward size={24} />
        </Button>
        <Button onClick={handleRepeat} variant="ghost">
          <Repeat size={24} className={repeat !== 'none' ? "text-primary" : ""} />
          {repeat === 'one' && <span className="absolute text-xs">1</span>}
        </Button>
      </div>
    </div>
  );
};

export default MusicPlayer;