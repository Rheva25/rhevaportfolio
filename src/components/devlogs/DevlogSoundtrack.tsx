"use client";

import { useState } from "react";
import { Play, Pause, Volume2, VolumeX, Music, Disc } from "lucide-react";

export function extractYouTubeId(url?: string | null): string | null {
  if (!url) return null;
  const trimmed = url.trim();
  // Check if it's already an 11-char ID
  if (/^[a-zA-Z0-9_-]{11}$/.test(trimmed)) {
    return trimmed;
  }
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
  const match = trimmed.match(regExp);
  return match && match[2].length === 11 ? match[2] : null;
}

interface DevlogSoundtrackProps {
  soundtrackUrl?: string;
  soundtrackTitle?: string;
}

export function DevlogSoundtrack({ soundtrackUrl, soundtrackTitle }: DevlogSoundtrackProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);

  const videoId = extractYouTubeId(soundtrackUrl);
  if (!videoId) return null;

  const displayTitle = soundtrackTitle?.trim() || "Soundtrack for this reading";

  return (
    <div className="w-full my-6">
      {/* Literary Soundtrack Player Bar */}
      <div className="max-w-2xl mx-auto rounded-xl bg-[#EBE5DA]/80 border border-[#DCD5C9] p-3.5 sm:p-4 backdrop-blur-sm shadow-xs transition-all flex items-center justify-between gap-4">
        
        {/* Left: Vinyl / Disc & Title */}
        <div className="flex items-center gap-3 min-w-0">
          <div className={`w-10 h-10 rounded-full bg-[#24221F] text-[#F5F1E8] flex items-center justify-center shrink-0 shadow-inner ${isPlaying ? "animate-spin [animation-duration:8s]" : ""}`}>
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
        <div className="flex items-center gap-2 shrink-0">
          {isPlaying && (
            <button
              type="button"
              onClick={() => setIsMuted(!isMuted)}
              className="p-2 rounded-full hover:bg-[#DCD5C9]/60 text-[#918779] hover:text-[#24221F] transition-colors"
              title={isMuted ? "Unmute" : "Mute"}
            >
              {isMuted ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
            </button>
          )}

          <button
            type="button"
            onClick={() => setIsPlaying(!isPlaying)}
            className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#24221F] text-[#F5F1E8] hover:bg-[#24221F]/90 transition-all font-sans text-xs font-medium shadow-xs"
          >
            {isPlaying ? (
              <>
                <Pause className="h-3.5 w-3.5 fill-current" />
                <span className="hidden sm:inline">Pause</span>
              </>
            ) : (
              <>
                <Play className="h-3.5 w-3.5 fill-current" />
                <span>Play Song</span>
              </>
            )}
          </button>
        </div>

      </div>

      {/* Embedded YouTube Player (Invisible / audio-only) */}
      {isPlaying && (
        <div className="sr-only">
          <iframe
            width="200"
            height="200"
            src={`https://www.youtube-nocookie.com/embed/${videoId}?autoplay=1&playsinline=1&enablejsapi=1&loop=1&playlist=${videoId}${isMuted ? "&mute=1" : ""}`}
            title="Soundtrack audio"
            allow="autoplay; encrypted-media"
            className="hidden"
          />
        </div>
      )}
    </div>
  );
}
