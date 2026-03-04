import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const projects = [
  {
    name: 'PAWWW',
    category: 'Concept + 3D',
    tags: ['Web', '3D', 'Concept'],
    color: '#9de500',
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?q=80&w=1200&auto=format',
    year: '2024',
  },
  {
    name: 'Pritam Das',
    category: 'Web + WebGL',
    tags: ['Web', 'Development', 'WebGL'],
    color: '#f99c00',
    image: 'https://images.unsplash.com/photo-1555774698-0b77e0d5fac6?q=80&w=1200&auto=format',
    year: '2024',
  },
  {
    name: 'WTF Ruchit',
    category: 'Web Design',
    tags: ['Web', 'Design', 'Development'],
    color: '#fb2c36',
    image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=1200&auto=format',
    year: '2023',
  },
  {
    name: 'DEEPFLOW',
    category: 'Web Development',
    tags: ['Web', 'Development'],
    color: '#9de500',
    image: 'https://images.unsplash.com/photo-1607799279861-4dd421887fb3?q=80&w=1200&auto=format',
    year: '2023',
  },
];

const AnyflowWork = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const itemsRef = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    if (headingRef.current) {
      gsap.fromTo(headingRef.current,
        { y: 40, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 0.8, ease: 'power3.out',
          scrollTrigger: { trigger: headingRef.current, start: 'top 85%' }
        }
      );
    }

    itemsRef.current.forEach((item, i) => {
      if (!item) return;
      gsap.fromTo(item,
        { y: 60, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 0.8, ease: 'power3.out',
          scrollTrigger: { trigger: item, start: 'top 88%' },
          delay: i % 2 === 0 ? 0 : 0.15,
        }
      );
    });

    return () => ScrollTrigger.getAll().forEach(t => t.kill());
  }, []);

  const addToRef = (el: HTMLDivElement | null, i: number) => {
    if (el) itemsRef.current[i] = el;
  };

  return (
    <section ref={sectionRef} id="work" className="py-24 md:py-32">
      <div className="af-container">
        <div ref={headingRef} className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <div className="section-label">Featured Work</div>
            <h2 className="font-bebas text-5xl md:text-7xl text-white leading-none">
              Our Projects
            </h2>
          </div>
          <a href="#contact" className="btn-outline self-start md:self-auto">
            View All Work
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M2 7H12M8 3L12 7L8 11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </a>
        </div>

        {/* Large featured project */}
        <div
          ref={(el) => addToRef(el, 0)}
          className="relative group overflow-hidden rounded-lg mb-4 cursor-pointer"
          style={{ aspectRatio: '16/7' }}
        >
          <img
            src={projects[0].image}
            alt={projects[0].name}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-anyflow-black/80 via-anyflow-black/20 to-transparent" />
          <div className="absolute inset-0 flex items-end p-8 md:p-12">
            <div className="flex items-end justify-between w-full">
              <div>
                <div className="flex items-center gap-3 mb-3">
                  {projects[0].tags.map((tag) => (
                    <span
                      key={tag}
                      className="font-jakarta text-xs px-3 py-1 rounded-full bg-white/10 backdrop-blur-sm text-white"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <h3 className="font-bebas text-5xl md:text-7xl text-white leading-none">
                  {projects[0].name}
                </h3>
                <p className="font-jakarta text-sm text-anyflow-gray mt-1">{projects[0].category}</p>
              </div>
              <div className="hidden md:flex items-center justify-center w-14 h-14 rounded-full bg-anyflow-lime opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-4 group-hover:translate-y-0">
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                  <path d="M4 10H16M11 5L16 10L11 15" stroke="#0a0a0a" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
            </div>
          </div>
        </div>

        {/* Grid of 3 projects */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {projects.slice(1).map((project, i) => (
            <div
              key={project.name}
              ref={(el) => addToRef(el, i + 1)}
              className="relative group overflow-hidden rounded-lg cursor-pointer"
              style={{ aspectRatio: '4/5' }}
            >
              <img
                src={project.image}
                alt={project.name}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-anyflow-black/80 via-anyflow-black/30 to-transparent" />
              <div className="absolute inset-0 flex items-end p-6">
                <div className="w-full">
                  <div className="flex items-center gap-2 mb-3 flex-wrap">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="font-jakarta text-[10px] px-2.5 py-1 rounded-full bg-white/10 backdrop-blur-sm text-white"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  <h3 className="font-bebas text-3xl text-white leading-none">{project.name}</h3>
                  <p className="font-jakarta text-xs text-anyflow-gray mt-1">{project.category}</p>
                </div>
              </div>
              {/* Hover overlay */}
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-300"
                style={{ backgroundColor: project.color }}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AnyflowWork;
