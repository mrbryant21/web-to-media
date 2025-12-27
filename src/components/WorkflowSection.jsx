import React, { useLayoutEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  Lightbulb,
  Palette,
  Code,
  Rocket,
  ArrowRight,
  CheckCircle2,
} from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const workflowSteps = [
  {
    number: '01',
    title: 'Discovery & Strategy',
    description:
      'We dive deep into your business goals, target audience, and competitive landscape to craft a roadmap that aligns with your vision.',
    icon: <Lightbulb className="w-6 h-6" />,
    color: '#818cf8', // Indigo
  },
  {
    number: '02',
    title: 'Design & Prototyping',
    description:
      'Our creative team transforms abstract ideas into stunning visual designs, creating interactive prototypes for your direct feedback.',
    icon: <Palette className="w-6 h-6" />,
    color: '#c084fc', // Purple
  },
  {
    number: '03',
    title: 'Development & Testing',
    description:
      'Clean code, modern frameworks, and rigorous testing ensure your product is scalable, secure, and performs flawlessly across devices.',
    icon: <Code className="w-6 h-6" />,
    color: '#f472b6', // Pink
  },
  {
    number: '04',
    title: 'Launch & Scale',
    description:
      'We deploy your solution with zero downtime and continuously monitor performance, optimizing for maximum impact and ROI.',
    icon: <Rocket className="w-6 h-6" />,
    color: '#fb7185', // Rose
  },
];

