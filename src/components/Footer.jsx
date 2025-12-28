import React from 'react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative  text-neutral-300 overflow-hidden selection:bg-neutral-500 selection:text-white">
      {/* 1. BACKGROUND OVERLAY */}
      {/* pointer-events-none: Ensures clicks pass through to the links 
          select-none: Prevents user from accidentally highlighting the giant text
          whitespace-nowrap: Keeps the name on one line
      */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-0">
        <h1 className="font-black text-neutral-800 text-[18vw] leading-none opacity-40 select-none whitespace-nowrap tracking-tighter">
          WEBTOMEDIA
        </h1>
      </div>

      {/* 2. MAIN CONTENT (z-10 to sit above background) */}
      <div className="relative z-10 px-4 pt-20 pb-12 mx-auto max-w-7xl sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-4 lg:gap-8">
          {/* Column 1: Brand & Desc */}
          <div className="space-y-6 lg:col-span-1">
            <div className="flex items-center gap-2 text-2xl font-bold text-white tracking-tight">
              {/* Optional Logo Icon */}
              <img src="/logo.png" alt="" />
            </div>
            <p className="text-sm leading-relaxed text-neutral-400 max-w-xs">
              Crafting digital experiences that merge data with design. We build
              the future of the web, one pixel at a time.
            </p>

            {/* Social Icons (using placeholders) */}
            <div className="flex gap-4 pt-2">
              {['Twitter', 'GitHub', 'LinkedIn', 'Dribbble'].map((social) => (
                <a
                  key={social}
                  href="#"
                  className="w-10 h-10 rounded-full bg-neutral-900 border border-neutral-800 flex items-center justify-center transition-colors hover:border-neutral-500 hover:text-neutral-400"
                  aria-label={social}
                >
                  <span className="text-xs font-medium">{social[0]}</span>
                </a>
              ))}
            </div>
          </div>

          {/* Column 2: Services */}
          <div>
            <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-6">
              Services
            </h3>
            <ul className="space-y-4">
              {[
                'Web Design & Development',
                'Web & Mobile Applications',
                'Digital Marketing',
                'Multimedia Solutions',
                'Branding & Printing',
              ].map((item) => (
                <li key={item}>
                  <a
                    href="#"
                    className="text-sm hover:text-neutral-400 transition-colors duration-200 block w-fit group"
                  >
                    <span className="inline-block w-0 transition-all duration-300 overflow-hidden group-hover:w-2 text-neutral-500 mr-0 group-hover:mr-1">
                      /
                    </span>
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Company */}
          <div>
            <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-6">
              Company
            </h3>
            <ul className="space-y-4">
              {['About Us', 'Careers', 'Portfolio', 'Contact Us'].map(
                (item) => (
                  <li key={item}>
                    <a
                      href="#"
                      className="text-sm hover:text-neutral-400 transition-colors duration-200 block w-fit group"
                    >
                      <span className="inline-block w-0 transition-all duration-300 overflow-hidden group-hover:w-2 text-neutral-500 mr-0 group-hover:mr-1">
                        /
                      </span>
                      {item}
                    </a>
                  </li>
                )
              )}
            </ul>
          </div>

          {/* Column 4: Newsletter */}
          <div className="lg:col-span-1">
            <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-6">
              Stay Updated
            </h3>
            <p className="text-sm text-neutral-400 mb-4">
              Subscribe to our newsletter for the latest tech trends.
            </p>
            <form className="flex flex-col gap-3">
              <input
                type="email"
                placeholder="Enter your email"
                className="bg-neutral-900 border border-neutral-800 rounded-lg px-4 py-3 text-sm text-white focus:outline-none focus:border-neutral-500 focus:ring-1 focus:ring-neutral-500 transition-all"
              />
              <button
                type="button"
                className="bg-white text-neutral-950 font-semibold rounded-lg px-4 py-3 text-sm hover:bg-neutral-400 transition-colors"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>

        {/* Separator */}
        <div className="h-px bg-neutral-800/50 my-10" />

        {/* Bottom Bar */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-neutral-500">
          <p>&copy; {currentYear} WebtoMedia Inc. All rights reserved.</p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-white transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="hover:text-white transition-colors">
              Terms of Service
            </a>
            <a href="#" className="hover:text-white transition-colors">
              Cookies
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
