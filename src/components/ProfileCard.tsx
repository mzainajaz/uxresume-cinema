
import React from 'react';
import { Mail, Phone, MapPin, Calendar, Award, Linkedin } from 'lucide-react';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { AspectRatio } from '@/components/ui/aspect-ratio';

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
  const initials = name
    .split(' ')
    .map(part => part[0])
    .join('');

  return (
    <div className="netflix-card w-full max-w-md mx-auto overflow-hidden flex flex-col rounded-lg shadow-xl">
      <div className="relative">
        <AspectRatio ratio={16/9}>
          <div className="w-full h-full bg-gradient-to-br from-netflix-red/90 to-netflix-dark flex items-center justify-center">
            <Avatar className="h-32 w-32 border-4 border-white shadow-lg">
              <AvatarImage src="https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?q=80&w=1000" alt={name} />
              <AvatarFallback className="text-3xl font-bold bg-netflix-red text-white">
                {initials}
              </AvatarFallback>
            </Avatar>
          </div>
        </AspectRatio>
        <div className="absolute bottom-0 left-0 w-full p-6 bg-gradient-to-t from-black/80 to-transparent">
          <h3 className="text-3xl font-bold text-white">{name}</h3>
          <p className="text-netflix-red font-medium mb-2">{title}</p>
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
