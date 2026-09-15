import React, { useState, useEffect } from 'react';
import { Menu, X, Smartphone, MapPin, Recycle, AlertCircle, HeartHandshake, Sprout } from 'lucide-react';

interface HeaderProps {
  activeSection: string;
}

export const Header: React.FC<HeaderProps> = ({ activeSection }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };

    // Initial check
    handleScroll();

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { id: 'rutas', label: '29 Rutas de Camiones', href: '#rutas', icon: MapPin },
    { id: 'segregacion', label: 'Segregación', href: '#segregacion', icon: Recycle },
    { id: 'reporta', label: 'Reporta al Vecino', href: '#reporta', icon: AlertCircle },
    { id: 'sumac-ayni', label: 'Sumac Ayni', href: '#sumac-ayni', icon: HeartHandshake },
    { id: 'compostaje', label: 'Compostaje', href: '#compostaje', icon: Sprout },
  ];

  return (
    <header
      id="main-header"
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-2xs'
          : 'bg-transparent border-b border-transparent shadow-none'
      }`}
    >
      <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-6">
        <div className="flex items-center justify-between h-14">
          
          {/* Compact Logo & Municipal Identity */}
          <a href="#" className="flex items-center gap-2.5 group shrink-0" id="header-logo">
            <div
              className={`w-9 h-9 rounded-lg flex items-center justify-center text-white transition-all duration-200 group-hover:scale-105 ${
                isScrolled
                  ? 'bg-gradient-to-br from-[#006699] to-[#0081C0] shadow-xs'
                  : 'bg-white/15 backdrop-blur-md border border-white/25 shadow-xs'
              }`}
            >
              <Recycle className="w-5 h-5 text-[#E5A91E]" />
            </div>
            <div className="flex items-center gap-1.5">
              <span
                className={`text-base sm:text-lg font-bold tracking-tight transition-colors ${
                  isScrolled
                    ? 'text-[#0B335E] group-hover:text-[#0081C0]'
                    : 'text-white group-hover:text-white/80'
                }`}
              >
                Muni Puno Digital
              </span>
              <span
                className={`text-[10px] uppercase font-bold tracking-wider px-1.5 py-0.5 rounded transition-colors ${
                  isScrolled
                    ? 'bg-[#0081C0]/15 text-[#0B335E] border border-[#0081C0]/30'
                    : 'bg-white/20 text-white border border-white/30 backdrop-blur-xs'
                }`}
              >
                GGIRS
              </span>
            </div>
          </a>

          {/* Clean Desktop Navigation (Text Only) */}
          <nav className="hidden lg:flex items-center space-x-1 xl:space-x-1.5" id="desktop-nav">
            {navLinks.map((link) => {
              const isActive = activeSection === link.id;
              return (
                <a
                  key={link.id}
                  href={link.href}
                  id={`nav-link-${link.id}`}
                  className={`px-3 py-1.5 rounded-lg text-sm transition-all duration-150 ${
                    isScrolled
                      ? isActive
                        ? 'text-[#0B335E] bg-slate-100 font-semibold'
                        : 'text-slate-600 hover:text-[#0B335E] hover:bg-slate-50 font-medium'
                      : isActive
                        ? 'text-white bg-white/25 font-semibold backdrop-blur-xs shadow-2xs'
                        : 'text-white/80 hover:text-white hover:bg-white/10 font-medium'
                  }`}
                >
                  {link.label}
                </a>
              );
            })}
          </nav>

          {/* Compact Header CTA Button */}
          <div className="hidden sm:flex items-center gap-2">
            <a
              href="#descargar-app"
              id="header-cta-app"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer bg-[#0081C0] text-white hover:bg-[#006699] shadow-sm shadow-[#0081C0]/30"
            >
              <Smartphone className="w-3.5 h-3.5 text-white" />
              <span>App Móvil</span>
            </a>
          </div>

          {/* Mobile Hamburger Button */}
          <div className="flex lg:hidden items-center gap-2">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              id="mobile-menu-toggle"
              type="button"
              className={`p-1.5 rounded-lg focus:outline-hidden transition-colors ${
                isScrolled
                  ? 'text-slate-600 hover:text-[#0B335E] hover:bg-slate-100'
                  : 'text-white hover:text-white hover:bg-white/15'
              }`}
              aria-label="Abrir menú de navegación"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div
          id="mobile-drawer"
          className={`lg:hidden border-t px-4 pt-3 pb-5 space-y-1.5 shadow-xl animate-in slide-in-from-top duration-200 ${
            isScrolled
              ? 'bg-white border-slate-200 text-slate-800'
              : 'bg-[#07192F]/98 backdrop-blur-xl border-white/15 text-white'
          }`}
        >
          <div
            className={`text-[11px] font-bold uppercase tracking-wider px-3 py-1 ${
              isScrolled ? 'text-slate-400' : 'text-slate-300'
            }`}
          >
            Módulos del Sistema
          </div>
          {navLinks.map((link) => {
            const Icon = link.icon;
            const isActive = activeSection === link.id;
            return (
              <a
                key={link.id}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className={`flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm transition-colors ${
                  isScrolled
                    ? isActive
                      ? 'text-[#0B335E] bg-slate-100 font-semibold'
                      : 'text-slate-700 hover:text-[#0B335E] hover:bg-slate-50 font-medium'
                    : isActive
                      ? 'text-white bg-white/20 font-semibold'
                      : 'text-white/80 hover:text-white hover:bg-white/10 font-medium'
                }`}
              >
                <Icon className={`w-4 h-4 ${isScrolled ? 'text-[#0081C0]' : 'text-[#E5A91E]'}`} />
                <span>{link.label}</span>
              </a>
            );
          })}
          <div className={`pt-2.5 border-t flex flex-col gap-2 ${isScrolled ? 'border-slate-100' : 'border-white/15'}`}>
            <a
              href="#descargar-app"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center justify-center gap-2 w-full px-4 py-2 rounded-lg text-xs font-bold text-white bg-[#0081C0] hover:bg-[#006699] transition-colors shadow-sm shadow-[#0081C0]/30"
            >
              <Smartphone className="w-4 h-4 text-white" />
              <span>Descargar App Oficial</span>
            </a>
          </div>
        </div>
      )}
    </header>
  );
};
