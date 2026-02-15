
import React, { useEffect, useState } from 'react';
import { ParallaxHero } from './components/ParallaxHero';
import { Lookbook } from './components/Lookbook';
import { Atelier } from './components/Atelier';
import { Footer } from './components/Footer';
import { Navbar } from './components/Navbar';

const App: React.FC = () => {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Artificial delay to simulate asset loading for premium feel
    const timer = setTimeout(() => setIsLoaded(true), 1200);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className={`min-h-screen transition-opacity duration-1000 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}>
      <div className="custom-cursor hidden md:block" id="cursor" />
      <Navbar />
      <main>
        <ParallaxHero />
        <Lookbook />
        <Atelier />
      </main>
      <Footer />
    </div>
  );
};

export default App;
