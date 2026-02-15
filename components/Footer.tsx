
import React from 'react';

export const Footer: React.FC = () => {
  return (
    <footer className="py-20 px-8 border-t border-white/5 bg-[#0a0a0a]">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-12 text-center md:text-left">
        <div className="order-2 md:order-1">
          <p className="text-[9px] tracking-[0.4em] uppercase text-neutral-600">
            &copy; 2025 Aesthete Atelier. All Rights Reserved.
          </p>
        </div>
        
        <div className="order-1 md:order-2 flex gap-12 text-[9px] tracking-[0.4em] uppercase text-neutral-500">
          <a href="#" className="hover:text-white transition-colors">Privacy</a>
          <a href="#" className="hover:text-white transition-colors">Terms</a>
          <a href="#" className="hover:text-white transition-colors">Studio</a>
        </div>

        <div className="order-3 flex gap-8">
           <div className="w-1 h-1 rounded-full bg-neutral-800" />
           <div className="w-1 h-1 rounded-full bg-neutral-800" />
           <div className="w-1 h-1 rounded-full bg-neutral-800" />
        </div>
      </div>
    </footer>
  );
};
