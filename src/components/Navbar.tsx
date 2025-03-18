
import React, { useState, useEffect } from 'react';
import { Menu, X, Mail, Linkedin, Github, FileText } from 'lucide-react';
import { cn } from '@/lib/utils';

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <header 
      className={cn(
        'fixed top-0 w-full z-50 transition-all duration-500 ease-in-out py-4 px-4 md:px-12',
        {
          'bg-netflix-black bg-opacity-95 shadow-lg': scrolled,
          'bg-transparent': !scrolled
        }
      )}
    >
      <div className="flex items-center justify-between">
        <a href="/" className="flex items-center">
          <span className="text-netflix-red font-bold text-3xl tracking-tighter">RESUME</span>
        </a>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-6">
          <a href="#experience" className="text-netflix-light hover:text-netflix-red transition-colors duration-300">
            Experience
          </a>
          <a href="#skills" className="text-netflix-light hover:text-netflix-red transition-colors duration-300">
            Skills
          </a>
          <a href="#projects" className="text-netflix-light hover:text-netflix-red transition-colors duration-300">
            Projects
          </a>
          <a href="#contact" className="text-netflix-light hover:text-netflix-red transition-colors duration-300">
            Contact
          </a>
          <div className="flex space-x-3">
            <a 
              href="mailto:your.email@example.com" 
              className="text-netflix-light hover:text-netflix-red transition-colors duration-300"
            >
              <Mail size={20} />
            </a>
            <a 
              href="https://linkedin.com/in/yourprofile" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="text-netflix-light hover:text-netflix-red transition-colors duration-300"
            >
              <Linkedin size={20} />
            </a>
            <a 
              href="https://github.com/yourusername" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="text-netflix-light hover:text-netflix-red transition-colors duration-300"
            >
              <Github size={20} />
            </a>
          </div>
          <a 
            href="/your-resume.pdf" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="netflix-btn flex items-center"
          >
            <FileText size={16} className="mr-2" />
            Download CV
          </a>
        </nav>

        {/* Mobile Menu Button */}
        <button 
          className="md:hidden text-netflix-light focus:outline-none"
          onClick={toggleMobileMenu}
        >
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Navigation */}
      <div 
        className={cn(
          'fixed inset-0 bg-netflix-black bg-opacity-95 z-40 flex flex-col pt-20 px-6 transition-transform duration-300 ease-in-out md:hidden',
          {
            'translate-x-0': mobileMenuOpen,
            'translate-x-full': !mobileMenuOpen
          }
        )}
      >
        <nav className="flex flex-col space-y-6">
          <a 
            href="#experience" 
            className="text-netflix-light text-2xl font-medium hover:text-netflix-red transition-colors duration-300"
            onClick={toggleMobileMenu}
          >
            Experience
          </a>
          <a 
            href="#skills" 
            className="text-netflix-light text-2xl font-medium hover:text-netflix-red transition-colors duration-300"
            onClick={toggleMobileMenu}
          >
            Skills
          </a>
          <a 
            href="#projects" 
            className="text-netflix-light text-2xl font-medium hover:text-netflix-red transition-colors duration-300"
            onClick={toggleMobileMenu}
          >
            Projects
          </a>
          <a 
            href="#contact" 
            className="text-netflix-light text-2xl font-medium hover:text-netflix-red transition-colors duration-300"
            onClick={toggleMobileMenu}
          >
            Contact
          </a>
          <div className="flex space-x-6 pt-4">
            <a 
              href="mailto:your.email@example.com" 
              className="text-netflix-light hover:text-netflix-red transition-colors duration-300"
            >
              <Mail size={24} />
            </a>
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
          </div>
          <a 
            href="/your-resume.pdf" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="netflix-btn flex items-center justify-center mt-6"
          >
            <FileText size={18} className="mr-2" />
            Download CV
          </a>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
