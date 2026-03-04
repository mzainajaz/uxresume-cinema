import React from 'react';

const items = [
  'Design', '✦', 'Development', '✦', 'SEO', '✦', 'E-commerce', '✦',
  'Motion', '✦', 'WebGL', '✦', 'GSAP', '✦', 'React', '✦',
  'Design', '✦', 'Development', '✦', 'SEO', '✦', 'E-commerce', '✦',
  'Motion', '✦', 'WebGL', '✦', 'GSAP', '✦', 'React', '✦',
];

const AnyflowMarquee = () => {
  return (
    <div className="py-6 border-y border-white/10 overflow-hidden">
      <div className="marquee-track flex items-center gap-8 whitespace-nowrap">
        {items.map((item, i) => (
          <span
            key={i}
            className={`font-jakarta text-sm ${
              item === '✦' ? 'text-anyflow-lime text-xs' : 'text-anyflow-gray/60'
            }`}
          >
            {item}
          </span>
        ))}
      </div>
    </div>
  );
};

export default AnyflowMarquee;
