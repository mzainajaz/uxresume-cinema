import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

const AnyflowCursor = () => {
  const dotRef = useRef<HTMLDivElement>(null);
  const outlineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const dot = dotRef.current;
    const outline = outlineRef.current;
    if (!dot || !outline) return;

    let mouseX = 0;
    let mouseY = 0;
    let outlineX = 0;
    let outlineY = 0;

    const onMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;

      // Dot follows immediately
      gsap.set(dot, { x: mouseX, y: mouseY });
    };

    // Smooth outline follow
    const animateOutline = () => {
      outlineX += (mouseX - outlineX) * 0.12;
      outlineY += (mouseY - outlineY) * 0.12;
      gsap.set(outline, { x: outlineX, y: outlineY });
      requestAnimationFrame(animateOutline);
    };

    const onMouseEnterLink = () => {
      if (outline) outline.classList.add('cursor-hover');
    };

    const onMouseLeaveLink = () => {
      if (outline) outline.classList.remove('cursor-hover');
    };

    window.addEventListener('mousemove', onMouseMove);
    animateOutline();

    // Add hover effect to interactive elements
    const links = document.querySelectorAll('a, button, [role="button"]');
    links.forEach((link) => {
      link.addEventListener('mouseenter', onMouseEnterLink);
      link.addEventListener('mouseleave', onMouseLeaveLink);
    });

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      links.forEach((link) => {
        link.removeEventListener('mouseenter', onMouseEnterLink);
        link.removeEventListener('mouseleave', onMouseLeaveLink);
      });
    };
  }, []);

  return (
    <>
      <div ref={dotRef} className="cursor-dot" style={{ left: 0, top: 0, position: 'fixed' }} />
      <div ref={outlineRef} className="cursor-outline" style={{ left: 0, top: 0, position: 'fixed' }} />
    </>
  );
};

export default AnyflowCursor;
