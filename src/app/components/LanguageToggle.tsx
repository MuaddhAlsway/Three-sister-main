import { Globe } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

export function LanguageToggle() {
  const { language, setLanguage } = useLanguage();

  const toggleLanguage = () => {
    setLanguage(language === 'en' ? 'ar' : 'en');
  };

  return (
    <button
      onClick={toggleLanguage}
      className="fixed top-8 ltr:right-8 rtl:left-8 z-50 flex items-center gap-2 px-4 py-2 bg-white/5 backdrop-blur-md border border-white/10 transition-all duration-300 group"
      style={{ '--hover-border-color': '#FE036A' } as React.CSSProperties}
      onMouseEnter={(e) => (e.currentTarget.style.borderColor = '#FE036A')}
      onMouseLeave={(e) => (e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.1)')}
      aria-label="Toggle Language"
    >
      <Globe className="w-4 h-4 transition-colors" style={{ '--group-hover-color': '#FE036A' } as React.CSSProperties} onMouseEnter={(e) => (e.currentTarget.style.color = '#FE036A')} onMouseLeave={(e) => (e.currentTarget.style.color = 'inherit')} />
      <span className="text-sm tracking-wider transition-colors" onMouseEnter={(e) => (e.currentTarget.style.color = '#FE036A')} onMouseLeave={(e) => (e.currentTarget.style.color = 'inherit')}>
        {language === 'en' ? 'AR' : 'EN'}
      </span>
    </button>
  );
}
