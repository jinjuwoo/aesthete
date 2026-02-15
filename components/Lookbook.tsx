
import React from 'react';

const TILES = [
  {
    id: 1,
    title: 'Anatomic Rigidity',
    category: 'Sculpted Tailoring',
    image: '/model_3.jpeg'
  },
  {
    id: 2,
    title: 'Monolith Portrait',
    category: 'Haute Metalware',
    image: '/model_4.jpeg'
  },
  {
    id: 3,
    title: 'Shadow Architecture',
    category: 'Gothic Silhouette',
    image: '/model_5.jpeg'
  },
  {
    id: 4,
    title: 'The Dark Drapery',
    category: 'Avant-Garde Evening',
    image: '/model.png'
  }
];

export const Lookbook: React.FC = () => {
  return (
    <section id="lookbook" className="py-32 px-8 md:px-24 bg-[#0a0a0a]">
      <div className="max-w-7xl mx-auto">
        <header className="mb-32 md:flex justify-between items-end border-b border-white/5 pb-16">
          <div className="max-w-2xl">
            <h2 className="text-4xl md:text-6xl font-serif mb-8 italic tracking-tight">Archives</h2>
            <p className="text-[11px] text-neutral-500 leading-relaxed font-light tracking-[0.2em] uppercase max-w-lg">
              A study in sculptural tension and monochromatic restraint. Born in the heart of Paris.
            </p>
          </div>
          <div className="mt-8 md:mt-0">
            <span className="text-[10px] tracking-[0.5em] uppercase text-neutral-600 font-light">Series 01.25</span>
          </div>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-20 gap-y-32">
          {TILES.map((tile, idx) => (
            <div
              key={tile.id}
              className={`group cursor-none ${idx % 2 !== 0 ? 'md:mt-48' : ''}`}
            >
              <div className="overflow-hidden bg-[#151515] aspect-[3/4] relative border border-white/5 shadow-2xl">
                <img
                  src={tile.image}
                  alt={tile.title}
                  className="w-full h-full object-cover transition-transform duration-[2.5s] ease-out group-hover:scale-110 group-hover:opacity-60 grayscale-[0.2] contrast-[1.1]"
                />
                <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
                <div className="absolute bottom-8 left-8 opacity-0 group-hover:opacity-100 transition-all duration-700 translate-y-4 group-hover:translate-y-0">
                  <p className="text-[9px] tracking-[0.4em] uppercase text-white/50">Details Archive</p>
                </div>
              </div>
              <div className="mt-12 flex justify-between items-baseline border-b border-white/0 group-hover:border-white/10 transition-all duration-1000 pb-6">
                <div>
                  <h3 className="text-2xl font-serif tracking-wide italic">{tile.title}</h3>
                  <p className="text-[9px] uppercase tracking-[0.3em] text-neutral-600 mt-3 font-light">{tile.category}</p>
                </div>
                <div className="text-neutral-700 text-[10px] tracking-[0.2em] uppercase italic group-hover:text-neutral-300 transition-colors">
                  Detail &rarr;
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
