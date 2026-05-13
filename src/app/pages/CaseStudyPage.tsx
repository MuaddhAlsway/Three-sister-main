import { useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useLanguage } from '../contexts/LanguageContext';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';

gsap.registerPlugin(ScrollTrigger);

export function CaseStudyPage() {
  const { projectId } = useParams();
  const navigate = useNavigate();
  const { t } = useLanguage();
  const heroRef = useRef<HTMLDivElement>(null);
  const overviewRef = useRef<HTMLDivElement>(null);
  const storyRef = useRef<HTMLDivElement>(null);
  const showcaseRef = useRef<HTMLDivElement>(null);
  const galleryRef = useRef<HTMLDivElement>(null);

  // Get project data from translations
  const projectIndex = parseInt(projectId || '0');
  const project = t.portfolio.projects[projectIndex];

  useEffect(() => {
    if (!project) {
      navigate('/');
      return;
    }

    // Update page title
    document.title = `project/${projectIndex}`;

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

    // Storytelling animations
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
      const cardWidth = 400; // card width
      const gap = 32; // gap-8 = 32px
      const totalWidth = cards.length * (cardWidth + gap);

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
  }, [project, navigate]);

  if (!project) return null;

  return (
    <div className="bg-[#0A0A0A] text-white">
      {/* Hero Section */}
      <section
        ref={heroRef}
        className="relative h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-neutral-800 to-neutral-900"
      >
        <div className="absolute inset-0 hero-image bg-gradient-to-br from-neutral-700 via-neutral-800 to-neutral-900">
          <ImageWithFallback
            src="https://images.unsplash.com/photo-1759563874738-f964048248d3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=2400"
            alt={project.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/40" />
        </div>

        <div className="relative z-10 text-center text-white px-6 max-w-5xl">
          <div className="hero-text overflow-hidden">
            <p className="tracking-[0.3em] mb-4 opacity-80">{project.category.toUpperCase()}</p>
          </div>
          <div className="hero-text overflow-hidden">
            <h1 className="text-[clamp(3rem,8vw,8rem)] leading-[0.95] mb-6">
              {project.title}
            </h1>
          </div>
          <div className="hero-text overflow-hidden">
            <p className="text-xl tracking-wide opacity-90">A Strategic Approach to Excellence — {project.year}</p>
          </div>
        </div>
      </section>

      {/* Project Overview */}
      <section ref={overviewRef} className="py-32 px-6 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-32">
          <div className="space-y-8">
            <div className="overview-item">
              <p className="text-sm tracking-wider opacity-50 mb-2">PROJECT</p>
              <p className="text-2xl">{project.title}</p>
            </div>
            <div className="overview-item">
              <p className="text-sm tracking-wider opacity-50 mb-2">CATEGORY</p>
              <p className="text-2xl">{project.category}</p>
            </div>
            <div className="overview-item">
              <p className="text-sm tracking-wider opacity-50 mb-2">YEAR</p>
              <p className="text-2xl">{project.year}</p>
            </div>
          </div>

          <div className="overview-item">
            <p className="text-[clamp(1.125rem,2vw,1.5rem)] leading-relaxed opacity-80">
              This project represents a significant milestone in our portfolio, showcasing our expertise
              in {project.category.toLowerCase()} and our commitment to delivering exceptional results
              that exceed client expectations and drive meaningful impact.
            </p>
          </div>
        </div>
      </section>

      {/* Storytelling Section */}
      <section ref={storyRef} className="py-24 px-6">
        <div className="max-w-4xl mx-auto space-y-48">
          <div className="space-y-12">
            <h2 className="text-[clamp(2rem,5vw,4rem)] leading-tight">
              The Challenge
            </h2>
            <p className="text-[clamp(1.125rem,2vw,1.5rem)] leading-relaxed opacity-80">
              Every project begins with understanding the unique challenges our clients face. For {project.title},
              we focused on creating a solution that would resonate with their target audience while maintaining
              brand consistency and visual excellence across all touchpoints.
            </p>
          </div>

          <div className="story-image bg-gradient-to-br from-neutral-800 to-neutral-900 rounded-sm overflow-hidden">
            <ImageWithFallback
              src="https://images.unsplash.com/photo-1759563871373-2a7f13ae4b30?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=2000"
              alt="Project concept"
              className="w-full h-[70vh] object-cover rounded-sm"
            />
          </div>

          <div className="space-y-12">
            <h2 className="text-[clamp(2rem,5vw,4rem)] leading-tight">
              The Solution
            </h2>
            <p className="text-[clamp(1.125rem,2vw,1.5rem)] leading-relaxed opacity-80">
              Our approach combined strategic thinking with creative excellence. We developed a comprehensive
              solution that addressed all aspects of the project, from initial concept through final execution,
              ensuring every detail aligned with the client's vision and business objectives.
            </p>
          </div>

          <div className="story-image bg-gradient-to-br from-neutral-800 to-neutral-900 rounded-sm overflow-hidden">
            <ImageWithFallback
              src="https://images.unsplash.com/photo-1759563874671-22b56a3bc6d3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=2000"
              alt="Project implementation"
              className="w-full h-[70vh] object-cover rounded-sm"
            />
          </div>
        </div>
      </section>

      {/* Visual Showcase */}
      <section ref={showcaseRef} className="py-24 px-6 space-y-24">
        <div className="showcase-image max-w-7xl mx-auto bg-gradient-to-br from-neutral-800 to-neutral-900 rounded-sm overflow-hidden">
          <ImageWithFallback
            src="https://images.unsplash.com/photo-1759563874670-9ccc048192ee?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=2400"
            alt="Project showcase"
            className="w-full h-[85vh] object-cover rounded-sm"
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-7xl mx-auto">
          <div className="showcase-image bg-gradient-to-br from-neutral-800 to-neutral-900 rounded-sm overflow-hidden">
            <ImageWithFallback
              src="https://images.unsplash.com/photo-1759563874663-1c8f3ef40302?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1200"
              alt="Detail shot 1"
              className="w-full h-[60vh] object-cover rounded-sm"
            />
          </div>
          <div className="showcase-image bg-gradient-to-br from-neutral-800 to-neutral-900 rounded-sm overflow-hidden">
            <ImageWithFallback
              src="https://images.unsplash.com/photo-1759563876910-5f54c1735761?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1200"
              alt="Detail shot 2"
              className="w-full h-[60vh] object-cover rounded-sm"
            />
          </div>
        </div>

        <div className="showcase-image max-w-5xl mx-auto bg-gradient-to-br from-neutral-800 to-neutral-900 rounded-sm overflow-hidden">
          <ImageWithFallback
            src="https://images.unsplash.com/photo-1752134594016-f4969838b68d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=2000"
            alt="Final result"
            className="w-full h-[75vh] object-cover rounded-sm"
          />
        </div>
      </section>

      {/* Interactive Gallery */}
      <section ref={galleryRef} className="h-screen flex items-center overflow-hidden bg-[#0F0F0F]">
        <div className="flex gap-8 px-6">
          {[
            'https://images.unsplash.com/photo-1718670013921-2f144aba173a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800',
            'https://images.unsplash.com/photo-1718670014130-ee9ee053598d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800',
            'https://images.unsplash.com/photo-1718670013988-c6e3edb92345?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800',
            'https://images.unsplash.com/photo-1718670014361-2feb64f3c3a8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800',
          ].map((src, index) => (
            <div
              key={index}
              className="gallery-card flex-shrink-0 w-[400px] h-[500px] relative group cursor-pointer bg-gradient-to-br from-neutral-800 to-neutral-900 rounded-sm overflow-hidden"
            >
              <ImageWithFallback
                src={src}
                alt={`Gallery item ${index + 1}`}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
            </div>
          ))}
        </div>
      </section>

      {/* Impact Section */}
      <section className="py-32 px-6 max-w-4xl mx-auto text-center">
        <h2 className="text-[clamp(2rem,5vw,4rem)] leading-tight mb-8">
          Results & Impact
        </h2>
        <p className="text-[clamp(1.125rem,2vw,1.5rem)] leading-relaxed opacity-80">
          The successful delivery of {project.title} has strengthened our relationship with the client
          and demonstrated our ability to execute complex projects with precision and creativity, delivering
          measurable results that drive business growth.
        </p>
      </section>

      {/* Back to Portfolio */}
      <section className="py-16 px-6 text-center border-t border-neutral-800">
        <button
          onClick={() => navigate('/')}
          className="inline-flex items-center gap-2 px-8 py-4 border border-neutral-700 hover:border-[#FE036A] transition-colors duration-300"
        >
          <span>← Back to Portfolio</span>
        </button>
      </section>
    </div>
  );
}
