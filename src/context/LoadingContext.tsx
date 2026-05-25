"use client";

import React, { createContext, useContext, useState, useEffect, useRef } from "react";
import { useProgress } from "@react-three/drei";

interface LoadingContextType {
  isAssetsLoaded: boolean;
  isVideoFinished: boolean;
  isReady: boolean;
  setVideoFinished: (finished: boolean) => void;
  progress: number;
}

const LoadingContext = createContext<LoadingContextType | undefined>(undefined);

export function LoadingProvider({ children }: { children: React.ReactNode }) {
  const [isVideoFinished, setVideoFinished] = useState(() => {
    if (typeof window !== "undefined") {
      return sessionStorage.getItem("preloaderShown") === "true";
    }
    return false;
  });
  const { progress, active } = useProgress();
  const [isAssetsLoaded, setAssetsLoaded] = useState(false);

  // Once assets have loaded for the first time we latch this to true and
  // never reset it — this prevents subsequent lazy-loaded Three.js assets
  // (e.g. GLB models that mount as the user scrolls) from briefly setting
  // isAssetsLoaded back to false and re-showing the preloader.
  const hasEverLoaded = useRef(false);

  useEffect(() => {
    if (hasEverLoaded.current) {
      // Already loaded once – ignore any future useProgress fluctuations
      return;
    }

    if (progress === 100 || !active) {
      const timer = setTimeout(() => {
        hasEverLoaded.current = true;
        setAssetsLoaded(true);
      }, 500);
      return () => clearTimeout(timer);
    }
    // Only reset while we have never finished loading
    setAssetsLoaded(false);
  }, [progress, active]);

  const isReady = isAssetsLoaded && isVideoFinished;

  return (
    <LoadingContext.Provider
      value={{
        isAssetsLoaded,
        isVideoFinished,
        isReady,
        setVideoFinished,
        progress,
      }}
    >
      {children}
    </LoadingContext.Provider>
  );
}

export function useLoading() {
  const context = useContext(LoadingContext);
  if (context === undefined) {
    throw new Error("useLoading must be used within a LoadingProvider");
  }
  return context;
}
