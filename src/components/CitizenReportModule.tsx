import React, { useState, useRef } from 'react';
import { 
  Camera, 
  MapPin, 
  FileText, 
  Phone, 
  ShieldAlert, 
  CheckCircle2, 
  Send, 
  X,
  Navigation,
  Scale,
  ChevronLeft,
  Image as ImageIcon
} from 'lucide-react';
import { CitizenReport } from '../types';

export const CitizenReportModule: React.FC = () => {
  const [category, setCategory] = useState<CitizenReport['category']>('Basura en Esquina');
  const [neighborhood, setNeighborhood] = useState('');
  const [address, setAddress] = useState('');
  const [phone, setPhone] = useState('');
  const [description, setDescription] = useState('');
  const [photoPreview, setPhotoPreview] = useState<string | null>(null);
  const [gpsLoading, setGpsLoading] = useState(false);
  const [submittedTicket, setSubmittedTicket] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleSimulateGPS = () => {
    setGpsLoading(true);
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          setGpsLoading(false);
          setAddress(`Coordenadas: -15.8402, -70.0219 (Puno Centro)`);
          if (!neighborhood) setNeighborhood('Centro Histórico');
        },
        () => {
          setGpsLoading(false);
          setAddress('Jr. Deustua esq. Jr. Lima, Puno');
          if (!neighborhood) setNeighborhood('Barrio Central');
        },
        { timeout: 3000 }
      );
    } else {
      setTimeout(() => {
        setGpsLoading(false);
        setAddress('Av. Floral con Jr. Universitaria, Puno');
        if (!neighborhood) setNeighborhood('Bellavista');
      }, 500);
    }
  };

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPhotoPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  const handleSubmitReport = (e: React.FormEvent) => {
    e.preventDefault();
    if (!description.trim() || !phone.trim()) {
      return;
    }

    setIsSubmitting(true);
    setTimeout(() => {
      const randomTicket = `TKT-PUNO-${Math.floor(100000 + Math.random() * 900000)}`;
      setSubmittedTicket(randomTicket);
      setIsSubmitting(false);
      // reset fields
      setDescription('');
      setAddress('');
      setPhone('');
      setNeighborhood('');
      setPhotoPreview(null);
    }, 800);
  };

  return (
    <section id="reporta" className="py-14 sm:py-18 lg:py-20 bg-[#F8FAFC] border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* 2-Column Balanced Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          
          {/* Left Column (lg:col-span-5): Header, 3 Feature Cards, Legal Notice */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Title & Badge */}
            <div className="space-y-3">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-[#0081C0]/15 text-[#0B335E] border border-[#0081C0]/30 uppercase tracking-wider">
                <ShieldAlert className="w-3.5 h-3.5 text-[#0081C0]" />
                <span>Fiscalización Ciudadana</span>
              </div>
              
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#0B335E] tracking-tight">
                Módulo Reporta a tu Vecino y Puntos Críticos
              </h2>
              
              <p className="text-sm text-slate-600 leading-relaxed">
                Canal de fiscalización ambiental directa para denunciar botaderos clandestinos, arrojo de desmonte o acumulación de basura fuera del horario establecido en la ciudad de Puno.
              </p>
            </div>

            {/* 3 Functionalities in Cards */}
            <div className="space-y-3.5">
              {/* Feature 1 */}
              <div className="bg-white rounded-xl p-4 sm:p-5 border border-slate-200/90 shadow-2xs flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-[#0081C0]/20 text-[#0B335E] flex items-center justify-center shrink-0">
                  <Camera className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-slate-900">Evidencia Fotográfica</h4>
                  <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                    Adjunta fotografías claras del punto crítico o de los infractores para el proceso sancionador.
                  </p>
                </div>
              </div>

              {/* Feature 2 */}
              <div className="bg-white rounded-xl p-4 sm:p-5 border border-slate-200/90 shadow-2xs flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-emerald-100 text-[#15803D] flex items-center justify-center shrink-0">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-slate-900">Geolocalización Automática</h4>
                  <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                    Captura el punto exacto de la infracción con el GPS de tu dispositivo en segundos.
                  </p>
                </div>
              </div>

              {/* Feature 3 */}
              <div className="bg-white rounded-xl p-4 sm:p-5 border border-slate-200/90 shadow-2xs flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-amber-100 text-[#E5A91E] flex items-center justify-center shrink-0">
                  <FileText className="w-5 h-5 text-amber-700" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-slate-900">Seguimiento por Ticket</h4>
                  <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                    Recibe un código único municipal para consultar el estado de atención y la sanción aplicada.
                  </p>
                </div>
              </div>
            </div>

            {/* Legal Notice / Ordenanza Municipal */}
            <div className="bg-amber-50 rounded-xl sm:rounded-2xl p-5 border border-amber-200 text-slate-800 space-y-2">
              <div className="flex items-center gap-2 text-xs font-bold text-amber-900 uppercase tracking-wider">
                <Scale className="w-4 h-4 text-amber-700 shrink-0" />
                <span>Ordenanza Municipal N° 092-2023-MPP</span>
              </div>
              <p className="text-xs text-slate-700 leading-relaxed">
                Se sanciona con multas del <strong>10% al 50% de una UIT</strong> a personas naturales o jurídicas que arrojen residuos sólidos, desmonte o basura en esquinas, áreas verdes y quebradas de la provincia de Puno.
              </p>
            </div>

          </div>

          {/* Right Column (lg:col-span-7): Smartphone-Styled UI Form */}
          <div className="lg:col-span-7">
            <div className="max-w-xl mx-auto lg:max-w-none bg-white rounded-2xl sm:rounded-3xl overflow-hidden border border-slate-300 shadow-xl">
              
              {/* Smartphone Header: Dark Blue (#0B335E) */}
              <div className="bg-[#0B335E] px-4 sm:px-6 py-4 flex items-center justify-between text-white">
                <div className="flex items-center gap-2.5">
                  <button 
                    type="button" 
                    aria-label="Regresar" 
                    className="p-1 rounded-lg hover:bg-white/10 transition-colors text-white/90 cursor-default"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>
                  <span className="font-bold text-sm sm:text-base tracking-wide">
                    Residuos Sólidos
                  </span>
                </div>

                <div className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-extrabold tracking-wider bg-amber-400/20 text-amber-300 border border-amber-400/40 uppercase">
                  EN PROGRAMACIÓN
                </div>
              </div>

              {/* Smartphone Body (White Background) */}
              <div className="p-5 sm:p-7 space-y-5">
                
                {/* Smartphone Subheader */}
                <div className="border-b border-slate-100 pb-3">
                  <h3 className="text-lg sm:text-xl font-extrabold text-slate-900">
                    Recolección de Basura
                  </h3>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Reporta problemas con la recolección de basura o limpieza.
                  </p>
                </div>

                {/* Form Element */}
                <form onSubmit={handleSubmitReport} className="space-y-4" id="form-reporte-vecinal">
                  
                  {/* Título de reporte (select) */}
                  <div className="space-y-1.5">
                    <label htmlFor="select-tipo-infraccion" className="block text-xs font-bold uppercase tracking-wider text-slate-700">
                      Título de reporte *
                    </label>
                    <select
                      id="select-tipo-infraccion"
                      value={category}
                      onChange={(e) => setCategory(e.target.value as CitizenReport['category'])}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm text-slate-800 bg-white focus:ring-2 focus:ring-[#0081C0] focus:outline-hidden"
                    >
                      <option value="Basura en Esquina">Basura arrojada en esquina fuera de horario</option>
                      <option value="Desmonte Clandestino">Desmonte / Escombros de construcción en vía pública</option>
                      <option value="Punto Crítico / Botadero">Punto Crítico / Botadero Clandestino</option>
                      <option value="Contenedor Lleno">Contenedor o papelera colapsada</option>
                      <option value="Camión No Pasó">Omisión de recojo en horario programado</option>
                    </select>
                  </div>

                  {/* Barrio y Ubicación */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                    <div className="space-y-1.5">
                      <label htmlFor="input-barrio" className="block text-xs font-bold uppercase tracking-wider text-slate-700">
                        Barrio o Sector *
                      </label>
                      <input
                        id="input-barrio"
                        type="text"
                        required
                        value={neighborhood}
                        onChange={(e) => setNeighborhood(e.target.value)}
                        placeholder="Ej. Barrio Laykakota"
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm text-slate-800 focus:ring-2 focus:ring-[#0081C0] focus:outline-hidden"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <div className="flex items-center justify-between">
                        <label htmlFor="input-direccion" className="block text-xs font-bold uppercase tracking-wider text-slate-700">
                          Dirección o Referencia *
                        </label>
                        <button
                          type="button"
                          onClick={handleSimulateGPS}
                          className="text-[11px] font-semibold text-[#0081C0] hover:underline flex items-center gap-1 cursor-pointer"
                        >
                          <Navigation className="w-3 h-3" />
                          {gpsLoading ? 'GPS...' : 'GPS'}
                        </button>
                      </div>
                      <input
                        id="input-direccion"
                        type="text"
                        required
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        placeholder="Ej. Jr. Independencia con Tarapacá"
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm text-slate-800 focus:ring-2 focus:ring-[#0081C0] focus:outline-hidden"
                      />
                    </div>
                  </div>

                  {/* Celular (input) */}
                  <div className="space-y-1.5">
                    <label htmlFor="input-celular" className="block text-xs font-bold uppercase tracking-wider text-slate-700">
                      Celular de contacto *
                    </label>
                    <div className="relative">
                      <Phone className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                      <input
                        id="input-celular"
                        type="tel"
                        required
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="Ej. 951 234 567"
                        className="w-full pl-10 pr-3.5 py-2.5 rounded-xl border border-slate-300 text-sm text-slate-800 focus:ring-2 focus:ring-[#0081C0] focus:outline-hidden"
                      />
                    </div>
                  </div>

                  {/* Descripción detallada (textarea) */}
                  <div className="space-y-1.5">
                    <label htmlFor="textarea-descripcion" className="block text-xs font-bold uppercase tracking-wider text-slate-700">
                      Descripción detallada *
                    </label>
                    <textarea
                      id="textarea-descripcion"
                      rows={3}
                      required
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      placeholder="Describe la situación, hora aproximada o detalles del vehículo/infractor..."
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm text-slate-800 focus:ring-2 focus:ring-[#0081C0] focus:outline-hidden resize-none"
                    />
                  </div>

                  {/* Fotografías (botones de Cámara y Galería con preview) */}
                  <div className="space-y-1.5">
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">
                      Fotografías
                    </label>

                    {/* Hidden Native File Input */}
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept="image/*"
                      onChange={handlePhotoUpload}
                      className="hidden"
                    />

                    {/* Actions: Cámara & Galería */}
                    <div className="grid grid-cols-2 gap-2.5">
                      <button
                        type="button"
                        onClick={triggerFileInput}
                        className="flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl border border-slate-300 bg-slate-50 hover:bg-slate-100 text-xs font-bold text-slate-700 transition-colors cursor-pointer"
                      >
                        <Camera className="w-4 h-4 text-[#0081C0]" />
                        <span>Cámara</span>
                      </button>

                      <button
                        type="button"
                        onClick={triggerFileInput}
                        className="flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl border border-slate-300 bg-slate-50 hover:bg-slate-100 text-xs font-bold text-slate-700 transition-colors cursor-pointer"
                      >
                        <ImageIcon className="w-4 h-4 text-[#15803D]" />
                        <span>Galería</span>
                      </button>
                    </div>

                    {/* Preview Area */}
                    {photoPreview ? (
                      <div className="relative mt-2 rounded-xl overflow-hidden border border-slate-200 bg-slate-50 p-2 flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <img src={photoPreview} alt="Vista previa" className="w-14 h-14 object-cover rounded-lg" />
                          <div className="text-xs">
                            <p className="font-semibold text-slate-800">Foto adjunta con éxito</p>
                            <p className="text-slate-400 text-[11px]">Listo para ser remitido</p>
                          </div>
                        </div>
                        <button
                          type="button"
                          onClick={() => setPhotoPreview(null)}
                          className="p-1.5 bg-red-100 hover:bg-red-200 text-red-700 rounded-lg transition-colors cursor-pointer"
                          aria-label="Quitar foto"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                    ) : (
                      <div 
                        onClick={triggerFileInput}
                        className="mt-1 p-3 rounded-xl border border-dashed border-slate-300 bg-slate-50/70 text-center cursor-pointer hover:bg-slate-50 transition-colors"
                      >
                        <span className="text-xs text-slate-500">
                          Presiona Cámara o Galería para adjuntar fotos de evidencia
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    id="btn-enviar-reporte"
                    className="w-full flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl font-bold text-sm bg-[#0081C0] hover:bg-[#006699] text-white transition-all shadow-md shadow-[#0081C0]/30 hover:shadow-lg disabled:opacity-50 cursor-pointer"
                  >
                    <Send className="w-4 h-4 text-white" />
                    <span>{isSubmitting ? 'Registrando Ticket...' : 'Enviar Reporte'}</span>
                  </button>

                  {/* Nota de integración */}
                  <p className="text-[11px] text-center text-slate-400 leading-snug pt-1">
                    Reporte integrado con la Subgerencia de Limpieza Pública y Gestión Ambiental de la Municipalidad Provincial de Puno.
                  </p>

                </form>

              </div>

            </div>
          </div>

        </div>

      </div>

      {/* Success Modal with Generated Ticket */}
      {submittedTicket && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-200">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 sm:p-8 shadow-2xl border border-slate-200 text-center space-y-5">
            <div className="w-16 h-16 rounded-2xl bg-emerald-100 text-[#15803D] flex items-center justify-center mx-auto shadow-xs">
              <CheckCircle2 className="w-10 h-10" />
            </div>

            <div className="space-y-1.5">
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-700">
                ¡Reporte Registrado con Éxito!
              </span>
              <h3 className="text-2xl font-bold text-[#0B335E]">
                Ticket #{submittedTicket}
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Su denuncia ha sido ingresada al Sistema de Fiscalización de la Municipalidad Provincial de Puno. Un inspector verificará la zona en las próximas horas.
              </p>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 text-xs text-left space-y-1">
              <div className="flex justify-between">
                <span className="text-slate-500">Categoría:</span>
                <span className="font-semibold text-slate-800">{category}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Estado:</span>
                <span className="font-bold text-amber-700">En Cola de Inspección</span>
              </div>
            </div>

            <button
              onClick={() => setSubmittedTicket(null)}
              className="w-full py-3 rounded-xl font-bold text-sm bg-[#0081C0] hover:bg-[#006699] text-white transition-colors cursor-pointer"
            >
              Entendido / Cerrar
            </button>
          </div>
        </div>
      )}

    </section>
  );
};
