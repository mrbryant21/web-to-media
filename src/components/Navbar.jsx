import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';

const Navbar = () => {
  const [open, setOpen] = useState(false);

  // Prevent body scroll when menu is open
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : 'auto';
  }, [open]);

  return (
    <>
      <nav className="flex items-center justify-between max-w-7xl mx-auto px-6 py-4">
        {/* Hamburger Button */}
        <button
          onClick={() => setOpen(true)}
          aria-label="Open menu"
          className="text-white focus:outline-none"
        >
          <Menu className="w-7 h-7" />
        </button>
      </nav>

      {/* Overlay */}
      <div
        className={`fixed inset-0 z-40 bg-black/80 backdrop-blur-sm transition-opacity duration-300 ${
          open ? 'opacity-100 visible' : 'opacity-0 invisible'
        }`}
        onClick={() => setOpen(false)}
      />

      {/* Menu Panel */}
      <aside
        className={`fixed inset-0 z-50 bg-black text-white p-10 flex flex-col space-y-10 transform transition-transform duration-300 ${
          open ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex justify-between items-center">
          <span className="text-2xl font-bold">Menu</span>
          <button onClick={() => setOpen(false)} aria-label="Close menu">
            <X className="w-8 h-8" />
          </button>
        </div>

        <nav className="flex flex-col gap-8 text-2xl">
          <a
            href="/"
            onClick={() => setOpen(false)}
            className="hover:text-neutral-400 transition"
          >
            Home
          </a>
          <a
            href="/about"
            onClick={() => setOpen(false)}
            className="hover:text-neutral-400 transition"
          >
            About
          </a>
          <a
            href="/services"
            onClick={() => setOpen(false)}
            className="hover:text-neutral-400 transition"
          >
            Services
          </a>
          <a
            href="/work"
            onClick={() => setOpen(false)}
            className="hover:text-neutral-400 transition"
          >
            Work
          </a>
          <a
            href="/contact"
            onClick={() => setOpen(false)}
            className="hover:text-neutral-400 transition"
          >
            Contact
          </a>
        </nav>
      </aside>
    </>
  );
};

export default Navbar;
