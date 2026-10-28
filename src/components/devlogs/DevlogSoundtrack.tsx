"use client";

import { useState, useEffect, useRef } from "react";
import { Play, Pause, Volume2, VolumeX, Music, Disc, Tv, Loader2 } from "lucide-react";

declare global {
  interface Window {
    onYouTubeIframeAPIReady?: () => void;
    YT?: any;
  }
}

export function extractYouTubeId(url?: string | null): string | null {
  if (!url) return null;
  const trimmed = url.trim();
  if (/^[a-zA-Z0-9_-]{11}$/.test(trimmed)) {
    return trimmed;
  }
  const regExp = /(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=|shorts\/))([\w-]{11})/;
  const match = trimmed.match(regExp);
  return match ? match[1] : null;
}

interface DevlogSoundtrackProps {
  soundtrackUrl?: string;
  soundtrackTitle?: string;
}

export function DevlogSoundtrack({ soundtrackUrl, soundtrackTitle }: DevlogSoundtrackProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [isReady, setIsReady] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isVideoVisible, setIsVideoVisible] = useState(false);

  const playerRef = useRef<any>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const pendingPlayRef = useRef(false);

  const videoId = extractYouTubeId(soundtrackUrl);
  const displayTitle = soundtrackTitle?.trim() || "Soundtrack for this reading";

  useEffect(() => {
    if (!videoId) return;

    let isMounted = true;

    const loadPlayer = () => {
      if (!isMounted || !containerRef.current || !window.YT || !window.YT.Player) return;
      if (playerRef.current) return;

      try {
        playerRef.current = new window.YT.Player(containerRef.current, {
          videoId,
          playerVars: {
            autoplay: 0,
            controls: 1,
            disablekb: 1,
            fs: 0,
            loop: 1,
            playlist: videoId,
            playsinline: 1, // Crucial for iOS: prevents full-screen takeover and enables inline audio
            rel: 0,
            modestbranding: 1,
            origin: typeof window !== "undefined" ? window.location.origin : undefined,
          },
          events: {
            onReady: () => {
              if (!isMounted) return;
              setIsReady(true);
              if (pendingPlayRef.current) {
                pendingPlayRef.current = false;
                try {
                  playerRef.current?.playVideo();
                } catch (e) {
                  console.error("Playback start error:", e);
                }
              }
            },
            onStateChange: (event: any) => {
              if (!isMounted) return;
              // 1 = PLAYING, 2 = PAUSED, 0 = ENDED, 3 = BUFFERING
              if (event.data === 1) {
                setIsPlaying(true);
                setIsLoading(false);
              } else if (event.data === 2 || event.data === 0) {
                setIsPlaying(false);
                setIsLoading(false);
              } else if (event.data === 3) {
                setIsLoading(true);
              }
            },
            onError: (err: any) => {
              console.warn("YouTube player error:", err);
              if (!isMounted) return;
              setIsLoading(false);
              setIsPlaying(false);
            },
          },
        });
      } catch (err) {
        console.error("Failed to initialize YT Player:", err);
      }
    };

    // Load YouTube Iframe API if not already loaded
    if (!window.YT) {
      const existingScript = document.getElementById("yt-iframe-api-script");
      if (!existingScript) {
        const tag = document.createElement("script");
        tag.id = "yt-iframe-api-script";
        tag.src = "https://www.youtube.com/iframe_api";
        document.body.appendChild(tag);
      }

      const prevCallback = window.onYouTubeIframeAPIReady;
      window.onYouTubeIframeAPIReady = () => {
        if (prevCallback) prevCallback();
        loadPlayer();
      };
    } else if (window.YT.Player) {
      loadPlayer();
    }

    return () => {
      isMounted = false;
      if (playerRef.current) {
        try {
          playerRef.current.destroy();
        } catch (e) {}
        playerRef.current = null;
      }
    };
  }, [videoId]);

  if (!videoId) return null;

  const handleTogglePlay = () => {
    if (!playerRef.current || !isReady) {
      pendingPlayRef.current = !isPlaying;
      setIsLoading(true);
      return;
    }

    try {
      if (isPlaying) {
        playerRef.current.pauseVideo();
        setIsPlaying(false);
      } else {
        setIsLoading(true);
        playerRef.current.playVideo();
      }
    } catch (e) {
      console.error("Play toggle error:", e);
      setIsLoading(false);
    }
  };

  const handleToggleMute = () => {
    if (!playerRef.current) return;
    try {
      if (isMuted) {
        playerRef.current.unMute();
        setIsMuted(false);
      } else {
        playerRef.current.mute();
        setIsMuted(true);
      }
    } catch (e) {
      console.error("Mute toggle error:", e);
    }
  };

  return (
    <div className="w-full my-6">
      {/* Literary Soundtrack Player Bar */}
      <div className="max-w-2xl mx-auto rounded-xl bg-[#EBE5DA]/80 border border-[#DCD5C9] p-3.5 sm:p-4 backdrop-blur-sm shadow-xs transition-all flex items-center justify-between gap-4">
        {/* Left: Vinyl / Disc & Title */}
        <div className="flex items-center gap-3 min-w-0">
          <div
            className={`w-10 h-10 rounded-full bg-[#24221F] text-[#F5F1E8] flex items-center justify-center shrink-0 shadow-inner transition-transform ${
              isPlaying ? "animate-spin [animation-duration:8s]" : ""
            }`}
          >
            <Disc className="h-5 w-5 opacity-90" />
          </div>

          <div className="min-w-0">
            <div className="flex items-center gap-2">
              <span className="font-mono text-[10px] tracking-widest uppercase text-[#918779] flex items-center gap-1 font-semibold">
                <Music className="h-3 w-3" />
                <span>Ambient Soundtrack</span>
              </span>

              {/* Animated Equalizer Sound Bars when playing */}
              {isPlaying && (
                <div className="flex items-end gap-0.5 h-3">
                  <span className="w-0.5 bg-[#24221F] animate-pulse h-full [animation-duration:0.6s]" />
                  <span className="w-0.5 bg-[#24221F] animate-pulse h-2/3 [animation-duration:0.4s]" />
                  <span className="w-0.5 bg-[#24221F] animate-pulse h-4/5 [animation-duration:0.8s]" />
                  <span className="w-0.5 bg-[#24221F] animate-pulse h-1/2 [animation-duration:0.5s]" />
                </div>
              )}
            </div>

            <p className="font-serif italic text-sm sm:text-base text-[#24221F] truncate leading-tight mt-0.5">
              {displayTitle}
            </p>
          </div>
        </div>

        {/* Right: Controls */}
        <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
          {/* Toggle Video mode (great fallback for mobile user control) */}
          <button
            type="button"
            onClick={() => setIsVideoVisible(!isVideoVisible)}
            className={`p-2 rounded-full transition-colors ${
              isVideoVisible
                ? "bg-[#24221F] text-[#F5F1E8]"
                : "hover:bg-[#DCD5C9]/60 text-[#918779] hover:text-[#24221F]"
            }`}
            title={isVideoVisible ? "Hide Video Window" : "Show Video Window"}
          >
            <Tv className="h-4 w-4" />
          </button>

          {/* Mute Toggle */}
          <button
            type="button"
            onClick={handleToggleMute}
            className="p-2 rounded-full hover:bg-[#DCD5C9]/60 text-[#918779] hover:text-[#24221F] transition-colors"
            title={isMuted ? "Unmute" : "Mute"}
          >
            {isMuted ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
          </button>

          {/* Main Play / Pause Button */}
          <button
            type="button"
            onClick={handleTogglePlay}
            className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#24221F] text-[#F5F1E8] hover:bg-[#24221F]/90 transition-all font-sans text-xs font-medium shadow-xs active:scale-95"
          >
            {isLoading ? (
              <>
                <Loader2 className="h-3.5 w-3.5 animate-spin" />
                <span className="hidden sm:inline">Loading...</span>
              </>
            ) : isPlaying ? (
              <>
                <Pause className="h-3.5 w-3.5 fill-current" />
                <span className="hidden sm:inline">Pause</span>
              </>
            ) : (
              <>
                <Play className="h-3.5 w-3.5 fill-current" />
                <span>Play</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* 
        YouTube Player Container:
        - NEVER display:none (hidden) because mobile Safari & Chrome immediately suspend playback on hidden elements.
        - Dimensions must be at least 240x180 so YouTube embed does not throw error 150.
        - playsinline=1 is configured so mobile does not force full-screen video overlay.
        - When isVideoVisible is false: positioned off-screen with 0.01 opacity.
        - When isVideoVisible is true: smoothly docks at bottom-right of viewport like a Picture-in-Picture window.
      */}
      <div
        style={{
          position: "fixed",
          bottom: isVideoVisible ? "20px" : "-9999px",
          right: isVideoVisible ? "20px" : "-9999px",
          width: isVideoVisible ? "280px" : "240px",
          height: isVideoVisible ? "160px" : "180px",
          zIndex: isVideoVisible ? 50 : -50,
          opacity: isVideoVisible ? 1 : 0.01,
          pointerEvents: isVideoVisible ? "auto" : "none",
          transition: "opacity 0.2s ease, transform 0.2s ease",
        }}
        className="rounded-xl overflow-hidden shadow-2xl border border-[#DCD5C9] bg-black"
      >
        <div ref={containerRef} className="w-full h-full" />
      </div>
    </div>
  );
}
