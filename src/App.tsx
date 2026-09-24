import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { HeroSection } from './components/HeroSection';
import { RoutesModule } from './components/RoutesModule';
import { SegregationModule } from './components/SegregationModule';
import { CitizenReportModule } from './components/CitizenReportModule';
import { SumacAyniModule } from './components/SumacAyniModule';
import { CompostModule } from './components/CompostModule';
import { AppDownloadSection } from './components/AppDownloadSection';
import { FaqSection } from './components/FaqSection';
import { Footer } from './components/Footer';

export default function App() {
  const [activeSection, setActiveSection] = useState<string>('rutas');

  // Track scroll position to highlight active navigation link
  useEffect(() => {
    const handleScroll = () => {
      const sections = ['rutas', 'segregacion', 'reporta', 'sumac-ayni', 'compostaje', 'descargar-app', 'faq'];
      const scrollPosition = window.scrollY + 200;

      for (const sectionId of sections) {
        const element = document.getElementById(sectionId);
        if (element) {
          const top = element.offsetTop;
          const height = element.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
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

      {/* Franja de transición alargada e inmersiva (Opción C: Hero #0B335E → Rutas #FFFFFF) */}
      <div 
        aria-hidden="true" 
        className="w-full h-32 sm:h-40 lg:h-48 relative overflow-hidden pointer-events-none -mt-px"
        style={{
          background: 'linear-gradient(180deg, #0B335E 0%, #16467E 22%, #1E5BA8 45%, #93C5FD 70%, #DBEAFE 85%, #FFFFFF 100%)',
        }}
      >
        {/* Resplandor sutil difuminado que extiende el glow del Hero */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-5xl h-24 bg-[#0081C0] rounded-[100%] blur-[50px] opacity-25 pointer-events-none" />
      </div>

      <main className="flex-1 bg-white">
        {/* 4. Módulo 1: Las 29 Rutas Oficiales */}
        <RoutesModule />

        {/* 5. Módulo 2: Segregación en la Fuente */}
        <SegregationModule />

        {/* 6. Módulo 3+4: Reporta a tu Vecino & Puntos Críticos */}
        <CitizenReportModule />

        {/* 7. Módulo 5: Sumac Ayni (Campañas Ambientales) */}
        <SumacAyniModule />

        {/* 8. Módulo 6: Compostaje Domiciliario */}
        <CompostModule />

        {/* 9. App Download & QR Section */}
        <AppDownloadSection />

        {/* 10. Preguntas Frecuentes (FAQ) */}
        <FaqSection />
      </main>

      {/* 11. Footer */}
      <Footer />
    </div>
  );
}
