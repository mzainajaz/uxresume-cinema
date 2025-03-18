
import React, { useState } from 'react';
import { Calendar, Building, ExternalLink } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ExperienceCardProps {
  company: string;
  position: string;
  period: string;
  description: string[];
  logo: string;
  companyUrl?: string;
}

const ExperienceCard: React.FC<ExperienceCardProps> = ({
  company,
  position,
  period,
  description,
  logo,
  companyUrl
}) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div 
      className="netflix-card snap-start min-w-[300px] md:min-w-[400px] flex-shrink-0 w-[80vw] max-w-md"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative aspect-video overflow-hidden">
        <img 
          src={logo} 
          alt={company} 
          className="w-full h-full object-cover object-center transform transition-transform duration-500"
          style={{ transform: isHovered ? 'scale(1.05)' : 'scale(1)' }}
        />
        <div className="netflix-gradient pointer-events-none"></div>
        
        {/* Info overlay that slides up on hover */}
        <div 
          className={cn(
            "absolute inset-0 bg-netflix-black/80 p-6 flex flex-col justify-end transform transition-transform duration-500 ease-in-out",
            {
              "translate-y-0": isHovered,
              "translate-y-full": !isHovered
            }
          )}
        >
          <div className="space-y-2">
            <h4 className="font-bold text-lg">{position}</h4>
            <p>{description[0]}</p>
            <ul className="list-disc pl-5 text-sm text-netflix-light/80 space-y-1">
              {description.slice(1).map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
      
      <div className="p-5">
        <div className="flex items-center justify-between mb-2">
          <h3 className="font-bold text-lg">{company}</h3>
          {companyUrl && (
            <a 
              href={companyUrl} 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-netflix-light/70 hover:text-netflix-red transition-colors duration-300"
            >
              <ExternalLink size={16} />
            </a>
          )}
        </div>
        
        <div className="flex items-center text-netflix-gray mb-3">
          <Calendar size={14} className="mr-1" />
          <span className="text-sm">{period}</span>
        </div>
        
        <p className="text-netflix-light/80 line-clamp-2">{description[0]}</p>
      </div>
    </div>
  );
};

export default ExperienceCard;
