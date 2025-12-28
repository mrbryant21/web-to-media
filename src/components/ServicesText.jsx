'use client';

import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

function LayeredText({
  lines = [
    { top: '\u00A0' },
    { top: 'INFINITE', bottom: 'PROGRESS' },
    { top: 'PROGRESS', bottom: 'INNOVATION' },
    { top: 'INNOVATION', bottom: 'FUTURE' },
    { top: 'FUTURE', bottom: 'DREAMS' },
    { top: '', bottom: 'ACHIEVEMENT' },
    { bottom: '\u00A0' },
  ],
  fontSize = '36px',
  fontSizeMd = '18px',
  lineHeight = 30,
  lineHeightMd = 17,
  className = '',
}) {
  const containerRef = useRef(null);

  const calculateTranslateX = (index) => {
    const baseOffset = 35;
    const baseOffsetMd = 20;
    const centerIndex = Math.floor(lines.length / 2);
    return {
      desktop: (index - centerIndex) * baseOffset,
      mobile: (index - centerIndex) * baseOffsetMd,
    };
  };

  useEffect(() => {
    if (!containerRef.current) return;

    let ctx = gsap.context(() => {
      const listItems = containerRef.current.querySelectorAll('li');

      // The Timeline: Infinite loop with a small delay between waves
      const tl = gsap.timeline({ repeat: -1, repeatDelay: 0.5 });

      // The Animation: A wave of light passing through the stack
      tl.to(listItems, {
        color: '#22d3ee', // Cyan-400 (matches your Hero text)
        textShadow: '0 0 25px rgba(34, 211, 238, 0.8)', // Strong glow
        duration: 0.8, // How fast the light pulses on a single layer
        ease: 'power2.inOut',

        // This stagger config creates the "wave" effect
        stagger: {
          each: 0.15, // Delay between each layer lighting up
          from: 'end', // Start from the bottom ('end') and move up
          yoyo: true, // Go back to original color immediately
          repeat: 1, // Pulse once (Light ON -> Light OFF) per cycle
        },
      });
    }, containerRef);

    return () => ctx.revert();
  }, [lines]);

  return (
    <div
      ref={containerRef}
      // Added 'text-neutral-700' and 'dark:text-neutral-600' as a darker base
      // so the glow pops more when it happens.
      className={`mx-auto font-sans font-black tracking-[-2px] uppercase text-neutral-700 dark:text-neutral-600 antialiased cursor-default relative z-10 ${className}`}
      style={{ fontSize, '--md-font-size': fontSizeMd }}
    >
      <ul className="list-none p-0 m-0 flex flex-col items-center">
        {lines.map((line, index) => {
          const translateX = calculateTranslateX(index);
          const isEven = index % 2 === 0;

          return (
            <li
              key={index}
              className={`
                relative overflow-hidden transition-colors
                ${
                  isEven
                    ? 'transform-[skew(60deg,-30deg)_scaleY(0.66667)]'
                    : 'transform-[skew(0deg,-30deg)_scaleY(1.33333)]'
                }
              `}
              style={{
                height: `${lineHeight}px`,
                transform: `translateX(${translateX.desktop}px) skew(${
                  isEven ? '60deg, -30deg' : '0deg, -30deg'
                }) scaleY(${isEven ? '0.66667' : '1.33333'})`,
                '--md-height': `${lineHeightMd}px`,
                '--md-translateX': `${translateX.mobile}px`,
              }}
            >
              {line.top && (
                <p
                  className="leading-13.75 md:leading-7.5 px-3.75 align-top whitespace-nowrap m-0"
                  style={{
                    height: `${lineHeight}px`,
                    lineHeight: `${lineHeight - 5}px`,
                  }}
                >
                  {line.top}
                </p>
              )}
              {line.bottom && (
                <p
                  className="leading-13.75 md:leading-7.5 px-3.75 align-top whitespace-nowrap m-0"
                  style={{
                    height: `${lineHeight}px`,
                    lineHeight: `${lineHeight - 5}px`,
                  }}
                >
                  {line.bottom}
                </p>
              )}
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export { LayeredText };
