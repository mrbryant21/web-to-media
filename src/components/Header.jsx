import React, { useLayoutEffect, useRef } from 'react';
import { ArrowRight } from 'lucide-react';
import gsap from 'gsap';
import Navbar from './Navbar.jsx';
import { LayeredText } from './ServicesText.jsx';

const Hero = () => {
  const comp = useRef(null);

  useLayoutEffect(() => {
    let ctx = gsap.context(() => {
      // Adjusted defaults slightly, keeping power4 for that smooth "brake" effect
      const tl = gsap.timeline({ defaults: { ease: 'power4.out' } });

      // INITIAL SETUP
      gsap.set('.hero-nav-item', { y: -50, opacity: 0 });
      gsap.set('.hero-headline-word', { y: '100%', opacity: 0 });
      gsap.set('.hero-text-left', { y: 20, opacity: 0 });
      gsap.set('.hero-video-wrapper', {
        clipPath: 'inset(50% 0 50% 0)',
        scale: 1.1,
        opacity: 0,
      });

      // THE SEQUENCE
      tl.to('.hero-video-wrapper', {
        clipPath: 'inset(0% 0 0% 0)',
        scale: 1,
        opacity: 1,
        duration: 2.2, // Increased from 1.5 -> 2.2 (Slower opening)
        ease: 'power3.inOut',
      })
        .to(
          '.hero-nav-item',
          {
            y: 0,
            opacity: 1,
            stagger: 0.15, // Increased stagger for "breathing room" between nav items
            duration: 1.2, // Increased from 0.8 -> 1.2
            clearProps: 'transform',
          },
          '-=1.0' // Starts overlapping the video earlier so it feels connected, but moves slower
        )
        .to(
          '.hero-headline-word',
          {
            y: '0%',
            opacity: 1,
            stagger: 0.2, // Slower ripple effect on the text
            duration: 1.5, // Increased from 1 -> 1.5
          },
          '-=0.8'
        )
        .to(
          '.hero-text-left',
          {
            y: 0,
            opacity: 1,
            stagger: 0.3, // Slower reveal for the paragraph/services
            duration: 1.5, // Increased from 0.8 -> 1.5
          },
          '-=1.0'
        );
    }, comp);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={comp} className="relative text-white overflow-hidden h-full">
      <div className="relative max-w-7xl mx-auto px-6 py-8 z-10">
        {/* NAV SECTION */}
        <div className="logo-and-nav flex items-center justify-between mb-4 relative z-20 sm:flex sm:flex-col">
          <img className="h-20 hero-nav-item" src="/logo.png" alt="Logo" />

          <div className="space-x-4 flex items-center">
            <a
              href=""
              className="bg-white flex items-center text-neutral-500 py-2 px-4 rounded-full hover:translate-x-1 transition"
            >
              Ready to go Digital?
              <ArrowRight
                size={20}
                className="ml-2 bg-neutral-600 text-white p-1 rounded-full"
              />
            </a>

            {/* We wrap the Navbar in a div for animation targeting.
              The 'clearProps' in the GSAP code ensures that once this fades in,
              it stops affecting the positioning of the menu inside.
            */}
            <div className="relative z-50">
              <Navbar />
            </div>
          </div>
        </div>

        {/* HEADLINE SECTION */}
        <div className="flex items-center justify-center mx-auto text-center mb-4">
          <h1 className="text-7xl font-bold text-white leading-tight overflow-hidden">
            <span className="inline-block overflow-hidden align-top">
              <span className="inline-block hero-headline-word">Digital</span>
            </span>{' '}
            <span className="inline-block overflow-hidden align-top">
              <span className="inline-block hero-headline-word">
                Experiences
              </span>
            </span>{' '}
            <span className="inline-block overflow-hidden align-top">
              <span className="inline-block hero-headline-word">with</span>
            </span>{' '}
            <span className="inline-block overflow-hidden align-top">
              <span className="inline-block hero-headline-word">Precision</span>
            </span>
          </h1>
        </div>

        {/* GRID SECTION */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-full py-4 mx-auto">
          {/* LEFT COLUMN */}
          <div className="flex flex-col gap-6">
            <div className="text-white flex items-center justify-center hero-text-left">
              <p className="text-lg text-neutral-300 leading-relaxed">
                We are a creative agency specializing in{' '}
                <span className="text-white font-semibold">
                  web development
                </span>
                , <span className="text-white font-semibold">UI/UX design</span>
                , and{' '}
                <span className="text-white font-semibold">
                  digital strategy
                </span>
                . We help brands grow by building modern, scalable, and
                user-centric digital solutions.
              </p>
            </div>

            <div className="overflow-hidden relative h-full w-full hero-text-left">
              <LayeredText />
            </div>
          </div>

          {/* RIGHT COLUMN (VIDEO) */}
          <div className="col-span-1 lg:col-span-2">
            <div className="hero-video-wrapper h-104 flex items-center justify-center overflow-hidden shadow-2xl shadow-cyan-900/20">
              <video
                autoPlay
                loop
                muted
                playsInline
                className="w-full h-full object-cover"
              >
                <source src="/videos/website-reel.webm" type="video/webm" />
                Your browser does not support the video tag.
              </video>
            </div>
          </div>
        </div>
      </div>

      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-cyan-500/10 blur-[120px] pointer-events-none rounded-full z-0" />
    </section>
  );
};

export default Hero;
