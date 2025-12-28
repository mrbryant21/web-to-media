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
            let color1, color2, bgColor;

            if (progress < 0.25) {
              // Start: Deep Blue
              const t = progress / 0.25;
              color1 = interpolateColor([15, 29, 69], [18, 49, 117], t);
              color2 = interpolateColor([29, 65, 123], [15, 29, 69], t);
              bgColor = interpolateColor([5, 10, 20], [7, 12, 25], t);
            } else if (progress < 0.5) {
              // Blue to Orange
              const t = (progress - 0.25) / 0.25;
              color1 = interpolateColor([18, 49, 117], [249, 115, 22], t);
              color2 = interpolateColor([29, 65, 123], [251, 146, 60], t);
              bgColor = interpolateColor([7, 12, 25], [50, 25, 10], t);
            } else if (progress < 0.75) {
              // Orange to Green
              const t = (progress - 0.5) / 0.25;
              color1 = interpolateColor([249, 115, 22], [34, 197, 94], t);
              color2 = interpolateColor([251, 146, 60], [74, 222, 128], t);
              bgColor = interpolateColor([50, 25, 10], [10, 40, 20], t);
            } else {
              // Green back to Deep Blue
              const t = (progress - 0.75) / 0.25;
              color1 = interpolateColor([34, 197, 94], [15, 29, 69], t);
              color2 = interpolateColor([74, 222, 128], [29, 65, 123], t);
              bgColor = interpolateColor([10, 40, 20], [5, 10, 20], t);
            }

            // Update background color
            containerRef.current.style.backgroundColor = `rgb(${bgColor[0]}, ${bgColor[1]}, ${bgColor[2]})`;

            gradientRef.current.style.background = `radial-gradient(ellipse at ${xPos}% ${yPos}%, rgba(${color1[0]}, ${color1[1]}, ${color1[2]}, 0.25) 0%, rgba(${color2[0]}, ${color2[1]}, ${color2[2]}, 0.15) 40%, rgba(0, 0, 0, 0) 70%)`;
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
      <div className="absolute inset-0 bg-grid-white blur-lg" />

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
