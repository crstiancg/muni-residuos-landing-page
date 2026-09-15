import React, { useState } from 'react';
import { 
  Recycle, 
  Sprout, 
  Trash2, 
  Search, 
  CheckCircle2, 
  XCircle, 
  MapPin
} from 'lucide-react';
import { WASTE_CATEGORIES_INFO, WASTE_SEARCH_ITEMS } from '../data/wasteClassificationData';
import { WasteItem } from '../types';

export const SegregationModule: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedResult, setSelectedResult] = useState<WasteItem | null>(null);
  const [customSearchPerformed, setCustomSearchPerformed] = useState<boolean>(false);

  // Quick suggestion chips
  const suggestionChips = [
    'Caja de pizza con grasa',
    'Pilas y baterías usadas',
    'Ropa y calzado en desuso',
    'Tapitas de plástico',
    'Servilletas usadas',
    'Envase de yogur',
  ];

  const handleSearch = (termToSearch?: string) => {
    const term = (termToSearch !== undefined ? termToSearch : searchQuery).trim().toLowerCase();
    if (!term) return;

    setCustomSearchPerformed(true);

    // Exact or partial match in waste catalog
    const found = 
      WASTE_SEARCH_ITEMS.find((item) => item.name.toLowerCase() === term) ||
      WASTE_SEARCH_ITEMS.find((item) => item.name.toLowerCase().includes(term) || term.includes(item.name.toLowerCase())) ||
      WASTE_SEARCH_ITEMS.find((item) => item.disposalTip.toLowerCase().includes(term));

    if (found) {
      setSelectedResult(found);
    } else {
      // Smart fallback classification based on keywords
      const isOrganic = /manzana|platano|papa|cebolla|verdura|fruta|comida|pan|huevo|hoja|pasto|cafe|hierba|carne/i.test(term);
      const isRecyclable = /plastico|botella|vidrio|lata|aluminio|papel|carton|cuaderno|periodico|tetrapak|metal/i.test(term);
      
      if (isOrganic) {
        setSelectedResult({
          id: 'custom-org',
          name: termToSearch || searchQuery,
          category: 'organico',
          categoryName: 'Residuo Orgánico',
          binColor: '#15803D',
          badgeBg: 'bg-emerald-100 text-emerald-800 border-emerald-300',
          badgeText: 'Bolsa Verde / Compost',
          disposalTip: 'Depositar en la bolsa verde de residuos orgánicos para el compostaje municipal de Salcedo.',
          collectionDays: 'Lunes, Miércoles y Viernes',
          canBeComposted: true
        });
      } else if (isRecyclable) {
        setSelectedResult({
          id: 'custom-inorg',
          name: termToSearch || searchQuery,
          category: 'inorganico',
          categoryName: 'Inorgánico Reciclable',
          binColor: '#0081C0',
          badgeBg: 'bg-[#0081C0]/10 text-[#0B335E] border-[#0081C0]/30',
          badgeText: 'Bolsa Celeste / Reciclable',
          disposalTip: 'Entregar limpio y seco a los recicladores formalizados de Puno (Sumac Ayni).',
          collectionDays: 'Martes, Jueves y Sábados',
          canBeComposted: false
        });
      } else {
        setSelectedResult({
          id: 'custom-noap',
          name: termToSearch || searchQuery,
          category: 'no_aprovechable',
          categoryName: 'No Aprovechable',
          binColor: '#475569',
          badgeBg: 'bg-slate-200 text-slate-800 border-slate-400',
          badgeText: 'Bolsa Negra / Relleno Sanitario',
          disposalTip: 'Residuo general para disposición final segura en el Relleno Sanitario de Itapalluni.',
          collectionDays: 'Horario habitual de camión compactador',
          canBeComposted: false
        });
      }
    }
  };

  const handleChipClick = (chip: string) => {
    setSearchQuery(chip);
    handleSearch(chip);
  };

  return (
    <section id="segregacion" className="py-14 sm:py-18 lg:py-20 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 sm:space-y-10">
        
        {/* Section Header */}
        <div className="text-left max-w-full space-y-2.5">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-50 text-[#15803D] border border-emerald-200 uppercase tracking-wider">
            <Recycle className="w-3.5 h-3.5 text-[#15803D]" />
            <span>Segregación en la Fuente</span>
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#0B335E] tracking-tight">
            Recojo a domicilio: Separa lo que sí sirve
          </h2>
        </div>

        {/* The 3 Clean Institutional Category Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {WASTE_CATEGORIES_INFO.map((cat) => {
            const isOrg = cat.id === 'organicos';
            const isRec = cat.id === 'inorganicos';
            const Icon = isOrg ? Sprout : isRec ? Recycle : Trash2;
            const isProhibited = cat.itemsType === 'prohibited';

            return (
              <div
                key={cat.id}
                id={`card-cat-${cat.id}`}
                className={`rounded-2xl p-6 sm:p-7 border ${cat.borderClass} bg-white shadow-xs hover:shadow-md transition-all duration-200 flex flex-col justify-between space-y-6 relative overflow-hidden`}
              >
                {/* Top Accent Band */}
                <div 
                  className="absolute top-0 left-0 right-0 h-1.5" 
                  style={{ backgroundColor: cat.colorHex }}
                />

                <div className="space-y-4">
                  {/* Category Header */}
                  <div className="flex items-start justify-between gap-3">
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${cat.iconBg} shadow-2xs`}>
                      <Icon className="w-6 h-6" />
                    </div>
                    <span 
                      className="text-[11px] font-bold px-2.5 py-1 rounded-full border tracking-wide uppercase"
                      style={{ 
                        backgroundColor: `${cat.colorHex}15`, 
                        color: cat.colorHex,
                        borderColor: `${cat.colorHex}30`
                      }}
                    >
                      {cat.daysBadge || cat.tag}
                    </span>
                  </div>

                  <div>
                    <h3 className="text-xl font-bold text-[#0B335E]">
                      {cat.title}
                    </h3>
                    <p className="text-xs font-semibold text-slate-500 mt-0.5">
                      {cat.subtitle}
                    </p>
                  </div>

                  <p className="text-xs text-slate-600 leading-relaxed">
                    {cat.description}
                  </p>

                  {/* Items List */}
                  <div className="space-y-2 pt-2 border-t border-slate-100">
                    <ul className="space-y-2">
                      {cat.items.map((item, i) => (
                        <li key={i} className="flex items-start gap-2 text-xs text-slate-700">
                          {isProhibited ? (
                            <XCircle className="w-3.5 h-3.5 text-red-500 shrink-0 mt-0.5" />
                          ) : (
                            <CheckCircle2 className="w-3.5 h-3.5 text-[#15803D] shrink-0 mt-0.5" />
                          )}
                          <span className="leading-snug">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Footer Info: Destination */}
                <div className="pt-3.5 border-t border-slate-100 bg-slate-50/70 -mx-6 -mb-6 p-4 sm:p-5 rounded-b-2xl">
                  <div className="flex items-center gap-2 text-xs font-semibold text-slate-700">
                    <MapPin className="w-3.5 h-3.5 text-[#0081C0] shrink-0" />
                    <span>{cat.destination}</span>
                  </div>
                </div>

              </div>
            );
          })}
        </div>

        {/* Interactive Waste Classifier Widget (Clasificador de Residuos) */}
        <div className="bg-[#F8FAFC] rounded-2xl p-6 sm:p-10 border border-slate-200 space-y-4">
          <h3 className="text-xl sm:text-2xl font-bold text-[#0B335E]">
            ¿Tienes dudas sobre dónde botar un residuo?
          </h3>

          {/* Search Input Bar */}
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <Search className="w-5 h-5 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                id="input-clasificador-residuos"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                placeholder="Escribe el objeto (ej. cáscara de plátano, botella, lata, pila, servilleta)..."
                className="w-full pl-11 pr-4 py-3 bg-white rounded-xl border border-slate-300 text-sm text-slate-800 placeholder-slate-400 shadow-2xs focus:ring-2 focus:ring-[#0081C0] focus:outline-hidden"
              />
            </div>
            <button
              onClick={() => handleSearch()}
              id="btn-consultar-clasificador"
              className="px-6 py-3 rounded-xl font-bold text-sm bg-[#0081C0] hover:bg-[#006699] text-white transition-colors shadow-sm shadow-[#0081C0]/30 cursor-pointer shrink-0"
            >
              Consultar
            </button>
          </div>

          {/* Quick Suggestion Chips */}
          <div className="flex items-center flex-wrap gap-2 pt-1">
            <span className="text-xs font-semibold text-slate-400">Consultas frecuentes:</span>
            {suggestionChips.map((chip, idx) => (
              <button
                key={idx}
                onClick={() => handleChipClick(chip)}
                className="text-xs px-3 py-1 rounded-full bg-white hover:bg-slate-100 text-slate-700 border border-slate-200/90 transition-colors cursor-pointer"
              >
                {chip}
              </button>
            ))}
          </div>

          {/* Dynamic Result Card */}
          {customSearchPerformed && selectedResult && (
            <div 
              id="resultado-clasificador"
              className="bg-white rounded-xl p-5 sm:p-6 border border-slate-200 shadow-xs space-y-4 animate-in fade-in zoom-in-95 duration-200"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-100">
                <div>
                  <span className="text-xs text-slate-400 font-medium">Objeto consultado:</span>
                  <h4 className="text-lg font-bold text-slate-900 capitalize">
                    {selectedResult.name}
                  </h4>
                </div>
                <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold border ${selectedResult.badgeBg}`}>
                  {selectedResult.badgeText}
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
                <div className="p-3 rounded-lg bg-slate-50 border border-slate-100">
                  <span className="font-semibold text-slate-400 block mb-1">Categoría Oficial:</span>
                  <span className="font-bold text-[#0B335E] text-sm">{selectedResult.categoryName}</span>
                </div>

                <div className="p-3 rounded-lg bg-slate-50 border border-slate-100 sm:col-span-2">
                  <span className="font-semibold text-slate-400 block mb-1">Instrucción y Recomendación:</span>
                  <p className="text-slate-700 leading-relaxed">{selectedResult.disposalTip}</p>
                </div>
              </div>

              <div className="flex items-center justify-between text-xs text-slate-500 pt-1">
                <span>Días recomendados: <strong className="text-slate-800">{selectedResult.collectionDays}</strong></span>
                {selectedResult.canBeComposted && (
                  <span className="text-[#15803D] font-semibold flex items-center gap-1">
                    <Sprout className="w-3.5 h-3.5" />
                    Apto para el programa de compostaje
                  </span>
                )}
              </div>
            </div>
          )}

        </div>

      </div>
    </section>
  );
};
