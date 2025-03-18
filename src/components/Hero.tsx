
import React, { useState, useEffect } from 'react';
import { ArrowDown, Play } from 'lucide-react';

const Hero = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  
  useEffect(() => {
    setIsLoaded(true);
  }, []);

  return (
    <section className="relative w-full h-screen overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 bg-netflix-black">
        <div 
          className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?q=80&w=2070')] bg-cover bg-center"
          style={{ 
            opacity: isLoaded ? 0.4 : 0,
            transition: 'opacity 1.5s ease-in-out'
          }}
        ></div>
        <div className="netflix-hero-gradient"></div>
      </div>
      
      {/* Content */}
      <div className="relative h-full flex flex-col justify-center px-4 md:px-16 max-w-6xl mx-auto">
        <div className={`transition-all duration-1000 delay-300 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <span className="inline-block px-3 py-1 bg-netflix-red rounded text-sm font-medium mb-4 animate-pulse-soft">
            Full Stack Developer
          </span>
          
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-3 text-netflix-light">
            Your Name
          </h1>
          
          <p className="text-xl md:text-2xl text-netflix-light mb-2 font-medium">
            Creating digital experiences that matter
          </p>
          
          <p className="text-netflix-gray max-w-2xl mb-8 text-lg">
            With expertise in building modern web applications and user interfaces, 
            I specialize in creating scalable, elegant solutions that solve real-world problems.
          </p>
          
          <div className="flex flex-wrap gap-4">
            <button className="netflix-btn flex items-center px-6 py-3">
              <Play size={16} className="mr-2" />
              View Projects
            </button>
            <button className="netflix-btn-outline flex items-center px-6 py-3">
              Contact Me
            </button>
          </div>
        </div>
        
        {/* Scroll Indicator */}
        <div className={`absolute bottom-12 left-1/2 transform -translate-x-1/2 transition-all duration-1000 delay-1000 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}>
          <a href="#experience" className="flex flex-col items-center text-netflix-light hover:text-netflix-red transition-colors duration-300">
            <span className="text-sm mb-2">Scroll to explore</span>
            <ArrowDown size={20} className="animate-bounce" />
          </a>
        </div>
      </div>
    </section>
  );
};

export default Hero;
