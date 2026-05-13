import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useLanguage } from '../contexts/LanguageContext';

gsap.registerPlugin(ScrollTrigger);

export function CTASection() {
  const { t } = useLanguage();
  const sectionRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Title reveal
      if (titleRef.current) {
        gsap.from(titleRef.current, {
          opacity: 0,
          y: 100,
          duration: 1.2,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: titleRef.current,
            start: 'top 70%',
          },
        });
      }

      // Button reveal
      gsap.from(buttonRef.current, {
        opacity: 0,
        y: 50,
        duration: 1,
        delay: 0.3,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: buttonRef.current,
          start: 'top 80%',
        },
      });

      // Background parallax
      gsap.to(bgRef.current, {
        y: -100,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: true,
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#0A0A0A] py-32"
    >
      {/* Background Layer */}
      <div
        ref={bgRef}
        className="absolute inset-0 bg-gradient-to-br from-[#1A1A1A] via-[#0A0A0A] to-[#0A0A0A]"
      />

      {/* Accent gradient */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] blur-3xl" style={{ background: 'radial-gradient(circle, rgba(254, 3, 106, 0.2) 0%, transparent 70%)' }} />

      {/* Content */}
      <div className="relative z-10 max-w-6xl mx-auto px-8 text-center">
        <h2
          ref={titleRef}
          className="text-[clamp(3rem,10vw,8rem)] tracking-tighter mb-16"
          style={{ fontWeight: 700, lineHeight: '1.1' }}
        >
          {t.cta.title}
        </h2>

        <button
          ref={buttonRef}
          className="group relative px-16 py-6 text-black overflow-hidden hover:scale-105 transition-transform duration-300"
          style={{ backgroundColor: '#FE036A' }}
        >
          <span className="relative z-10 text-xl" style={{ fontWeight: 600 }}>
            {t.cta.button}
          </span>
          <div className="absolute inset-0 bg-white translate-x-full group-hover:translate-x-0 transition-transform duration-500" />
        </button>

        {/* Contact info */}
        <div className="mt-20 flex flex-col md:flex-row items-center justify-center gap-8 text-neutral-400">
          <a
            href={`mailto:${t.cta.email}`}
            className="transition-colors duration-300"
            style={{ '--hover-color': '#FE036A' } as React.CSSProperties}
            onMouseEnter={(e) => (e.currentTarget.style.color = '#FE036A')}
            onMouseLeave={(e) => (e.currentTarget.style.color = 'rgb(163, 160, 251)')}
          >
            {t.cta.email}
          </a>
          <span className="hidden md:block text-neutral-700">•</span>
          <a
            href={`tel:${t.cta.phone.replace(/\s/g, '')}`}
            className="transition-colors duration-300"
            style={{ '--hover-color': '#FE036A' } as React.CSSProperties}
            onMouseEnter={(e) => (e.currentTarget.style.color = '#FE036A')}
            onMouseLeave={(e) => (e.currentTarget.style.color = 'rgb(163, 160, 251)')}
          >
            {t.cta.phone}
          </a>
        </div>
      </div>
    </section>
  );
}
