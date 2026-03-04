import React, { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';

const AnyflowNavbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const navRef = useRef<HTMLElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const linksRef = useRef<HTMLAnchorElement[]>([]);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (!menuRef.current) return;
    if (menuOpen) {
      gsap.fromTo(menuRef.current,
        { x: '100%', opacity: 0 },
        { x: '0%', opacity: 1, duration: 0.5, ease: 'power3.out' }
      );
      linksRef.current.forEach((link, i) => {
        if (link) {
          gsap.fromTo(link,
            { x: 40, opacity: 0 },
            { x: 0, opacity: 1, duration: 0.4, ease: 'power2.out', delay: 0.15 + i * 0.07 }
          );
        }
      });
    } else {
      gsap.to(menuRef.current, { x: '100%', opacity: 0, duration: 0.4, ease: 'power3.in' });
    }
  }, [menuOpen]);

  useEffect(() => {
    if (navRef.current) {
      gsap.fromTo(navRef.current,
        { y: -80, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out', delay: 0.2 }
      );
    }
  }, []);

  const navLinks = [
    { label: 'Home', href: '#' },
    { label: 'Services', href: '#services' },
    { label: 'Process', href: '#process' },
    { label: 'Work', href: '#work' },
  ];

  const addToLinksRef = (el: HTMLAnchorElement | null, i: number) => {
    if (el) linksRef.current[i] = el;
  };

  return (
    <>
      <nav
        ref={navRef}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled ? 'bg-anyflow-black/90 backdrop-blur-md border-b border-white/5' : 'bg-transparent'
        }`}
      >
        <div className="af-container">
          <div className="flex items-center justify-between h-16 md:h-20">
            {/* Logo */}
            <a href="#" className="flex items-center gap-2 group">
              <div className="w-7 h-7 bg-anyflow-lime rounded-sm flex items-center justify-center">
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <path d="M2 12L7 2L12 12" stroke="#0a0a0a" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M3.5 9H10.5" stroke="#0a0a0a" strokeWidth="2" strokeLinecap="round"/>
                </svg>
              </div>
              <span className="font-bebas text-xl text-white tracking-wide">ANYFLOW<span className="text-anyflow-lime">.</span></span>
            </a>

            {/* Desktop Nav */}
            <div className="hidden md:flex items-center gap-8">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className="font-inter-tight text-sm text-anyflow-gray hover:text-anyflow-white transition-colors duration-300 relative group"
                >
                  {link.label}
                  <span className="absolute -bottom-0.5 left-0 w-0 h-px bg-anyflow-lime transition-all duration-300 group-hover:w-full" />
                </a>
              ))}
            </div>

            {/* CTA + Hamburger */}
            <div className="flex items-center gap-4">
              <a href="#contact" className="hidden md:flex btn-lime text-xs">
                Let's Talk
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <path d="M2 7H12M8 3L12 7L8 11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </a>
              <button
                onClick={() => setMenuOpen(!menuOpen)}
                className="md:hidden w-10 h-10 flex flex-col items-center justify-center gap-1.5 group"
                aria-label="Toggle menu"
              >
                <span className={`block w-6 h-0.5 bg-white transition-all duration-300 ${menuOpen ? 'rotate-45 translate-y-2' : ''}`} />
                <span className={`block w-6 h-0.5 bg-white transition-all duration-300 ${menuOpen ? 'opacity-0' : ''}`} />
                <span className={`block w-6 h-0.5 bg-white transition-all duration-300 ${menuOpen ? '-rotate-45 -translate-y-2' : ''}`} />
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      <div
        ref={menuRef}
        className="fixed inset-0 z-40 bg-anyflow-black flex flex-col pt-24 px-8 md:hidden"
        style={{ transform: 'translateX(100%)', opacity: 0 }}
      >
        <nav className="flex flex-col gap-6">
          {navLinks.map((link, i) => (
            <a
              key={link.label}
              ref={(el) => addToLinksRef(el, i)}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              className="font-bebas text-5xl text-white hover:text-anyflow-lime transition-colors duration-300"
            >
              {link.label}
            </a>
          ))}
          <a
            ref={(el) => addToLinksRef(el, navLinks.length)}
            href="#contact"
            onClick={() => setMenuOpen(false)}
            className="btn-lime mt-4 self-start"
          >
            Contact Us
          </a>
        </nav>

        <div className="mt-auto mb-12 flex items-center gap-6">
          <a href="#" className="text-anyflow-gray hover:text-anyflow-lime transition-colors text-xs font-inter-tight">Twitter</a>
          <a href="#" className="text-anyflow-gray hover:text-anyflow-lime transition-colors text-xs font-inter-tight">Instagram</a>
          <a href="#" className="text-anyflow-gray hover:text-anyflow-lime transition-colors text-xs font-inter-tight">LinkedIn</a>
        </div>
      </div>
    </>
  );
};

export default AnyflowNavbar;
