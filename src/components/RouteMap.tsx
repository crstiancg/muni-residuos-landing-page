import React, { useEffect, useRef, useState } from 'react';
import L from 'leaflet';
import { 
  Maximize2, 
  Radio, 
  Compass, 
  AlertTriangle,
  Info,
  Plus,
  Minus
} from 'lucide-react';

export interface RouteMapProps {
  coordinates?: [number, number][];
  routeName: string;
  speed?: number;
  routeNumber?: number;
  truckUnit?: string;
  streets?: string[];
  startPointName?: string;
  endPointName?: string;
  fallbackStart?: [number, number];
  fallbackEnd?: [number, number];
}

export const RouteMap: React.FC<RouteMapProps> = ({
  coordinates = [],
  routeName,
  speed = 0.001,
  routeNumber,
  truckUnit = 'Compactador Municipal',
  streets = [],
  startPointName = 'Punto de Inicio',
  endPointName = 'Punto de Retorno',
  fallbackStart = [-15.8402, -70.0219],
  fallbackEnd = [-15.8368, -70.0245],
}) => {
  const mapContainerRef = useRef<HTMLDivElement | null>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);
  const layerGroupRef = useRef<L.LayerGroup | null>(null);
  const animFrameRef = useRef<number | null>(null);

  const isUnderConstruction = !coordinates || coordinates.length < 2;

  // Active path to draw
  const activeCoordinates: [number, number][] = isUnderConstruction
    ? [fallbackStart, fallbackEnd]
    : coordinates;

  // Center on current bounds
  const handleCenter = () => {
    if (mapInstanceRef.current && layerGroupRef.current) {
      const layers = layerGroupRef.current.getLayers();
      const poly = layers.find((l) => l instanceof L.Polyline && !(l instanceof L.Polygon)) as L.Polyline | undefined;
      if (poly && poly.getBounds().isValid()) {
        mapInstanceRef.current.fitBounds(poly.getBounds(), {
          padding: [50, 50],
          maxZoom: 16,
          animate: true,
        });
      } else {
        mapInstanceRef.current.setView([-15.8402, -70.0219], 14, { animate: true });
      }
    }
  };

  // 1. Initialize Map once
  useEffect(() => {
    if (!mapContainerRef.current || mapInstanceRef.current) return;

    // Plaza Mayor Puno as primary anchor: [-15.8402, -70.0219]
    const map = L.map(mapContainerRef.current, {
      center: [-15.8402, -70.0219],
      zoom: 14,
      zoomControl: false,
      scrollWheelZoom: true,
    });

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright" target="_blank" rel="noreferrer">OpenStreetMap</a> | Municipalidad de Puno',
    }).addTo(map);

    const layerGroup = L.layerGroup().addTo(map);
    layerGroupRef.current = layerGroup;
    mapInstanceRef.current = map;

    const resizeObserver = new ResizeObserver(() => {
      map.invalidateSize();
    });
    if (mapContainerRef.current) {
      resizeObserver.observe(mapContainerRef.current);
    }

    return () => {
      resizeObserver.disconnect();
      if (animFrameRef.current !== null) {
        cancelAnimationFrame(animFrameRef.current);
      }
      map.remove();
      mapInstanceRef.current = null;
    };
  }, []);

  // 2. Redraw route, markers, and animate truck whenever coordinates or routeName changes
  useEffect(() => {
    const map = mapInstanceRef.current;
    const layerGroup = layerGroupRef.current;
    if (!map || !layerGroup) return;

    // Stop previous animation
    if (animFrameRef.current !== null) {
      cancelAnimationFrame(animFrameRef.current);
      animFrameRef.current = null;
    }

    // Clear previous elements
    layerGroup.clearLayers();

    const pts = activeCoordinates;
    if (pts.length < 2) return;

    // A. Outer casing / shadow line
    const casing = L.polyline(pts, {
      color: isUnderConstruction ? '#475569' : '#006699',
      weight: isUnderConstruction ? 5 : 8,
      opacity: isUnderConstruction ? 0.2 : 0.35,
      lineCap: 'round',
      lineJoin: 'round',
      dashArray: isUnderConstruction ? '8, 8' : undefined,
    });
    casing.addTo(layerGroup);

    // B. Main polyline
    const mainPoly = L.polyline(pts, {
      color: isUnderConstruction ? '#64748B' : '#0081C0',
      weight: isUnderConstruction ? 4 : 5,
      opacity: 0.95,
      lineCap: 'round',
      lineJoin: 'round',
      dashArray: isUnderConstruction ? '6, 8' : undefined,
    });
    mainPoly.addTo(layerGroup);

    // C. Hover interactive segments (if not in construction)
    if (!isUnderConstruction && streets.length > 0) {
      for (let i = 0; i < pts.length - 1; i++) {
        const p1 = pts[i];
        const p2 = pts[i + 1];
        const streetName = streets[i % streets.length] || routeName;

        const seg = L.polyline([p1, p2], {
          color: '#0081C0',
          weight: 14,
          opacity: 0.01,
          interactive: true,
        });

        seg.bindTooltip(`📍 ${streetName}`, {
          sticky: true,
          className: 'puno-street-tooltip',
          direction: 'top',
          offset: [0, -6],
        });

        seg.on('mouseover', () => {
          seg.setStyle({ opacity: 0.85, color: '#E5A91E', weight: 8 });
        });
        seg.on('mouseout', () => {
          seg.setStyle({ opacity: 0.01, color: '#0081C0', weight: 14 });
        });

        seg.addTo(layerGroup);
      }
    }

    // D. Start Marker
    const startCoord = pts[0];
    const startDivIcon = L.divIcon({
      className: 'puno-start-marker',
      html: `
        <div style="position:relative;display:flex;align-items:center;justify-content:center;width:32px;height:32px;">
          <span style="position:absolute;width:28px;height:28px;border-radius:50%;background:rgba(21,128,61,0.35);animation:ping 2s cubic-bezier(0,0,0.2,1) infinite;"></span>
          <div style="width:24px;height:24px;border-radius:50%;background:#15803D;border:2.5px solid #FFFFFF;display:flex;align-items:center;justify-content:center;box-shadow:0 3px 8px rgba(0,0,0,0.35);">
            <svg width="10" height="10" viewBox="0 0 24 24" fill="#FFFFFF"><polygon points="5 3 19 12 5 21 5 3"/></svg>
          </div>
        </div>
      `,
      iconSize: [32, 32],
      iconAnchor: [16, 16],
    });

    const startMarker = L.marker(startCoord, { icon: startDivIcon, zIndexOffset: 800 });
    startMarker.bindTooltip(`🏁 Inicio: ${startPointName}`, {
      className: 'puno-street-tooltip',
      direction: 'top',
      offset: [0, -10],
    });
    startMarker.addTo(layerGroup);

    // E. End Marker
    const endCoord = pts[pts.length - 1];
    const endDivIcon = L.divIcon({
      className: 'puno-end-marker',
      html: `
        <div style="position:relative;display:flex;align-items:center;justify-content:center;width:32px;height:32px;">
          <span style="position:absolute;width:28px;height:28px;border-radius:50%;background:rgba(239,68,68,0.35);animation:ping 2.4s cubic-bezier(0,0,0.2,1) infinite;"></span>
          <div style="width:24px;height:24px;border-radius:50%;background:#EF4444;border:2.5px solid #FFFFFF;display:flex;align-items:center;justify-content:center;box-shadow:0 3px 8px rgba(0,0,0,0.35);">
            <svg width="10" height="10" viewBox="0 0 24 24" fill="#FFFFFF"><rect x="6" y="6" width="12" height="12"/></svg>
          </div>
        </div>
      `,
      iconSize: [32, 32],
      iconAnchor: [16, 16],
    });

    const endMarker = L.marker(endCoord, { icon: endDivIcon, zIndexOffset: 800 });
    endMarker.bindTooltip(`🛑 Fin / Retorno: ${endPointName}`, {
      className: 'puno-street-tooltip',
      direction: 'top',
      offset: [0, -10],
    });
    endMarker.addTo(layerGroup);

    // F. Animated White Compactor Truck
    const truckIcon = L.divIcon({
      className: 'custom-truck-div-icon',
      html: `
        <div class="truck-marker-container">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="white" stroke="#0081C0" stroke-width="1.5" style="width:38px;height:38px;filter:drop-shadow(0 3px 6px rgba(0,0,0,0.45));">
            <rect x="2" y="8" width="18" height="10" rx="1" fill="white" stroke="#0081C0" />
            <circle cx="6" cy="18" r="2" fill="#0B335E" />
            <circle cx="16" cy="18" r="2" fill="#0B335E" />
            <polygon points="20,8 24,8 24,14 20,14" fill="#E5A91E" stroke="#0081C0" />
            <rect x="8" y="10" width="6" height="4" rx="1" fill="#0081C0" />
          </svg>
        </div>
      `,
      iconSize: [42, 42],
      iconAnchor: [21, 21],
    });

    const truckMarker = L.marker(startCoord, {
      icon: truckIcon,
      zIndexOffset: 1200,
    });
    truckMarker.bindTooltip(
      isUnderConstruction
        ? `🚛 ${truckUnit} • Monitoreo referencial`
        : `🚛 ${truckUnit.split(' ')[0]} • En movimiento GPS`,
      {
        className: 'puno-truck-tooltip',
        direction: 'top',
        offset: [0, -16],
      }
    );
    truckMarker.addTo(layerGroup);

    // G. Calculate segment distances for constant velocity animation
    const segmentDistances: number[] = [];
    let totalDist = 0;
    for (let i = 0; i < pts.length - 1; i++) {
      const dist = L.latLng(pts[i][0], pts[i][1]).distanceTo(L.latLng(pts[i + 1][0], pts[i + 1][1]));
      segmentDistances.push(dist);
      totalDist += dist;
    }

    let progress = 0;

    const animate = () => {
      progress += speed;
      if (progress > 1) progress = 0;

      const targetDist = progress * totalDist;
      let accumulated = 0;

      for (let i = 0; i < segmentDistances.length; i++) {
        const segDist = segmentDistances[i];
        if (accumulated + segDist >= targetDist) {
          const t = segDist > 0 ? (targetDist - accumulated) / segDist : 0;
          const pA = pts[i];
          const pB = pts[i + 1];
          const currLat = pA[0] + (pB[0] - pA[0]) * t;
          const currLng = pA[1] + (pB[1] - pA[1]) * t;
          truckMarker.setLatLng([currLat, currLng]);
          break;
        }
        accumulated += segDist;
      }

      animFrameRef.current = requestAnimationFrame(animate);
    };

    animFrameRef.current = requestAnimationFrame(animate);

    // H. Fit bounds to new route
    if (mainPoly.getBounds().isValid()) {
      map.fitBounds(mainPoly.getBounds(), {
        padding: [50, 50],
        maxZoom: 16,
        animate: true,
      });
    }

    return () => {
      if (animFrameRef.current !== null) {
        cancelAnimationFrame(animFrameRef.current);
        animFrameRef.current = null;
      }
    };
  }, [coordinates, routeName, speed, isUnderConstruction]);

  return (
    <div className="w-full h-full min-h-[460px] sm:min-h-[500px] lg:min-h-[560px] bg-slate-100 rounded-2xl border border-slate-200 shadow-md relative overflow-hidden flex flex-col">
      {/* Leaflet Map DOM element */}
      <div ref={mapContainerRef} className="absolute inset-0 w-full h-full z-0" />

      {/* Controles del mapa unificados: Zoom In, Zoom Out, Centrar */}
      <div className="absolute top-3 right-3 z-[400] flex flex-col rounded-xl overflow-hidden border border-slate-200 shadow-md bg-white pointer-events-auto">
        {/* Zoom In */}
        <button
          onClick={() => mapInstanceRef.current?.zoomIn()}
          title="Acercar"
          aria-label="Acercar mapa"
          className="w-9 h-9 flex items-center justify-center text-[#0B335E] hover:bg-slate-50 transition-colors cursor-pointer border-b border-slate-200"
        >
          <Plus className="w-4 h-4" />
        </button>

        {/* Zoom Out */}
        <button
          onClick={() => mapInstanceRef.current?.zoomOut()}
          title="Alejar"
          aria-label="Alejar mapa"
          className="w-9 h-9 flex items-center justify-center text-[#0B335E] hover:bg-slate-50 transition-colors cursor-pointer border-b border-slate-200"
        >
          <Minus className="w-4 h-4" />
        </button>

        {/* Centrar */}
        <button
          onClick={handleCenter}
          id="btn-centrar-ruta"
          title="Centrar ruta"
          aria-label="Centrar ruta en pantalla"
          className="w-9 h-9 flex items-center justify-center text-[#0B335E] hover:bg-slate-50 hover:text-[#0081C0] transition-colors cursor-pointer"
        >
          <Maximize2 className="w-4 h-4" />
        </button>
      </div>

      {/* Banner de alerta: Si la ruta no tiene coordenadas validadas aún */}
      {isUnderConstruction && (
        <div className="absolute bottom-12 left-3 right-3 sm:right-auto sm:max-w-md z-[400] pointer-events-auto">
          <div className="bg-amber-500/95 backdrop-blur-md text-slate-900 border border-amber-600 rounded-xl px-3.5 py-2 shadow-lg flex items-start gap-2.5 text-xs">
            <AlertTriangle className="w-4 h-4 text-amber-950 shrink-0 mt-0.5" />
            <div className="space-y-0.5">
              <p className="font-bold text-amber-950">Ruta en construcción</p>
              <p className="text-[11px] text-amber-900 leading-snug">
                El levantamiento de coordenadas para este recorrido está en fase de validación técnica. 
                Se muestra un trazado preliminar referencial.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Floating Map Overlay: Bottom-Left Simulated GPS Speed Info */}
      <div className="absolute bottom-3 left-3 z-[400] hidden sm:inline-flex items-center gap-2 px-2.5 py-1 rounded-lg bg-slate-900/85 backdrop-blur-xs text-[11px] font-medium text-slate-200 border border-white/10 shadow-xs pointer-events-none">
        <Compass className="w-3 h-3 text-sky-400" />
        <span>
          {isUnderConstruction
            ? 'Monitoreo preventivo • Frecuencia activa'
            : 'Velocidad promedio: 18 km/h'}
        </span>
      </div>
    </div>
  );
};
