
import React, { useEffect, useState, useRef } from 'react';

interface NetflixPreloaderProps {
  onFinished: () => void;
}

const NetflixPreloader: React.FC<NetflixPreloaderProps> = ({ onFinished }) => {
  const [animationComplete, setAnimationComplete] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    // Create audio element programmatically
    const audio = new Audio('https://www.soundjay.com/mechanical/sounds/bike-horn-1.mp3');
    audioRef.current = audio;
    
    // Preload the audio
    audio.load();
    
    // Set up animation timing
    const animationDuration = 3500; // Total animation duration
    const soundDelay = 1800; // When the sound should start playing (sync with visual)
    const fadeOutDelay = animationDuration - 500; // When to start fading out
    
    // Play the sound effect when animation reaches correct point
    const playSound = () => {
      console.log("Attempting to play sound");
      if (audioRef.current) {
        audioRef.current.volume = 0.7; // Slightly lower volume
        audioRef.current.play()
          .then(() => console.log("Audio playback started successfully"))
          .catch(err => {
            console.log("Audio playback prevented:", err);
            // Continue with animation even if audio fails
          });
      }
    };

    // Start the animation sequence
    const soundTimer = setTimeout(playSound, soundDelay);
    const fadeOutTimer = setTimeout(() => {
      setAnimationComplete(true);
    }, fadeOutDelay);
    
    // Complete the animation and call onFinished
    const completionTimer = setTimeout(() => {
      onFinished();
    }, animationDuration);

    return () => {
      clearTimeout(soundTimer);
      clearTimeout(fadeOutTimer);
      clearTimeout(completionTimer);
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
      {/* Netflix Logo Container */}
      <div className="relative w-64 h-32">
        {/* Netflix Logo - The N */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="relative h-full w-16 overflow-visible">
            {/* Left bar of N */}
            <div className="absolute left-0 w-5 h-full bg-netflix-red animate-[netflix-left_3s_ease-in-out_forwards]"></div>
            
            {/* Middle bar of N */}
            <div className="absolute left-5 w-5 h-full bg-netflix-red transform origin-left skew-x-12 animate-[netflix-n_3s_ease-in-out_forwards]"></div>
            
            {/* Right bar of N */}
            <div className="absolute right-0 w-5 h-full bg-netflix-red animate-[netflix-right_3s_ease-in-out_forwards]"></div>
          </div>
        </div>
        
        {/* Sound Wave Animation (appears when the TUDUM sound plays) */}
        <div className="absolute bottom-0 left-0 right-0 flex justify-center">
          <div className="w-32 h-2 bg-netflix-red scale-x-0 origin-center mt-6 animate-[netflix-sound_0.5s_ease-in-out_1.8s_forwards]"></div>
        </div>
      </div>
    </div>
  );
};

export default NetflixPreloader;
