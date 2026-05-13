import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useLanguage } from '../contexts/LanguageContext';

gsap.registerPlugin(ScrollTrigger);

export function ServicesSection() {
  const { t } = useLanguage();
  const sectionRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Stagger card animations
      gsap.from(cardsRef.current, {
        opacity: 0,
        y: 100,
        duration: 1,
        stagger: 0.15,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 60%',
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="min-h-screen bg-[#0A0A0A] py-32">
      <div className="max-w-7xl mx-auto px-8">
        {/* Section Header */}
        <div className="mb-24">
          <div className="tracking-[0.3em] text-sm mb-6" style={{ color: '#FE036A' }}>
            {t.services.label}
          </div>
          <h2 className="text-[clamp(2.5rem,6vw,4.5rem)] leading-[1.1] tracking-tight max-w-4xl">
            {t.services.title}
          </h2>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {t.services.items.map((service, index) => (
            <div
              key={service.number}
              ref={(el) => (cardsRef.current[index] = el)}
              className="group relative bg-[#0F0F0F] border border-neutral-800 p-10 transition-all duration-500 hover:scale-[1.02]"
              style={{ '--hover-border-color': '#FE036A' } as React.CSSProperties}
              onMouseEnter={(e) => (e.currentTarget.style.borderColor = '#FE036A')}
              onMouseLeave={(e) => (e.currentTarget.style.borderColor = 'rgb(38, 38, 38)')}
            >
              {/* Number */}
              <div className="text-6xl text-neutral-800 transition-colors duration-500 mb-8" style={{ fontWeight: 700 }} onMouseEnter={(e) => (e.currentTarget.style.color = 'rgba(254, 3, 106, 0.3)')} onMouseLeave={(e) => (e.currentTarget.style.color = 'rgb(38, 38, 38)')}>
                {service.number}
              </div>

              {/* Title */}
              <h3 className="text-2xl mb-4 transition-colors duration-300" onMouseEnter={(e) => (e.currentTarget.style.color = '#FE036A')} onMouseLeave={(e) => (e.currentTarget.style.color = 'inherit')}>
                {service.title}
              </h3>

              {/* Description */}
              <p className="text-neutral-400 leading-relaxed" style={{ fontWeight: 300 }}>
                {service.description}
              </p>

              {/* Hover accent */}
              <div className="absolute bottom-0 ltr:left-0 rtl:right-0 w-full h-1 scale-x-0 group-hover:scale-x-100 transition-transform duration-500 ltr:origin-left rtl:origin-right" style={{ background: 'linear-gradient(to right, #FE036A, transparent)' }} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
