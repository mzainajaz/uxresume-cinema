
import React, { useEffect, useState, useRef } from 'react';

interface NetflixPreloaderProps {
  onFinished: () => void;
}

const NetflixPreloader: React.FC<NetflixPreloaderProps> = ({ onFinished }) => {
  const [animationComplete, setAnimationComplete] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    // Create and load audio element in the useEffect to improve compatibility
    const audio = new Audio('https://assets.mixkit.co/active_storage/sfx/212/212-preview.mp3');
    audioRef.current = audio;
    
    // Preload the audio
    audio.load();
    
    // Play the sound effect when component mounts
    const playSound = () => {
      console.log("Attempting to play sound");
      audioRef.current?.play()
        .then(() => console.log("Audio playback started successfully"))
        .catch(err => {
          console.log("Audio playback prevented:", err);
          // Continue with animation even if audio fails
        });
    };

    // Set a timeout to play sound in sync with animation
    const soundTimer = setTimeout(playSound, 2300);
    
    // Start the animation sequence
    const animationTimer = setTimeout(() => {
      setAnimationComplete(true);
      // Call onFinished after the animation fades out
      setTimeout(() => {
        onFinished();
      }, 1000); // Wait for fade out animation
    }, 4000); // Total duration of the animation

    return () => {
      clearTimeout(soundTimer);
      clearTimeout(animationTimer);
      // Clean up audio
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.src = "";
      }
    };
  }, [onFinished]);

  return (
    <div 
      className={`fixed inset-0 bg-black flex items-center justify-center z-50 transition-opacity duration-1000 ${
        animationComplete ? 'opacity-0' : 'opacity-100'
      }`}
    >
      {/* Netflix N-shaped container */}
      <div className="relative w-full max-w-md px-8">
        <div className="w-full h-24 md:h-32 relative overflow-hidden flex justify-center items-center">
          {/* Center line of the N */}
          <div className="absolute w-6 md:w-8 h-full bg-netflix-red transform skew-x-12 z-10 
                         animate-[netflix-n_3s_ease-in-out_forwards]"></div>
          
          {/* Left line of the N */}
          <div className="absolute left-0 md:left-8 w-6 md:w-8 h-full bg-netflix-red z-10
                         animate-[netflix-left_3s_ease-in-out_forwards]"></div>
          
          {/* Right line of the N */}
          <div className="absolute right-0 md:right-8 w-6 md:w-8 h-full bg-netflix-red z-10
                         animate-[netflix-right_3s_ease-in-out_forwards]"></div>
          
          {/* Name text appearing after N animation */}
          <div className="absolute inset-0 flex items-center justify-center opacity-0 
                         animate-[netflix-text_3s_ease-in-out_forwards]">
            <h1 className="text-4xl md:text-5xl font-bold text-netflix-red tracking-wider">ZAIN MIR</h1>
          </div>
        </div>
        
        {/* Sound effect animation (the "TUDUM" sound visual) */}
        <div className="w-full h-2 bg-netflix-red mt-4 transform scale-x-0 origin-left
                       animate-[netflix-sound_0.5s_ease-in-out_2.5s_forwards]"></div>
      </div>
    </div>
  );
};

export default NetflixPreloader;
