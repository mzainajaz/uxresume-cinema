import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const steps = [
  {
    number: '01',
    title: 'Discovery Call',
    description: "We start every project with a conversation. Tell us your idea, your vision, or even just a rough direction — we'll help shape it.",
  },
  {
    number: '02',
    title: 'Strategy & Planning',
    description: 'We map out the full project: sitemap, wireframes, technical architecture, and a clear timeline. No surprises.',
  },
  {
    number: '03',
    title: 'Design & Motion',
    description: 'Our designers create stunning visual concepts with motion design baked in from the start — not an afterthought.',
  },
  {
    number: '04',
    title: 'Development',
    description: 'We build with performance-first code using React, Next.js, GSAP, and WebGL. Pixel-perfect implementation, every time.',
  },
  {
    number: '05',
    title: 'Launch & Optimize',
    description: 'We deploy, monitor, and optimize. After launch, we ensure everything is running at peak performance.',
  },
];

const AnyflowProcess = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const quoteRef = useRef<HTMLDivElement>(null);
  const stepsRef = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    if (headingRef.current) {
      gsap.fromTo(headingRef.current,
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out',
          scrollTrigger: { trigger: headingRef.current, start: 'top 85%' } }
      );
    }

    if (quoteRef.current) {
      gsap.fromTo(quoteRef.current,
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: 'power2.out',
          scrollTrigger: { trigger: quoteRef.current, start: 'top 85%' } }
      );
    }

    stepsRef.current.forEach((step, i) => {
      if (!step) return;
      gsap.fromTo(step,
        { x: -30, opacity: 0 },
        {
          x: 0, opacity: 1, duration: 0.6, ease: 'power2.out',
          delay: i * 0.08,
          scrollTrigger: { trigger: step, start: 'top 90%' }
        }
      );
    });

    return () => ScrollTrigger.getAll().forEach(t => t.kill());
  }, []);

  const addToRef = (el: HTMLDivElement | null, i: number) => {
    if (el) stepsRef.current[i] = el;
  };

  return (
    <section ref={sectionRef} id="process" className="py-24 md:py-32 bg-anyflow-zinc/30">
      <div className="af-container">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
          {/* Left: Heading + Quote */}
          <div>
            <div ref={headingRef}>
              <div className="section-label">How We Work</div>
              <h2 className="font-bebas text-5xl md:text-7xl text-white leading-none mb-8">
                Our Process
              </h2>
            </div>

            <div ref={quoteRef}>
              <blockquote className="font-jakarta text-lg md:text-xl text-anyflow-white/80 leading-relaxed mb-8 border-l-2 border-anyflow-lime pl-6">
                "If you have an idea, a thought, or even just a rough direction in mind, we'd truly love to hear it."
              </blockquote>
              <p className="font-jakarta text-sm text-anyflow-gray leading-relaxed mb-10">
                We believe the best work starts with a genuine conversation — not a brief or a contract. We'll help you figure out what you need before we ever talk about what it costs.
              </p>
              <a href="#contact" className="btn-lime">
                Schedule a Call
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <path d="M2 7H12M8 3L12 7L8 11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </a>
            </div>
          </div>

          {/* Right: Steps */}
          <div className="flex flex-col gap-0">
            {steps.map((step, i) => (
              <div
                key={step.number}
                ref={(el) => addToRef(el, i)}
                className="group flex gap-6 py-6 border-b border-white/10 last:border-0 cursor-pointer hover:pl-4 transition-all duration-300"
              >
                <span className="font-bebas text-3xl text-anyflow-lime/40 group-hover:text-anyflow-lime transition-colors duration-300 leading-none pt-0.5 min-w-[2.5rem]">
                  {step.number}
                </span>
                <div>
                  <h3 className="font-inter-tight font-semibold text-white mb-2 group-hover:text-anyflow-lime transition-colors duration-300">
                    {step.title}
                  </h3>
                  <p className="font-jakarta text-sm text-anyflow-gray leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AnyflowProcess;
