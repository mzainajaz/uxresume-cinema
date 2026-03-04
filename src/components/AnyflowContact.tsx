import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const AnyflowContact = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (headingRef.current) {
      gsap.fromTo(headingRef.current,
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.9, ease: 'power3.out',
          scrollTrigger: { trigger: headingRef.current, start: 'top 80%' } }
      );
    }
    if (formRef.current) {
      gsap.fromTo(formRef.current,
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: 'power2.out',
          scrollTrigger: { trigger: formRef.current, start: 'top 85%' } }
      );
    }
    return () => ScrollTrigger.getAll().forEach(t => t.kill());
  }, []);

  return (
    <section ref={sectionRef} id="contact" className="py-24 md:py-32 relative overflow-hidden">
      {/* BG glow */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse, rgba(157,229,0,0.06) 0%, transparent 70%)',
        }}
      />

      <div className="af-container relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
          {/* Left */}
          <div ref={headingRef}>
            <div className="section-label">Let's Connect</div>
            <h2 className="font-bebas text-5xl md:text-7xl text-white leading-none mb-8">
              Ready to Build<br />
              <span className="text-anyflow-lime">Something</span><br />
              Extraordinary?
            </h2>
            <p className="font-jakarta text-anyflow-gray text-sm leading-relaxed mb-10 max-w-sm">
              Whether you have a fully formed brief or just an exciting idea, we'd love to hear it. Let's start a conversation.
            </p>

            {/* Contact info */}
            <div className="flex flex-col gap-4">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center flex-shrink-0">
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <path d="M2 4L8 9L14 4M2 4H14V12H2V4Z" stroke="#9de500" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <div>
                  <p className="font-jakarta text-xs text-anyflow-gray/60 uppercase tracking-widest">Email</p>
                  <a href="mailto:hello@anyflow.agency" className="font-jakarta text-sm text-white hover:text-anyflow-lime transition-colors">
                    hello@anyflow.agency
                  </a>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center flex-shrink-0">
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <circle cx="8" cy="8" r="6" stroke="#9de500" strokeWidth="1.2"/>
                    <path d="M8 4V8L10.5 10.5" stroke="#9de500" strokeWidth="1.2" strokeLinecap="round"/>
                  </svg>
                </div>
                <div>
                  <p className="font-jakarta text-xs text-anyflow-gray/60 uppercase tracking-widest">Response Time</p>
                  <p className="font-jakarta text-sm text-white">Within 24 hours</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right: Form */}
          <div ref={formRef}>
            <form className="flex flex-col gap-5" onSubmit={(e) => e.preventDefault()}>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div className="flex flex-col gap-2">
                  <label className="font-jakarta text-xs text-anyflow-gray/60 uppercase tracking-widest">Name</label>
                  <input
                    type="text"
                    placeholder="Your name"
                    className="bg-anyflow-zinc border border-white/10 rounded-lg px-4 py-3 font-jakarta text-sm text-white placeholder-anyflow-gray/40 focus:outline-none focus:border-anyflow-lime/50 transition-colors"
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label className="font-jakarta text-xs text-anyflow-gray/60 uppercase tracking-widest">Email</label>
                  <input
                    type="email"
                    placeholder="your@email.com"
                    className="bg-anyflow-zinc border border-white/10 rounded-lg px-4 py-3 font-jakarta text-sm text-white placeholder-anyflow-gray/40 focus:outline-none focus:border-anyflow-lime/50 transition-colors"
                  />
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <label className="font-jakarta text-xs text-anyflow-gray/60 uppercase tracking-widest">Service</label>
                <select className="bg-anyflow-zinc border border-white/10 rounded-lg px-4 py-3 font-jakarta text-sm text-white focus:outline-none focus:border-anyflow-lime/50 transition-colors appearance-none cursor-pointer">
                  <option value="" className="bg-anyflow-zinc">Select a service</option>
                  <option value="design" className="bg-anyflow-zinc">Design</option>
                  <option value="development" className="bg-anyflow-zinc">Development</option>
                  <option value="seo" className="bg-anyflow-zinc">SEO</option>
                  <option value="ecommerce" className="bg-anyflow-zinc">E-commerce</option>
                  <option value="full" className="bg-anyflow-zinc">Full Project</option>
                </select>
              </div>

              <div className="flex flex-col gap-2">
                <label className="font-jakarta text-xs text-anyflow-gray/60 uppercase tracking-widest">Message</label>
                <textarea
                  rows={5}
                  placeholder="Tell us about your project, idea, or vision..."
                  className="bg-anyflow-zinc border border-white/10 rounded-lg px-4 py-3 font-jakarta text-sm text-white placeholder-anyflow-gray/40 focus:outline-none focus:border-anyflow-lime/50 transition-colors resize-none"
                />
              </div>

              <button type="submit" className="btn-lime w-full justify-center py-4 text-base font-bold">
                Send Message
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path d="M2 8H14M9 3L14 8L9 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AnyflowContact;
