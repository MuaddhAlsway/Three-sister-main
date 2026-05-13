import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { useLanguage } from '../contexts/LanguageContext';

export function MarqueeSection() {
  const { t, language } = useLanguage();
  const marqueeRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!marqueeRef.current || !containerRef.current) return;

    const marquee = marqueeRef.current;
    const container = containerRef.current;

    // Wait for DOM to fully render
    const animationTimeout = setTimeout(() => {
      // Get the width of one set of content
      const firstSet = marquee.querySelector('.marquee-set') as HTMLElement;
      if (!firstSet) return;

      const contentWidth = firstSet.offsetWidth;

      // Kill any existing animations
      gsap.killTweensOf(marquee);

      // Create infinite loop animation
      const tl = gsap.timeline({ repeat: -1 });
      
      tl.to(marquee, {
        x: -contentWidth,
        duration: 80,
        ease: 'none',
      }, 0)
      .set(marquee, { x: 0 }, `-=${80}`); // Reset position at the end

    }, 200);

    return () => {
      clearTimeout(animationTimeout);
      gsap.killTweensOf(marquee);
    };
  }, [t, language]);

  return (
    <section className="relative bg-[#0F0F0F] py-20 overflow-hidden border-y border-neutral-800">
      {/* Gradient overlays for fade effect */}
      <div className="absolute ltr:left-0 rtl:right-0 top-0 bottom-0 w-32 ltr:bg-gradient-to-r rtl:bg-gradient-to-l from-[#0F0F0F] to-transparent z-10" />
      <div className="absolute ltr:right-0 rtl:left-0 top-0 bottom-0 w-32 ltr:bg-gradient-to-l rtl:bg-gradient-to-r from-[#0F0F0F] to-transparent z-10" />

      {/* Marquee Container */}
      <div ref={containerRef} className="overflow-hidden">
        <div ref={marqueeRef} className="flex whitespace-nowrap">
          {/* Duplicate content for seamless loop */}
          {[...Array(2)].map((_, setIndex) => (
            <div key={setIndex} className="marquee-set flex flex-shrink-0">
              {t.marquee.phrases.map((phrase, index) => (
                <div
                  key={`${setIndex}-${index}`}
                  className="inline-flex items-center px-8 flex-shrink-0"
                >
                  <span className="text-[clamp(3rem,8vw,6rem)] tracking-tighter" style={{ fontWeight: 700 }}>
                    {phrase}
                  </span>
                  <span className="mx-8 text-6xl flex-shrink-0" style={{ color: '#FE036A' }}>•</span>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
