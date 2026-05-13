import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });

    // 🔥 Fix GSAP issues
    ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    ScrollTrigger.refresh();

  }, [pathname]);

  return null;
}