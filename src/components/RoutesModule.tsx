import React, { useState, useMemo } from 'react';
import { 
  Search, 
  MapPin, 
  Clock, 
  Calendar, 
  Truck, 
  ExternalLink,
  ChevronDown,
} from 'lucide-react';
import { PUNO_ROUTES } from '../data/punoRoutesData';
import { getRouteCoordinates } from '../data/route-coordinates';
import { RouteDetail } from '../types';
import { RouteDetailModal } from './RouteDetailModal';
import { RouteMap } from './RouteMap';

export const RoutesModule: React.FC = () => {
  const [selectedRouteId, setSelectedRouteId] = useState<string>('ruta-01');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [modalRoute, setModalRoute] = useState<RouteDetail | null>(null);
  const [showAllRoutes, setShowAllRoutes] = useState<boolean>(false);

  // Active highlighted route for map and info card
  const activeRoute = useMemo(() => {
    return PUNO_ROUTES.find((r) => r.id === selectedRouteId) || PUNO_ROUTES[0];
  }, [selectedRouteId]);

  // Real coordinates from manual validated dataset [lat, lng]
  const activeRouteCoords = useMemo(() => {
    const coords = getRouteCoordinates(selectedRouteId);
    if (coords && coords.length > 0) {
      return coords;
    }
    return null;
  }, [selectedRouteId]);

  const fallbackCoords: [number, number][] = useMemo(() => {
    if (activeRoute.startLatLng && activeRoute.endLatLng) {
      return [activeRoute.startLatLng, activeRoute.endLatLng];
    }
    return [[-15.8402, -70.0219], [-15.8368, -70.0245]];
  }, [activeRoute]);

  // Featured top 4 tabs
  const featuredTabs = PUNO_ROUTES.slice(0, 4);

  // Search filtering
  const searchResults = useMemo(() => {
    const q = searchQuery.toLowerCase().trim();
    if (!q) return [];

    return PUNO_ROUTES.filter((route) => {
      return (
        route.name.toLowerCase().includes(q) ||
        route.description.toLowerCase().includes(q) ||
        route.coverageStreets.some((s) => s.toLowerCase().includes(q)) ||
        route.mainPoints.some((p) => p.toLowerCase().includes(q))
      );
    });
  }, [searchQuery]);

  // Handle instant search suggestion pick
  const handleStreetSelect = (route: RouteDetail) => {
    setSelectedRouteId(route.id);
    setSearchQuery('');
    setShowAllRoutes(false);
  };

  return (
    <section id="rutas" className="py-14 sm:py-18 lg:py-20 bg-[#F8FAFC] border-b border-slate-200 relative overflow-hidden">
      
      {/* Subtle background micro-mesh texture */}
      <div className="absolute inset-0 opacity-30 bg-[radial-gradient(#CBD5E1_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6 sm:space-y-7 relative z-10">
        
        {/* 1. Section Header (Aligned Left) */}
        <div className="text-left space-y-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-[#0081C0]/15 text-[#0B335E] border border-[#0081C0]/30 uppercase tracking-wider">
            <Truck className="w-3.5 h-3.5 text-[#0081C0]" />
            <span>Sistema Integral de Limpieza Pública</span>
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#0B335E] tracking-tight">
            29 Rutas de Recolección en Puno
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 font-normal max-w-3xl">
            Consulta el recorrido georreferenciado, horarios programados y cobertura de calles por cuadrante urbano.
          </p>
        </div>

        {/* 2. Large Full-Width Street Search Bar */}
        <div className="w-full">
          <div className="relative bg-white rounded-2xl p-2 sm:p-2.5 shadow-sm border-2 border-slate-200 hover:border-slate-300 focus-within:border-[#0081C0] focus-within:ring-4 focus-within:ring-[#0081C0]/20 transition-all">
            <div className="flex items-center gap-3 px-3">
              <Search className="w-6 h-6 text-[#0081C0] shrink-0" />
              <input
                type="text"
                id="input-buscador-calles"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Busca tu calle, jirón o barrio en las 29 rutas de Puno"
                className="w-full text-sm sm:text-base lg:text-lg text-slate-800 placeholder-slate-400 bg-transparent border-none outline-hidden py-3 sm:py-4 font-medium"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="text-xs font-bold text-slate-500 hover:text-slate-700 px-3 py-1.5 bg-slate-100 hover:bg-slate-200 rounded-lg cursor-pointer transition-colors shrink-0"
                >
                  Limpiar
                </button>
              )}
            </div>

            {/* Live Search Results Dropdown */}
            {searchQuery.trim().length > 1 && (
              <div className="mt-2 pt-2 border-t border-slate-100 px-2 max-h-64 overflow-y-auto space-y-1">
                <div className="text-[11px] font-semibold uppercase tracking-wider text-slate-400 px-2 py-1">
                  Rutas con coincidencias ({searchResults.length})
                </div>
                {searchResults.length > 0 ? (
                  searchResults.map((r) => {
                    const q = searchQuery.toLowerCase().trim();
                    const matchingStreets = r.coverageStreets.filter((s) =>
                      s.toLowerCase().includes(q)
                    );
                    return (
                      <button
                        key={r.id}
                        onClick={() => handleStreetSelect(r)}
                        className="w-full text-left p-2.5 rounded-xl hover:bg-slate-50 transition-colors cursor-pointer group border border-transparent hover:border-slate-200"
                      >
                        <div className="flex items-center justify-between gap-2">
                          <div className="flex items-center gap-2 truncate">
                            <MapPin className="w-4 h-4 text-[#0081C0] shrink-0" />
                            <span className="font-bold text-xs sm:text-sm text-[#0B335E] truncate group-hover:text-[#0081C0]">
                              {r.name}
                            </span>
                            <span className="text-slate-500 text-[11px] hidden sm:inline">
                              ({r.schedule})
                            </span>
                          </div>
                          <span className="text-[11px] font-bold text-[#15803D] bg-emerald-50 px-2.5 py-1 rounded-md shrink-0">
                            Ver ruta
                          </span>
                        </div>
                        {matchingStreets.length > 0 && (
                          <div className="mt-1 text-[11px] text-slate-500 pl-6 truncate">
                            Calles coincidentes: <span className="text-slate-700 font-semibold">{matchingStreets.slice(0, 3).join(', ')}{matchingStreets.length > 3 ? '...' : ''}</span>
                          </div>
                        )}
                      </button>
                    );
                  })
                ) : (
                  <div className="p-4 text-center text-xs text-slate-500">
                    No se encontraron calles con el término "{searchQuery}". Prueba con otro jirón o avenida.
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        {/* 3. Route Access Tabs: Ruta 01 | Ruta 02 | Ruta 03 | Ruta 04 | Más Rutas (29) */}
        <div className="space-y-3">
          <div className="flex items-center flex-wrap gap-2">
            {featuredTabs.map((r) => {
              const isSelected = selectedRouteId === r.id;
              return (
                <button
                  key={r.id}
                  id={`tab-${r.id}`}
                  onClick={() => {
                    setSelectedRouteId(r.id);
                    setShowAllRoutes(false);
                  }}
                  className={`px-4 sm:px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all duration-150 cursor-pointer shadow-2xs ${
                    isSelected
                      ? 'bg-[#0081C0] text-white shadow-sm shadow-[#0081C0]/30 ring-2 ring-[#0081C0]/40'
                      : 'bg-white text-[#0B335E] hover:border-[#0081C0]/40 hover:text-[#0081C0] hover:bg-slate-50 border border-slate-200'
                  }`}
                >
                  {r.name.split(':')[0]}
                </button>
              );
            })}

            {/* Extra pill if current selection is outside top 4 */}
            {!featuredTabs.some((r) => r.id === selectedRouteId) && (
              <button
                id={`tab-${activeRoute.id}`}
                className="px-4 sm:px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold bg-[#0081C0] text-white shadow-sm shadow-[#0081C0]/30 ring-2 ring-[#0081C0]/40 cursor-default"
              >
                {activeRoute.name.split(':')[0]}
              </button>
            )}

            {/* "Más Rutas (29)" button positioned next to Ruta 04 */}
            <button
              id="btn-mas-rutas"
              onClick={() => setShowAllRoutes((prev) => !prev)}
              className="inline-flex items-center gap-1.5 px-4 sm:px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold bg-[#0081C0] text-white border border-[#0081C0]/60 shadow-sm hover:bg-[#006699] transition-all duration-150 cursor-pointer"
            >
              <span>Más Rutas (29)</span>
              <ChevronDown className={`w-3.5 h-3.5 text-white transition-transform duration-200 ${showAllRoutes ? 'rotate-180' : ''}`} />
            </button>
          </div>

          {/* Collapsible Panel of all 29 routes */}
          {showAllRoutes && (
            <div id="selector-todas-rutas" className="bg-white rounded-2xl p-4 sm:p-5 border border-slate-200 shadow-sm space-y-3">
              <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                <div className="text-xs font-bold text-[#0B335E] uppercase tracking-wider">
                  Explora las 29 Rutas de Recolección de Puno
                </div>
                <button
                  onClick={() => setShowAllRoutes(false)}
                  className="text-xs text-slate-400 hover:text-slate-600 font-semibold px-2 py-0.5 rounded cursor-pointer"
                >
                  Cerrar
                </button>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2 max-h-64 overflow-y-auto pr-1">
                {PUNO_ROUTES.map((r) => {
                  const isSelected = selectedRouteId === r.id;
                  return (
                    <button
                      key={r.id}
                      onClick={() => {
                        setSelectedRouteId(r.id);
                        setShowAllRoutes(false);
                      }}
                      className={`text-left p-2.5 rounded-xl text-xs transition-all cursor-pointer border ${
                        isSelected
                          ? 'bg-[#0081C0] text-white border-[#0081C0] shadow-2xs font-bold'
                          : 'bg-slate-50 hover:bg-slate-100 text-[#0B335E] border-slate-100'
                      }`}
                    >
                      <div className="font-bold truncate">{r.name.split(':')[0]}</div>
                      <div className={`text-[10px] truncate ${isSelected ? 'text-white/80' : 'text-slate-500'}`}>{r.sector}</div>
                    </button>
                  );
                })}
              </div>
            </div>
          )}
        </div>

        {/* 4. Main Grid: Left Leaflet Map + Right Information Card */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-stretch">
          
          {/* Left Column (lg:col-span-7): Interactive Leaflet Map with GPS Simulated Truck */}
          <div className="lg:col-span-7 flex flex-col">
            <RouteMap
              coordinates={activeRouteCoords || fallbackCoords}
              routeName={activeRoute.name}
              speed={0.001}
              routeNumber={activeRoute.number}
              truckUnit={activeRoute.truckUnit}
              streets={activeRoute.coverageStreets}
              startPointName={activeRoute.mainPoints[0] || activeRoute.coverageStreets[0] || 'Punto Inicial'}
              endPointName={activeRoute.mainPoints[activeRoute.mainPoints.length - 1] || 'Punto Final'}
              fallbackStart={activeRoute.startLatLng}
              fallbackEnd={activeRoute.endLatLng}
            />
          </div>

          {/* Right Column (lg:col-span-5): Information Card */}
          <div className="lg:col-span-5 flex flex-col">
            <div className="w-full h-full bg-white rounded-2xl p-6 sm:p-7 border border-slate-200 shadow-sm flex flex-col justify-between space-y-6">
              
              <div className="space-y-5">
                
                {/* a. Badge del sector + Badge del turno */}
                <div className="flex items-center flex-wrap gap-2">
                  <span className="px-2.5 py-1 rounded-lg text-xs font-bold bg-[#0081C0]/15 text-[#0B335E] border border-[#0081C0]/30">
                    {activeRoute.sector}
                  </span>
                  <span className="px-2.5 py-1 rounded-lg text-xs font-bold bg-amber-100 text-amber-900 border border-amber-300">
                    Turno {activeRoute.shift}
                  </span>
                </div>

                {/* b. Título de la ruta */}
                <div>
                  <h3 className="text-xl sm:text-2xl font-bold text-[#0B335E] leading-snug">
                    {activeRoute.name}
                  </h3>
                </div>

                {/* c. Horario de recogido & d. Frecuencia */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                  <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-100 space-y-1">
                    <div className="flex items-center gap-1.5 text-xs text-slate-500 font-semibold">
                      <Clock className="w-4 h-4 text-[#0081C0]" />
                      <span>Horario de Recojo</span>
                    </div>
                    <div className="text-sm font-bold text-[#0B335E]">{activeRoute.schedule}</div>
                  </div>

                  <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-100 space-y-1">
                    <div className="flex items-center gap-1.5 text-xs text-slate-500 font-semibold">
                      <Calendar className="w-4 h-4 text-[#15803D]" />
                      <span>Frecuencia</span>
                    </div>
                    <div className="text-sm font-bold text-slate-800">{activeRoute.frequency}</div>
                  </div>
                </div>

                {/* e. Descripción del servicio (máximo 2 líneas) */}
                <div className="space-y-1">
                  <h4 className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                    Descripción del Servicio
                  </h4>
                  <p className="text-xs sm:text-sm text-slate-600 line-clamp-2 leading-relaxed">
                    {activeRoute.description}
                  </p>
                </div>

                {/* f. Calles comprendidas (Lista vertical con viñeta MapPin) */}
                <div className="space-y-2 pt-1">
                  <div className="flex items-center justify-between">
                    <h4 className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                      Calles Comprendidas ({activeRoute.coverageStreets.length})
                    </h4>
                  </div>
                  
                  <div className="max-h-44 overflow-y-auto space-y-1.5 pr-1 divide-y divide-slate-100 border border-slate-100 rounded-xl p-2.5 bg-slate-50/50">
                    {activeRoute.coverageStreets.map((street, idx) => (
                      <div
                        key={idx}
                        className="flex items-center gap-2 pt-1.5 first:pt-0 text-xs font-medium text-[#1E293B]"
                      >
                        <MapPin className="w-3.5 h-3.5 text-[#0081C0] shrink-0" />
                        <span className="truncate">{street}</span>
                      </div>
                    ))}
                  </div>
                </div>

              </div>

              {/* g. Botón "Ver Ficha Técnica Completa" */}
              <div className="pt-4 border-t border-slate-100">
                <button
                  onClick={() => setModalRoute(activeRoute)}
                  id="btn-ficha-tecnica-completa"
                  className="w-full flex items-center justify-center gap-2 px-5 py-3 rounded-xl font-bold text-xs sm:text-sm bg-[#0081C0] hover:bg-[#006699] text-white transition-all shadow-sm shadow-[#0081C0]/30 hover:shadow cursor-pointer"
                >
                  <span>Ver Ficha Técnica Completa</span>
                  <ExternalLink className="w-4 h-4 text-white" />
                </button>
              </div>

            </div>
          </div>

        </div>

      </div>

      {/* Modal for full route technical specs */}
      {modalRoute && (
        <RouteDetailModal route={modalRoute} onClose={() => setModalRoute(null)} />
      )}
    </section>
  );
};
