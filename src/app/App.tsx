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
    <div className="bg-[#0A0A0A] text-white overflow-x-hidden">
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
  );
}
