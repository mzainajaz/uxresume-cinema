
import React, { useRef, useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ContentRowProps {
  title: string;
  id: string;
  children: React.ReactNode;
}

const ContentRow: React.FC<ContentRowProps> = ({ title, id, children }) => {
  const rowRef = useRef<HTMLDivElement>(null);
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(true);
  const [isScrolling, setIsScrolling] = useState(false);

  const scroll = (direction: 'left' | 'right') => {
    if (rowRef.current) {
      setIsScrolling(true);
      const { scrollLeft, clientWidth } = rowRef.current;
      const scrollTo = direction === 'left' 
        ? scrollLeft - clientWidth * 0.9
        : scrollLeft + clientWidth * 0.9;
      
      rowRef.current.scrollTo({
        left: scrollTo,
        behavior: 'smooth'
      });
      
      setTimeout(() => {
        setIsScrolling(false);
        checkArrows();
      }, 500);
    }
  };

  const checkArrows = () => {
    if (rowRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = rowRef.current;
      setShowLeftArrow(scrollLeft > 0);
      setShowRightArrow(scrollLeft < scrollWidth - clientWidth - 10);
    }
  };

  return (
    <section id={id} className="netflix-row py-12">
      <h2 className="netflix-title mb-6 ml-2">{title}</h2>
      
      <div className="relative group">
        {/* Left Navigation Arrow */}
        <button
          className={cn(
            "absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-netflix-black/80 rounded-full p-2 text-netflix-light transition-all duration-300 hidden group-hover:flex items-center justify-center",
            {
              "opacity-0": !showLeftArrow || isScrolling,
              "opacity-100": showLeftArrow && !isScrolling
            }
          )}
          onClick={() => scroll('left')}
          disabled={!showLeftArrow || isScrolling}
          aria-label="Scroll left"
        >
          <ChevronLeft size={24} />
        </button>
        
        {/* Content Container */}
        <div 
          ref={rowRef}
          className="flex overflow-x-auto pb-8 scrollbar-none snap-x gap-4 scroll-smooth"
          onScroll={checkArrows}
        >
          {children}
        </div>
        
        {/* Right Navigation Arrow */}
        <button
          className={cn(
            "absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-netflix-black/80 rounded-full p-2 text-netflix-light transition-all duration-300 hidden group-hover:flex items-center justify-center",
            {
              "opacity-0": !showRightArrow || isScrolling,
              "opacity-100": showRightArrow && !isScrolling
            }
          )}
          onClick={() => scroll('right')}
          disabled={!showRightArrow || isScrolling}
          aria-label="Scroll right"
        >
          <ChevronRight size={24} />
        </button>
      </div>
    </section>
  );
};

export default ContentRow;
