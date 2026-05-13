import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { useLanguage } from '../contexts/LanguageContext';

export function InteractiveSection() {
  const { t } = useLanguage();
  const sectionRef = useRef<HTMLDivElement>(null);
  const cursorRef = useRef<HTMLDivElement>(null);
  const magneticRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = section.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      setMousePosition({ x, y });

      // Custom cursor follow
      if (cursorRef.current) {
        gsap.to(cursorRef.current, {
          x: e.clientX,
          y: e.clientY,
          duration: 0.3,
          ease: 'power2.out',
        });
      }
    };

    section.addEventListener('mousemove', handleMouseMove);

    return () => {
      section.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  const handleMagneticHover = (index: number, e: React.MouseEvent<HTMLDivElement>) => {
    const element = magneticRefs.current[index];
    if (!element) return;

    const rect = element.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const deltaX = (e.clientX - centerX) * 0.3;
    const deltaY = (e.clientY - centerY) * 0.3;

    gsap.to(element, {
      x: deltaX,
      y: deltaY,
      duration: 0.3,
      ease: 'power2.out',
    });
  };

  const handleMagneticLeave = (index: number) => {
    const element = magneticRefs.current[index];
    if (!element) return;

    gsap.to(element, {
      x: 0,
      y: 0,
      duration: 0.5,
      ease: 'elastic.out(1, 0.5)',
    });
  };

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen bg-[#0A0A0A] flex items-center justify-center py-32 cursor-none"
    >
      {/* Custom Cursor */}
      <div
        ref={cursorRef}
        className="fixed top-0 left-0 w-6 h-6 rounded-full pointer-events-none z-50 mix-blend-difference"
        style={{ backgroundColor: '#FE036A', transform: 'translate(-50%, -50%)' }}
      />

      {/* Gradient that follows mouse */}
      <div
        className="absolute w-96 h-96 blur-3xl pointer-events-none transition-all duration-300"
        style={{
          background: 'radial-gradient(circle, rgba(254, 3, 106, 0.2) 0%, transparent 70%)',
          left: `${mousePosition.x}px`,
          top: `${mousePosition.y}px`,
          transform: 'translate(-50%, -50%)',
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-8 text-center">
        <div className="tracking-[0.3em] text-sm mb-8" style={{ color: '#FE036A' }}>
          {t.interactive.label}
        </div>

        <h2 className="text-[clamp(2.5rem,6vw,5rem)] leading-[1.1] tracking-tight mb-16">
          {t.interactive.title}
        </h2>

        {/* Magnetic Elements */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {t.interactive.items.map((text, index) => (
            <div
              key={text}
              ref={(el) => (magneticRefs.current[index] = el)}
              onMouseMove={(e) => handleMagneticHover(index, e)}
              onMouseLeave={() => handleMagneticLeave(index)}
              className="relative bg-[#0F0F0F] border border-neutral-800 p-16 transition-colors duration-300"
              style={{ '--hover-border-color': '#FE036A' } as React.CSSProperties}
              onMouseEnter={(e) => (e.currentTarget.style.borderColor = '#FE036A')}
              onMouseLeave={(e) => (e.currentTarget.style.borderColor = 'rgb(38, 38, 38)')}
            >
              <div className="text-3xl" style={{ fontWeight: 600 }}>
                {text}
              </div>

              {/* Decorative corner */}
              <div className="absolute top-0 ltr:right-0 rtl:left-0 w-16 h-16 border-t ltr:border-r rtl:border-l" style={{ borderColor: '#FE036A' }} />
            </div>
          ))}
        </div>

        <p className="mt-16 text-neutral-400 text-lg max-w-2xl mx-auto" style={{ fontWeight: 300 }}>
          {t.interactive.description}
        </p>
      </div>
    </section>
  );
}
