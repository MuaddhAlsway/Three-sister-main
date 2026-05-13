import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useLanguage } from '../contexts/LanguageContext';

gsap.registerPlugin(ScrollTrigger);

export function PortfolioSection() {
  const { t } = useLanguage();
  const navigate = useNavigate();
  const sectionRef = useRef<HTMLDivElement>(null);
  const cardsContainerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(cardsRef.current, {
        opacity: 0,
        scale: 0.9,
        x: 100,
        duration: 1,
        stagger: 0.1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: cardsContainerRef.current,
          start: 'top 70%',
        },
      });

      cardsRef.current.forEach((card) => {
        if (card) {
          const imageMask = card.querySelector('.image-mask');
          gsap.from(imageMask, {
            clipPath: 'inset(100% 0% 0% 0%)',
            duration: 1.2,
            ease: 'power4.inOut',
            scrollTrigger: {
              trigger: card,
              start: 'top 80%',
            },
          });
        }
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const handleProjectClick = (index: number) => {
    navigate(`/project/${index}`);
  };

  return (
    <section ref={sectionRef} className="min-h-screen bg-[#0F0F0F] py-32">
      <div className="max-w-7xl mx-auto px-8">
        {/* Section Header */}
        <div className="mb-24">
          <div className="tracking-[0.3em] text-sm mb-6" style={{ color: '#FE036A' }}>
            {t.portfolio.label}
          </div>
          <h2 className="text-[clamp(2.5rem,6vw,4.5rem)] leading-[1.1] tracking-tight max-w-4xl">
            {t.portfolio.title}
          </h2>
        </div>

        {/* Portfolio Grid */}
        <div
          ref={cardsContainerRef}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {t.portfolio.projects.map((project, index) => (
            <div
              key={index}
              ref={(el) => {
                if (el) cardsRef.current[index] = el;
              }}
              onClick={() => handleProjectClick(index)}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
              className="group cursor-pointer"
            >
              {/* Image Container */}
              <div className="relative aspect-[4/5] bg-neutral-900 mb-6 overflow-hidden">
                {/* Image mask reveal */}
                <div className="image-mask absolute inset-0 bg-gradient-to-br from-neutral-700 via-neutral-800 to-neutral-900">
                  {/* Grid overlay */}
                  <div className="absolute inset-0 opacity-20">
                    <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:40px_40px]" />
                  </div>

                  {/* Hover zoom effect */}
                  <div
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                    style={{ background: 'linear-gradient(to bottom right, rgba(254, 3, 106, 0.2), transparent)' }}
                  />

                  {/* Project number */}
                  <div className="absolute top-6 ltr:right-6 rtl:left-6 text-7xl text-white/5 transition-colors duration-500" style={{ fontWeight: 700 }} onMouseEnter={(e) => (e.currentTarget.style.color = 'rgba(254, 3, 106, 0.1)')} onMouseLeave={(e) => (e.currentTarget.style.color = 'rgba(255, 255, 255, 0.05)')}>
                    {String(index + 1).padStart(2, '0')}
                  </div>

                  {/* Placeholder */}
                  <div className="absolute inset-0 flex items-center justify-center text-neutral-600 text-xs tracking-widest">
                    {t.portfolio.imagePlaceholder}
                  </div>
                </div>

                {/* Hover scale effect */}
                <div
                  className={`absolute inset-0 transition-transform duration-700 ${
                    hoveredIndex === index ? 'scale-105' : 'scale-100'
                  }`}
                />
              </div>

              {/* Project Info */}
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm text-neutral-500">
                  <span className="tracking-wide">{project.category}</span>
                  <span>{project.year}</span>
                </div>
                <h3 className="text-2xl transition-colors duration-300" onMouseEnter={(e) => (e.currentTarget.style.color = '#FE036A')} onMouseLeave={(e) => (e.currentTarget.style.color = 'inherit')}>
                  {project.title}
                </h3>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
