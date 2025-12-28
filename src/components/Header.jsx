import { ArrowRight } from 'lucide-react';
import Navbar from './Navbar.jsx';
import { LayeredText } from './ServicesText.jsx';
const Hero = () => {
  return (
    <section className="relative text-white overflow-hidden h-full">
      <div className="relative max-w-7xl mx-auto px-6 py-8 z-10">
        <div className="logo-and-nav flex items-center justify-between mb-4 relative z-20">
          <img className="h-20" src="/logo.png" alt="Logo" />

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
            <div className=" text-white flex items-center justify-center">
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
      {/* <div className="absolute bottom-0 left-0 w-full h-24 bg-linear-to-t from-black to-transparent" /> */}
    </section>
  );
};

export default Hero;
