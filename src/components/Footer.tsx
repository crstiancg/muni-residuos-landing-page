import React from 'react';
import { Recycle, MapPin, Phone, Mail, Clock, ExternalLink, ShieldCheck, Heart } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer id="main-footer" className="bg-gradient-to-b from-[#0B192C] via-[#0B2545] to-[#0B192C] text-slate-300 border-t border-slate-800 text-xs sm:text-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-16 space-y-12">
        
        {/* 4-Column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-10">
          
          {/* Column 1: Brand & Institutional Identity (5 cols) */}
          <div className="lg:col-span-4 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#0081C0] to-[#0B335E] flex items-center justify-center text-white shadow-xs">
                <Recycle className="w-6 h-6 text-white" />
              </div>
              <div>
                <span className="text-base font-bold text-white tracking-tight block">
                  Muni Puno Digital
                </span>
                <span className="text-[11px] text-slate-400 font-medium">
                  Municipalidad Provincial de Puno
                </span>
              </div>
            </div>

            <p className="text-xs text-slate-400 leading-relaxed">
              Módulo de Gestión Integral de Residuos Sólidos (GGIRS). 
              Tecnología ciudadana para una ciudad más limpia, ordenada y en armonía con el Lago Sagrado de los Incas.
            </p>

            <div className="pt-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md text-[11px] font-semibold bg-white/5 border border-white/10 text-[#E5A91E]">
                <ShieldCheck className="w-3.5 h-3.5 text-[#E5A91E]" />
                Gestión Pública Transparente 2026
              </span>
            </div>
          </div>

          {/* Column 2: Módulos & Enlaces Rápidos (2 cols) */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">
              Módulos del Sistema
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <a href="#rutas" className="hover:text-white transition-colors flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#0081C0]"></span>
                  29 Rutas de Limpieza Pública
                </a>
              </li>
              <li>
                <a href="#segregacion" className="hover:text-white transition-colors flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#15803D]"></span>
                  Recojo Domiciliario y Segregación
                </a>
              </li>
              <li>
                <a href="#reporta" className="hover:text-white transition-colors flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#E5A91E]"></span>
                  Reporta a tu Vecino (Fiscalización)
                </a>
              </li>
              <li>
                <a href="#sumac-ayni" className="hover:text-white transition-colors flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#0081C0]"></span>
                  Sumac Ayni: Campañas Ambientales
                </a>
              </li>
              <li>
                <a href="#compostaje" className="hover:text-white transition-colors flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#22C55E]"></span>
                  Programa Municipal de Compostaje
                </a>
              </li>
              <li>
                <a href="#faq" className="hover:text-white transition-colors flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-slate-400"></span>
                  Preguntas Frecuentes (FAQ)
                </a>
              </li>
            </ul>
          </div>

          {/* Column 3: Contacto GGIRS (3 cols) */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">
              Contacto y Atención
            </h4>
            <div className="space-y-2.5 text-xs text-slate-400">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-[#0081C0] shrink-0 mt-0.5" />
                <span>Palacio Municipal: Jr. Deustua N° 458, Plaza Mayor, Puno</span>
              </div>
              <div className="flex items-start gap-2">
                <Phone className="w-4 h-4 text-[#E5A91E] shrink-0 mt-0.5" />
                <span>Central GGIRS: (051) 368-450 / 951 888 900</span>
              </div>
              <div className="flex items-start gap-2">
                <Mail className="w-4 h-4 text-[#15803D] shrink-0 mt-0.5" />
                <span>residuossolidos@munipuno.gob.pe</span>
              </div>
              <div className="flex items-start gap-2">
                <Clock className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
                <span>Lunes a Viernes: 08:00 AM - 04:30 PM</span>
              </div>
            </div>
          </div>

          {/* Column 4: App Móvil & Portales (2 cols) */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">
              App Oficial
            </h4>
            <p className="text-xs text-slate-400">
              Descarga la aplicación para rastrear los camiones compactadores en tiempo real.
            </p>
            <a
              href="#descargar-app"
              className="inline-flex items-center gap-1.5 text-xs font-bold text-[#0081C0] hover:underline"
            >
              <span>Google Play Store</span>
              <ExternalLink className="w-3 h-3" />
            </a>

            <div className="pt-2 text-[11px] text-slate-500">
              Versión Web 2.4.0 • Inspirada en estándares de patrimonio cultural y servicio cívico.
            </div>
          </div>

        </div>

        {/* Bottom Bar Rights */}
        <div className="pt-8 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>
            © {new Date().getFullYear()} Municipalidad Provincial de Puno. Todos los derechos reservados.
          </p>
          <div className="flex items-center gap-1 text-slate-400">
            <span>Por un Puno limpio frente al Lago Titicaca</span>
            <Heart className="w-3.5 h-3.5 text-red-500 fill-red-500 inline mx-0.5" />
          </div>
        </div>

      </div>
    </footer>
  );
};
