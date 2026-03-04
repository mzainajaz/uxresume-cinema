import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const AnyflowFooter = () => {
  const footerRef = useRef<HTMLElement>(null);
  const bigTextRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    if (bigTextRef.current) {
      gsap.fromTo(bigTextRef.current,
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, ease: 'power2.out',
          scrollTrigger: { trigger: bigTextRef.current, start: 'top 90%' } }
      );
    }
    return () => ScrollTrigger.getAll().forEach(t => t.kill());
  }, []);

  return (
    <footer ref={footerRef} className="border-t border-white/10">
      {/* Big CTA */}
      <div className="py-20 md:py-28 overflow-hidden relative">
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ background: 'radial-gradient(ellipse 50% 60% at 50% 50%, rgba(157,229,0,0.04) 0%, transparent 70%)' }}
        />
        <div className="af-container relative z-10 text-center">
          <p className="font-jakarta text-xs text-anyflow-lime tracking-[0.25em] uppercase mb-6">
            Ready to Start?
          </p>
          <h2
            ref={bigTextRef}
            className="font-bebas text-white leading-none mb-10"
            style={{ fontSize: 'clamp(3.5rem, 10vw, 10rem)' }}
          >
            Let's Build<br />
            <span className="text-anyflow-lime">Something</span><br />
            Great Together
          </h2>
          <a href="#contact" className="btn-lime text-base px-8 py-4">
            Get In Touch
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M2 8H14M9 3L14 8L9 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </a>
        </div>
      </div>

      {/* Footer bottom */}
      <div className="border-t border-white/10 py-8">
        <div className="af-container">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            {/* Logo */}
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 bg-anyflow-lime rounded-sm flex items-center justify-center">
                <svg width="12" height="12" viewBox="0 0 14 14" fill="none">
                  <path d="M2 12L7 2L12 12" stroke="#0a0a0a" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M3.5 9H10.5" stroke="#0a0a0a" strokeWidth="2" strokeLinecap="round"/>
                </svg>
              </div>
              <span className="font-bebas text-lg text-white tracking-wide">
                ANYFLOW<span className="text-anyflow-lime">.</span>
              </span>
            </div>

            {/* Nav links */}
            <nav className="flex items-center gap-6">
              {[
                { label: 'Services', href: '#services' },
                { label: 'Work', href: '#work' },
                { label: 'Process', href: '#process' },
                { label: 'Contact', href: '#contact' },
              ].map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className="font-jakarta text-xs text-anyflow-gray hover:text-anyflow-lime transition-colors duration-300"
                >
                  {link.label}
                </a>
              ))}
            </nav>

            {/* Social links */}
            <div className="flex items-center gap-4">
              {[
                { label: 'TW', href: '#' },
                { label: 'IG', href: '#' },
                { label: 'LI', href: '#' },
              ].map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  className="font-jakarta text-xs text-anyflow-gray/50 hover:text-anyflow-lime transition-colors duration-300 tracking-widest"
                >
                  {social.label}
                </a>
              ))}
            </div>
          </div>

          {/* Copyright */}
          <div className="mt-6 pt-6 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-2">
            <p className="font-jakarta text-xs text-anyflow-gray/30">
              © 2024 Anyflow Labs. All rights reserved.
            </p>
            <p className="font-jakarta text-xs text-anyflow-gray/30">
              Motion-driven web experiences
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default AnyflowFooter;
