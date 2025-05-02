
import { useState, useRef, useEffect } from "react";
import { 
  Play, 
  Pause, 
  Volume2, 
  VolumeX, 
  Maximize, 
  Settings,
  ArrowLeft,
  ArrowRight
} from "lucide-react";
import { Slider } from "@/components/ui/slider";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

interface VideoPlayerProps {
  videoUrl: string;
  title?: string;
  onComplete?: () => void;
  autoplay?: boolean;
  className?: string;
  startTime?: number;
}

const VideoPlayer = ({
  videoUrl,
  title,
  onComplete,
  autoplay = false,
  className,
  startTime = 0,
}: VideoPlayerProps) => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1);
  const [isMuted, setIsMuted] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showControls, setShowControls] = useState(true);
  const [playbackRate, setPlaybackRate] = useState(1);
  
  // Hide controls timeout
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    
    // Set initial playback position if provided
    if (startTime > 0) {
      video.currentTime = startTime;
      setCurrentTime(startTime);
    }
    
    // Autoplay if enabled
    if (autoplay) {
      video.play().catch(err => console.error("Autoplay prevented:", err));
    }
    
    // Add event listeners
    const onTimeUpdate = () => {
      setCurrentTime(video.currentTime);
      
      // Trigger onComplete when 95% of the video is watched
      if (video.currentTime > video.duration * 0.95 && onComplete) {
        onComplete();
      }
    };
    
    const onLoadedMetadata = () => {
      setDuration(video.duration);
    };
    
    const onEnded = () => {
      setIsPlaying(false);
      if (onComplete) onComplete();
    };
    
    video.addEventListener("timeupdate", onTimeUpdate);
    video.addEventListener("loadedmetadata", onLoadedMetadata);
    video.addEventListener("ended", onEnded);
    
    return () => {
      video.removeEventListener("timeupdate", onTimeUpdate);
      video.removeEventListener("loadedmetadata", onLoadedMetadata);
      video.removeEventListener("ended", onEnded);
      
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [autoplay, onComplete, startTime]);
  
  // Handle play/pause
  const togglePlay = () => {
    const video = videoRef.current;
    if (!video) return;
    
    if (isPlaying) {
      video.pause();
    } else {
      video.play().catch(err => console.error("Play prevented:", err));
    }
    setIsPlaying(!isPlaying);
    resetControlsTimeout();
  };
  
  // Handle seek
  const handleSeek = (value: number[]) => {
    const video = videoRef.current;
    if (!video) return;
    
    const newTime = value[0];
    video.currentTime = newTime;
    setCurrentTime(newTime);
    resetControlsTimeout();
  };
  
  // Handle volume change
  const handleVolume = (value: number[]) => {
    const video = videoRef.current;
    if (!video) return;
    
    const newVolume = value[0];
    video.volume = newVolume;
    setVolume(newVolume);
    if (newVolume === 0) {
      setIsMuted(true);
      video.muted = true;
    } else if (isMuted) {
      setIsMuted(false);
      video.muted = false;
    }
    resetControlsTimeout();
  };
  
  // Toggle mute
  const toggleMute = () => {
    const video = videoRef.current;
    if (!video) return;
    
    if (isMuted) {
      video.muted = false;
      setIsMuted(false);
    } else {
      video.muted = true;
      setIsMuted(true);
    }
    resetControlsTimeout();
  };
  
  // Toggle fullscreen
  const toggleFullscreen = () => {
    const container = containerRef.current;
    if (!container) return;
    
    if (!document.fullscreenElement) {
      container.requestFullscreen().catch(err => {
        console.error("Failed to enter fullscreen mode:", err);
      });
    } else {
      document.exitFullscreen();
    }
    resetControlsTimeout();
  };
  
  // Handle fullscreen change event
  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(Boolean(document.fullscreenElement));
    };
    
    document.addEventListener("fullscreenchange", handleFullscreenChange);
    
    return () => {
      document.removeEventListener("fullscreenchange", handleFullscreenChange);
    };
  }, []);
  
  // Format time (seconds) to MM:SS
  const formatTime = (time: number): string => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
  };
  
  // Control visibility of player controls
  const resetControlsTimeout = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    setShowControls(true);
    timeoutRef.current = setTimeout(() => {
      if (isPlaying) {
        setShowControls(false);
      }
    }, 3000);
  };
  
  // Handle mouse movements to show controls
  const handleMouseMove = () => {
    resetControlsTimeout();
  };
  
  // Change playback rate
  const handlePlaybackRateChange = (rate: number) => {
    const video = videoRef.current;
    if (!video) return;
    
    video.playbackRate = rate;
    setPlaybackRate(rate);
    resetControlsTimeout();
  };
  
  // Skip forward/backward
  const skipTime = (seconds: number) => {
    const video = videoRef.current;
    if (!video) return;
    
    video.currentTime = Math.min(Math.max(0, video.currentTime + seconds), duration);
    setCurrentTime(video.currentTime);
    resetControlsTimeout();
  };
  
  // Speed options
  const speedOptions = [0.5, 0.75, 1, 1.25, 1.5, 1.75, 2];
  
  return (
    <div
      ref={containerRef}
      className={cn(
        "relative overflow-hidden bg-black rounded-lg group",
        className
      )}
      onMouseMove={handleMouseMove}
      onMouseLeave={() => {
        if (isPlaying) setShowControls(false);
      }}
    >
      {/* Video element */}
      <video 
        ref={videoRef}
        src={videoUrl}
        className="w-full h-full"
        onClick={togglePlay}
        playsInline
      />
      
      {/* Video title */}
      {title && showControls && (
        <div className="absolute top-0 left-0 right-0 p-4 bg-gradient-to-b from-black/70 to-transparent text-white font-medium">
          {title}
        </div>
      )}
      
      {/* Video controls */}
      <div 
        className={cn(
          "absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black/80 to-transparent transition-opacity duration-300",
          showControls ? "opacity-100" : "opacity-0 pointer-events-none"
        )}
      >
        {/* Progress bar */}
        <div className="mb-4">
          <Slider
            value={[currentTime]}
            min={0}
            max={duration || 100}
            step={1}
            onValueChange={handleSeek}
            className="cursor-pointer"
          />
        </div>
        
        {/* Controls row */}
        <div className="flex items-center justify-between">
          {/* Left controls */}
          <div className="flex items-center space-x-3">
            {/* Play/Pause button */}
            <Button
              variant="ghost"
              size="icon"
              onClick={togglePlay}
              className="text-white hover:text-white hover:bg-white/20"
            >
              {isPlaying ? <Pause size={18} /> : <Play size={18} />}
            </Button>
            
            {/* Skip buttons */}
            <div className="hidden sm:flex space-x-1">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => skipTime(-10)}
                className="text-white hover:text-white hover:bg-white/20"
              >
                <ArrowLeft size={16} />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => skipTime(10)}
                className="text-white hover:text-white hover:bg-white/20"
              >
                <ArrowRight size={16} />
              </Button>
            </div>
            
            {/* Time display */}
            <div className="text-xs text-white">
              <span>{formatTime(currentTime)}</span>
              <span className="mx-1">/</span>
              <span>{formatTime(duration)}</span>
            </div>
          </div>
          
          {/* Right controls */}
          <div className="flex items-center space-x-3">
            {/* Volume control */}
            <div className="hidden sm:flex items-center space-x-2 group">
              <Button
                variant="ghost"
                size="icon"
                onClick={toggleMute}
                className="text-white hover:text-white hover:bg-white/20"
              >
                {isMuted ? <VolumeX size={18} /> : <Volume2 size={18} />}
              </Button>
              <div className="w-16 opacity-0 group-hover:opacity-100 transition-opacity">
                <Slider
                  value={[isMuted ? 0 : volume]}
                  min={0}
                  max={1}
                  step={0.1}
                  onValueChange={handleVolume}
                />
              </div>
            </div>
            
            {/* Playback speed control */}
            <div className="relative group">
              <Button
                variant="ghost"
                className="text-xs text-white hover:text-white hover:bg-white/20 h-8 px-2"
              >
                {playbackRate}x
              </Button>
              <div className="absolute right-0 bottom-full mb-2 bg-black rounded shadow-lg p-1 hidden group-hover:block z-10">
                {speedOptions.map(rate => (
                  <Button
                    key={rate}
                    variant="ghost"
                    className={cn(
                      "text-xs w-12 h-8 text-white hover:bg-white/20",
                      playbackRate === rate && "bg-white/20"
                    )}
                    onClick={() => handlePlaybackRateChange(rate)}
                  >
                    {rate}x
                  </Button>
                ))}
              </div>
            </div>
            
            {/* Settings button (placeholder) */}
            <Button
              variant="ghost"
              size="icon"
              className="text-white hover:text-white hover:bg-white/20"
            >
              <Settings size={18} />
            </Button>
            
            {/* Fullscreen button */}
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleFullscreen}
              className="text-white hover:text-white hover:bg-white/20"
            >
              <Maximize size={18} />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoPlayer;
