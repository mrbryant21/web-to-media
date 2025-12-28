import React, { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react'; // Ensure you have lucide-react installed or use SVG icons

const testimonials = [
  {
    id: 1,
    name: 'Sarah Jenks',
    role: 'Product Manager',
    quote:
      'This platform has completely transformed how we manage our workflows. The interface is incredibly intuitive.',
    rating: 5,
  },
  {
    id: 2,
    name: 'Michael Chen',
    role: 'Frontend Developer',
    quote:
      "I've used many similar tools, but the attention to detail here is unmatched. The code quality is exactly what developers need.",
    rating: 5,
  },
  {
    id: 3,
    name: 'Emily Davis',
    role: 'Marketing Director',
    quote:
      'Customer support is phenomenal. They resolved my issue in under 10 minutes. Highly recommended.',
    rating: 4,
  },
  {
    id: 4,
    name: 'David Wilson',
    role: 'CTO at StartUp',
    quote:
      'Scalability was our biggest concern, but this architecture handled our Black Friday traffic without a single hiccup.',
    rating: 5,
  },
  {
    id: 5,
    name: 'Jessica Lee',
    role: 'UX Designer',
    quote:
      'Dark mode support out of the box? Finally, a tool that understands what modern users actually want.',
    rating: 5,
  },
];

const StarRating = ({ rating, isActive }) => (
  <div className="flex gap-1 mb-4">
    {[...Array(5)].map((_, i) => (
      <svg
        key={i}
        className={`w-4 h-4 ${i < rating ? (isActive ? 'text-neutral-400 fill-neutral-400' : 'text-neutral-500 fill-neutral-500') : 'text-neutral-800'}`}
        viewBox="0 0 20 20"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
      </svg>
    ))}
  </div>
);

export default function TestimonialCarousel() {
  const [activeIndex, setActiveIndex] = useState(0);

  // Helper to handle wrapping indices (Infinite Loop Logic)
  const getIndex = (index) => {
    if (index < 0) return testimonials.length - 1;
    if (index >= testimonials.length) return 0;
    return index;
  };

  const handlePrev = () => setActiveIndex((prev) => getIndex(prev - 1));
  const handleNext = () => setActiveIndex((prev) => getIndex(prev + 1));

  // Determine which 3 items to show: [Left, Center, Right]
  const visibleItems = [
    testimonials[getIndex(activeIndex - 1)],
    testimonials[activeIndex],
    testimonials[getIndex(activeIndex + 1)],
  ];

  return (
    <section className="py-16 overflow-hidden">
      <div className="px-4 mx-auto max-w-6xl sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-24 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-neutral-300 text-xs font-medium tracking-wider uppercase mb-6 backdrop-blur-md">
            <span className="w-2 h-2 rounded-full bg-neutral-500 animate-pulse" />
            Client Testimonials
          </div>
          <h2 className="text-5xl md:text-7xl font-semibold text-white tracking-tight font-display">
            Trusted By <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-neutral-200 to-neutral-500">
              Our Clients
            </span>
          </h2>
          <p className="text-lg text-neutral-400 mt-4">
            Hear directly from our clients about their experiences working with
            us and the impact our solutions have made on their businesses.
          </p>
        </div>

        {/* CAROUSEL CONTAINER */}
        <div className="relative">
          {/* Grid: 3 slots with no gap */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-0 items-center">
            {visibleItems.map((item, index) => {
              // The middle item in our visibleItems array is always index 1
              const isMiddle = index === 1;

              return (
                <div
                  key={`${item.id}-${index}`} // Composite key forces re-render for animation reset
                  onClick={() => {
                    // Make side cards clickable to navigate
                    if (index === 0) handlePrev();
                    if (index === 2) handleNext();
                  }}
                  className={`
                    relative flex flex-col justify-between p-8 backdrop-blur-sm cursor-pointer
                    transition-all duration-500 ease-in-out
                    rounded-none group
                    
                    /* Height & Layering Control */
                    ${
                      isMiddle
                        ? `
                          z-20 
                          bg-neutral-900/90 
                          py-20
                          border border-neutral-500/50 
                          shadow-[0_0_50px_-12px_rgba(100,100,100,0.3)]
                          scale-100 opacity-100
                        `
                        : `
                          z-10 
                          bg-neutral-900/40 
                          py-10 
                          border-y border-neutral-800
                          opacity-60 hover:opacity-100
                          lg:-ml-[1px] 
                        `
                    }

                    /* Borders for side cards to prevent overlap issues */
                    ${index === 0 ? 'border-l border-neutral-800 lg:border-r-0' : ''}
                    ${index === 2 ? 'border-r border-neutral-800 lg:border-l-0' : ''}
                  `}
                >
                  {/* GLOWING CORNERS (Only on Middle) */}
                  {isMiddle && (
                    <>
                      <div className="absolute top-0 left-0 w-2 h-2 bg-neutral-400 shadow-[0_0_15px_rgba(100,100,100,1)]" />
                      <div className="absolute top-0 right-0 w-2 h-2 bg-neutral-400 shadow-[0_0_15px_rgba(100,100,100,1)]" />
                      <div className="absolute bottom-0 left-0 w-2 h-2 bg-neutral-400 shadow-[0_0_15px_rgba(100,100,100,1)]" />
                      <div className="absolute bottom-0 right-0 w-2 h-2 bg-neutral-400 shadow-[0_0_15px_rgba(100,100,100,1)]" />
                    </>
                  )}

                  {/* CONTENT */}
                  <div>
                    <StarRating rating={item.rating} isActive={isMiddle} />
                    <blockquote
                      className={`text-lg leading-relaxed transition-colors duration-300 ${isMiddle ? 'text-white' : 'text-neutral-400 group-hover:text-neutral-300'}`}
                    >
                      "{item.quote}"
                    </blockquote>
                  </div>

                  <div className="mt-8">
                    <div
                      className={`font-semibold transition-colors duration-300 ${isMiddle ? 'text-neutral-400' : 'text-neutral-200'}`}
                    >
                      {item.name}
                    </div>
                    <div className="text-sm text-neutral-500">{item.role}</div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Navigation Buttons (Optional - Floating on sides) */}
          <div className="flex justify-center gap-4 mt-8 lg:hidden">
            <button
              onClick={handlePrev}
              className="p-2 transition-colors rounded-full text-neutral-400 hover:text-white hover:bg-neutral-800"
            >
              <ChevronLeft />
            </button>
            <button
              onClick={handleNext}
              className="p-2 transition-colors rounded-full text-neutral-400 hover:text-white hover:bg-neutral-800"
            >
              <ChevronRight />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
