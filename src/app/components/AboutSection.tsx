import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useLanguage } from '../contexts/LanguageContext';

gsap.registerPlugin(ScrollTrigger);

export function AboutSection() {
  const { t } = useLanguage();
  const sectionRef = useRef<HTMLDivElement>(null);
  const textBlockRef = useRef<HTMLDivElement>(null);
  const imageBlockRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Pin section for scroll storytelling
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: 'top top',
        end: '+=100%',
        pin: true,
        pinSpacing: true,
      });

      // Text reveal animation
      gsap.from(textBlockRef.current?.children || [], {
        opacity: 0,
        y: 80,
        duration: 1.2,
        stagger: 0.2,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: textBlockRef.current,
          start: 'top 70%',
        },
      });

      // Image parallax
      gsap.to(imageBlockRef.current, {
        y: -50,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1,
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="min-h-screen bg-[#0F0F0F] flex items-center py-32"
    >
      <div className="max-w-7xl mx-auto px-8 grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
        {/* Text Block */}
        <div ref={textBlockRef} className="space-y-8">
          <div className="tracking-[0.3em] text-sm" style={{ color: '#FE036A' }}>
            {t.about.label}
          </div>

          <h2 className="text-[clamp(2.5rem,6vw,5rem)] leading-[1.1] tracking-tight">
            {t.about.title}
          </h2>

          <div className="space-y-6 text-neutral-400 text-lg leading-relaxed" style={{ fontWeight: 300 }}>
            <p>{t.about.description1}</p>
            <p>{t.about.description2}</p>
          </div>

          <div className="flex gap-16 pt-8">
            <div>
              <div className="text-5xl mb-2" style={{ fontWeight: 700 }}>50+</div>
              <div className="text-neutral-500 text-sm tracking-wide">{t.about.stat1Label}</div>
            </div>
            <div>
              <div className="text-5xl mb-2" style={{ fontWeight: 700 }}>8</div>
              <div className="text-neutral-500 text-sm tracking-wide">{t.about.stat2Label}</div>
            </div>
            <div>
              <div className="text-5xl mb-2" style={{ fontWeight: 700 }}>100%</div>
              <div className="text-neutral-500 text-sm tracking-wide">{t.about.stat3Label}</div>
            </div>
          </div>
        </div>

        {/* Visual Block */}
        <div ref={imageBlockRef} className="relative">
          <div className="aspect-[4/5] bg-gradient-to-br from-neutral-800 to-neutral-900 relative overflow-hidden">
            {/* Decorative grid overlay */}
            <div className="absolute inset-0 opacity-10">
              <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:60px_60px]" />
            </div>

            {/* Golden accent */}
            <div className="absolute bottom-0 ltr:right-0 rtl:left-0 w-64 h-64" style={{ background: 'radial-gradient(circle, rgba(254, 3, 106, 0.3) 0%, transparent 70%)' }} />

            {/* Placeholder text */}
            <div className="absolute inset-0 flex items-center justify-center text-neutral-600 text-sm tracking-widest">
              {t.about.imagePlaceholder}
            </div>
          </div>

          {/* Floating accent */}
          <div className="absolute -bottom-8 ltr:-right-8 rtl:-left-8 w-32 h-32 border" style={{ borderColor: '#FE036A' }} />
        </div>
      </div>
    </section>
  );
}
