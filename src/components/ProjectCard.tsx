
import React, { useState } from 'react';
import { Play, Github, ExternalLink } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ProjectCardProps {
  title: string;
  description: string;
  image: string;
  technologies: string[];
  liveUrl?: string;
  githubUrl?: string;
}

const ProjectCard: React.FC<ProjectCardProps> = ({
  title,
  description,
  image,
  technologies,
  liveUrl,
  githubUrl
}) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div 
      className="netflix-card snap-start min-w-[300px] md:min-w-[400px] flex-shrink-0 w-[80vw] max-w-md relative"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative aspect-video overflow-hidden">
        <img 
          src={image} 
          alt={title} 
          className="w-full h-full object-cover object-center transform transition-transform duration-500"
          style={{ transform: isHovered ? 'scale(1.05)' : 'scale(1)' }}
        />
        <div className="netflix-gradient pointer-events-none"></div>
        
        {/* Play button that appears on hover */}
        <div 
          className={cn(
            "absolute inset-0 flex items-center justify-center transition-opacity duration-300",
            {
              "opacity-100": isHovered,
              "opacity-0": !isHovered
            }
          )}
        >
          {liveUrl && (
            <a 
              href={liveUrl} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="bg-netflix-red rounded-full p-4 hover:bg-opacity-80 transition-all duration-300 transform hover:scale-110"
            >
              <Play size={24} fill="white" />
            </a>
          )}
        </div>
        
        <div className="absolute top-4 right-4 flex space-x-2">
          {githubUrl && (
            <a 
              href={githubUrl} 
              target="_blank" 
              rel="noopener noreferrer"
              className={cn(
                "bg-netflix-black/70 p-2 rounded-full hover:bg-netflix-red transition-all duration-300",
                {
                  "opacity-100": isHovered,
                  "opacity-0": !isHovered
                }
              )}
            >
              <Github size={16} />
            </a>
          )}
          
          {liveUrl && (
            <a 
              href={liveUrl} 
              target="_blank" 
              rel="noopener noreferrer"
              className={cn(
                "bg-netflix-black/70 p-2 rounded-full hover:bg-netflix-red transition-all duration-300",
                {
                  "opacity-100": isHovered,
                  "opacity-0": !isHovered
                }
              )}
            >
              <ExternalLink size={16} />
            </a>
          )}
        </div>
      </div>
      
      <div className="p-5">
        <h3 className="font-bold text-lg mb-2">{title}</h3>
        <p className="text-netflix-light/80 mb-4 line-clamp-3">{description}</p>
        
        <div className="flex flex-wrap gap-2">
          {technologies.map((tech, index) => (
            <span 
              key={index} 
              className="px-2 py-1 bg-netflix-card-hover rounded-full text-xs"
            >
              {tech}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;
