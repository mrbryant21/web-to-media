import React, { useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const stats = [
  {
    id: 1,
    value: 150,
    suffix: '+',
    label: 'Projects Delivered',
    description: 'Successful launches across 12 industries.',
  },
  {
    id: 2,
    value: 98,
    suffix: '%',
    label: 'Client Retention',
    description: 'Long-term partnerships defined by trust.',
  },
  {
    id: 3,
    value: 12,
    suffix: 'M+',
    label: 'Users Impacted',
    description: 'Daily active users on our platforms.',
  },
  {
    id: 4,
    value: 24,
    suffix: '/7',
    label: 'Support & Uptime',
    description: 'Round-the-clock monitoring and reliability.',
  },
];

const StatsSection = () => {
  const sectionRef = useRef(null);
  const numbersRef = useRef([]);
  const linesRef = useRef([]);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // 1. Animate the vertical separator lines growing
      gsap.fromTo(
        linesRef.current,
        { scaleY: 0, opacity: 0 },
        {
          scaleY: 1,
          opacity: 1,
          duration: 1.5,
          stagger: 0.2,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 75%',
          },
        }
      );

      // 2. Animate Numbers counting up
      numbersRef.current.forEach((el, index) => {
        if (!el) return;

        const targetValue = stats[index].value;
        const proxy = { val: 0 };

        gsap.to(proxy, {
          val: targetValue,
          duration: 2,
          ease: 'power4.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
          },
          onUpdate: () => {
            el.textContent = Math.floor(proxy.val);
          },
        });

        // Slight fade up for the whole text block
        gsap.from(el.closest('.stat-item'), {
          y: 30,
          opacity: 0,
          duration: 1,
          delay: index * 0.1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
          },
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    // No background color here, so it uses your body's background
    <section ref={sectionRef} className="py-24 px-6 relative">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 relative">
          {stats.map((stat, index) => (
            <div
              key={stat.id}
              className="stat-item group relative px-8 py-8 lg:py-0 flex flex-col justify-center items-center text-center"
            >
              {/* --- Dynamic Borders --- */}
              {/* Right Border (Desktop only, not on last item) */}
              {index !== stats.length - 1 && (
                <div
                  ref={(el) => linesRef.current.push(el)}
                  className="hidden lg:block absolute right-0 top-4 bottom-4 w-px bg-gradient-to-b from-transparent via-white/20 to-transparent origin-top"
                />
              )}
              {/* Bottom Border (Mobile/Tablet only, not on last item) */}
              {index !== stats.length - 1 && (
                <div className="lg:hidden absolute bottom-0 left-12 right-12 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />
              )}

              {/* --- Content --- */}
              <div className="relative z-10">
                <div className="flex items-baseline justify-center gap-1 mb-2">
                  <span
                    ref={(el) => (numbersRef.current[index] = el)}
                    className="text-6xl md:text-7xl font-bold text-white tabular-nums tracking-tighter"
                  >
                    0
                  </span>
                  <span className="text-3xl md:text-4xl font-light text-neutral-400 opacity-80">
                    {stat.suffix}
                  </span>
                </div>

                <h4 className="text-lg font-medium text-white/90 mb-2 tracking-wide">
                  {stat.label}
                </h4>

                <p className="text-sm text-white/40 max-w-[200px] mx-auto leading-relaxed group-hover:text-white/60 transition-colors duration-300">
                  {stat.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatsSection;
