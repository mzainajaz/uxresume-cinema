
import React from 'react';
import { Mail, Phone, MapPin, Linkedin, Github, Twitter } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer id="contact" className="bg-netflix-black border-t border-netflix-gray/20 pt-16 pb-8">
      <div className="max-w-6xl mx-auto px-4 md:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          <div>
            <h3 className="text-2xl font-bold mb-4 text-netflix-red">Contact</h3>
            <ul className="space-y-3">
              <li className="flex items-center">
                <Mail size={18} className="text-netflix-gray mr-3" />
                <a href="mailto:your.email@example.com" className="text-netflix-light hover:text-netflix-red transition-colors duration-300">
                  your.email@example.com
                </a>
              </li>
              <li className="flex items-center">
                <Phone size={18} className="text-netflix-gray mr-3" />
                <a href="tel:+11234567890" className="text-netflix-light hover:text-netflix-red transition-colors duration-300">
                  +1 (123) 456-7890
                </a>
              </li>
              <li className="flex items-center">
                <MapPin size={18} className="text-netflix-gray mr-3" />
                <span className="text-netflix-light">San Francisco, CA</span>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-2xl font-bold mb-4 text-netflix-red">Navigation</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-netflix-light hover:text-netflix-red transition-colors duration-300">
                  Home
                </a>
              </li>
              <li>
                <a href="#experience" className="text-netflix-light hover:text-netflix-red transition-colors duration-300">
                  Experience
                </a>
              </li>
              <li>
                <a href="#skills" className="text-netflix-light hover:text-netflix-red transition-colors duration-300">
                  Skills
                </a>
              </li>
              <li>
                <a href="#projects" className="text-netflix-light hover:text-netflix-red transition-colors duration-300">
                  Projects
                </a>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-2xl font-bold mb-4 text-netflix-red">Connect</h3>
            <div className="flex space-x-4">
              <a 
                href="https://linkedin.com/in/yourprofile" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-netflix-light hover:text-netflix-red transition-colors duration-300"
              >
                <Linkedin size={24} />
              </a>
              <a 
                href="https://github.com/yourusername" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-netflix-light hover:text-netflix-red transition-colors duration-300"
              >
                <Github size={24} />
              </a>
              <a 
                href="https://twitter.com/yourusername" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-netflix-light hover:text-netflix-red transition-colors duration-300"
              >
                <Twitter size={24} />
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="text-2xl font-bold mb-4 text-netflix-red">Resume</h3>
            <p className="text-netflix-light/80 mb-4">
              Download a copy of my resume for a complete overview of my skills and experience.
            </p>
            <a 
              href="/your-resume.pdf" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="netflix-btn"
            >
              Download CV
            </a>
          </div>
        </div>
        
        <div className="border-t border-netflix-gray/20 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-netflix-gray text-sm mb-4 md:mb-0">
            © {currentYear} Your Name. All rights reserved.
          </p>
          <p className="text-netflix-gray text-sm">
            Designed with inspiration from Netflix UI.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
