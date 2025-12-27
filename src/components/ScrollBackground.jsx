import React, { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const ScrollBackground = () => {
  const containerRef = useRef(null);
  const gradientRef = useRef(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // Animate the radial gradient position and colors on scroll
      gsap.to(gradientRef.current, {
        scrollTrigger: {
          trigger: 'body',
          start: 'top top',
          end: 'bottom bottom',
          scrub: 1,
          onUpdate: (self) => {
            const progress = self.progress;

            // Change gradient position based on scroll
            const xPos = 30 + progress * 40; // 30% to 70%
            const yPos = 30 + Math.sin(progress * Math.PI * 2) * 20; // 10% to 50%

            // Interpolate colors based on scroll progress
            let color1, color2;

            if (progress < 0.33) {
              // Start: Indigo to Purple
              const t = progress / 0.33;
              color1 = interpolateColor([99, 102, 241], [147, 51, 234], t);
              color2 = interpolateColor([168, 85, 247], [99, 102, 241], t);
            } else if (progress < 0.66) {
              // Middle: Purple to Emerald
              const t = (progress - 0.33) / 0.33;
              color1 = interpolateColor([147, 51, 234], [16, 185, 129], t);
              color2 = interpolateColor([99, 102, 241], [52, 211, 153], t);
            } else {
              // End: Emerald to Pink
              const t = (progress - 0.66) / 0.34;
              color1 = interpolateColor([16, 185, 129], [219, 39, 119], t);
              color2 = interpolateColor([52, 211, 153], [147, 51, 234], t);
            }

            gradientRef.current.style.background = `radial-gradient(ellipse at ${xPos}% ${yPos}%, rgba(${color1[0]}, ${color1[1]}, ${color1[2]}, 0.12) 0%, rgba(${color2[0]}, ${color2[1]}, ${color2[2]}, 0.06) 40%, rgba(0, 0, 0, 0) 70%)`;
          },
        },
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  // Helper function to interpolate between two RGB colors
  const interpolateColor = (color1, color2, factor) => {
    return [
      Math.round(color1[0] + factor * (color2[0] - color1[0])),
      Math.round(color1[1] + factor * (color2[1] - color1[1])),
      Math.round(color1[2] + factor * (color2[2] - color1[2])),
    ];
  };

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 w-full h-full -z-50 pointer-events-none"
      style={{ backgroundColor: '#000000' }}
    >
      {/* Dark overlay for better text contrast */}
      <div className="absolute inset-0 bg-black/60" />

      {/* Animated radial gradient */}
      <div
        ref={gradientRef}
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse at 30% 30%, rgba(99, 102, 241, 0.12) 0%, rgba(168, 85, 247, 0.06) 40%, rgba(0, 0, 0, 0) 70%)',
        }}
      />

      {/* Static grid with blur */}
      <div className="absolute inset-0 bg-grid-white blur-md" />

      {/* Animated lightning bolts */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Lightning 1 - diagonal down-right */}
        <div
          className="absolute w-px h-48 bg-gradient-to-b from-transparent via-indigo-400 to-transparent"
          style={{
            left: '20%',
            top: '10%',
            animation: 'lightning-diagonal-down 6s linear infinite',
            animationDelay: '0s',
            boxShadow: '0 0 8px rgba(99, 102, 241, 0.8)',
          }}
        />

        {/* Lightning 2 - horizontal right */}
        <div
          className="absolute h-px w-64 bg-gradient-to-r from-transparent via-purple-400 to-transparent"
          style={{
            left: '10%',
            top: '50%',
            animation: 'lightning-horizontal 7s linear infinite',
            animationDelay: '1s',
            boxShadow: '0 0 8px rgba(168, 85, 247, 0.8)',
          }}
        />

        {/* Lightning 3 - vertical down */}
        <div
          className="absolute w-px h-56 bg-gradient-to-b from-transparent via-indigo-300 to-transparent"
          style={{
            left: '70%',
            top: '20%',
            animation: 'lightning-vertical 5s linear infinite',
            animationDelay: '2s',
            boxShadow: '0 0 8px rgba(129, 140, 248, 0.8)',
          }}
        />

        {/* Lightning 4 - diagonal up-right */}
        <div
          className="absolute w-px h-48 bg-gradient-to-b from-transparent via-purple-300 to-transparent"
          style={{
            left: '30%',
            top: '60%',
            animation: 'lightning-diagonal-up 6.5s linear infinite',
            animationDelay: '3s',
            boxShadow: '0 0 8px rgba(216, 180, 254, 0.8)',
          }}
        />

        {/* Lightning 5 - reverse diagonal */}
        <div
          className="absolute w-px h-48 bg-gradient-to-b from-transparent via-indigo-400 to-transparent"
          style={{
            left: '85%',
            top: '40%',
            animation: 'lightning-reverse-diagonal 7s linear infinite',
            animationDelay: '4s',
            boxShadow: '0 0 8px rgba(99, 102, 241, 0.8)',
          }}
        />

        {/* Lightning 6 - horizontal left */}
        <div
          className="absolute h-px w-48 bg-gradient-to-r from-transparent via-purple-500 to-transparent"
          style={{
            left: '50%',
            top: '25%',
            animation: 'lightning-horizontal 5.5s linear infinite',
            animationDelay: '5s',
            boxShadow: '0 0 8px rgba(168, 85, 247, 0.8)',
          }}
        />
      </div>
    </div>
  );
};

export default ScrollBackground;
