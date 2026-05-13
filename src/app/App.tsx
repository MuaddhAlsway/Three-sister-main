import { LanguageToggle } from './components/LanguageToggle';
import { HeroSection } from './components/HeroSection';
import { AboutSection } from './components/AboutSection';
import { ServicesSection } from './components/ServicesSection';
import { PortfolioSection } from './components/PortfolioSection';
import { InteractiveSection } from './components/InteractiveSection';
import { MarqueeSection } from './components/MarqueeSection';
import { CTASection } from './components/CTASection';
import { Footer } from './components/Footer';

export default function App() {
  return (
    <div 
      className="min-h-screen w-full text-white overflow-x-hidden"
      style={{
        backgroundImage: 'url(/OIP.webp)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed',
        backgroundRepeat: 'no-repeat'
      }}
    >
      <div className="bg-black/50 min-h-screen w-full">
        <LanguageToggle />
        <HeroSection />
        <AboutSection />
        <ServicesSection />
        <PortfolioSection />
        <InteractiveSection />
        <MarqueeSection />
        <CTASection />
        <Footer />
      </div>
    </div>
  );
}
