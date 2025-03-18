
import React from 'react';
import { Mail, Phone, MapPin, Calendar, Award, Linkedin } from 'lucide-react';

interface ProfileCardProps {
  name: string;
  title: string;
  email: string;
  phone: string;
  location: string;
  experience: string;
  education: string;
  image: string;
}

const ProfileCard: React.FC<ProfileCardProps> = ({
  name,
  title,
  email,
  phone,
  location,
  experience,
  education,
  image
}) => {
  return (
    <div className="netflix-card w-full max-w-md mx-auto overflow-hidden flex flex-col">
      <div className="relative aspect-[3/4] overflow-hidden">
        <img 
          src={image} 
          alt={name} 
          className="w-full h-full object-cover object-center transform transition-transform duration-500 hover:scale-105"
        />
        <div className="netflix-gradient pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 w-full p-6">
          <h3 className="text-3xl font-bold mb-1">{name}</h3>
          <p className="text-netflix-red font-medium mb-4">{title}</p>
        </div>
      </div>
      
      <div className="p-6 bg-netflix-dark flex-grow">
        <div className="space-y-4">
          <div className="flex items-center">
            <Mail size={18} className="text-netflix-red mr-3" />
            <span>{email}</span>
          </div>
          <div className="flex items-center">
            <Phone size={18} className="text-netflix-red mr-3" />
            <span>{phone}</span>
          </div>
          <div className="flex items-center">
            <MapPin size={18} className="text-netflix-red mr-3" />
            <span>{location}</span>
          </div>
          <div className="flex items-center">
            <Calendar size={18} className="text-netflix-red mr-3" />
            <span>{experience}</span>
          </div>
          <div className="flex items-center">
            <Award size={18} className="text-netflix-red mr-3" />
            <span>{education}</span>
          </div>
          <div className="flex items-center">
            <Linkedin size={18} className="text-netflix-red mr-3" />
            <a href="https://www.linkedin.com/in/zain-mir/" target="_blank" rel="noopener noreferrer" className="hover:text-netflix-red transition-colors">
              View LinkedIn Profile
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileCard;
