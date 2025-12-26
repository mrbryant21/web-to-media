import { ArrowRight } from 'lucide-react';
import Navbar from './Navbar.jsx';
import { LayeredText } from './ServicesText.jsx';
const Hero = () => {
  return (
    <section className="relative bg-black text-white overflow-hidden h-full">
      {/* Radial gradient background */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse at center, rgba(99, 102, 241, 0.15) 0%, rgba(0, 0, 0, 0) 70%)',
        }}
      />

      {/* Static grid */}
      <div className="absolute inset-0 bg-grid-white pointer-events-none" />

      {/* Animated lightning bolts */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Lightning 1 - diagonal down-right */}
        <div
          className="absolute w-px h-48 bg-linear-to-b from-transparent via-indigo-400 to-transparent"
          style={{
            left: '20%',
            top: '10%',
            animation: 'lightning-diagonal-down 6s linear infinite',
            animationDelay: '0s',
            boxShadow: '0 0 8px rgba(99, 102, 241, 0.8)',
          }}
        />

        {/* Lightning 2 - horizontal right */}
        <div
          className="absolute h-px w-64 bg-linear-to-r from-transparent via-purple-400 to-transparent"
          style={{
            left: '10%',
            top: '50%',
            animation: 'lightning-horizontal 7s linear infinite',
            animationDelay: '1s',
            boxShadow: '0 0 8px rgba(168, 85, 247, 0.8)',
          }}
        />

        {/* Lightning 3 - vertical down */}
        <div
          className="absolute w-px h-56 bg-linear-to-b from-transparent via-indigo-300 to-transparent"
          style={{
            left: '70%',
            top: '20%',
            animation: 'lightning-vertical 5s linear infinite',
            animationDelay: '2s',
            boxShadow: '0 0 8px rgba(129, 140, 248, 0.8)',
          }}
        />

        {/* Lightning 4 - diagonal up-right */}
        <div
          className="absolute w-px h-48 linear-to-b from-transparent via-purple-300 to-transparent"
          style={{
            left: '30%',
            top: '60%',
            animation: 'lightning-diagonal-up 6.5s linear infinite',
            animationDelay: '3s',
            boxShadow: '0 0 8px rgba(216, 180, 254, 0.8)',
          }}
        />

        {/* Lightning 5 - reverse diagonal (bottom-right to top-left) */}
        <div
          className="absolute w-px h-48 bg-linear-to-b from-transparent via-indigo-400 to-transparent"
          style={{
            left: '85%',
            top: '40%',
            animation: 'lightning-reverse-diagonal 7s linear infinite',
            animationDelay: '4s',
            boxShadow: '0 0 8px rgba(99, 102, 241, 0.8)',
          }}
        />

        {/* Lightning 6 - horizontal left */}
        <div
          className="absolute h-px w-48 bg-linear-to-r from-transparent via-purple-500 to-transparent"
          style={{
            left: '50%',
            top: '25%',
            animation: 'lightning-horizontal 5.5s linear infinite',
            animationDelay: '5s',
            boxShadow: '0 0 8px rgba(168, 85, 247, 0.8)',
          }}
        />
      </div>

      <div className="relative max-w-7xl mx-auto px-6 py-8 z-10">
        <div className="logo-and-nav flex items-center justify-between mb-4 relative z-20">
          <img className="h-20" src="/logo.png" alt="Logo" />

          <div className="space-x-4 flex items-center">
            <a
              href=""
              className="bg-white flex items-center text-stone-500 py-2 px-4 rounded-full hover:translate-x-1 transition"
            >
              Ready to go Digital?
              <ArrowRight
                size={20}
                className="ml-2 bg-purple-600 text-white p-1 rounded-full"
              />
            </a>
            <Navbar />
          </div>
        </div>
        <div className="flex items-center justify-center mx-auto text-center py-4">
          <h1 className="text-6xl font-bold text-white">
            Crafting Digital Experiences with Precision
          </h1>
        </div>
        <div className="grid grid-cols-3 gap-6 h-full py-4 mx-auto">
          <div className="flex flex-col gap-6">
            <div className=" rounded-lg text-white flex items-center justify-center">
              <p className="text-lg text-gray-300 leading-relaxed">
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
            <div className="overflow-hidden relative h-full w-full">
              <LayeredText />
            </div>
          </div>
          <div className="col-span-2 ">
            <div className=" h-104 flex items-center justify-center overflow-hidden">
              <video
                autoPlay
                loop
                muted
                playsInline
                className="w-full object-cover rounded-lg"
              >
                <source src="/videos/website-reel.webm" type="video/webm" />
                Your browser does not support the video tag.
              </video>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 w-full h-24 bg-linear-to-t from-black to-transparent" />
    </section>
  );
};

export default Hero;
