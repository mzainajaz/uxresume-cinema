
import React, { useState } from 'react';
import { Star } from 'lucide-react';
import { cn } from '@/lib/utils';

interface SkillCardProps {
  title: string;
  icon: string;
  level: number;
  description: string;
  tags: string[];
}

const SkillCard: React.FC<SkillCardProps> = ({
  title,
  icon,
  level,
  description,
  tags
}) => {
  const [isHovered, setIsHovered] = useState(false);
  
  const renderStars = () => {
    return Array(5).fill(0).map((_, i) => (
      <Star 
        key={i} 
        size={16} 
        className={cn(
          "transition-colors duration-300",
          i < level ? "text-netflix-red fill-netflix-red" : "text-netflix-gray"
        )}
      />
    ));
  };

  return (
    <div 
      className="netflix-card snap-start min-w-[250px] md:min-w-[300px] flex-shrink-0 w-[60vw] max-w-sm relative overflow-hidden"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center">
            <img src={icon} alt={title} className="w-10 h-10 object-contain mr-3" />
            <h3 className="font-bold text-lg">{title}</h3>
          </div>
          <div className="flex">{renderStars()}</div>
        </div>
        
        <p className="text-netflix-light/80 mb-4 line-clamp-2">{description}</p>
        
        <div className="flex flex-wrap gap-2">
          {tags.map((tag, index) => (
            <span 
              key={index} 
              className="px-2 py-1 bg-netflix-card-hover rounded-full text-xs"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
      
      {/* Hover overlay with full description */}
      <div 
        className={cn(
          "absolute inset-0 bg-netflix-black/90 p-6 flex flex-col justify-center transform transition-all duration-500 ease-in-out",
          {
            "opacity-100": isHovered,
            "opacity-0 pointer-events-none": !isHovered
          }
        )}
      >
        <div className="flex items-center mb-4">
          <img src={icon} alt={title} className="w-8 h-8 object-contain mr-3" />
          <h3 className="font-bold text-lg">{title}</h3>
        </div>
        
        <div className="flex mb-4">{renderStars()}</div>
        
        <p className="text-netflix-light/90 mb-4">{description}</p>
        
        <div className="flex flex-wrap gap-2 mt-auto">
          {tags.map((tag, index) => (
            <span 
              key={index} 
              className="px-2 py-1 bg-netflix-card-hover rounded-full text-xs"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SkillCard;
