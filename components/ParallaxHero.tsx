
import React, { useState, useRef, Suspense } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { useTexture } from '@react-three/drei';
import * as THREE from 'three';

const ThreeDImage = ({ mousePos }: { mousePos: { x: number; y: number } }) => {
  const meshRef = useRef<THREE.Mesh>(null);
  const { viewport } = useThree();

  const [colorMap, displacementMap] = useTexture([
    '/model_2.png',
    '/model_2_map.png'
  ]);

  // Image aspect ratio (approx 16:9 based on 1920x1080 standard, but let's assume 1.77)
  // Actual dimensions from previous step: 6339 x 3566 => 1.777
  const imageAspect = 1.777;
  const viewportAspect = viewport.width / viewport.height;

  // Calculate cover effect
  let scaleX = 1;
  let scaleY = 1;

  if (viewportAspect > imageAspect) {
    // Viewport is wider than image: fit width, crop height
    // We want the texture to cover the plane.
    // The plane is viewport size.
    // Texture coordinates need to be scaled down to zoom in? No.
    // To 'cover', we align the smaller dimension.

    // UV Mapping logic for 'cover':
    // If screen is wider, we show full width of image, but only middle part of height.
    // repeat.x = 1, repeat.y = imageAspect / viewportAspect
    scaleX = 1;
    scaleY = imageAspect / viewportAspect;
  } else {
    // Screen is taller than image (portrait): fit height, crop width
    // repeat.x = viewportAspect / imageAspect, repeat.y = 1
    scaleX = viewportAspect / imageAspect;
    scaleY = 1;
  }

  // Center the texture
  colorMap.repeat.set(scaleX, scaleY);
  colorMap.offset.set((1 - scaleX) / 2, (1 - scaleY) / 2);

  displacementMap.repeat.set(scaleX, scaleY);
  displacementMap.offset.set((1 - scaleX) / 2, (1 - scaleY) / 2);

  useFrame((state) => {
    if (!meshRef.current) return;

    // Smoothly interpolate rotation based on mouse position
    // Apply clamping to keep the effect subtle
    const MAX_ROTATION = 0.05;

    // targetY is rotation around Y axis (caused by X mouse movement)
    let targetY = (mousePos.x - 0.5) * 0.1;
    // targetX is rotation around X axis (caused by Y mouse movement)
    // "Y parallax 50% of X" -> Rotation X should be half of Rotation Y magnitude
    let targetX = (mousePos.y - 0.5) * 0.05;

    // Clamp values
    targetX = Math.max(Math.min(targetX, MAX_ROTATION), -MAX_ROTATION);
    targetY = Math.max(Math.min(targetY, MAX_ROTATION), -MAX_ROTATION);

    meshRef.current.rotation.x = THREE.MathUtils.lerp(meshRef.current.rotation.x, targetX, 0.1);
    meshRef.current.rotation.y = THREE.MathUtils.lerp(meshRef.current.rotation.y, targetY, 0.1);
  });

  return (
    <mesh ref={meshRef}>
      <planeGeometry args={[viewport.width, viewport.height, 128, 128]} />
      <meshStandardMaterial
        map={colorMap}
        displacementMap={displacementMap}
        displacementScale={0.8}
        metalness={0.2}
        roughness={0.8}
      />
    </mesh>
  );
};

export const ParallaxHero: React.FC = () => {
  const [mousePos, setMousePos] = useState({ x: 0.5, y: 0.5 });
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!containerRef.current) return;
    const { width, height } = containerRef.current.getBoundingClientRect();
    const x = e.clientX / width;
    const y = e.clientY / height;
    setMousePos({ x, y });
  };

  const handleMouseLeave = () => {
    setMousePos({ x: 0.5, y: 0.5 });
  };

  // Parallax movement for text content only
  const factorX = 15;
  const factorY = 7.5; // 50% of X

  const translateX = (mousePos.x - 0.5) * factorX;
  const translateY = (mousePos.y - 0.5) * factorY;

  return (
    <section
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative h-screen w-full overflow-hidden bg-[#050505] flex items-center justify-center cursor-none"
    >
      {/* 3D Background - Fullscreen */}
      <div className="absolute inset-0 z-0">
        <Canvas camera={{ position: [0, 0, 5], fov: 45 }}>
          <ambientLight intensity={0.5} />
          <directionalLight position={[5, 10, 5]} intensity={2} />
          <Suspense fallback={null}>
            <ThreeDImage mousePos={mousePos} />
          </Suspense>
        </Canvas>
      </div>

      {/* Overlay Gradient for Text Readability */}
      <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-60 pointer-events-none z-10" />
      <div className="absolute inset-0 bg-black/20 pointer-events-none z-10" />

      {/* Floating Typography (Near) */}
      <div
        className="absolute inset-0 z-20 pointer-events-none transition-transform duration-500 ease-out px-12 md:px-24 pb-20 md:pb-32 flex items-end justify-between"
        style={{
          transform: `translate(${translateX}px, ${translateY}px)`,
        }}
      >
        {/* Bottom Left: Balanced Title & Description */}
        <div className="text-left max-w-md">
          <p className="text-[8px] tracking-[0.6em] uppercase text-white/50 font-light mb-4 flex items-center gap-4">
            <span className="w-8 h-[1px] bg-white/20"></span>
            Edition 01 / Series 25
          </p>
          <h1 className="text-5xl md:text-7xl font-serif tracking-tighter italic text-white/95 drop-shadow-[0_10px_10px_rgba(0,0,0,0.5)] opacity-95 leading-none mb-8">
            Couture
          </h1>
          <p className="text-[10px] leading-relaxed tracking-[0.2em] uppercase text-white/70 font-light max-w-[280px]">
            Sculptural forms engineered<br />
            with surgical precision for<br />
            the modern digital anatomy.
          </p>
        </div>

        {/* Bottom Right: New Rich Editorial Blurb */}
        <div className="hidden md:block text-right max-w-[320px]">
          <div className="mb-8">
            <p className="text-[9px] leading-loose tracking-[0.4em] uppercase text-white/50 font-light italic">
              "The silhouette is a dialogue<br />
              between shadow and substance."
            </p>
          </div>
          <div className="flex flex-col gap-2 items-end border-t border-white/10 pt-6">
            <p className="text-[8px] tracking-[0.6em] uppercase text-white/60">
              Atelier Archive • Paris
            </p>
            <p className="text-[7px] tracking-[0.8em] uppercase text-white/40">
              48.8566° N, 2.3522° E
            </p>
          </div>
        </div>
      </div>

      {/* Overlays */}
      <div className="absolute inset-0 pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/p6.png')] opacity-[0.04] z-30" />

      {/* Scroll indicator - Enhanced Minimalism */}
      <div className="absolute bottom-12 left-1/2 -translate-x-1/2 z-40 opacity-40 group">
        <div className="w-[1px] h-20 bg-gradient-to-b from-white/60 to-transparent relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1/2 bg-white/80 animate-[scroll_2.5s_infinite]" />
        </div>
      </div>
    </section>
  );
};
