import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const values = [
  { label: 'Built Different', desc: 'We don\'t follow templates. Every project is crafted from scratch with your brand at its core.' },
  { label: 'Design with Purpose', desc: 'Beauty without function is just decoration. Every visual decision drives user behavior.' },
  { label: 'Code with Passion', desc: 'We obsess over the details — from loading speeds to micro-interactions that delight users.' },
  { label: 'Create with Vision', desc: 'We think beyond the brief. We bring creative direction that elevates your brand.' },
  { label: 'Innovate Always', desc: 'The web is always evolving. We stay on the cutting edge so your site never feels outdated.' },
];

const AnyflowBrandValues = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (headingRef.current) {
      gsap.fromTo(headingRef.current,
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out',
          scrollTrigger: { trigger: headingRef.current, start: 'top 85%' } }
      );
    }

    if (listRef.current) {
      const items = listRef.current.querySelectorAll('.value-item');
      gsap.fromTo(items,
        { x: 40, opacity: 0 },
        {
          x: 0, opacity: 1, duration: 0.6, ease: 'power2.out', stagger: 0.1,
          scrollTrigger: { trigger: listRef.current, start: 'top 80%' }
        }
      );
    }

    return () => ScrollTrigger.getAll().forEach(t => t.kill());
  }, []);

  return (
    <section ref={sectionRef} className="py-24 md:py-32">
      <div className="af-container">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          {/* Left */}
          <div ref={headingRef}>
            <div className="section-label">Core Values</div>
            <h2 className="font-bebas text-5xl md:text-7xl text-white leading-none mb-8">
              What Drives<br />
              <span className="text-anyflow-lime">Everything</span><br />
              We Do
            </h2>
            <p className="font-jakarta text-anyflow-gray text-sm leading-relaxed max-w-sm">
              We're not just a studio — we're your creative and technical partners. These principles guide every decision we make.
            </p>
          </div>

          {/* Right: Values list */}
          <div ref={listRef} className="flex flex-col gap-0">
            {values.map((v, i) => (
              <div
                key={v.label}
                className="value-item group flex items-start gap-6 py-6 border-b border-white/10 last:border-0 opacity-0 cursor-default hover:bg-anyflow-zinc/20 px-0 hover:px-4 transition-all duration-300"
              >
                <span className="font-bebas text-2xl text-anyflow-lime/40 group-hover:text-anyflow-lime transition-colors duration-300 min-w-[1.5rem]">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <div>
                  <h3 className="font-inter-tight font-bold text-white text-base mb-1 group-hover:text-anyflow-lime transition-colors duration-300">
                    {v.label}
                  </h3>
                  <p className="font-jakarta text-xs text-anyflow-gray leading-relaxed">
                    {v.desc}
                  </p>
                </div>
                <svg
                  className="ml-auto text-anyflow-gray/0 group-hover:text-anyflow-lime/60 transition-colors duration-300 flex-shrink-0 mt-1"
                  width="16" height="16" viewBox="0 0 16 16" fill="none"
                >
                  <path d="M2 8H14M9 3L14 8L9 13" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AnyflowBrandValues;