const WorkflowSection = () => {
  const containerRef = useRef(null);
  const lineRef = useRef(null);
  const beamRef = useRef(null);
  const stepsRef = useRef([]);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // 1. Animate the connecting beam (The "Fill" effect)
      gsap.fromTo(
        beamRef.current,
        { scaleY: 0 },
        {
          scaleY: 1,
          ease: 'none',
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top 40%', // Start filling when section hits 40% viewport
            end: 'bottom 80%',
            scrub: 0, // Instant response to scroll
          },
        }
      );

      // 2. Animate elements as they come into view
      stepsRef.current.forEach((step, index) => {
        if (!step) return;

        const card = step.querySelector('.workflow-card');
        const iconNode = step.querySelector('.workflow-node');
        const iconInner = step.querySelector('.workflow-icon-inner');

        // Card entrance
        gsap.fromTo(
          card,
          {
            y: 50,
            opacity: 0,
            rotateX: 10,
          },
          {
            y: 0,
            opacity: 1,
            rotateX: 0,
            duration: 0.8,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: step,
              start: 'top 80%',
            },
          }
        );

        // Icon Node "Lighting Up" effect
        gsap.fromTo(
          iconNode,
          { scale: 0.8, opacity: 0.5, filter: 'grayscale(100%)' },
          {
            scale: 1,
            opacity: 1,
            filter: 'grayscale(0%)',
            duration: 0.4,
            ease: 'back.out(2)',
            scrollTrigger: {
              trigger: step,
              start: 'top 60%', // When the "beam" passes the icon
              toggleActions: 'play none none reverse',
            },
          }
        );

        // Continuous rotation for icon inner
        gsap.to(iconInner, {
          rotation: 360,
          duration: 20,
          repeat: -1,
          ease: 'linear',
        });
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section className="relative py-32 overflow-hidden" ref={containerRef}>
      <div className="relative z-10 max-w-7xl mx-auto px-6">
        {/* --- Header --- */}
        <div className="mb-24 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-indigo-300 text-xs font-medium tracking-wider uppercase mb-6 backdrop-blur-md">
            <span className="w-2 h-2 rounded-full bg-indigo-500 animate-pulse" />
            Process
          </div>
          <h2 className="text-5xl md:text-7xl font-semibold text-white tracking-tight font-display">
            How we Bring{' '} <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-neutral-200 to-neutral-500">
              Ideas to Life
            </span>
          </h2>
          <p className="text-lg text-neutral-400">
            Our streamlined workflow ensures transparency and efficiency at
            every stage of the development cycle.
          </p>
        </div>

        {/* --- Timeline Container --- */}
        <div className="relative">
          {/* Central Line Structure */}
          <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px -translate-x-1/2 md:transform-none">
            {/* Base Line */}
            <div ref={lineRef} className="w-full h-full bg-neutral-800" />
            {/* Active Beam (Fills on Scroll) */}
            <div
              ref={beamRef}
              className="absolute top-0 left-0 w-full h-full bg-linear-to-b from-indigo-500 via-purple-500 to-pink-500 origin-top shadow-[0_0_15px_rgba(168,85,247,0.6)]"
            />
          </div>

          {/* Steps */}
          <div className="space-y-12 md:space-y-24">
            {workflowSteps.map((step, index) => (
              <div
                key={index}
                ref={(el) => (stepsRef.current[index] = el)}
                className={`relative flex items-center md:justify-between gap-8 ${
                  index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                }`}
              >
                {/* --- Timeline Node (Icon on the line) --- */}
                {/* Mobile: Left aligned / Desktop: Center */}
                <div className="absolute left-4 md:left-1/2 -translate-x-1/2 z-20 flex items-center justify-center">
                  <div className="workflow-node relative flex items-center justify-center w-12 h-12 rounded-full bg-neutral-950 border border-neutral-800 shadow-xl z-20">
                    {/* Glow behind icon */}
                    <div
                      className="absolute inset-0 rounded-full opacity-20 blur-md transition-colors duration-500"
                      style={{ backgroundColor: step.color }}
                    />
                    <div className="workflow-icon-inner text-white relative z-10">
                      {/* Render small dot or custom shape */}
                      <div className="w-3 h-3 bg-white rounded-full" />
                    </div>

                    {/* Orbit ring */}
                    <div
                      className="absolute inset-0 -m-1 border border-dashed border-white/20 rounded-full animate-spin-slow"
                      style={{ animationDuration: '10s' }}
                    />
                  </div>
                </div>

                {/* --- Content Card --- */}
                <div
                  className={`workflow-card group relative w-full md:w-[45%] pl-16 md:pl-0 ${
                    index % 2 === 0 ? 'md:text-right' : 'md:text-left'
                  }`}
                >
                  {/* Glass Card */}
                  <div className="relative bg-neutral-900/50 backdrop-blur-sm border border-white/5 rounded-2xl p-8 transition-all duration-300 hover:border-white/10 hover:bg-neutral-900/80 overflow-hidden">
                    {/* Gradient Hover Effect */}
                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-[radial-gradient(circle_at_top,var(--tw-gradient-stops))] from-white/5 to-transparent" />

                    {/* Large Background Number */}
                    <span
                      className="absolute -top-6 -right-6 text-[180px] font-bold text-white/2 select-none pointer-events-none transition-transform duration-500 group-hover:scale-110"
                      style={{ fontFamily: 'sans-serif' }}
                    >
                      {step.number}
                    </span>

                    {/* Content */}
                    <div className="relative z-10">
                      <div
                        className={`inline-flex items-center justify-center w-12 h-12 rounded-xl mb-6 bg-linear-to-br from-white/10 to-white/5 border border-white/10 text-white shadow-inner ${
                          index % 2 === 0 ? 'md:ml-auto' : 'md:mr-auto'
                        }`}
                      >
                        {step.icon}
                      </div>

                      <h3 className="text-2xl font-bold text-white mb-3">
                        {step.title}
                      </h3>

                      <p className="text-neutral-400 leading-relaxed mb-6">
                        {step.description}
                      </p>

                      <ul
                        className={`space-y-2 ${index % 2 === 0 ? 'md:items-end' : 'md:items-start'} flex flex-col`}
                      >
                        <li className="flex items-center gap-2 text-sm text-neutral-500">
                          <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                          <span>Strategic Implementation</span>
                        </li>
                        <li className="flex items-center gap-2 text-sm text-neutral-500">
                          <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                          <span>Quality Assurance</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>

                {/* Empty Div for grid balance */}
                <div className="hidden md:block w-[45%]" />
              </div>
            ))}
          </div>

          {/* Bottom CTA */}
          <div className="mt-32 text-center relative z-20">
            <button className="group relative inline-flex items-center gap-3 px-8 py-4 bg-white text-neutral-950 font-bold rounded-full overflow-hidden transition-all hover:scale-105">
              <div className="absolute inset-0 bg-stone-950/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <span className="relative z-10 group-hover:text-white transition-colors">
                Start Your Project
              </span>
              <ArrowRight className="w-5 h-5 relative z-10 group-hover:text-white transition-colors group-hover:translate-x-1 duration-300" />
            </button>
            <p className="mt-4 text-sm text-neutral-500">
              Ready to transform your workflow?
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WorkflowSection;
