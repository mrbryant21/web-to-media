import React, { useState, useEffect, useRef, useLayoutEffect } from 'react';
import { Menu, X, ArrowUpRight, ChevronDown } from 'lucide-react';
import gsap from 'gsap';

// Updated Data Structure with Sub-links
const navLinks = [
  { title: 'Home', href: '/' },
  { title: 'Works', href: '/works' },
  {
    title: 'Services',
    href: '/services', // We will intercept this click
    subLinks: [
      { name: 'Web Design & Development', href: '/services/web-dev' },
      { name: 'Mobile and Web Applications', href: '/services/apps' },
      { name: 'Digital Marketing', href: '/services/marketing' },
      { name: 'Multimedia Systems', href: '/services/multimedia' },
      { name: 'Branding and Printing', href: '/services/branding' },
    ],
  },
  { title: 'About', href: '/about' },
  { title: 'Contact', href: '/contact' },
];

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [activeSubMenu, setActiveSubMenu] = useState(null); // Tracks which menu is expanded

  const containerRef = useRef(null);
  const tl = useRef();

  // Ref to animate sub-links specifically
  const subMenuRef = useRef(null);

  // 1. Lock Body Scroll
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : 'auto';
    // Reset submenu when main menu closes
    if (!open) setActiveSubMenu(null);
  }, [open]);

  // 2. Setup Main Menu GSAP Animation
  useLayoutEffect(() => {
    let ctx = gsap.context(() => {
      tl.current = gsap
        .timeline({ paused: true })
        .to('.menu-overlay', {
          yPercent: 100,
          duration: 1,
          ease: 'power4.inOut',
        })
        .from(
          '.menu-link-item',
          {
            y: 100,
            opacity: 0,
            stagger: 0.1,
            duration: 0.8,
            ease: 'power3.out',
          },
          '-=0.6'
        )
        .from(
          '.menu-info-item',
          {
            y: 20,
            opacity: 0,
            duration: 0.6,
            stagger: 0.1,
          },
          '-=0.6'
        );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  // 3. Play/Reverse Main Animation
  useEffect(() => {
    if (open) {
      tl.current.play();
    } else {
      tl.current.reverse();
    }
  }, [open]);

  // 4. Handle Sub-menu Animation
  useEffect(() => {
    if (activeSubMenu && subMenuRef.current) {
      gsap.fromTo(
        '.sub-menu-link',
        { y: -20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.4, stagger: 0.05, ease: 'power2.out' }
      );
    }
  }, [activeSubMenu]);

  const handleLinkClick = (link) => {
    if (link.subLinks) {
      // Toggle submenu
      setActiveSubMenu(activeSubMenu === link.title ? null : link.title);
    } else {
      // Normal navigation
      setOpen(false);
    }
  };

  return (
    <div ref={containerRef}>
      {/* --- TOP BAR (Visible) --- */}
      <nav className="flex items-center justify-between max-w-7xl mx-auto px-6 py-6 relative z-50">
        <button
          onClick={() => setOpen(true)}
          className="group flex items-center gap-3 focus:outline-none"
        >
          <div className="bg-white/10 p-2 rounded-full group-hover:bg-white/20 transition-colors">
            <Menu className="w-6 h-6 text-stone-950" />
          </div>
          <span className="text-sm font-medium text-stone-950 uppercase tracking-widest hidden sm:block">
            Menu
          </span>
        </button>
      </nav>

      {/* --- FULL SCREEN MENU OVERLAY --- */}
      <div className="menu-overlay fixed inset-0 bg-neutral-950 z-50 flex flex-col -translate-y-full overflow-y-auto">
        {/* Header inside Menu (Close Button) */}
        <div className="max-w-7xl mx-auto w-full px-6 py-6 flex justify-end shrink-0">
          <button
            onClick={() => setOpen(false)}
            className="group flex items-center gap-3 text-white focus:outline-none"
          >
            <span className="text-sm font-medium uppercase tracking-widest hidden sm:block group-hover:text-neutral-400 transition-colors">
              Close
            </span>
            <div className="bg-white text-black p-2 rounded-full group-hover:bg-neutral-300 transition-colors">
              <X className="w-6 h-6" />
            </div>
          </button>
        </div>

        {/* Menu Content Grid */}
        <div className="flex-1 flex flex-col lg:flex-row items-start lg:items-center justify-between max-w-7xl mx-auto w-full px-6 pb-12">
          {/* LEFT: Main Navigation Links */}
          <div className="flex flex-col space-y-4 mb-12 lg:mb-0 w-full lg:w-auto">
            {navLinks.map((link, idx) => {
              const hasSubLinks = !!link.subLinks;
              const isExpanded = activeSubMenu === link.title;

              return (
                <div key={idx} className="menu-link-item flex flex-col">
                  {/* MAIN LINK ITEM */}
                  <button
                    onClick={() => handleLinkClick(link)}
                    className="group flex items-center text-left gap-4 text-5xl md:text-5xl lg:text-5xl text-white hover:text-orange-400 transition-colors mt-3 font-display border-b border-neutral-800 pb-2 w-full"
                  >
                    <span className="text-lg md:text-xl font-normal text-neutral-500 mt-2 font-mono">
                      0{idx + 1}
                    </span>
                    <span className="flex-1">{link.title}</span>

                    {/* Arrow Indicator for Services */}
                    {hasSubLinks && (
                      <ChevronDown
                        className={`w-8 h-8 text-neutral-500 transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''}`}
                      />
                    )}
                  </button>

                  {/* SUB MENU ITEMS */}
                  {hasSubLinks && isExpanded && (
                    <div
                      ref={subMenuRef}
                      className="flex flex-col pl-12 mt-4 space-y-3 border-l-2 border-neutral-800 ml-2"
                    >
                      {link.subLinks.map((sub, subIdx) => (
                        <a
                          key={subIdx}
                          href={sub.href}
                          onClick={() => setOpen(false)}
                          className="sub-menu-link text-xl text-neutral-400 hover:text-white transition-colors block py-1"
                        >
                          {sub.name}
                        </a>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* RIGHT: Contact & Socials (Secondary Info) */}
          <div className="menu-info-item flex flex-col gap-8 text-neutral-400 lg:text-right max-w-xs ml-auto mt-8 lg:mt-0">
            <div className="flex flex-col gap-2">
              <h4 className="text-white uppercase tracking-widest text-sm mb-2">
                Get in touch
              </h4>
              <a
                href="mailto:hello@agency.com"
                className="hover:text-cyan-400 transition-colors text-lg"
              >
                hello@agency.com
              </a>
              <p className="text-lg">+233 55 123 4567</p>
            </div>

            <div className="flex flex-col gap-2">
              <h4 className="text-white uppercase tracking-widest text-sm mb-2">
                Socials
              </h4>
              <div className="flex lg:justify-end gap-6">
                <a href="#" className="hover:text-white transition-colors">
                  Instagram
                </a>
                <a href="#" className="hover:text-white transition-colors">
                  LinkedIn
                </a>
                <a href="#" className="hover:text-white transition-colors">
                  Twitter
                </a>
              </div>
            </div>

            <a
              href="/start-project"
              className="mt-4 bg-white text-black px-6 py-3 rounded-full font-bold flex items-center justify-center gap-2 hover:bg-cyan-400 hover:text-black transition-colors"
            >
              Start a Project <ArrowUpRight size={18} />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
