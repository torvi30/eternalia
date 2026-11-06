/**
 * ============================================================================
 * ETERNALIA • CATÁLOGO DE EMPRESAS, PLATAFORMAS & SOLUCIONES GASTRONÓMICAS
 * ============================================================================
 * 
 * 💡 GUÍA PARA GESTIONAR EL CATÁLOGO:
 * Administra directamente aquí todas las marcas y empresas:
 * - `name`: Nombre de la marca o negocio.
 * - `category`: 'restaurants' | 'fastfood' | 'cafes' | 'commerce'
 * - `screenshotUrl`: Ruta del pantallazo en public/ (ej. "/screenshots/don-rafael.svg")
 * - `gallery`: Array con pantallazos adicionales si tiene más de una pantalla.
 * - `highlights`: 3 ventajas clave del desarrollo (0% comisiones, velocidad, etc.).
 * - `url`: URL real o demo en vivo.
 * - `metricValue` y `metricLabelEs`: Métrica o cifra de impacto comercial.
 */

export const projectsConfig = [
  // ==========================================
  // CATEGORÍA: RESTAURANTES
  // ==========================================
  {
    id: "don-rafael-steakhouse",
    name: "Don Rafael Steakhouse",
    taglineEs: "Menú Digital QR para Mesas, Comandas a Cocina y Carta de Vinos",
    taglineEn: "In-Table QR Digital Menu, Kitchen Tickets & Interactive Wine List",
    category: "restaurants",
    categoryLabelEs: "Restaurante & Parrilla",
    categoryLabelEn: "Steakhouse & Grill",
    url: "https://donrafael.menu.eternalia.co",
    screenshotUrl: "/products/restaurants/pedidos.jpg",
    gallery: [
      "/products/restaurants/pedidos.jpg",
      "/products/restaurants/productos.jpg",
      "/products/restaurants/metricas.jpg",
      "/products/restaurants/categorias.jpg",
      "/products/restaurants/inventario.png"
    ],
    highlights: [
      "Menú QR para mesas sin esperas",
      "Sincronización instantánea con comanderos",
      "Carta de vinos con sugerencias de maridaje"
    ],
    logo: null,
    logoColor: "from-amber-600 to-red-600",
    badge: "Alta Cocina",
    status: "live",
    metricValue: "18-25 min",
    metricLabelEs: "Tiempo Promedio de Servicio a Mesa",
    metricLabelEn: "Average Table Service Time",
    descriptionEs: "Experiencia gastronómica interactiva para asaderos y alta cocina: los comensales exploran el menú con fotografías de alta resolución, seleccionan términos de carne y envían sus órdenes directo a la estación de parrilla sin intermediarios.",
    descriptionEn: "High-end dining platform: guests browse photo-rich menus, select meat cooking temperatures, and send table tickets straight to the grill kitchen line.",
    techStack: ["React", "Tailwind CSS", "WebSockets", "Firebase Cloud", "Print Ticket POS"],
    featured: true,
  },
  {
    id: "la-trattoria-nonna",
    name: "Trattoria La Nonna",
    taglineEs: "Reserva de Mesas en Vivo y Menú Degustación de Pasta Artesanal",
    taglineEn: "Live Table Booking & Handcrafted Artisanal Pasta Tasting Menu",
    category: "restaurants",
    categoryLabelEs: "Cocina Italiana Tradicional",
    categoryLabelEn: "Traditional Italian",
    url: "https://trattorianonna.reservas.eternalia.co",
    screenshotUrl: "/products/restaurants/productos.jpg",
    gallery: [
      "/products/restaurants/productos.jpg",
      "/products/restaurants/pedidos.jpg",
      "/products/restaurants/categorias.jpg"
    ],
    highlights: [
      "Reservas 100% online confirmadas por WhatsApp",
      "Control de aforo por horarios y salones",
      "Menú bilingüe con filtros para alérgenos"
    ],
    logo: null,
    logoColor: "from-emerald-600 to-teal-700",
    badge: "Reservas Activas",
    status: "live",
    metricValue: "+94% Asistencia",
    metricLabelEs: "Tasa de Asistencia Efectiva en Reservas",
    metricLabelEn: "Effective Reservation Attendance",
    descriptionEs: "Sistema de reservas de mesa en tiempo real y menú degustación para alta hostelería italiana. Notificaciones automáticas a comensales por WhatsApp, gestión de mesas y carta digital con fichas de maridaje.",
    descriptionEn: "Real-time table booking and tasting menu engine for upscale dining. Automated WhatsApp confirmations, host seat management, and allergen filterable menus.",
    techStack: ["React", "WhatsApp Cloud API", "Google Calendar Sync", "Tailwind CSS"],
    featured: true,
  },
  {
    id: "banquetes-armar",
    name: "Banquetes Armar ERP",
    taglineEs: "ERP Integral para Catering de Gala y Eventos de Gran Formato",
    taglineEn: "Comprehensive ERP for Luxury Gala Catering & Large-Scale Events",
    category: "restaurants",
    categoryLabelEs: "Catering & Eventos",
    categoryLabelEn: "Hospitality ERP",
    url: "https://banquetesarmar.eternalia.co",
    screenshotUrl: "/products/restaurants/categorias.jpg",
    gallery: [
      "/products/restaurants/categorias.jpg",
      "/products/restaurants/inventario.png"
    ],
    highlights: [
      "Costeo dinámico de insumos por persona",
      "Cronograma de montajes ceremoniales",
      "Control automatizado de vajilla y cristalería"
    ],
    logo: null,
    logoColor: "from-pink-500 to-rose-600",
    badge: "Eventos Masivos",
    status: "live",
    metricValue: "+450 Eventos",
    metricLabelEs: "Planificados y Ejecutados con Cero Errores",
    metricLabelEn: "Events Successfully Managed",
    descriptionEs: "Plataforma de costeo y gestión de eventos masivos: presupuestos instantáneos por persona, agenda de montajes ceremoniales y control de suministros para recepciones de hasta 2,000 invitados.",
    descriptionEn: "Major event ERP: dynamic ingredient costing per head, ceremonial assembly timelines, and inventory control for banquets up to 2,000 guests.",
    techStack: ["React", "Cloud Firestore", "Costing Engine", "Tailwind CSS"],
    featured: false,
  },

  // ==========================================
  // CATEGORÍA: COMIDAS RÁPIDAS
  // ==========================================
  {
    id: "smash-burger-lab",
    name: "Smash Burger Lab",
    taglineEs: "Motor de Pedidos Express, Domicilios y Checkout en 1 Clic a WhatsApp",
    taglineEn: "Express Delivery Engine & 1-Click WhatsApp Direct Checkout",
    category: "fastfood",
    categoryLabelEs: "Hamburguesería & Delivery",
    categoryLabelEn: "Fast-Casual Burger",
    url: "https://smashburger.pedidos.eternalia.co",
    screenshotUrl: "/products/restaurants/metricas.jpg",
    gallery: [
      "/products/restaurants/metricas.jpg",
      "/products/restaurants/pedidos.jpg",
      "/products/restaurants/productos.jpg"
    ],
    highlights: [
      "0% comisiones por plataformas de terceros",
      "Checkout en 1 clic directo al WhatsApp del negocio",
      "Cálculo automático de costo de domicilio por zona"
    ],
    logo: null,
    logoColor: "from-red-600 to-orange-500",
    badge: "Top Ventas",
    status: "live",
    metricValue: "0% Comisiones",
    metricLabelEs: "Ahorro directo en cada pedido enviado",
    metricLabelEn: "Saved in 3rd-party delivery fees",
    descriptionEs: "Plataforma de alta velocidad diseñada para marcas de comidas rápidas con gran volumen de domicilios. Catálogo interactivo con personalización de ingredientes, combos y envío de comandas estructuradas al WhatsApp oficial.",
    descriptionEn: "High-conversion fast-food ordering frontend. Dynamic combo customizer, toppings builder, and 1-click structured order dispatch to the brand's WhatsApp line.",
    techStack: ["React 18", "Vite", "WhatsApp API", "Geolocation", "Tailwind CSS"],
    featured: true,
  },
  {
    id: "urban-crust-pizza",
    name: "Urban Crust Pizza",
    taglineEs: "Diseñador Visual de Pizzas Mitad y Mitad con Horno en Tiempo Real",
    taglineEn: "Visual Half & Half Pizza Customizer with Live Oven Tracking",
    category: "fastfood",
    categoryLabelEs: "Pizzería Artesanal",
    categoryLabelEn: "Artisanal Pizzeria",
    url: "https://urbanpizza.pedidos.eternalia.co",
    screenshotUrl: "/screenshots/urban-pizza.svg",
    gallery: [
      "/screenshots/urban-pizza.svg"
    ],
    highlights: [
      "Constructor visual interactivo de pizzas",
      "Seguimiento visual del estado de preparación",
      "Integración de pagos por Nequi, Daviplata y QR"
    ],
    logo: null,
    logoColor: "from-orange-500 to-amber-500",
    badge: "Interactivo",
    status: "live",
    metricValue: "12 min",
    metricLabelEs: "Tiempo de Salida de Horno a Reparto",
    metricLabelEn: "From Oven to Courier Dispatch",
    descriptionEs: "Experiencia de compra lúdica y veloz para pizzerías: permite al cliente combinar sabores en pizzas mitad y mitad, añadir bordes de queso y seguir el progreso de horneado en tiempo real.",
    descriptionEn: "Gamified pizza ordering app: customers design split halves with instant price calculations, customize stuffed crusts, and track baking status.",
    techStack: ["React", "Canvas API", "Tailwind CSS", "Firebase Realtime"],
    featured: true,
  },

  // ==========================================
  // CATEGORÍA: CAFÉS & REPOSTERÍA
  // ==========================================
  {
    id: "aroma-cafe-origen",
    name: "Aroma Café de Origen",
    taglineEs: "Catálogo de Cafés de Especialidad y Pedidos Anticipados Pick & Go",
    taglineEn: "Specialty Coffee Micro-lots & Pick & Go Advance Ordering",
    category: "cafes",
    categoryLabelEs: "Cafetería & Bakery",
    categoryLabelEn: "Specialty Coffee & Bakery",
    url: "https://aromacafe.ordenes.eternalia.co",
    screenshotUrl: "/screenshots/aroma-cafe.svg",
    gallery: [
      "/screenshots/aroma-cafe.svg"
    ],
    highlights: [
      "Pedidos Pick & Go para recoger sin hacer filas",
      "Fichas sensoriales y métodos de filtrado interactivos",
      "Venta de café empacado en grano y molido"
    ],
    logo: null,
    logoColor: "from-amber-700 to-yellow-600",
    badge: "Micro-Lotes",
    status: "live",
    metricValue: "0 Filas",
    metricLabelEs: "Retiro Exprés en Barra con Código QR",
    metricLabelEn: "Express QR Counter Pickup",
    descriptionEs: "Plataforma de pedidos express para cafeterías de especialidad y reposterías. Los clientes piden su café y panadería en camino al trabajo, escanean su código QR en barra y retiran en menos de 60 segundos.",
    descriptionEn: "Express ordering system for specialty coffee bars. Commuters order in advance, scan a QR code at the pick-up counter, and grab their order with zero wait time.",
    techStack: ["React", "Tailwind CSS", "QR Engine", "Stripe / Nequi Rails"],
    featured: true,
  },

  // ==========================================
  // CATEGORÍA: COMERCIO & PLATAFORMAS
  // ==========================================
  {
    id: "marinilla-mesh",
    name: "Marinilla Conectada",
    taglineEs: "Red de Conectividad Comercial & Directorio Hiperlocal",
    taglineEn: "Hyperlocal Commercial Discovery & Merchant Network",
    category: "commerce",
    categoryLabelEs: "Red Territorial",
    categoryLabelEn: "Territorial Mesh",
    url: "https://marinilla.eternalia.co",
    screenshotUrl: "/screenshots/marinilla-conectada.svg",
    gallery: [
      "/screenshots/marinilla-conectada.svg"
    ],
    highlights: [
      "+85 comercios interconectados en el municipio",
      "Mapa georreferenciado por sectores comerciales",
      "Contacto directo a WhatsApp con cada negocio"
    ],
    logo: null,
    logoColor: "from-cyan-500 to-blue-600",
    badge: "En Vivo",
    status: "live",
    metricValue: "+85 Comercios",
    metricLabelEs: "Digitalizados en Marinilla",
    metricLabelEn: "Digitized Merchants",
    descriptionEs: "Plataforma hiperlocal que interconecta el tejido comercial del municipio de Marinilla. Catálogos en vivo, geolocalización y contacto directo por WhatsApp sin comisiones de intermediarios.",
    descriptionEn: "Hyperlocal platform interconnecting local commerce in Marinilla. Real-time catalogs, geo-tagging, and 1-click WhatsApp connection without commission cuts.",
    techStack: ["React", "Tailwind", "WhatsApp API", "Geocoding", "Firebase"],
    featured: true,
  },
  {
    id: "commerce-cloud",
    name: "Eternalia Commerce Cloud",
    taglineEs: "Infraestructura Perimetral para Cadenas Gastronómicas y Franquicias",
    taglineEn: "High-Velocity Brand Frontends & Culinary Conversion Engines",
    category: "commerce",
    categoryLabelEs: "Infraestructura & POS",
    categoryLabelEn: "Infrastructure & POS",
    url: "https://commerce.eternalia.co",
    screenshotUrl: "/screenshots/commerce-cloud.svg",
    gallery: [
      "/screenshots/commerce-cloud.svg"
    ],
    highlights: [
      "Velocidad extrema de carga TTFB < 0.35s",
      "Sincronización multi-pantalla en cocina y caja",
      "Infraestructura escalable tolerante a caídas"
    ],
    logo: null,
    logoColor: "from-purple-500 to-indigo-600",
    badge: "Enterprise",
    status: "live",
    metricValue: "< 0.28s",
    metricLabelEs: "Velocidad de Carga Perimetral TTFB",
    metricLabelEn: "TTFB Loading Speed",
    descriptionEs: "Infraestructura web de alta conversión para marcas comerciales: landing pages ultra-rápidas, menús QR interactivos y sincronización de comandas en milisegundos con comanderos de cocina.",
    descriptionEn: "High-conversion web infrastructure for brands: ultra-fast landing pages, dynamic QR menus, and millisecond kitchen ticket synchronization.",
    techStack: ["React 18", "Vite", "Firebase Realtime", "WebSockets", "Stripe"],
    featured: true,
  },
  {
    id: "workforce-os",
    name: "Workforce OS (Servicios Técnicos)",
    taglineEs: "Sistema Operativo para Profesionales y Redes de Servicios",
    taglineEn: "Operating System for Trade Contractors & On-Demand Services",
    category: "commerce",
    categoryLabelEs: "Workforce & Fintech",
    categoryLabelEn: "Workforce & Fintech",
    url: "https://services.eternalia.co",
    screenshotUrl: "/screenshots/commerce-cloud.svg",
    gallery: [
      "/screenshots/commerce-cloud.svg"
    ],
    highlights: [
      "Cotizador algorítmico en 3 pasos",
      "Pagos protegidos en custodia digital (Escrow)",
      "Verificación biométrica de contratistas"
    ],
    logo: null,
    logoColor: "from-emerald-500 to-teal-600",
    badge: "Fase Piloto",
    status: "beta",
    metricValue: "100%",
    metricLabelEs: "Garantía Digital Escrow en Pagos",
    metricLabelEn: "Digital Escrow Guarantee",
    descriptionEs: "Plataforma fintech y operativa que profesionaliza al trabajador independiente. Cotizador algorítmico en 3 pasos, validación biométrica de antecedentes y pagos en custodia protegida.",
    descriptionEn: "Fintech and workflow platform empowering independent trade contractors. 3-step quote generator, identity verification, and platform-insured escrow payments.",
    techStack: ["React", "Firebase Auth", "Escrow Rails", "PDF Engine", "WhatsApp Bot"],
    featured: false,
  }
];
