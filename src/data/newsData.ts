import { MunicipalNewsItem } from '../types';
export type { MunicipalNewsItem };

export const NEWS_DATA: MunicipalNewsItem[] = [
  {
    id: 'noticia-01',
    title: 'Erradicación exitosa del botadero clandestino en el barrio Laykakota',
    excerpt: 'La GGIRS intervino 8 puntos críticos en la zona, transformando espacios de acumulación de basura en áreas verdes recuperadas para la comunidad.',
    fullContent: [
      'La Municipalidad Provincial de Puno, a través de la Gerencia de Gestión Integral de Residuos Sólidos (GGIRS), completó con éxito la erradicación de 8 puntos críticos de acumulación de basura en el barrio Laykakota.',
      'Las intervenciones incluyeron la limpieza profunda, el retiro de más de 15 toneladas de residuos sólidos y escombros, y la rehabilitación de los espacios con grass natural, árboles nativos y bancas comunales.',
      'Este trabajo se realizó en coordinación con las juntas vecinales, quienes participaron activamente en las jornadas de limpieza y en la vigilancia posterior para evitar la reincidencia.',
      'La GGIRS continuará con el monitoreo permanente de la zona y hace un llamado a la ciudadanía a depositar sus residuos en los puntos autorizados y respetar los horarios de recolección establecidos.'
    ],
    category: 'Intervención',
    date: '15 de Marzo, 2026',
    readTime: '3 min de lectura',
    author: 'Subgerencia de Limpieza Pública',
    image: 'https://placehold.co/1200x600/166534/FFFFFF?text=Noticia+Intervención',
    tags: ['Laykakota', 'Puntos Críticos', 'Áreas Verdes', 'Recuperación']
  },
  {
    id: 'noticia-02',
    title: 'Nueva flota de 29 compactadores inicia operaciones en toda la ciudad',
    excerpt: 'La renovación completa de la flota municipal permitirá optimizar los tiempos de recolección y ampliar la cobertura a todos los sectores de Puno.',
    fullContent: [
      'Con una inversión histórica en equipamiento municipal, la Municipalidad Provincial de Puno presentó la nueva flota de 29 camiones compactadores que operarán en los 4 sectores de la ciudad.',
      'Los modernos vehículos cuentan con tecnología de compactación de alta eficiencia, sistemas GPS de rastreo en tiempo real y motores que cumplen con los estándares ambientales Euro 5.',
      'La renovación permitirá reducir los tiempos de recorrido, ampliar la cobertura a las zonas periféricas y ofrecer un servicio más eficiente a todos los ciudadanos puneños.'
    ],
    category: 'Logro',
    date: '10 de Marzo, 2026',
    readTime: '4 min de lectura',
    author: 'Gerencia de Gestión Integral de Residuos Sólidos',
    image: 'https://placehold.co/1200x600/0081C0/FFFFFF?text=Noticia+Flota',
    tags: ['Flota Municipal', 'Compactadores', 'Modernización']
  },
  {
    id: 'noticia-03',
    title: 'Gran Reciclatón Puneño recolectó 15 toneladas de material reciclable',
    excerpt: 'La jornada Sumac Ayni superó las expectativas con la participación de más de 1,200 ciudadanos y la recolección récord de plásticos, cartón y metales.',
    fullContent: [
      'La jornada ecológica "Gran Reciclatón Puneño", organizada por la GGIRS en el Parque Manuel Pino, superó todas las expectativas al recolectar 15 toneladas de material reciclable en una sola jornada.',
      'Más de 1,200 ciudadanos participaron activamente en el ecotrueque, canjeando botellas PET, cartón, papel y metales por plantones nativos y bolsas de compost orgánico producido por la propia municipalidad.',
      'Esta iniciativa forma parte del programa Sumac Ayni que busca promover la cultura del reciclaje y la economía circular en la provincia de Puno.',
      'Los materiales recolectados fueron entregados a las asociaciones de recicladores formalizados, quienes los procesarán en la cadena de valor del reciclaje.'
    ],
    category: 'Campaña',
    date: '5 de Marzo, 2026',
    readTime: '2 min de lectura',
    author: 'Subgerencia de Educación Ambiental',
    image: 'https://placehold.co/1200x600/15803D/FFFFFF?text=Noticia+Reciclatón',
    tags: ['Reciclatón', 'Sumac Ayni', 'Economía Circular']
  }
];
