import { useEffect, useRef } from 'react';
import { ImageWithFallback } from './components/figma/ImageWithFallback';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function App() {
  const heroRef = useRef<HTMLDivElement>(null);
  const overviewRef = useRef<HTMLDivElement>(null);
  const storyRef = useRef<HTMLDivElement>(null);
  const showcaseRef = useRef<HTMLDivElement>(null);
  const galleryRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Hero parallax animation
    if (heroRef.current) {
      gsap.to(heroRef.current.querySelector('.hero-image'), {
        scale: 1.2,
        scrollTrigger: {
          trigger: heroRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: 1,
        },
      });

      gsap.from(heroRef.current.querySelectorAll('.hero-text'), {
        y: 100,
        opacity: 0,
        duration: 1.2,
        stagger: 0.2,
        ease: 'power3.out',
      });
    }

    // Overview stagger animation
    if (overviewRef.current) {
      gsap.from(overviewRef.current.querySelectorAll('.overview-item'), {
        y: 60,
        opacity: 0,
        duration: 0.8,
        stagger: 0.15,
        scrollTrigger: {
          trigger: overviewRef.current,
          start: 'top 80%',
        },
      });
    }

    // Storytelling pinned scroll
    if (storyRef.current) {
      const storyImages = storyRef.current.querySelectorAll('.story-image');
      storyImages.forEach((img) => {
        gsap.from(img, {
          scale: 0.8,
          opacity: 0,
          duration: 1,
          scrollTrigger: {
            trigger: img,
            start: 'top 70%',
            end: 'top 30%',
            scrub: 1,
          },
        });
      });
    }

    // Image reveal animations
    if (showcaseRef.current) {
      const images = showcaseRef.current.querySelectorAll('.showcase-image');
      images.forEach((img, index) => {
        gsap.from(img, {
          clipPath: index % 2 === 0 ? 'inset(0 100% 0 0)' : 'inset(0 0 0 100%)',
          duration: 1.2,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: img,
            start: 'top 75%',
          },
        });
      });
    }

    // Horizontal scroll gallery
    if (galleryRef.current) {
      const cards = galleryRef.current.querySelectorAll('.gallery-card');
      const totalWidth = cards.length * 400;

      gsap.to(cards, {
        xPercent: -100 * (cards.length - 1),
        ease: 'none',
        scrollTrigger: {
          trigger: galleryRef.current,
          pin: true,
          scrub: 1,
          end: () => `+=${totalWidth}`,
        },
      });
    }
  }, []);

  return (
    <div className="bg-[#fafaf9] text-[#0a0a0a]">
      {/* Hero Section */}
      <section
        ref={heroRef}
        className="relative h-screen flex items-center justify-center overflow-hidden"
      >
        <div className="absolute inset-0 hero-image">
          <ImageWithFallback
            src="https://images.unsplash.com/photo-1759563874738-f964048248d3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=2400"
            alt="Three Sisters KSA Hero"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/40" />
        </div>

        <div className="relative z-10 text-center text-white px-6 max-w-5xl">
          <div className="hero-text overflow-hidden">
            <p className="tracking-[0.3em] mb-4 opacity-80">BRANDING × IDENTITY</p>
          </div>
          <div className="hero-text overflow-hidden">
            <h1 className="text-[clamp(3rem,8vw,8rem)] leading-[0.95] mb-6">
              Three Sisters KSA
            </h1>
          </div>
          <div className="hero-text overflow-hidden">
            <p className="text-xl tracking-wide opacity-90">A Story of Heritage, Elegance & Vision — 2026</p>
          </div>
        </div>
      </section>

      {/* Project Overview */}
      <section ref={overviewRef} className="py-32 px-6 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-32">
          <div className="space-y-8">
            <div className="overview-item">
              <p className="text-sm tracking-wider opacity-50 mb-2">CLIENT</p>
              <p className="text-2xl">Three Sisters KSA</p>
            </div>
            <div className="overview-item">
              <p className="text-sm tracking-wider opacity-50 mb-2">SERVICES</p>
              <p className="text-2xl">Brand Identity, Visual Language, Art Direction</p>
            </div>
            <div className="overview-item">
              <p className="text-sm tracking-wider opacity-50 mb-2">YEAR</p>
              <p className="text-2xl">2026</p>
            </div>
          </div>

          <div className="overview-item">
            <p className="text-[clamp(1.125rem,2vw,1.5rem)] leading-relaxed">
              We partnered with Three Sisters KSA to reimagine their brand identity from the ground up —
              crafting a visual language that honors Saudi heritage while embracing contemporary luxury
              and sophistication.
            </p>
          </div>
        </div>
      </section>

      {/* Storytelling Section */}
      <section ref={storyRef} className="py-24 px-6">
        <div className="max-w-4xl mx-auto space-y-48">
          <div className="space-y-12">
            <h2 className="text-[clamp(2rem,5vw,4rem)] leading-tight">
              The Concept
            </h2>
            <p className="text-[clamp(1.125rem,2vw,1.5rem)] leading-relaxed opacity-80">
              Three sisters. Three pillars of strength. A legacy built on unity, grace, and unwavering vision.
              Our design language translates this narrative into a timeless visual identity — where traditional
              Arabic calligraphy meets minimalist European aesthetics.
            </p>
          </div>

          <div className="story-image">
            <ImageWithFallback
              src="https://images.unsplash.com/photo-1759563871373-2a7f13ae4b30?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=2000"
              alt="Brand identity detail"
              className="w-full h-[70vh] object-cover rounded-sm"
            />
          </div>

          <div className="space-y-12">
            <h2 className="text-[clamp(2rem,5vw,4rem)] leading-tight">
              The Solution
            </h2>
            <p className="text-[clamp(1.125rem,2vw,1.5rem)] leading-relaxed opacity-80">
              We developed a modular identity system anchored by custom typography, a refined color palette
              of sand tones and deep blacks, and a distinctive seal mark that echoes royal heritage. Every
              touchpoint was designed to evoke exclusivity and craftsmanship.
            </p>
          </div>

          <div className="story-image">
            <ImageWithFallback
              src="https://images.unsplash.com/photo-1759563874671-22b56a3bc6d3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=2000"
              alt="Packaging with seal"
              className="w-full h-[70vh] object-cover rounded-sm"
            />
          </div>
        </div>
      </section>

      {/* Visual Showcase */}
      <section ref={showcaseRef} className="py-24 px-6 space-y-24">
        <div className="showcase-image max-w-7xl mx-auto">
          <ImageWithFallback
            src="https://images.unsplash.com/photo-1759563874670-9ccc048192ee?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=2400"
            alt="Brand collateral"
            className="w-full h-[85vh] object-cover rounded-sm"
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-7xl mx-auto">
          <div className="showcase-image">
            <ImageWithFallback
              src="https://images.unsplash.com/photo-1759563874663-1c8f3ef40302?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1200"
              alt="Detail shot"
              className="w-full h-[60vh] object-cover rounded-sm"
            />
          </div>
          <div className="showcase-image">
            <ImageWithFallback
              src="https://images.unsplash.com/photo-1759563876910-5f54c1735761?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1200"
              alt="Detail shot"
              className="w-full h-[60vh] object-cover rounded-sm"
            />
          </div>
        </div>

        <div className="showcase-image max-w-5xl mx-auto">
          <ImageWithFallback
            src="https://images.unsplash.com/photo-1752134594016-f4969838b68d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=2000"
            alt="Product mockup"
            className="w-full h-[75vh] object-cover rounded-sm"
          />
        </div>
      </section>

      {/* Interactive Gallery */}
      <section ref={galleryRef} className="h-screen flex items-center overflow-hidden">
        <div className="flex gap-8 px-6">
          {[
            'https://images.unsplash.com/photo-1718670013921-2f144aba173a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800',
            'https://images.unsplash.com/photo-1718670014130-ee9ee053598d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800',
            'https://images.unsplash.com/photo-1718670013988-c6e3edb92345?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800',
            'https://images.unsplash.com/photo-1718670014361-2feb64f3c3a8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800',
          ].map((src, index) => (
            <div
              key={index}
              className="gallery-card flex-shrink-0 w-[400px] h-[500px] relative group cursor-pointer"
            >
              <ImageWithFallback
                src={src}
                alt={`Gallery item ${index + 1}`}
                className="w-full h-full object-cover rounded-sm transition-transform duration-500 group-hover:scale-105"
              />
            </div>
          ))}
        </div>
      </section>

      {/* Detail Section */}
      <section className="py-32 px-6 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
          <div className="space-y-6">
            <p className="text-sm tracking-wider opacity-50">TYPOGRAPHY</p>
            <div className="text-7xl">Aa</div>
            <p className="opacity-70">Custom serif with elegant proportions</p>
          </div>

          <div className="space-y-6">
            <p className="text-sm tracking-wider opacity-50">COLOR PALETTE</p>
            <div className="flex gap-3">
              <div className="w-16 h-16 bg-[#fafaf9] border border-black/10 rounded-sm" />
              <div className="w-16 h-16 bg-[#d4c5b0] rounded-sm" />
              <div className="w-16 h-16 bg-[#0a0a0a] rounded-sm" />
            </div>
            <p className="opacity-70">Sand, cream & deep black</p>
          </div>

          <div className="space-y-6">
            <p className="text-sm tracking-wider opacity-50">SEAL DESIGN</p>
            <div className="w-16 h-16 bg-black rounded-full flex items-center justify-center text-white text-2xl">
              TS
            </div>
            <p className="opacity-70">Royal heritage mark</p>
          </div>
        </div>
      </section>

      {/* Brand Motion Section */}
      <section className="py-32 px-6 bg-[#0a0a0a] text-white">
        <div className="max-w-4xl mx-auto text-center space-y-12">
          <h2 className="text-[clamp(2.5rem,6vw,5rem)] leading-tight">
            Three Sisters
          </h2>
          <p className="text-xl tracking-[0.3em] opacity-60">RIYADH × JEDDAH × DUBAI</p>
          <div className="flex justify-center gap-1 mt-16">
            {[...Array(3)].map((_, i) => (
              <div
                key={i}
                className="w-3 h-3 bg-white rounded-full animate-pulse"
                style={{ animationDelay: `${i * 0.2}s` }}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Final Impact */}
      <section className="py-32 px-6 max-w-4xl mx-auto text-center">
        <h2 className="text-[clamp(2rem,5vw,4rem)] leading-tight mb-8">
          A Timeless Legacy
        </h2>
        <p className="text-[clamp(1.125rem,2vw,1.5rem)] leading-relaxed opacity-80">
          The new identity has positioned Three Sisters KSA as a leading force in luxury branding
          across the Middle East, with recognition from international design awards and a 40% increase
          in premium client engagement.
        </p>
      </section>

      {/* Next Project Navigation */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden group cursor-pointer">
        <ImageWithFallback
          src="https://images.unsplash.com/photo-1752134593973-ac72a80ba7c7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=2400"
          alt="Next project"
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-black/50 group-hover:bg-black/40 transition-colors duration-500" />

        <div className="relative z-10 text-white text-center">
          <p className="text-sm tracking-[0.3em] mb-4 opacity-70">NEXT PROJECT</p>
          <h3 className="text-[clamp(2.5rem,6vw,6rem)] leading-tight">
            Desert Bloom
          </h3>
          <p className="text-xl mt-4 opacity-80">Sustainable Luxury Fragrances</p>
        </div>
      </section>
    </div>
  );
}
