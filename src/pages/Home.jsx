import Header from '../components/Header';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import React, { useLayoutEffect, useRef } from 'react';
import ServicesSection from '../layouts/OurServices';
import ScrollBackground from '../components/ScrollBackground';
import WorkflowSection from '../components/WorkflowSection';
import { cn } from '../lib/utils.js';
import Lenis from '@studio-freight/lenis';
import { ZoomParallax } from '../components/ZoomParallax';
import StatsSection from '../components/StatsSection';

gsap.registerPlugin(ScrollTrigger);
const Home = () => {
  const containerRef = useRef(null);

  const textContent = `Webtomedia empowers businesses and creators with innovative web solutions, blending creative design and cutting-edge technology to deliver impactful digital experiences.`;

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const words = containerRef.current.querySelectorAll('.word');

      // Animate each word with 3D transforms and blur effects
      gsap.fromTo(
        words,
        {
          opacity: 0,
          rotationX: -90,
          y: 80,
          scale: 0.8,
          filter: 'blur(10px)',
        },
        {
          opacity: 1,
          rotationX: 0,
          y: 0,
          scale: 1,
          filter: 'blur(0px)',
          duration: 1.2,
          ease: 'power3.out',
          stagger: {
            amount: 1.5,
            from: 'start',
          },
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top 70%',
            end: 'bottom 60%',
            scrub: 2,
          },
        }
      );

      // Animate gradient position on keywords
      const keywords = containerRef.current.querySelectorAll('.keyword');
      keywords.forEach((keyword) => {
        gsap.to(keyword, {
          backgroundPosition: '200% center',
          duration: 3,
          ease: 'none',
          repeat: -1,
          yoyo: true,
        });
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const keywords = [
    'empowers',
    'innovative',
    'creative',
    'cutting-edge',
    'impactful',
  ];

  const splitText = textContent.split(' ').map((word, index) => {
    const isKeyword = keywords.includes(
      word.toLowerCase().replace(/[.,]/g, '')
    );
    return (
      <span
        key={index}
        className={`word inline-block mr-2 ${isKeyword ? 'keyword text-transparent bg-clip-text' : ''}`}
        style={{
          perspective: '1000px',
          transformStyle: 'preserve-3d',
          ...(isKeyword && {
            backgroundImage:
              'linear-gradient(90deg, #818cf8, #c084fc, #f472b6, #c084fc, #818cf8)',
            backgroundSize: '200% 100%',
            backgroundPosition: '0% center',
          }),
        }}
      >
        {word}
      </span>
    );
  });

  React.useEffect(() => {
    const lenis = new Lenis();

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);
  }, []);

  const items = [
    {
      type: 'video',
      src: '../videos/website-reel.webm',
      poster: 'Center Image',
    },
    {
      type: 'video', // This will render as a video
      src: 'https://joy1.videvo.net/videvo_files/video/free/2019-09/large_watermarked/190828_27_SuperTrees_Drone_1080p_preview.mp4',
      poster:
        'https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=1280&q=80',
    },
    {
      type: 'image',
      src: 'https://images.unsplash.com/photo-1557683316-973673baf926?w=800&q=80',
      alt: 'Geometric',
    },
    {
      type: 'video', // Another video
      src: 'https://assets.mixkit.co/videos/preview/mixkit-software-developer-working-on-code-screen-close-up-1728-large.mp4',
      poster:
        'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=800&q=80',
    },
    {
      type: 'image',
      src: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&q=80',
      alt: 'Minimalist',
    },
    {
      type: 'image',
      src: 'https://images.unsplash.com/photo-1439066615861-d1af74d74000?w=1280&q=80',
      alt: 'Ocean',
    },
    {
      type: 'image',
      src: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=1280&q=80',
      alt: 'Forest',
    },
  ];
  return (
    <div className="hompage relative">
      <ScrollBackground />
      <div className="relative z-10">
        <Header />

        {/* Short description about section */}
        <section className="relative flex items-center py-20 overflow-hidden">
          <div className="max-w-7xl mx-auto px-6 py-8 text-center relative z-10">
            <div className="mb-6">
              <span className="inline-block px-4 py-2 bg-linear-to-r from-indigo-500/10 to-purple-500/10 rounded-full text-indigo-300 text-sm font-medium border border-indigo-500/20">
                About Webtomedia
              </span>
            </div>
            <h2
              ref={containerRef}
              className="text-4xl md:text-4xl font-bold leading-tight flex flex-wrap justify-start text-white font-display"
              style={{ perspective: '1000px' }}
            >
              {splitText}
            </h2>
          </div>
        </section>

        {/* Services highlights section */}
        <ServicesSection />

        {/* Trusted Partners section */}

        {/* Processes/workflow section */}
        <WorkflowSection />

        {/* Featured Projects Section */}
        <div className="mb-8 max-w-7xl mx-auto px-6">
          <div className="flex items-center justify-between">
            <div className="mb-4 max-w-3xl mx-auto">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-indigo-300 text-xs font-medium tracking-wider uppercase mb-6 backdrop-blur-md">
                <span className="w-2 h-2 rounded-full bg-indigo-500 animate-pulse" />
                Portfolio
              </div>
              <h2 className="text-5xl md:text-7xl font-semibold text-white tracking-tight font-display">
                Our Recent Works
              </h2>
              <p className="text-lg text-neutral-400">
                Our streamlined workflow ensures transparency and efficiency at
                every stage of the development cycle.
              </p>
            </div>
            <a
              className="bg-white/10 px-4 py-2 rounded-full text-sm font-medium text-white hover:bg-white/20 transition-colors duration-300"
              href="#"
            >
              View All Projects
            </a>
          </div>
        </div>
        <ZoomParallax items={items} />

        {/* Impact Metrics/Statistics Section */}
        <StatsSection />
        {/* Testimonials Section */}

        {/* CTA section */}
        {/* News & Insights */}

        {/* Footer */}
      </div>
    </div>
  );
};

export default Home;
