"use client"

import React, { useState, useEffect, useRef } from 'react';
import { Play, Pause, Download } from 'lucide-react';
import { Button } from '@/components/ui/button';

const RelaxationPlayer = ({ track }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);

  const audioRef = useRef(new Audio(track.src));
  const progressRef = useRef(null);

  useEffect(() => {
    const audio = audioRef.current;

    const setAudioData = () => {
      setDuration(audio.duration);
      setCurrentTime(audio.currentTime);
    }

    const setAudioTime = () => {
      setCurrentTime(audio.currentTime);
      drawWaveform();
    }

    audio.addEventListener('loadeddata', setAudioData);
    audio.addEventListener('timeupdate', setAudioTime);

    return () => {
      audio.removeEventListener('loadeddata', setAudioData);
      audio.removeEventListener('timeupdate', setAudioTime);
    }
  }, []);

  const drawWaveform = () => {
    if (!progressRef.current) return;

    const canvas = progressRef.current;
    const ctx = canvas.getContext('2d');
    const width = canvas.width;
    const height = canvas.height;
    const audioProgress = currentTime / duration;

    ctx.clearRect(0, 0, width, height);

    // Draw background waveform
    ctx.beginPath();
    ctx.moveTo(0, height / 2);
    for (let i = 0; i < width; i++) {
      const y = height / 2 + Math.sin(i * 0.1) * (height / 4);
      ctx.lineTo(i, y);
    }
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.2)';
    ctx.stroke();

    // Draw progress waveform
    ctx.beginPath();
    ctx.moveTo(0, height / 2);
    for (let i = 0; i < width * audioProgress; i++) {
      const y = height / 2 + Math.sin(i * 0.1) * (height / 4);
      ctx.lineTo(i, y);
    }
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.8)';
    ctx.stroke();
  }

  const handlePlayPause = () => {
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = track.src;
    link.download = `${track.title}.mp3`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">{track.title}</h2>
      <div className="flex items-center space-x-4">
        <Button onClick={handlePlayPause} variant="ghost" size="icon">
          {isPlaying ? <Pause className="h-6 w-6" /> : <Play className="h-6 w-6" />}
        </Button>
        <canvas
          ref={progressRef}
          className="flex-grow h-12 rounded-md"
          width={300}
          height={48}
        />
        <Button onClick={handleDownload} variant="ghost" size="icon">
          <Download className="h-6 w-6" />
        </Button>
      </div>
    </div>
  );
};

export default RelaxationPlayer;