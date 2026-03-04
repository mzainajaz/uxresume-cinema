import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';

interface AnyflowLoaderProps {
  onFinished: () => void;
}

const AnyflowLoader: React.FC<AnyflowLoaderProps> = ({ onFinished }) => {
  const loaderRef = useRef<HTMLDivElement>(null);
  const progressBarRef = useRef<HTMLDivElement>(null);
  const progressNumRef = useRef<HTMLSpanElement>(null);
  const topTextRef = useRef<HTMLDivElement>(null);
  const bottomTextRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const tl = gsap.timeline({
      onComplete: () => {
        setTimeout(() => {
          if (loaderRef.current) {
            gsap.to(loaderRef.current, {
              yPercent: -100,
              duration: 0.8,
              ease: 'power3.inOut',
              onComplete: onFinished,
            });
          }
        }, 400);
      }
    });

    // Animate progress counter
    const obj = { val: 0 };
    tl.to(obj, {
      val: 100,
      duration: 2.4,
      ease: 'power1.inOut',
      onUpdate: () => {
        const v = Math.round(obj.val);
        setProgress(v);
        if (progressNumRef.current) {
          progressNumRef.current.textContent = v + '%';
        }
      }
    }, 0);

    // Animate progress bar
    tl.fromTo(progressBarRef.current,
      { scaleX: 0 },
      { scaleX: 1, duration: 2.4, ease: 'power1.inOut', transformOrigin: 'left' },
      0
    );

    // Animate top text
    tl.fromTo(topTextRef.current,
      { y: 20, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.6, ease: 'power2.out' },
      0.2
    );

    // Animate bottom text
    tl.fromTo(bottomTextRef.current,
      { y: 20, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.6, ease: 'power2.out' },
      0.4
    );

    return () => { tl.kill(); };
  }, [onFinished]);

  return (
    <div
      ref={loaderRef}
      className="fixed inset-0 z-[10000] bg-anyflow-black flex flex-col items-center justify-center overflow-hidden"
    >
      {/* Background grid */}
      <div
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: 'linear-gradient(rgba(157,229,0,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(157,229,0,0.3) 1px, transparent 1px)',
          backgroundSize: '60px 60px',
        }}
      />

      {/* Logo center */}
      <div className="relative flex flex-col items-center gap-8">
        {/* Logo mark */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-anyflow-lime rounded-md flex items-center justify-center">
            <svg width="20" height="20" viewBox="0 0 14 14" fill="none">
              <path d="M2 12L7 2L12 12" stroke="#0a0a0a" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M3.5 9H10.5" stroke="#0a0a0a" strokeWidth="2.5" strokeLinecap="round"/>
            </svg>
          </div>
          <span className="font-bebas text-3xl text-white tracking-widest">
            ANYFLOW<span className="text-anyflow-lime">.</span>
          </span>
        </div>

        {/* Status text */}
        <div ref={topTextRef} className="opacity-0">
          <p className="font-jakarta text-xs tracking-[0.25em] uppercase text-anyflow-gray text-center">
            Preparing Experience
          </p>
        </div>

        {/* Progress bar */}
        <div className="w-64 md:w-80 h-px bg-white/10 relative overflow-hidden">
          <div
            ref={progressBarRef}
            className="absolute inset-0 bg-anyflow-lime origin-left"
            style={{ transform: 'scaleX(0)' }}
          />
        </div>

        {/* Progress number */}
        <div ref={bottomTextRef} className="opacity-0 flex items-center justify-between w-64 md:w-80">
          <span className="font-jakarta text-xs text-anyflow-gray tracking-widest uppercase">Loading Assets</span>
          <span
            ref={progressNumRef}
            className="font-bebas text-2xl text-anyflow-lime"
          >
            0%
          </span>
        </div>
      </div>

      {/* Bottom label */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2">
        <p className="font-jakarta text-xs text-anyflow-gray/40 tracking-widest uppercase">
          Labs — Motion Driven Experiences
        </p>
      </div>

      {/* Corner accents */}
      <div className="absolute top-6 left-6 w-6 h-6 border-t border-l border-anyflow-lime/30" />
      <div className="absolute top-6 right-6 w-6 h-6 border-t border-r border-anyflow-lime/30" />
      <div className="absolute bottom-6 left-6 w-6 h-6 border-b border-l border-anyflow-lime/30" />
      <div className="absolute bottom-6 right-6 w-6 h-6 border-b border-r border-anyflow-lime/30" />
    </div>
  );
};

export default AnyflowLoader;
