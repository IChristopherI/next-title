'use client';

import { useEffect, useRef } from "react";
import Hls from "hls.js";

type Props = {
  src: string;
  animeId: string;
  episode: string;
  title: string;
  poster: string;
};


export default function VideoPlayer({ src, animeId, episode, title, poster }: Props) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const storageKey = `watch-progress:${animeId}:${episode}`;

  useEffect(() => {
    const video = videoRef.current;
    if (!video || !src) return;

    if (Hls.isSupported()) {
      const hls = new Hls();

      hls.loadSource(src);
      hls.attachMedia(video);

      return () => {
        hls.destroy();
      };
    }

    video.src = src;
  }, [src]);

 function saveProgress() {
  const video = videoRef.current;
  if (!video) return;

  const newItem = {
    animeId,
    episode,
    title,
    poster,
    time: video.currentTime,
    duration: video.duration,
    updatedAt: Date.now(),
  };

  const saved = localStorage.getItem("continue-watching");
  const oldItems = saved ? JSON.parse(saved) : [];

  
  const withoutCurrent = oldItems.filter((item: Props) => {
    return item.animeId !== newItem.animeId;
  });
  


  const updatedItems = [newItem, ...withoutCurrent].slice(0, 10);

  localStorage.setItem("continue-watching", JSON.stringify(updatedItems));
}

  function loadProgress() {
    const video = videoRef.current;
    if (!video) return;

    const saved = localStorage.getItem(storageKey);
    if (!saved) return;

    const progress = JSON.parse(saved);

    if (progress.time > 5) {
      video.currentTime = progress.time;
    }
  }

  return (
      <video
          width="80%"
          ref={videoRef}
          controls
          onLoadedMetadata={loadProgress}
          onTimeUpdate={saveProgress}
          onPause={saveProgress}
      />
  );
}