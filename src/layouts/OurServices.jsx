import React, { useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  Monitor,
  Smartphone,
  Server,
  Printer,
  Megaphone,
  Video,
  Layers,
  ArrowUpRight,
  Code2,
} from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

// --- Data ---
const services = [
  {
    title: 'Web Design & Development',
    description:
      'High-performance architectures. From corporate landing pages to complex, headless e-commerce platforms.',
    icon: <Monitor className="w-6 h-6" />,
    colSpan: 'md:col-span-2 lg:col-span-2',
    gradient: 'from-neutral-500/20 to-neutral-400/20',
  },
  {
    title: 'Proprietary Software',
    description: 'Custom-built SaaS tools solving specific industry gaps.',
    icon: <Layers className="w-6 h-6" />,
    colSpan: 'md:col-span-1 lg:col-span-1',
    gradient: 'from-neutral-500/20 to-neutral-400/20',
  },
  {
    title: 'Digital Marketing',
    description: 'Data-driven SEO, PPC, and social strategies.',
    icon: <Megaphone className="w-6 h-6" />,
    colSpan: 'md:col-span-1 lg:col-span-1',
    gradient: 'from-neutral-500/20 to-neutral-400/20',
  },
  {
    title: 'Mobile and Web Applications',
    description: 'Native and cross-platform apps built with React Native.',
    icon: <Smartphone className="w-6 h-6" />,
    colSpan: 'md:col-span-2 lg:col-span-2',
    gradient: 'from-neutral-500/20 to-neutral-400/20',
  },
  {
    title: 'Cloud Infrastructure',
    description: '99.9% uptime, auto-scaling, and secure environments.',
    icon: <Server className="w-6 h-6" />,
    colSpan: 'md:col-span-1 lg:col-span-1',
    gradient: 'from-neutral-500/20 to-neutral-400/20',
  },
  {
    title: 'Brand Identity',
    description: 'Visual storytelling, logo design, and physical print.',
    icon: <Printer className="w-6 h-6" />,
    colSpan: 'md:col-span-1 lg:col-span-1',
    gradient: 'from-neutral-500/20 to-neutral-400/20',
  },
  {
    title: 'Multimedia Production',
    description: 'Motion graphics and 4K video production.',
    icon: <Video className="w-6 h-6" />,
    colSpan: 'md:col-span-1 lg:col-span-1',
    gradient: 'from-neutral-500/20 to-neutral-400/20',
  },
];

// --- Components ---

// 1. The Spotlight Card Component (GSAP Optimized)
const SpotlightCard = ({ children, className = '', gradient }) => {
  const containerRef = useRef(null);
  const overlayRef = useRef(null);

  const handleMouseMove = (e) => {
    if (!containerRef.current || !overlayRef.current) return;

    const { left, top } = containerRef.current.getBoundingClientRect();
    const x = e.clientX - left;
    const y = e.clientY - top;

    // Direct DOM manipulation for maximum performance (no React re-renders)
    overlayRef.current.style.opacity = '1';
    overlayRef.current.style.background = `radial-gradient(600px circle at ${x}px ${y}px, rgba(255,255,255,0.06), transparent 40%)`;
  };

  const handleMouseLeave = () => {
    if (!overlayRef.current) return;
    overlayRef.current.style.opacity = '0';
  };

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`relative rounded-3xl border border-neutral-800 bg-neutral-900/50 overflow-hidden ${className}`}
    >
      {/* Spotlight Effect overlay */}
      <div
        ref={overlayRef}
        className="pointer-events-none absolute -inset-px opacity-0 transition-opacity duration-300"
      />
      {/* Content */}
      <div className="relative h-full">{children}</div>
    </div>
  );
};

// 2. Main Section
const ServicesSection = () => {
  const sectionRef = useRef(null);
  const headerRef = useRef(null);
  const cardsRef = useRef([]);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // 1. Animate Header Elements
      const headerChildren = headerRef.current.children;
      gsap.fromTo(
        headerChildren,
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          stagger: 0.2,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: headerRef.current,
            start: 'top 80%',
          },
        }
      );

      // 2. Animate Grid Cards (Staggered Entrance)
      gsap.fromTo(
        cardsRef.current,
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.1, // This creates the cascade effect
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 70%',
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative py-24 px-6 overflow-hidden">
      {/* Ambient Background Glows */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-neutral-500/10 rounded-full blur-[128px] pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-neutral-500/10 rounded-full blur-[128px] pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Header */}
        <div
          ref={headerRef}
          className="mb-20 flex flex-col md:flex-row md:items-end justify-between gap-8"
        >
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-neutral-900 border border-neutral-800 text-neutral-400 text-xs font-medium mb-6">
              <Code2 className="w-3 h-3" />
              <span>Digital Transformation</span>
            </div>
            <h2 className="text-7xl md:text-7xl font-semibold text-white tracking-tight font-display">
              Building the{' '}
              <span className="text-transparent bg-clip-text bg-linear-to-r from-neutral-200 to-neutral-500">
                digital future.
              </span>
            </h2>
            <p className="mt-4">
              Empowering brands and businesses with a full spectrum of digital
              services, we blend engineering, creativity, and strategy to
              deliver solutions that drive growth and innovation. From robust
              web platforms and custom software to marketing, mobile, and
              multimedia, our team transforms ideas into impactful digital
              experiences tailored to your goals.
            </p>
          </div>

          <div>
            <a
              href="#"
              className="group inline-flex items-center gap-2 px-6 py-3 bg-white text-neutral-950 rounded-full font-medium transition-transform hover:scale-105"
            >
              Start a Project
              <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
            </a>
          </div>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {services.map((service, index) => (
            <div
              key={index}
              ref={(el) => (cardsRef.current[index] = el)}
              className={service.colSpan}
            >
              <SpotlightCard
                className="h-full group"
                gradient={service.gradient}
              >
                <div className="p-8 h-full flex flex-col relative z-10">
                  {/* Hover Gradient Bloom */}
                  <div
                    className={`absolute top-0 right-0 w-32 h-32 bg-linear-to-br ${service.gradient} opacity-0 group-hover:opacity-100 blur-2xl transition-opacity duration-500 pointer-events-none`}
                  />

                  <div className="flex items-start justify-between mb-8">
                    <div
                      className={`p-3 rounded-2xl bg-neutral-800/50 border border-neutral-700/50 text-white group-hover:scale-110 group-hover:bg-neutral-800 transition-all duration-300`}
                    >
                      {service.icon}
                    </div>
                    <ArrowUpRight className="w-5 h-5 text-neutral-600 group-hover:text-white group-hover:translate-x-1 group-hover:-translate-y-1 transition-all duration-300" />
                  </div>

                  <div className="mt-auto">
                    <h3 className="text-xl font-medium text-white mb-3">
                      {service.title}
                    </h3>
                    <p className="text-neutral-400 leading-relaxed">
                      {service.description}
                    </p>
                  </div>
                </div>
              </SpotlightCard>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
