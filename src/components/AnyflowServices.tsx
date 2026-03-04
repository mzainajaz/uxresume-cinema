import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const services = [
  {
    number: '01',
    title: 'Design',
    description: 'We craft pixel-perfect, visually stunning interfaces that captivate users from first glance. Every detail serves a purpose.',
    tags: ['UI/UX', 'Brand Identity', 'Motion Design', 'Prototyping'],
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
        <path d="M4 24L14 4L24 24" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M7 18H21" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      </svg>
    ),
  },
  {
    number: '02',
    title: 'Development',
    description: 'Clean, performant code that brings your vision to life. We build with Next.js, React and WebGL for next-gen web experiences.',
    tags: ['React / Next.js', 'Three.js / WebGL', 'GSAP Animations', 'Performance'],
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
        <path d="M9 8L4 14L9 20" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M19 8L24 14L19 20" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M16 6L12 22" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      </svg>
    ),
  },
  {
    number: '03',
    title: 'SEO',
    description: 'Strategic search optimization built into every project. We ensure your beautiful site is also discovered by the right audience.',
    tags: ['Technical SEO', 'Core Web Vitals', 'Content Strategy', 'Analytics'],
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
        <circle cx="12" cy="12" r="8" stroke="currentColor" strokeWidth="1.5"/>
        <path d="M18 18L24 24" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      </svg>
    ),
  },
  {
    number: '04',
    title: 'E-commerce',
    description: 'Conversion-optimized online stores that look incredible and drive revenue. From Shopify to custom-built solutions.',
    tags: ['Shopify', 'Custom Stores', 'Payment Integration', 'CRO'],
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
        <path d="M4 4H6L8.5 17H20L22 8H8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        <circle cx="10" cy="21" r="1.5" stroke="currentColor" strokeWidth="1.5"/>
        <circle cx="19" cy="21" r="1.5" stroke="currentColor" strokeWidth="1.5"/>
      </svg>
    ),
  },
];

const AnyflowServices = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    if (headingRef.current) {
      gsap.fromTo(headingRef.current,
        { y: 40, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 0.8, ease: 'power3.out',
          scrollTrigger: {
            trigger: headingRef.current,
            start: 'top 85%',
          }
        }
      );
    }

    cardsRef.current.forEach((card, i) => {
      if (!card) return;
      gsap.fromTo(card,
        { y: 50, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 0.7, ease: 'power3.out',
          delay: i * 0.1,
          scrollTrigger: {
            trigger: card,
            start: 'top 88%',
          }
        }
      );
    });

    return () => ScrollTrigger.getAll().forEach(t => t.kill());
  }, []);

  const addToCardsRef = (el: HTMLDivElement | null, i: number) => {
    if (el) cardsRef.current[i] = el;
  };

  return (
    <section ref={sectionRef} id="services" className="py-24 md:py-32">
      <div className="af-container">
        <div ref={headingRef} className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <div className="section-label">What We Do</div>
            <h2 className="font-bebas text-5xl md:text-7xl text-white leading-none">
              Our Services
            </h2>
          </div>
          <p className="font-jakarta text-anyflow-gray max-w-xs text-sm leading-relaxed md:text-right">
            End-to-end digital solutions designed to elevate your brand beyond expectations.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-white/10">
          {services.map((service, i) => (
            <div
              key={service.number}
              ref={(el) => addToCardsRef(el, i)}
              className="group bg-anyflow-black p-8 md:p-10 hover:bg-anyflow-zinc transition-colors duration-500 cursor-pointer"
            >
              <div className="flex items-start justify-between mb-8">
                <span className="font-bebas text-6xl text-white/10 group-hover:text-anyflow-lime/20 transition-colors duration-500 leading-none">
                  {service.number}
                </span>
                <div className="text-anyflow-gray group-hover:text-anyflow-lime transition-colors duration-300">
                  {service.icon}
                </div>
              </div>

              <h3 className="font-bebas text-4xl text-white mb-4 group-hover:text-anyflow-lime transition-colors duration-300">
                {service.title}
              </h3>

              <p className="font-jakarta text-sm text-anyflow-gray leading-relaxed mb-8">
                {service.description}
              </p>

              <div className="flex flex-wrap gap-2">
                {service.tags.map((tag) => (
                  <span
                    key={tag}
                    className="font-jakarta text-xs px-3 py-1 border border-white/10 text-anyflow-gray/70 rounded-full group-hover:border-anyflow-lime/30 group-hover:text-anyflow-lime/70 transition-all duration-300"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {/* Arrow */}
              <div className="mt-8 flex items-center gap-2 text-anyflow-gray/40 group-hover:text-anyflow-lime transition-colors duration-300">
                <span className="font-jakarta text-xs tracking-widest uppercase">Learn More</span>
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="transform group-hover:translate-x-1 transition-transform duration-300">
                  <path d="M2 8H14M9 3L14 8L9 13" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AnyflowServices;
