import React, { useState, useEffect, useRef, useCallback } from 'react';
import { 
  ChevronLeft, 
  ChevronRight, 
  Truck, 
  AlertTriangle, 
  Sprout, 
  HeartHandshake, 
  ArrowRight, 
  Pause, 
  Play, 
  Navigation,
  ShieldCheck,
  CheckCircle2,
  Sparkles
} from 'lucide-react';

export interface HeroSectionProps {
  onScrollToRoutes?: () => void;
  onScrollToReports?: () => void;
  onScrollToApp?: () => void;
}

interface SlideItem {
  id: string;
  badge: string;
  badgeIcon: React.ElementType;
  badgeColor: string;
  title: string;
  highlightText: string;
  subtitle: string;
  ctaText: string;
  targetSection: string;
  secondaryCtaText?: string;
  secondaryTargetSection?: string;
  image: string;
  imageAlt: string;
  accentColor: string;
  stats: { label: string; value: string }[];
}

const HERO_SLIDES: SlideItem[] = [
  {
    id: 'slide-rutas',
    badge: 'Sistema Satelital GPS',
    badgeIcon: Navigation,
    badgeColor: 'bg-[#0081C0]/30 text-sky-100 border-sky-300/30',
    title: 'Monitoreo en Vivo de las',
    highlightText: '29 Rutas de Recolección',
    subtitle: 'Sigue el recorrido de los camiones compactadores en tiempo real desde tu celular y recibe avisos de campana en tu cuadra.',
    ctaText: 'Ver las 29 Rutas',
    targetSection: 'rutas',
    secondaryCtaText: 'Descargar App',
    secondaryTargetSection: 'descargar-app',
    image: 'https://images.unsplash.com/photo-1517524008697-84bbe3c3fd98?auto=format&fit=crop&w=1920&q=80',
    imageAlt: 'Monitoreo satelital y flota de recolección en Puno',
    accentColor: '#0081C0',
    stats: [
      { label: 'Rutas Activas', value: '29' },
      { label: 'Cobertura', value: '100% Barrios' },
      { label: 'Frecuencia', value: 'Diaria' }
    ]
  },
  {
    id: 'slide-reportes',
    badge: 'Fiscalización Ciudadana',
    badgeIcon: AlertTriangle,
    badgeColor: 'bg-amber-500/30 text-amber-100 border-amber-300/30',
    title: 'Reporta a tu Vecino y',
    highlightText: 'Puntos Críticos',
    subtitle: 'Denuncia botaderos clandestinos y malas prácticas de disposición de residuos en tu barrio con fotografía georreferenciada.',
    ctaText: 'Reportar Ahora',
    targetSection: 'reporta',
    secondaryCtaText: 'Conocer Sanciones',
    secondaryTargetSection: 'reporta',
    image: 'https://images.unsplash.com/photo-1449824913935-59a10b8d2000?auto=format&fit=crop&w=1920&q=80',
    imageAlt: 'Fiscalización ambiental y calles limpias en Puno',
    accentColor: '#E5A91E',
    stats: [
      { label: 'Respuesta Máx.', value: '24 hrs' },
      { label: 'Geolocalización', value: 'GPS Exacto' },
      { label: 'Seguimiento', value: 'Con Ticket' }
    ]
  },
  {
    id: 'slide-compostaje',
    badge: 'Economía Circular',
    badgeIcon: Sprout,
    badgeColor: 'bg-emerald-500/30 text-emerald-100 border-emerald-300/30',
    title: 'Programa Municipal de',
    highlightText: 'Compostaje Domiciliario',
    subtitle: 'Inscríbete gratis al programa municipal y recibe tu compostera con kit de microorganismos para transformar tus residuos en abono fértil.',
    ctaText: 'Inscribirme al Programa',
    targetSection: 'compostaje',
    secondaryCtaText: 'Calcular Impacto',
    secondaryTargetSection: 'compostaje',
    image: 'https://images.unsplash.com/photo-1592417817098-8f3d6eb22509?auto=format&fit=crop&w=1920&q=80',
    imageAlt: 'Compostaje domiciliario y abono orgánico en Puno',
    accentColor: '#15803D',
    stats: [
      { label: 'Kit Municipal', value: '100% Gratis' },
      { label: 'Abono Generado', value: '60 kg/año' },
      { label: 'Capacitación', value: 'Certificada' }
    ]
  },
  {
    id: 'slide-sumac-ayni',
    badge: 'Cuidado del Lago Titicaca',
    badgeIcon: HeartHandshake,
    badgeColor: 'bg-sky-500/30 text-sky-100 border-sky-300/30',
    title: 'Sumac Ayni: Voluntariado y',
    highlightText: 'Campañas Ambientales',
    subtitle: 'Súmate a las grandes jornadas de limpieza de la bahía interior del Lago Titicaca, ecotrueques barriales y educación ambiental.',
    ctaText: 'Ver Campañas Activas',
    targetSection: 'sumac-ayni',
    secondaryCtaText: 'Segregación en Fuente',
    secondaryTargetSection: 'segregacion',
    image: 'https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?auto=format&fit=crop&w=1920&q=80',
    imageAlt: 'Campañas de limpieza y voluntariado ambiental en Puno',
    accentColor: '#0B335E',
    stats: [
      { label: 'Jornadas 2026', value: 'Mensuales' },
      { label: 'Ecotrueques', value: 'Plantas x Botellas' },
      { label: 'Voluntarios', value: '+1,200 Puneños' }
    ]
  }
];

