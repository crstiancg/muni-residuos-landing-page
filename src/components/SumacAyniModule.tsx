import React, { useState } from 'react';
import { 
  HeartHandshake, 
  Calendar, 
  MapPin, 
  Target, 
  ArrowRight, 
  Users, 
  ShieldCheck 
} from 'lucide-react';
import { SUMAC_AYNI_CAMPAIGNS } from '../data/campaignsData';
import { CampaignEvent } from '../types';
import { VolunteerModal } from './VolunteerModal';

export const SumacAyniModule: React.FC = () => {
  const [selectedCampaign, setSelectedCampaign] = useState<CampaignEvent | null>(null);

  return (
    <section 
      id="sumac-ayni" 
      className="py-16 sm:py-20 lg:py-24 bg-gradient-to-b from-[#0B335E] via-[#0B192C] to-[#0B2545] text-white relative overflow-hidden border-b border-slate-800"
    >
      {/* Decorative ambient gradients for depth */}
      <div className="absolute top-1/4 -left-32 w-96 h-96 bg-[#0081C0]/20 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-10 right-0 w-96 h-96 bg-[#15803D]/15 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-amber-500/10 rounded-full blur-3xl pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12 sm:space-y-14 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3.5">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-amber-400/20 text-amber-300 border border-amber-400/40 uppercase tracking-wider">
            <HeartHandshake className="w-3.5 h-3.5 text-amber-400" />
            <span>Conciencia Ambiental Puneña</span>
          </div>
          
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
            Sumac Ayni: Campañas y Eventos Ambientales
          </h2>
          
          <p className="text-sm sm:text-base text-slate-300 leading-relaxed font-normal">
            El <em>Ayni</em> andino aplicado al cuidado de nuestra tierra y el Lago Titicaca. Súmate a las jornadas de reciclaje, limpieza y voluntariado ambiental.
          </p>
        </div>

        {/* 3 Event Cards in Glassmorphism Dark Style */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {SUMAC_AYNI_CAMPAIGNS.map((event) => (
            <div
              key={event.id}
              id={`card-campana-${event.id}`}
              className="bg-white/5 backdrop-blur-md rounded-2xl p-6 sm:p-7 border border-white/10 shadow-xl hover:border-white/20 transition-all duration-200 flex flex-col justify-between space-y-6 hover:-translate-y-1 group"
            >
              <div className="space-y-4">
                
                {/* Badge */}
                <div>
                  <span className={`inline-block text-[11px] font-bold px-3 py-1 rounded-full ${event.badgeColor}`}>
                    {event.badge}
                  </span>
                </div>

                {/* Title */}
                <h3 className="text-xl font-bold text-white group-hover:text-amber-300 transition-colors leading-snug">
                  {event.title}
                </h3>

                {/* Short Description */}
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed line-clamp-2">
                  {event.description}
                </p>

                {/* Logistics Details */}
                <div className="space-y-2.5 pt-4 border-t border-white/10 text-xs">
                  <div className="flex items-start gap-2.5 text-slate-200">
                    <Calendar className="w-4 h-4 text-[#E5A91E] shrink-0 mt-0.5" />
                    <span>{event.date}</span>
                  </div>

                  <div className="flex items-start gap-2.5 text-slate-200">
                    <MapPin className="w-4 h-4 text-[#0081C0] shrink-0 mt-0.5" />
                    <span>{event.location}</span>
                  </div>

                  <div className="flex items-start gap-2.5 text-emerald-300 font-medium">
                    <Target className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <span>{event.target}</span>
                  </div>
                </div>

              </div>

              {/* Action Button */}
              <div className="pt-2">
                <button
                  onClick={() => setSelectedCampaign(event)}
                  id={`btn-unirme-${event.id}`}
                  className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl font-bold text-xs sm:text-sm bg-[#0081C0] hover:bg-[#006699] text-white transition-all shadow-sm shadow-[#0081C0]/30 cursor-pointer"
                >
                  <Users className="w-4 h-4 text-white" />
                  <span>{event.ctaText}</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                </button>
              </div>

            </div>
          ))}
        </div>

        {/* Bottom Banner: Institutional Alliance */}
        <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl">
          <div className="flex items-center gap-4 text-left">
            <div className="w-12 h-12 rounded-xl bg-white/10 text-[#E5A91E] flex items-center justify-center shrink-0 border border-white/20 shadow-xs">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-base font-bold text-white">¿Representas a una Institución, Colegio o Empresa en Puno?</h4>
              <p className="text-xs text-slate-300 mt-0.5">Podemos coordinar talleres de educación ambiental in situ y certificación institucional con la Municipalidad.</p>
            </div>
          </div>
          <button
            onClick={() => setSelectedCampaign(SUMAC_AYNI_CAMPAIGNS[0])}
            className="px-5 py-3 rounded-xl text-xs sm:text-sm font-bold bg-[#E5A91E] hover:bg-[#d49b17] text-slate-950 transition-colors cursor-pointer shrink-0 shadow-md"
          >
            Solicitar Alianza Institucional
          </button>
        </div>

      </div>

      {/* Volunteer Registration Modal */}
      {selectedCampaign && (
        <VolunteerModal campaign={selectedCampaign} onClose={() => setSelectedCampaign(null)} />
      )}
    </section>
  );
};
