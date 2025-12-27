import React, { useLayoutEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export function ZoomParallax({ items }) {
  const container = useRef(null);
  const itemWrappers = useRef([]);

  // Scale factors for exactly 7 items
  // Index: 0  1  2  3  4  5  6
  const scaleFactors = [4, 5, 6, 5, 6, 8, 9];

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: container.current,
          start: 'top top',
          end: 'bottom bottom',
          scrub: true,
        },
      });

      itemWrappers.current.forEach((el, index) => {
        if (!el) return;
        const targetScale = scaleFactors[index % scaleFactors.length];

        tl.to(
          el,
          {
            scale: targetScale,
            ease: 'none',
          },
          0
        );
      });
    }, container);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={container} className="relative h-[500vh]">
      <div className="sticky top-0 h-screen overflow-hidden">
        {items.map((item, index) => {
          return (
            <div
              key={index}
              ref={(el) => (itemWrappers.current[index] = el)}
              // Logic for 7 items (Index 0 is centered by default, 1-6 are positioned)
              className={`absolute top-0 flex h-full w-full items-center justify-center 
              ${
                index === 1
                  ? '[&>div]:!-top-[30vh] [&>div]:!left-[5vw] [&>div]:!h-[30vh] [&>div]:!w-[35vw]'
                  : ''
              } 
              ${
                index === 2
                  ? '[&>div]:!-top-[10vh] [&>div]:!-left-[25vw] [&>div]:!h-[45vh] [&>div]:!w-[20vw]'
                  : ''
              } 
              ${
                index === 3
                  ? '[&>div]:!left-[27.5vw] [&>div]:!h-[25vh] [&>div]:!w-[25vw]'
                  : ''
              } 
              ${
                index === 4
                  ? '[&>div]:!top-[27.5vh] [&>div]:!left-[5vw] [&>div]:!h-[25vh] [&>div]:!w-[20vw]'
                  : ''
              } 
              ${
                index === 5
                  ? '[&>div]:!top-[27.5vh] [&>div]:!-left-[22.5vw] [&>div]:!h-[25vh] [&>div]:!w-[30vw]'
                  : ''
              } 
              ${
                index === 6
                  ? '[&>div]:!top-[22.5vh] [&>div]:!left-[25vw] [&>div]:!h-[15vh] [&>div]:!w-[15vw]'
                  : ''
              } 
              `}
            >
              {/* REMOVED rounded-xl here for sharp corners */}
              <div className="relative h-[25vh] w-[25vw] overflow-hidden shadow-2xl">
                {item.type === 'video' ? (
                  <video
                    src={item.src}
                    poster={item.poster}
                    className="h-full w-full object-cover"
                    autoPlay
                    muted
                    loop
                    playsInline
                  />
                ) : (
                  <img
                    src={item.src || '/placeholder.svg'}
                    alt={item.alt || `Parallax item ${index + 1}`}
                    className="h-full w-full object-cover"
                  />
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}