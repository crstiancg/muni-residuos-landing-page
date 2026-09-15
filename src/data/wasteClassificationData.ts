import { WasteItem } from '../types';

export const WASTE_CATEGORIES_INFO = [
  {
    id: 'organicos',
    title: 'Residuos Orgánicos',
    subtitle: 'Tacho / Bolsa Verde',
    daysBadge: 'LUN - MIÉ - VIE',
    colorName: 'Verde / Marrón',
    colorHex: '#15803D',
    bgLight: '#F0FDF4',
    borderClass: 'border-emerald-200',
    iconBg: 'bg-emerald-100 text-emerald-800',
    description: 'Residuos que se transforman en abono natural.',
    itemsType: 'accepted' as const,
    items: [
      'Cáscaras de frutas y verduras',
      'Restos de comida cocida y café',
      'Cáscaras de huevo y té',
      'Hojas secas y restos de jardín'
    ],
    acceptedItems: [
      'Cáscaras de frutas y verduras',
      'Restos de comida cocida y café',
      'Cáscaras de huevo y té',
      'Hojas secas y restos de jardín'
    ],
    prohibitedItems: [],
    collectionDays: 'LUN - MIÉ - VIE',
    destination: 'Destino: Compost Municipal Puno',
    tag: 'LUN - MIÉ - VIE'
  },
  {
    id: 'inorganicos',
    title: 'Inorgánicos Reciclables',
    subtitle: 'Bolsa / Tacho Azul o Blanco',
    daysBadge: 'MAR - JUE - SÁB',
    colorName: 'Celeste Institucional / Azul',
    colorHex: '#0081C0',
    bgLight: '#F0F9FF',
    borderClass: 'border-[#0081C0]/30',
    iconBg: 'bg-[#0081C0]/10 text-[#0B335E]',
    description: 'Materiales listos para su reutilización.',
    itemsType: 'accepted' as const,
    items: [
      'Botellas de plástico (PET) aplastadas',
      'Cartón, cajas y periódicos secos',
      'Latas de leche, atún y metales',
      'Envases de vidrio intactos'
    ],
    acceptedItems: [
      'Botellas de plástico (PET) aplastadas',
      'Cartón, cajas y periódicos secos',
      'Latas de leche, atún y metales',
      'Envases de vidrio intactos'
    ],
    prohibitedItems: [],
    collectionDays: 'MAR - JUE - SÁB',
    destination: 'Destino: Recicladores Formalizados',
    tag: 'MAR - JUE - SÁB'
  },
  {
    id: 'no_aprovechables',
    title: 'No Aprovechables',
    subtitle: 'Bolsa Negra / Tacho Gris',
    daysBadge: 'DIARIO / TURNO NOCHE',
    colorName: 'Gris / Negro',
    colorHex: '#475569',
    bgLight: '#F8FAFC',
    borderClass: 'border-slate-300',
    iconBg: 'bg-slate-200 text-slate-800',
    description: 'Residuos no útiles.',
    itemsType: 'prohibited' as const,
    items: [
      'Papel higiénico y pañales usados',
      'Colillas de cigarro y tecnopor',
      'Mascarillas y guantes desechables',
      'Pilas y focos (Puntos RAEE)'
    ],
    acceptedItems: [],
    prohibitedItems: [
      'Papel higiénico y pañales usados',
      'Colillas de cigarro y tecnopor',
      'Mascarillas y guantes desechables',
      'Pilas y focos (Puntos RAEE)'
    ],
    collectionDays: 'DIARIO / TURNO NOCHE',
    destination: 'Destino: Relleno Sanitario Itapalluni',
    tag: 'DIARIO / TURNO NOCHE'
  }
];

