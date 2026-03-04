import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const AnyflowHero = () => {
  const heroRef = useRef<HTMLElement>(null);
  const headlineRef = useRef<HTMLDivElement>(null);
  const subRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const scrollHintRef = useRef<HTMLDivElement>(null);
  const taglineRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const tl = gsap.timeline({ delay: 0.3 });

    // Reveal grid
    if (gridRef.current) {
      tl.fromTo(gridRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 1.2 },
        0
      );
    }

    // Headline words
    if (headlineRef.current) {
      const words = headlineRef.current.querySelectorAll('.hero-word');
      tl.fromTo(words,
        { y: '100%', opacity: 0 },
        {
          y: '0%',
          opacity: 1,
          duration: 0.9,
          ease: 'power3.out',
          stagger: 0.08,
        },
        0.1
      );
    }

    // Tagline
    if (taglineRef.current) {
      tl.fromTo(taglineRef.current,
        { opacity: 0, y: 15 },
        { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' },
        0.6
      );
    }

    // Sub paragraph
    if (subRef.current) {
      tl.fromTo(subRef.current,
        { opacity: 0, y: 15 },
        { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' },
        0.75
      );
    }

    // CTA
    if (ctaRef.current) {
      tl.fromTo(ctaRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' },
        0.9
      );
    }

    // Scroll hint
    if (scrollHintRef.current) {
      tl.fromTo(scrollHintRef.current,
        { opacity: 0, y: 10 },
        { opacity: 1, y: 0, duration: 0.5 },
        1.2
      );
    }

    // Parallax scroll effect
    if (headlineRef.current) {
      gsap.to(headlineRef.current, {
        yPercent: -15,
        ease: 'none',
        scrollTrigger: {
          trigger: heroRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: true,
        }
      });
    }

    return () => { tl.kill(); ScrollTrigger.getAll().forEach(t => t.kill()); };
  }, []);

  return (
    <section ref={heroRef} className="relative min-h-screen flex flex-col justify-center overflow-hidden">
      {/* Background grid */}
      <div
        ref={gridRef}
        className="absolute inset-0 opacity-0"
        style={{
          backgroundImage: 'linear-gradient(rgba(157,229,0,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(157,229,0,0.04) 1px, transparent 1px)',
          backgroundSize: '80px 80px',
        }}
      />

      {/* Radial glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse 60% 50% at 50% 60%, rgba(157,229,0,0.06) 0%, transparent 70%)'
        }}
      />

      {/* Horizontal line decoration */}
      <div className="absolute top-1/4 left-0 right-0 h-px bg-white/5" />
      <div className="absolute bottom-1/4 left-0 right-0 h-px bg-white/5" />

      <div className="af-container relative z-10 pt-28 pb-20">
        {/* Tagline */}
        <div ref={taglineRef} className="opacity-0 flex items-center gap-3 mb-8">
          <div className="w-2 h-2 rounded-full bg-anyflow-lime animate-pulse" />
          <span className="font-jakarta text-xs tracking-[0.25em] uppercase text-anyflow-lime">
            Web Design & Development Studio
          </span>
        </div>

        {/* Main Headline */}
        <div ref={headlineRef} className="overflow-hidden mb-8">
          <div className="overflow-hidden">
            <h1 className="font-bebas text-[12vw] md:text-[9vw] lg:text-[8vw] text-white leading-none tracking-tight">
              {'We Design'.split(' ').map((word, i) => (
                <span key={i} className="hero-word inline-block mr-[0.15em] opacity-0" style={{ transform: 'translateY(100%)' }}>
                  {word}
                </span>
              ))}
            </h1>
          </div>
          <div className="overflow-hidden">
            <h1 className="font-bebas text-[12vw] md:text-[9vw] lg:text-[8vw] leading-none tracking-tight">
              {'Immersive'.split(' ').map((word, i) => (
                <span key={i} className="hero-word inline-block mr-[0.15em] text-anyflow-lime opacity-0" style={{ transform: 'translateY(100%)' }}>
                  {word}
                </span>
              ))}
              {' Motion'.split(' ').map((word, i) => (
                <span key={i} className="hero-word inline-block mr-[0.15em] text-white opacity-0" style={{ transform: 'translateY(100%)' }}>
                  {word}
                </span>
              ))}
            </h1>
          </div>
          <div className="overflow-hidden">
            <h1 className="font-bebas text-[12vw] md:text-[9vw] lg:text-[8vw] text-white leading-none tracking-tight">
              {'Driven Websites'.split(' ').map((word, i) => (
                <span key={i} className="hero-word inline-block mr-[0.15em] opacity-0" style={{ transform: 'translateY(100%)' }}>
                  {word}
                </span>
              ))}
            </h1>
          </div>
        </div>

        {/* Divider */}
        <div className="af-divider mb-8" />

        {/* Bottom row */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
          <p
            ref={subRef}
            className="opacity-0 font-jakarta text-base md:text-lg text-anyflow-gray max-w-md leading-relaxed"
          >
            That command attention and guide users to act.
            <br />
            <span className="text-white/50">Clean builds. Sharp strategy. Zero fluff.</span>
          </p>

          <div ref={ctaRef} className="opacity-0 flex items-center gap-4">
            <a href="#contact" className="btn-lime">
              Let's Talk
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path d="M2 7H12M8 3L12 7L8 11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </a>
            <a href="#work" className="btn-outline">
              View Work
            </a>
          </div>
        </div>
      </div>

      {/* Scroll hint */}
      <div ref={scrollHintRef} className="absolute bottom-8 left-1/2 -translate-x-1/2 opacity-0 flex flex-col items-center gap-2">
        <span className="font-jakarta text-xs text-anyflow-gray/60 tracking-widest uppercase">Scroll</span>
        <div className="w-px h-12 bg-gradient-to-b from-anyflow-lime/60 to-transparent" />
      </div>

      {/* Floating services badge */}
      <div className="absolute right-6 top-1/2 -translate-y-1/2 hidden xl:flex flex-col gap-2">
        {['Design', 'Development', 'SEO', 'E-commerce'].map((s) => (
          <span
            key={s}
            className="font-jakarta text-[10px] text-anyflow-gray/40 tracking-widest uppercase text-right block"
          >
            {s}
          </span>
        ))}
      </div>
    </section>
  );
};

export default AnyflowHero;
