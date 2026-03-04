import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const AnyflowValueProp = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const line1Ref = useRef<HTMLSpanElement>(null);
  const line2Ref = useRef<HTMLSpanElement>(null);
  const line3Ref = useRef<HTMLSpanElement>(null);
  const pillsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const lines = [line1Ref.current, line2Ref.current, line3Ref.current];
    lines.forEach((line, i) => {
      if (!line) return;
      gsap.fromTo(line,
        { y: '100%', opacity: 0 },
        {
          y: '0%',
          opacity: 1,
          duration: 0.9,
          ease: 'power3.out',
          delay: i * 0.12,
          scrollTrigger: {
            trigger: headlineRef.current,
            start: 'top 80%',
          }
        }
      );
    });

    if (pillsRef.current) {
      const pills = pillsRef.current.querySelectorAll('.service-pill');
      gsap.fromTo(pills,
        { y: 20, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 0.5, ease: 'power2.out', stagger: 0.1,
          scrollTrigger: { trigger: pillsRef.current, start: 'top 85%' }
        }
      );
    }

    return () => ScrollTrigger.getAll().forEach(t => t.kill());
  }, []);

  return (
    <section ref={sectionRef} className="py-24 md:py-40 overflow-hidden">
      <div className="af-container">
        {/* Section label */}
        <div className="section-label mb-12">Our Philosophy</div>

        {/* Large stacked headline */}
        <h2
          ref={headlineRef}
          className="font-bebas leading-none mb-12"
          style={{ fontSize: 'clamp(3rem, 8vw, 7.5rem)' }}
        >
          <div className="overflow-hidden">
            <span ref={line1Ref} className="inline-block opacity-0" style={{ transform: 'translateY(100%)' }}>
              Your Brand
            </span>
          </div>
          <div className="overflow-hidden">
            <span ref={line2Ref} className="inline-block text-anyflow-lime opacity-0" style={{ transform: 'translateY(100%)' }}>
              Deserves More
            </span>
          </div>
          <div className="overflow-hidden">
            <span ref={line3Ref} className="inline-block opacity-0" style={{ transform: 'translateY(100%)' }}>
              Than a Pretty Website
            </span>
          </div>
        </h2>

        {/* Pills */}
        <div ref={pillsRef} className="flex flex-wrap gap-3 mb-16">
          {['Design', 'Development', 'SEO', 'E-commerce'].map((s) => (
            <span
              key={s}
              className="service-pill font-jakarta text-sm px-5 py-2.5 border border-white/15 text-anyflow-white rounded-full opacity-0"
            >
              {s}
            </span>
          ))}
        </div>

        {/* Bottom divider row */}
        <div className="af-divider" />
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between pt-8 gap-6">
          <p className="font-jakarta text-anyflow-gray text-sm leading-relaxed max-w-sm">
            We build websites that do more than look good — they convert, engage, and perform at the highest level.
          </p>
          <a href="#contact" className="btn-lime">
            Make It Real
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M2 7H12M8 3L12 7L8 11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
};

export default AnyflowValueProp;