export const WASTE_SEARCH_ITEMS: WasteItem[] = [
  // Orgánicos
  {
    id: 'w-1',
    name: 'Cáscara de plátano / manzana / frutas',
    category: 'organico',
    categoryName: 'Residuo Orgánico',
    binColor: '#15803D',
    badgeBg: 'bg-emerald-100 text-emerald-800 border-emerald-300',
    badgeText: 'Bolsa Verde / Compost',
    disposalTip: 'Ideal para compostaje. Picar en trozos pequeños para acelerar la descomposición natural.',
    collectionDays: 'Lunes, Miércoles y Viernes',
    canBeComposted: true
  },
  {
    id: 'w-2',
    name: 'Restos de café molido y té',
    category: 'organico',
    categoryName: 'Residuo Orgánico',
    binColor: '#15803D',
    badgeBg: 'bg-emerald-100 text-emerald-800 border-emerald-300',
    badgeText: 'Bolsa Verde / Compost',
    disposalTip: 'Aporta nitrógeno excelente para la tierra del jardín y las composteras domiciliarias.',
    collectionDays: 'Lunes, Miércoles y Viernes',
    canBeComposted: true
  },
  {
    id: 'w-3',
    name: 'Cáscaras de huevo',
    category: 'organico',
    categoryName: 'Residuo Orgánico',
    binColor: '#15803D',
    badgeBg: 'bg-emerald-100 text-emerald-800 border-emerald-300',
    badgeText: 'Bolsa Verde / Compost',
    disposalTip: 'Triturar con las manos antes de colocarlo en el compost para enriquecerlo con calcio.',
    collectionDays: 'Lunes, Miércoles y Viernes',
    canBeComposted: true
  },
  {
    id: 'w-4',
    name: 'Hojas secas y flores marchitas',
    category: 'organico',
    categoryName: 'Residuo Orgánico',
    binColor: '#15803D',
    badgeBg: 'bg-emerald-100 text-emerald-800 border-emerald-300',
    badgeText: 'Bolsa Verde / Compost',
    disposalTip: 'Materia marrón (carbono). Sirve como capa de cobertura para evitar olores en tu compostera.',
    collectionDays: 'Lunes, Miércoles y Viernes',
    canBeComposted: true
  },
  {
    id: 'w-5',
    name: 'Restos de verduras (lechuga, papa, zanahoria)',
    category: 'organico',
    categoryName: 'Residuo Orgánico',
    binColor: '#15803D',
    badgeBg: 'bg-emerald-100 text-emerald-800 border-emerald-300',
    badgeText: 'Bolsa Verde / Compost',
    disposalTip: 'Desecho verde de alto valor para la producción de humus municipal.',
    collectionDays: 'Lunes, Miércoles y Viernes',
    canBeComposted: true
  },

  // Inorgánicos Reciclables
  {
    id: 'w-6',
    name: 'Botella de plástico PET (gaseosa, agua mineral)',
    category: 'inorganico',
    categoryName: 'Inorgánico Reciclable',
    binColor: '#0081C0',
    badgeBg: 'bg-[#0081C0]/10 text-[#0B335E] border-[#0081C0]/30',
    badgeText: 'Bolsa Celeste / Reciclable',
    disposalTip: 'Vaciar el líquido, enjuagar levemente, aplastar para reducir volumen y colocar la tapa.',
    collectionDays: 'Martes, Jueves y Sábado (Recicladores Sumac Ayni)',
    canBeComposted: false
  },
  {
    id: 'w-7',
    name: 'Lata de leche / atún / conservas',
    category: 'inorganico',
    categoryName: 'Inorgánico Reciclable',
    binColor: '#0081C0',
    badgeBg: 'bg-[#0081C0]/10 text-[#0B335E] border-[#0081C0]/30',
    badgeText: 'Bolsa Celeste / Reciclable',
    disposalTip: 'Enjuagar para retirar restos de comida y evitar malos olores antes de entregar al reciclador.',
    collectionDays: 'Martes, Jueves y Sábado (Recicladores Sumac Ayni)',
    canBeComposted: false
  },
  {
    id: 'w-8',
    name: 'Caja de cartón / Cartulina seca',
    category: 'inorganico',
    categoryName: 'Inorgánico Reciclable',
    binColor: '#0081C0',
    badgeBg: 'bg-[#0081C0]/10 text-[#0B335E] border-[#0081C0]/30',
    badgeText: 'Bolsa Celeste / Reciclable',
    disposalTip: 'Desarmar y aplanar para optimizar el espacio. Mantener seco (el cartón mojado pierde valor).',
    collectionDays: 'Martes, Jueves y Sábado (Recicladores Sumac Ayni)',
    canBeComposted: false
  },
  {
    id: 'w-9',
    name: 'Frasco o botella de vidrio (sin romper)',
    category: 'inorganico',
    categoryName: 'Inorgánico Reciclable',
    binColor: '#0081C0',
    badgeBg: 'bg-[#0081C0]/10 text-[#0B335E] border-[#0081C0]/30',
    badgeText: 'Bolsa Celeste / Reciclable',
    disposalTip: 'Enjuagar y separar tapas metálicas. El vidrio es 100% e infinitamente reciclable.',
    collectionDays: 'Martes, Jueves y Sábado (Recicladores Sumac Ayni)',
    canBeComposted: false
  },
  {
    id: 'w-10',
    name: 'Envase Tetra Pak (leche, jugo)',
    category: 'inorganico',
    categoryName: 'Inorgánico Reciclable',
    binColor: '#0081C0',
    badgeBg: 'bg-[#0081C0]/10 text-[#0B335E] border-[#0081C0]/30',
    badgeText: 'Bolsa Celeste / Reciclable',
    disposalTip: 'Desplegar las esquinas, escurrir el líquido, aplanar y colocar en la bolsa de reciclaje.',
    collectionDays: 'Martes, Jueves y Sábado (Recicladores Sumac Ayni)',
    canBeComposted: false
  },
  {
    id: 'w-11',
    name: 'Papel bond / Cuadernos viejos / Periódico',
    category: 'inorganico',
    categoryName: 'Inorgánico Reciclable',
    binColor: '#0081C0',
    badgeBg: 'bg-[#0081C0]/10 text-[#0B335E] border-[#0081C0]/30',
    badgeText: 'Bolsa Celeste / Reciclable',
    disposalTip: 'Apilar sin arrugar en exceso. Retirar grapas metálicas o espirales plásticos si es posible.',
    collectionDays: 'Martes, Jueves y Sábado (Recicladores Sumac Ayni)',
    canBeComposted: false
  },

  // No Aprovechables
  {
    id: 'w-12',
    name: 'Papel higiénico usado / Pañales / Toallitas',
    category: 'no_aprovechable',
    categoryName: 'No Aprovechable (Sanitario)',
    binColor: '#475569',
    badgeBg: 'bg-slate-200 text-slate-800 border-slate-400',
    badgeText: 'Bolsa Negra / Relleno Sanitario',
    disposalTip: 'Empacar en doble bolsa cerrada para resguardar la salud de los operarios de limpieza pública.',
    collectionDays: 'Horario habitual de camión compactador',
    canBeComposted: false
  },
  {
    id: 'w-13',
    name: 'Envoltura de snacks / Galletas / Caramelos',
    category: 'no_aprovechable',
    categoryName: 'No Aprovechable (Metalizado)',
    binColor: '#475569',
    badgeBg: 'bg-slate-200 text-slate-800 border-slate-400',
    badgeText: 'Bolsa Negra / Relleno Sanitario',
    disposalTip: 'Plásticos aluminizados complejos que no pueden ser procesados mecánicamente en la región.',
    collectionDays: 'Horario habitual de camión compactador',
    canBeComposted: false
  },
  {
    id: 'w-14',
    name: 'Tecnopor / Poliestireno expandido',
    category: 'no_aprovechable',
    categoryName: 'No Aprovechable',
    binColor: '#475569',
    badgeBg: 'bg-slate-200 text-slate-800 border-slate-400',
    badgeText: 'Bolsa Negra / Relleno Sanitario',
    disposalTip: 'Depositar en bolsa negra. Recuerda preferir envases biodegradables o reutilizables.',
    collectionDays: 'Horario habitual de camión compactador',
    canBeComposted: false
  },
  {
    id: 'w-15',
    name: 'Colillas de cigarro / Ceniza',
    category: 'no_aprovechable',
    categoryName: 'No Aprovechable',
    binColor: '#475569',
    badgeBg: 'bg-slate-200 text-slate-800 border-slate-400',
    badgeText: 'Bolsa Negra / Relleno Sanitario',
    disposalTip: 'Asegúrate de que estén completamente apagadas antes de tirarlas para evitar incendios en el camión.',
    collectionDays: 'Horario habitual de camión compactador',
    canBeComposted: false
  },
  {
    id: 'w-16',
    name: 'Pilas y Baterías usadas',
    category: 'no_aprovechable',
    categoryName: 'Residuo Peligroso / Especial (RAEE)',
    binColor: '#DC2626',
    badgeBg: 'bg-red-100 text-red-800 border-red-300',
    badgeText: 'Ánforas Municipales Especiales',
    disposalTip: 'NO TIRAR AL CAMIÓN. Llevar a los contenedores especiales en el Palacio Municipal (Jr. Deustua) o mercado Central.',
    collectionDays: 'Puntos de acopio permanente',
    canBeComposted: false
  },
  {
    id: 'w-17',
    name: 'Caja de pizza con grasa',
    category: 'no_aprovechable',
    categoryName: 'No Aprovechable',
    binColor: '#475569',
    badgeBg: 'bg-slate-200 text-slate-800 border-slate-400',
    badgeText: 'Bolsa Negra / Relleno Sanitario',
    disposalTip: 'La grasa y aceite impiden el reciclaje de la fibra de papel. Si la tapa superior está limpia y seca, puedes recortarla y reciclarla; la parte grasosa va al tacho negro.',
    collectionDays: 'Horario habitual de camión compactador',
    canBeComposted: false
  },
  {
    id: 'w-18',
    name: 'Ropa y calzado en desuso',
    category: 'inorganico',
    categoryName: 'Textil / Reutilización o Donación',
    binColor: '#0081C0',
    badgeBg: 'bg-[#0081C0]/10 text-[#0B335E] border-[#0081C0]/30',
    badgeText: 'Donación / Campañas Especiales',
    disposalTip: 'Si las prendas están en buen estado, destínalas a donación solidaria en parroquias o albergues. Si están rotas o inservibles, entrégalas en campañas de reciclaje textil o en bolsa separada.',
    collectionDays: 'Puntos de acopio social y campañas municipales',
    canBeComposted: false
  },
  {
    id: 'w-19',
    name: 'Tapitas de plástico',
    category: 'inorganico',
    categoryName: 'Inorgánico Reciclable (Polipropileno)',
    binColor: '#0081C0',
    badgeBg: 'bg-[#0081C0]/10 text-[#0B335E] border-[#0081C0]/30',
    badgeText: 'Bolsa Celeste / Reciclable',
    disposalTip: 'Juntar las tapitas plásticas en una botella. Son un material plástico de alta densidad muy valorado por las asociaciones de recicladores formalizados y campañas de apoyo en salud.',
    collectionDays: 'Martes, Jueves y Sábado (Recicladores Sumac Ayni)',
    canBeComposted: false
  },
  {
    id: 'w-20',
    name: 'Servilletas usadas',
    category: 'no_aprovechable',
    categoryName: 'No Aprovechable',
    binColor: '#475569',
    badgeBg: 'bg-slate-200 text-slate-800 border-slate-400',
    badgeText: 'Bolsa Negra / Relleno Sanitario',
    disposalTip: 'Las servilletas usadas con restos de comida, salsas o grasa no son reciclables como papel seco. Deben disponerse en la bolsa negra para el camión recolector.',
    collectionDays: 'Horario habitual de camión compactador',
    canBeComposted: false
  },
  {
    id: 'w-21',
    name: 'Envase de yogur',
    category: 'inorganico',
    categoryName: 'Inorgánico Reciclable',
    binColor: '#0081C0',
    badgeBg: 'bg-[#0081C0]/10 text-[#0B335E] border-[#0081C0]/30',
    badgeText: 'Bolsa Celeste / Reciclable',
    disposalTip: 'Enjuagar con un poco de agua para retirar los residuos lácteos y escurrir antes de guardar en la bolsa de inorgánicos. Evita malos olores y facilita su revalorización.',
    collectionDays: 'Martes, Jueves y Sábado (Recicladores Sumac Ayni)',
    canBeComposted: false
  }
];
