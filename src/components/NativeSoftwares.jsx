import React, { useRef, useLayoutEffect } from 'react';
import { ArrowRightIcon } from '@heroicons/react/24/solid';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

// Placeholder images - replace these with your actual images
const img1 = 'https://placehold.co/600x400/2a1b3d/FFF?text=Fintech+Image';
const img2 = 'https://placehold.co/400x250/3b2c4e/FFF?text=Iteration+Image';
const img3 = 'https://placehold.co/400x250/4c3d5f/FFF?text=Rebranding+Image';

// A reusable Card component with glow effects
const Card = ({
  image,
  title,
  tags,
  className = '',
  imageClassName = 'h-64',
}) => {
  const containerRef = useRef(null);
  const overlayRef = useRef(null);
  const borderRef = useRef(null);

  const handleMouseMove = (e) => {
    if (!containerRef.current || !overlayRef.current) return;

    const { left, top } = containerRef.current.getBoundingClientRect();
    const x = e.clientX - left;
    const y = e.clientY - top;

    overlayRef.current.style.opacity = '1';
    overlayRef.current.style.background = `radial-gradient(600px circle at ${x}px ${y}px, rgba(255,255,255,0.06), transparent 40%)`;
  };

  const handleMouseLeave = () => {
    if (!overlayRef.current) return;
    overlayRef.current.style.opacity = '0';
  };

  const handleMouseEnter = () => {
    if (!borderRef.current) return;
    gsap.to(borderRef.current, {
      opacity: 1,
      duration: 0.3,
    });
  };

  const handleMouseLeaveGlow = () => {
    if (!borderRef.current) return;
    gsap.to(borderRef.current, {
      opacity: 0,
      duration: 0.3,
    });
  };

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={(e) => {
        handleMouseLeave();
        handleMouseLeaveGlow();
      }}
      onMouseEnter={handleMouseEnter}
      className={`relative border border-neutral-800 bg-neutral-900/50 overflow-hidden ${className}`}
    >
      {/* Glow border overlay */}
      <div
        ref={borderRef}
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300"
        style={{
          boxShadow:
            '0 0 20px rgba(255, 255, 255, 0.1), inset 0 0 20px rgba(255, 255, 255, 0.05)',
        }}
      />

      {/* Spotlight Effect overlay */}
      <div
        ref={overlayRef}
        className="pointer-events-none absolute -inset-px opacity-0 transition-opacity duration-300"
      />

      {/* Content */}
      <div className="relative h-full p-10 flex flex-col">
        {/* Image Container */}
        <div className="mb-8 w-full">
          <img
            src={image}
            alt={title}
            className={`w-full object-cover ${imageClassName}`}
          />
        </div>

        {/* Title */}
        <h2 className="text-3xl md:text-3xl text-white font-serif leading-tight mb-8">
          {title}
        </h2>

        {/* Tags Container */}
        <div className="flex flex-wrap gap-3 mt-auto">
          {tags.map((tag, index) => (
            <span
              key={index}
              className="text-xs font-medium text-white border border-neutral-700 px-4 py-2 uppercase tracking-wider bg-neutral-800/50"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

const NativeSoftwares = () => {
  const sectionRef = useRef(null);
  const cardsRef = useRef([]);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // Animate cards on scroll
      gsap.fromTo(
        cardsRef.current,
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.15,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 70%',
          },
        }
      );

      // Add glow effect to borders on scroll
      cardsRef.current.forEach((card) => {
        if (!card) return;

        ScrollTrigger.create({
          trigger: card,
          start: 'top 80%',
          end: 'bottom 20%',
          onEnter: () => {
            const glowElement = card.querySelector('.glow-border');
            if (glowElement) {
              gsap.to(glowElement, {
                opacity: 0.3,
                duration: 0.5,
              });
            }
          },
          onLeave: () => {
            const glowElement = card.querySelector('.glow-border');
            if (glowElement) {
              gsap.to(glowElement, {
                opacity: 0,
                duration: 0.5,
              });
            }
          },
          onEnterBack: () => {
            const glowElement = card.querySelector('.glow-border');
            if (glowElement) {
              gsap.to(glowElement, {
                opacity: 0.3,
                duration: 0.5,
              });
            }
          },
          onLeaveBack: () => {
            const glowElement = card.querySelector('.glow-border');
            if (glowElement) {
              gsap.to(glowElement, {
                opacity: 0,
                duration: 0.5,
              });
            }
          },
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const cardsData = [
    {
      title: 'Comprehensive School Management Software',
      image: '/images/edmaster-png.png',
      tags: ['FINANCE', 'ADMINISTRATION', 'REPORTING'],
    },
    {
      title:
        'Hotelipad - Hotel Management Software',
      image: '/images/hotelipad-png.png',
      tags: ['HOUSE KEEPING', 'BOOKING', 'FRONT DESK'],
    },
    {
      title: 'Retail Management Software - Easy Balance',
      image: '/images/easy-balance-png.png',
      tags: [
        'SALES RECEIPTS',
        'DIGITAL TRANSFORMATION',
        'REPORTS',
      ],
    },
  ];

  return (
    <div
      ref={sectionRef}
      className="w-full max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3"
    >
      {cardsData.map((card, index) => (
        <div
          key={index}
          ref={(el) => (cardsRef.current[index] = el)}
          className="relative"
        >
          {/* Glow border for scroll effect */}
          <div
            className="glow-border pointer-events-none absolute inset-0 opacity-0 z-10"
            style={{
              boxShadow:
                '0 0 15px rgba(255, 255, 255, 0.15), inset 0 0 15px rgba(255, 255, 255, 0.05)',
            }}
          />
          <Card
            image={card.image}
            title={card.title}
            tags={card.tags}
            className="h-full"
            imageClassName="h-78"
          />
        </div>
      ))}
    </div>
  );
};

export default NativeSoftwares;