export const HeroSection: React.FC<HeroSectionProps> = ({
  onScrollToRoutes,
  onScrollToReports,
  onScrollToApp
}) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [touchStartX, setTouchStartX] = useState<number | null>(null);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const totalSlides = HERO_SLIDES.length;

  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % totalSlides);
  }, [totalSlides]);

  const prevSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev - 1 + totalSlides) % totalSlides);
  }, [totalSlides]);

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  // Autoplay management
  useEffect(() => {
    if (!isPaused) {
      timerRef.current = setInterval(() => {
        nextSlide();
      }, 6500);
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isPaused, nextSlide]);

  // Smooth scroll handler
  const handleScrollTo = (targetSection: string) => {
    if (targetSection === 'rutas' && onScrollToRoutes) {
      onScrollToRoutes();
      return;
    }
    if (targetSection === 'reporta' && onScrollToReports) {
      onScrollToReports();
      return;
    }
    if (targetSection === 'descargar-app' && onScrollToApp) {
      onScrollToApp();
      return;
    }
    const element = document.getElementById(targetSection);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') {
        prevSlide();
      } else if (e.key === 'ArrowRight') {
        nextSlide();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [nextSlide, prevSlide]);

  // Touch Swipe handlers
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStartX(e.touches[0].clientX);
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX === null) return;
    const touchEndX = e.changedTouches[0].clientX;
    const diff = touchStartX - touchEndX;
    if (Math.abs(diff) > 50) {
      if (diff > 0) {
        nextSlide();
      } else {
        prevSlide();
      }
    }
    setTouchStartX(null);
  };

  const activeSlide = HERO_SLIDES[currentSlide];

  return (
    <section 
      id="hero-section"
      className="relative w-full min-h-screen bg-slate-900 text-white overflow-hidden select-none flex flex-col justify-between m-0 p-0"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      aria-label="Carrusel de iniciativas de gestión ambiental en Puno"
    >
      {/* Slides Background Images & Overlays */}
      {HERO_SLIDES.map((slide, index) => {
        const isActive = index === currentSlide;
        return (
          <div
            key={slide.id}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
              isActive ? 'opacity-100 z-10' : 'opacity-0 z-0 pointer-events-none'
            }`}
            aria-hidden={!isActive}
          >
            {/* High-resolution Background Photo */}
            <img
              src={slide.image}
              alt={slide.imageAlt}
              className={`w-full h-full object-cover object-center transform transition-transform duration-10000 ease-out ${
                isActive ? 'scale-105' : 'scale-100'
              }`}
              loading={index === 0 ? 'eager' : 'lazy'}
            />

            {/* Carefully calibrated multi-layer gradient overlay (transición de navy a celeste) */}
            <div className="absolute inset-0 bg-gradient-to-r from-[#0B335E]/85 via-[#0081C0]/60 to-[#3399D1]/30"></div>
            <div className="absolute inset-0 bg-gradient-to-t from-[#0B335E]/80 via-transparent to-black/30"></div>

            {/* Architectural Grid Micro-pattern overlay */}
            <div className="absolute inset-0 opacity-15 bg-[radial-gradient(#CBD5E1_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none"></div>
          </div>
        );
      })}

      {/* Main Content Area */}
      <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full flex-1 flex flex-col justify-center pt-24 sm:pt-28 lg:pt-32 pb-24 sm:pb-28 lg:pb-32">
        
        <div className="max-w-3xl space-y-6 sm:space-y-7">
          
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold bg-white/15 text-white border border-white/25 backdrop-blur-md shadow-xs animate-fadeIn">
            {React.createElement(activeSlide.badgeIcon, { className: "w-3.5 h-3.5 text-[#E5A91E]" })}
            <span>{activeSlide.badge}</span>
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse ml-1"></span>
          </div>

          {/* Main Headings (Sans-serif, font-extrabold) */}
          <div className="space-y-1 sm:space-y-2">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-[1.15]">
              {activeSlide.title}{' '}
              <span className="text-white block sm:inline">
                {activeSlide.highlightText}
              </span>
            </h1>
          </div>

          {/* Subtitle / Description */}
          <p className="text-base sm:text-lg lg:text-xl text-slate-100 leading-relaxed font-normal max-w-2xl text-shadow-sm">
            {activeSlide.subtitle}
          </p>

          {/* Call to Actions */}
          <div className="flex flex-wrap items-center gap-3.5 pt-2">
            <button
              onClick={() => handleScrollTo(activeSlide.targetSection)}
              id={`hero-cta-primary-${activeSlide.id}`}
              className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-xl font-bold text-sm bg-[#0081C0] hover:bg-[#006699] text-white transition-all shadow-lg shadow-[#0081C0]/30 hover:shadow-xl hover:-translate-y-0.5 cursor-pointer"
            >
              <span>{activeSlide.ctaText}</span>
              <ArrowRight className="w-4 h-4 text-white" />
            </button>

            {activeSlide.secondaryCtaText && activeSlide.secondaryTargetSection && (
              <button
                onClick={() => handleScrollTo(activeSlide.secondaryTargetSection!)}
                id={`hero-cta-secondary-${activeSlide.id}`}
                className="inline-flex items-center gap-2 px-5 py-3.5 rounded-xl font-bold text-sm bg-white/10 hover:bg-white/20 text-white border border-white/30 backdrop-blur-xs shadow-xs transition-all hover:-translate-y-0.5 cursor-pointer"
              >
                <span>{activeSlide.secondaryCtaText}</span>
              </button>
            )}
          </div>

          {/* Key Metrics / Highlights for Active Slide */}
          <div className="pt-6 border-t border-white/20 grid grid-cols-3 gap-4 max-w-xl">
            {activeSlide.stats.map((stat, i) => (
              <div key={i} className="space-y-0.5">
                <div className="text-lg sm:text-2xl font-extrabold text-white">
                  {stat.value}
                </div>
                <div className="text-xs text-slate-200 font-medium">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>

        </div>

      </div>

      {/* Navigation Arrow Controls */}
      <div className="absolute inset-y-0 left-0 right-0 z-30 flex items-center justify-between px-3 sm:px-6 pointer-events-none">
        <button
          onClick={prevSlide}
          id="hero-slider-prev"
          className="pointer-events-auto w-11 h-11 sm:w-13 sm:h-13 rounded-full bg-white/20 hover:bg-white/30 text-white backdrop-blur-md border border-white/30 flex items-center justify-center transition-all hover:scale-105 active:scale-95 shadow-lg cursor-pointer"
          aria-label="Slide anterior"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>

        <button
          onClick={nextSlide}
          id="hero-slider-next"
          className="pointer-events-auto w-11 h-11 sm:w-13 sm:h-13 rounded-full bg-white/20 hover:bg-white/30 text-white backdrop-blur-md border border-white/30 flex items-center justify-center transition-all hover:scale-105 active:scale-95 shadow-lg cursor-pointer"
          aria-label="Siguiente slide"
        >
          <ChevronRight className="w-6 h-6" />
        </button>
      </div>

      {/* Bottom Bar: Indicators & Slide Jump Pills */}
      <div className="absolute bottom-6 sm:bottom-8 left-0 right-0 z-30 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          
          {/* Dot Indicators */}
          <div className="flex items-center gap-2.5">
            {HERO_SLIDES.map((slide, index) => {
              const isActive = index === currentSlide;
              return (
                <button
                  key={slide.id}
                  onClick={() => goToSlide(index)}
                  id={`hero-dot-${index}`}
                  className={`h-2.5 rounded-full transition-all duration-300 cursor-pointer ${
                    isActive
                      ? 'w-8 bg-[#0081C0] shadow-sm'
                      : 'w-2.5 bg-[#0081C0]/40 hover:bg-[#0081C0]/70'
                  }`}
                  aria-label={`Ir a slide ${index + 1}: ${slide.title}`}
                  aria-current={isActive ? 'true' : 'false'}
                />
              );
            })}
            
            {/* Play/Pause Toggle Indicator */}
            <button
              onClick={() => setIsPaused(!isPaused)}
              className="ml-2 p-1.5 rounded-full text-white/70 hover:text-white bg-white/10 hover:bg-white/20 backdrop-blur-xs transition-colors cursor-pointer"
              title={isPaused ? "Reanudar rotación automática" : "Pausar rotación"}
              aria-label={isPaused ? "Reanudar carrusel" : "Pausar carrusel"}
            >
              {isPaused ? <Play className="w-3 h-3" /> : <Pause className="w-3 h-3" />}
            </button>
          </div>

          {/* Quick topic pills on larger screens */}
          <div className="hidden md:flex items-center gap-2 bg-black/30 backdrop-blur-md p-1.5 rounded-full border border-white/15">
            {HERO_SLIDES.map((slide, index) => {
              const isActive = index === currentSlide;
              return (
                <button
                  key={slide.id}
                  onClick={() => goToSlide(index)}
                  className={`px-3 py-1 rounded-full text-xs font-semibold transition-all cursor-pointer ${
                    isActive
                      ? 'bg-[#0081C0] text-white shadow-xs'
                      : 'text-[#3399D1] border border-[#0081C0]/30 hover:bg-[#0081C0]/20 hover:text-white'
                  }`}
                >
                  {slide.badge}
                </button>
              );
            })}
          </div>

        </div>
      </div>

    </section>
  );
};

