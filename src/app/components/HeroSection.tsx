import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useLanguage } from '../contexts/LanguageContext';

gsap.registerPlugin(ScrollTrigger);

export function HeroSection() {
  const { t, language } = useLanguage();
  const heroRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLButtonElement>(null);
  const bgLayerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Split text animation setup
      if (titleRef.current) {
        const text = titleRef.current.getAttribute('data-text') || '';
        // Split by words instead of characters for better RTL support
        const words = text.split(' ');
        titleRef.current.innerHTML = words
          .map((word) => `<span class="inline-block opacity-0 mr-2">${word}</span>`)
          .join('');

        gsap.to(titleRef.current.children, {
          opacity: 1,
          y: 0,
          duration: 1.2,
          stagger: 0.08,
          ease: 'power4.out',
          delay: 0.3,
        });
      }

      // Subtitle fade in
      gsap.to(subtitleRef.current, {
        opacity: 1,
        y: 0,
        duration: 1,
        delay: 1.2,
        ease: 'power3.out',
      });

      // CTA button
      gsap.to(ctaRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.8,
        delay: 1.6,
        ease: 'power3.out',
      });

      // Parallax background
      gsap.to(bgLayerRef.current, {
        y: '30%',
        scrollTrigger: {
          trigger: heroRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: true,
        },
      });
    }, heroRef);

    return () => ctx.revert();
  }, [t, language]);

  return (
    <section
      ref={heroRef}
      className="relative h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Background Layer */}
      <div
        ref={bgLayerRef}
        className="absolute inset-0 bg-gradient-to-br from-[#1A1A1A] via-[#0A0A0A] to-[#0A0A0A]"
      />

      {/* Accent gradients */}
      <div className="absolute top-20 right-20 w-96 h-96 blur-3xl" style={{ background: 'radial-gradient(circle, rgba(254, 3, 106, 0.15) 0%, transparent 70%)' }} />
      <div className="absolute bottom-20 left-20 w-96 h-96 blur-3xl" style={{ background: 'radial-gradient(circle, rgba(254, 3, 106, 0.08) 0%, transparent 70%)' }} />

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-8 text-center">
        <h1
          ref={titleRef}
          data-text={t.hero.title}
          className="text-[clamp(3rem,12vw,10rem)] leading-[0.9] tracking-tighter mb-8"
          style={{ fontWeight: 700 }}
          dir={language === 'ar' ? 'rtl' : 'ltr'}
        >
          {t.hero.title}
        </h1>

        <p
          ref={subtitleRef}
          className="text-[clamp(1rem,2vw,1.5rem)] text-neutral-400 max-w-2xl mx-auto mb-12 opacity-0 translate-y-8"
          style={{ fontWeight: 300 }}
        >
          {t.hero.subtitle}
        </p>

        <button
          ref={ctaRef}
          className="group relative px-12 py-5 bg-white text-black overflow-hidden opacity-0 translate-y-8 hover:scale-105 transition-transform duration-300"
        >
          <span className="relative z-10" style={{ fontWeight: 600 }}>
            {t.hero.cta}
          </span>
          <div className="absolute inset-0 transition-transform duration-300" style={{ backgroundColor: '#FE036A', transform: 'translateY(100%)' }} />
        </button>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 opacity-60">
        <span className="text-xs tracking-widest">{t.hero.scroll}</span>
        <div className="w-[1px] h-16 bg-gradient-to-b from-white to-transparent" />
      </div>
    </section>
  );
}
