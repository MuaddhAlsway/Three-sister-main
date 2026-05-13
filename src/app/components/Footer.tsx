import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useLanguage } from '../contexts/LanguageContext';

gsap.registerPlugin(ScrollTrigger);

export function Footer() {
  const { t } = useLanguage();
  const footerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(footerRef.current?.children || [], {
        opacity: 0,
        y: 30,
        duration: 0.8,
        stagger: 0.1,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: footerRef.current,
          start: 'top 80%',
        },
      });
    }, footerRef);

    return () => ctx.revert();
  }, []);

  return (
    <footer className="bg-[#0F0F0F] border-t border-neutral-800">
      <div
        ref={footerRef}
        className="max-w-7xl mx-auto px-8 py-20 grid grid-cols-1 md:grid-cols-3 gap-16"
      >
        {/* Brand */}
        <div>
          <h3 className="text-3xl mb-6" style={{ fontWeight: 700 }}>
            {t.hero.title}
          </h3>
          <p className="text-neutral-400 leading-relaxed" style={{ fontWeight: 300 }}>
            {t.footer.description}
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="text-sm tracking-widest mb-6" style={{ color: '#FE036A' }}>{t.footer.exploreTitle}</h4>
          <ul className="space-y-3">
            {t.footer.exploreLinks.map((link) => (
              <li key={link}>
                <a
                  href={`#${link.toLowerCase()}`}
                  className="text-neutral-400 hover:text-white transition-colors duration-300"
                >
                  {link}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Social */}
        <div>
          <h4 className="text-sm tracking-widest mb-6" style={{ color: '#FE036A' }}>{t.footer.connectTitle}</h4>
          <ul className="space-y-3">
            {t.footer.socialLinks.map((social) => (
              <li key={social}>
                <a
                  href={`#${social.toLowerCase()}`}
                  className="text-neutral-400 hover:text-white transition-colors duration-300"
                >
                  {social}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-neutral-800 py-8">
        <div className="max-w-7xl mx-auto px-8 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-neutral-500">
          <div>{t.footer.copyright}</div>
          <div className="flex gap-8">
            <a href="#privacy" className="hover:text-white transition-colors duration-300">
              {t.footer.privacy}
            </a>
            <a href="#terms" className="hover:text-white transition-colors duration-300">
              {t.footer.terms}
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
