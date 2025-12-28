import React from 'react';
import { ArrowRight, Calendar, Tag } from 'lucide-react'; // Using lucide-react for clean icons

// 1. Sample Data
const articles = [
  {
    id: 1,
    title:
      'The Future of Web Rendering: Server Components vs. Client Architectures',
    excerpt:
      'A deep dive into the paradigm shifts happening in React and Next.js. We analyze performance benchmarks, SEO implications, and what this means for enterprise applications in 2024 and beyond.',
    category: 'Engineering',
    date: 'Oct 12, 2023',
    image:
      'https://images.unsplash.com/photo-1633356122544-f134324a6cee?q=80&w=2070&auto=format&fit=crop',
    featured: true, // This marks the wide card
  },
  {
    id: 2,
    title: "Mastering Tailwind CSS v4.0's New Engine",
    excerpt:
      'Exploring the Rust-based engine, CSS-first configuration, and significant performance gains in development builds.',
    category: 'Development',
    date: 'Oct 5, 2023',
    image:
      'https://images.unsplash.com/photo-1587620962725-abab7fe55159?q=80&w=1931&auto=format&fit=crop',
  },
];

// 2. Reusable Article Card Component
const ArticleCard = ({ article }) => {
  const { title, excerpt, category, date, image, featured } = article;

  return (
    <article
      className={`
        relative group  overflow-hidden 
        bg-slate-900/50 backdrop-blur-sm
        border border-slate-800 
        transition-all duration-500 ease-out
        hover:border-neutral-500/50 hover:shadow-[0_0_40px_-10px_rgba(100,100,100,0.3)]
        flex flex-col
        /* If featured, span 2 columns on desktop and switch to horizontal layout */
        ${featured ? 'lg:col-span-2 lg:flex-row' : ''}
      `}
    >
      {/* Optional: Add glowing corner accents only to the featured card for extra pop */}
      {featured && (
        <>
          <div className="absolute top-0 left-0 w-px h-16 bg-linear-to-b from-neutral-500 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
          <div className="absolute top-0 left-0 h-px w-16 bg-linear-to-r from-cyan-500 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
        </>
      )}

      {/* IMAGE CONTAINER */}
      <div
        className={`relative overflow-hidden ${featured ? 'lg:w-2/5 h-64 lg:h-auto' : 'h-56'}`}
      >
        <img
          src={image}
          alt={title}
          className="object-cover w-full h-full transform transition-transform duration-700 group-hover:scale-105"
        />
        {/* Overlay gradient to ensure text readability if needed, and add mood */}
        <div className="absolute inset-0 bg-linear-to-t from-slate-950/80 via-slate-900/20 to-transparent"></div>

        {/* Top Left Category Tag on Image */}
        <div className="absolute top-4 left-4">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 text-xs font-medium tracking-wide text-neutral-300 bg-slate-950/90 border border-slate-800 rounded-full backdrop-blur-md">
            <Tag className="w-3 h-3" />
            {category}
          </span>
        </div>
      </div>

      {/* CONTENT CONTAINER */}
      <div
        className={`flex flex-col justify-between flex-1 p-6 ${featured ? 'lg:p-10' : ''}`}
      >
        <div>
          <div className="flex items-center gap-2 mb-4 text-sm text-slate-500">
            <Calendar className="w-4 h-4" />
            <span>{date}</span>
          </div>
          <h3
            className={`font-bold text-white transition-colors group-hover:text-neutral-400 ${featured ? 'text-2xl sm:text-3xl leading-tight' : 'text-xl leading-snug'}`}
          >
            {title}
          </h3>
          <p
            className={`mt-4 text-slate-400 line-clamp-3 ${featured ? 'text-base sm:text-lg' : 'text-sm'}`}
          >
            {excerpt}
          </p>
        </div>

        <div className="mt-8">
          <button className="flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-neutral-500 transition-all duration-300 group/btn hover:text-neutral-400 hover:gap-4">
            Read Now
            <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover/btn:translate-x-1" />
          </button>
        </div>
      </div>
    </article>
  );
};

// 3. Main Section Component
export default function NewsInsights() {
  return (
    <section className="py-24 relative overflow-hidden">
      {/* Subtle background grid effect */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b_1px,transparent_1px),linear-gradient(to_bottom,#1e293b_1px,transparent_1px)] bg-[size:4rem_4rem] mask-[radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_110%)] opacity-20 pointer-events-none"></div>

      <div className="relative px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div>
            <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
              News & Insights
            </h2>
            <p className="mt-4 text-lg text-neutral-400 max-w-2xl">
              Trends, deep dives, and engineering knowledge from the WebtoMedia
              team.
            </p>
          </div>
          <a
            href="#"
            className="hidden md:flex items-center gap-2 text-neutral-400 hover:text-white transition-colors group"
          >
            View all archives{' '}
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </a>
        </div>

        {/* THE GRID LAYOUT */}
        <div className="grid grid-cols-1 lg:grid-cols-3 items-stretch">
          {articles.map((article) => (
            <ArticleCard key={article.id} article={article} />
          ))}
        </div>

        <div className="mt-12 text-center md:hidden">
          <a
            href="#"
            className="inline-flex items-center gap-2 text-neutral-400 hover:text-white transition-colors group"
          >
            View all archives{' '}
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </a>
        </div>
      </div>
    </section>
  );
}
