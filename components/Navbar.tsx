
import React from 'react';

export const Navbar: React.FC = () => {
  return (
    <nav className="fixed top-0 left-0 w-full z-50 px-12 py-10 flex justify-between items-center mix-blend-difference pointer-events-none">
      <div className="pointer-events-auto">
        <a href="#" className="text-[11px] md:text-xs font-serif tracking-[0.8em] hover:opacity-70 transition-opacity uppercase font-light text-white leading-none">
          ÆSTHETE
        </a>
      </div>
      <div className="hidden md:flex gap-12 text-[9px] tracking-[0.4em] uppercase pointer-events-auto font-light text-white/60">
        <a href="#lookbook" className="hover:text-white transition-colors">Archives</a>
        <a href="#atelier" className="hover:text-white transition-colors">Atelier</a>
        <a href="#" className="hover:text-white transition-colors">Bespoke</a>
      </div>
    </nav>
  );
};
