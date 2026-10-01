import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { HeroSection } from './components/HeroSection';
import { RoutesModule } from './components/RoutesModule';
import { SegregationModule } from './components/SegregationModule';
import { CitizenReportModule } from './components/CitizenReportModule';
import { SumacAyniModule } from './components/SumacAyniModule';
import { CompostModule } from './components/CompostModule';
import { ActualidadSection } from './components/ActualidadSection';
import { FaqSection } from './components/FaqSection';
import { Footer } from './components/Footer';

export default function App() {
  const [activeSection, setActiveSection] = useState<string>('');

  // Track scroll position to highlight active navigation link
  useEffect(() => {
    const handleScroll = () => {
      const sections = ['rutas', 'segregacion', 'compostaje', 'sumac-ayni', 'actualidad', 'reporta', 'faq'];
      const scrollPosition = window.scrollY + 200;

      let foundSection = '';
      for (const sectionId of sections) {
        const element = document.getElementById(sectionId);
        if (element) {
          const top = element.offsetTop;
          const height = element.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            foundSection = sectionId;
            break;
          }
        }
      }
      
      setActiveSection(foundSection);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Ejecutar una vez al montar
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-[#0F172A] flex flex-col selection:bg-[#0081C0] selection:text-white">
      {/* 1. Header */}
      <Header activeSection={activeSection} />

      {/* 3. Hero Section */}
      <HeroSection 
        onScrollToRoutes={() => scrollToSection('rutas')}
        onScrollToReports={() => scrollToSection('reporta')}
        onScrollToApp={() => scrollToSection('descargar-app')}
      />

      <main className="flex-1 bg-transparent">
        {/* 1. Rutas */}
        <RoutesModule />

        {/* 2. Segregación */}
        <SegregationModule />

        {/* 3. Compostaje */}
        <CompostModule />

        {/* 4. Sumac Ayni */}
        <SumacAyniModule />

        {/* 5. Actualidad: Noticias + Galería de Impacto */}
        <ActualidadSection />

        {/* 7. Reporta a tu Vecino */}
        <CitizenReportModule />

        {/* 8. FAQ */}
        <FaqSection />
      </main>

      {/* 11. Footer */}
      <Footer />
    </div>
  );
}
