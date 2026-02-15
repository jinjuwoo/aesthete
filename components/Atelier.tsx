
import React, { useState } from 'react';

export const Atelier: React.FC = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simulate premium feedback
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
    }, 2000);
  };

  return (
    <section id="atelier" className="py-40 px-8 bg-[#0a0a0a] flex flex-col items-center">
      <div className="max-w-2xl w-full text-center">
        <h2 className="text-4xl md:text-5xl font-serif mb-8 italic">The Atelier</h2>
        <p className="text-neutral-500 text-sm mb-16 tracking-wide leading-loose font-light">
          For inquiries regarding bespoke tailoring, private viewings, or collection archives, 
          please leave your details below. Our concierge will attend to your request.
        </p>

        {!submitted ? (
          <form onSubmit={handleSubmit} className="space-y-12 text-left">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              <div className="group relative">
                <label className="block text-[9px] uppercase tracking-[0.3em] text-neutral-600 mb-2">Name</label>
                <input 
                  type="text" 
                  required
                  className="w-full bg-transparent border-b border-white/10 py-3 outline-none focus:border-white/40 transition-colors font-light text-sm"
                  placeholder="Alexander Thorne"
                />
              </div>
              <div className="group relative">
                <label className="block text-[9px] uppercase tracking-[0.3em] text-neutral-600 mb-2">Email</label>
                <input 
                  type="email" 
                  required
                  className="w-full bg-transparent border-b border-white/10 py-3 outline-none focus:border-white/40 transition-colors font-light text-sm"
                  placeholder="a.thorne@atelier.com"
                />
              </div>
            </div>

            <div className="group relative">
              <label className="block text-[9px] uppercase tracking-[0.3em] text-neutral-600 mb-2">Inquiry Type</label>
              <select className="w-full bg-transparent border-b border-white/10 py-3 outline-none focus:border-white/40 transition-colors font-light text-sm appearance-none">
                <option value="bespoke">Bespoke Commission</option>
                <option value="wholesale">Retail Partnership</option>
                <option value="press">Press & Media</option>
                <option value="other">General Inquiry</option>
              </select>
            </div>

            <div className="pt-8 flex justify-center">
              <button 
                type="submit"
                disabled={isSubmitting}
                className="group relative px-12 py-4 border border-white/10 text-[10px] tracking-[0.5em] uppercase overflow-hidden transition-all duration-500 hover:border-white/40"
              >
                <span className={`relative z-10 transition-opacity duration-500 ${isSubmitting ? 'opacity-0' : 'opacity-100'}`}>
                  Submit Inquiry
                </span>
                {isSubmitting && (
                   <span className="absolute inset-0 flex items-center justify-center animate-pulse text-neutral-500">
                      Processing...
                   </span>
                )}
                <div className="absolute inset-0 bg-white/5 translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out" />
              </button>
            </div>
          </form>
        ) : (
          <div className="py-20 animate-in fade-in slide-in-from-bottom-4 duration-1000">
            <h3 className="text-2xl font-serif italic mb-4">Acknowledged</h3>
            <p className="text-neutral-500 text-sm font-light tracking-widest">A member of our team will reach out shortly.</p>
            <button 
              onClick={() => setSubmitted(false)}
              className="mt-8 text-[9px] tracking-[0.3em] uppercase text-neutral-600 hover:text-white transition-colors"
            >
              Return
            </button>
          </div>
        )}
      </div>
    </section>
  );
};
