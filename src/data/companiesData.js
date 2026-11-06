/**
 * ============================================================================
 * ETERNALIA • RED DE EMPRESAS Y CLIENTES (MARQUEE DE LOGOS)
 * ============================================================================
 * 
 * 💡 GUÍA PARA EL USUARIO:
 * Puedes modificar las empresas o pegar la URL directa del logo en el campo `logo`.
 * Si el campo `logo` es `null`, se mostrará automáticamente un monograma tipográfico
 * estilizado con los colores del gradiente `logoColor`.
 * 
 * Ejemplo con URL de logo:
 *   logo: "https://tu-dominio.com/logo-empresa.png"
 * O con ruta local en /public:
 *   logo: "/logos/mi-empresa.png"
 */

export const companiesData = [
  {
    id: "chicken-king",
    name: "Chicken King Oriente",
    logo: null, // Pega aquí la URL del logo de la empresa (ej: "https://... o /logos/chickenking.png")
    url: "https://chickenking.menu.eternalia.co",
    categoryEs: "Pollería & Comidas Rápidas",
    categoryEn: "Fried Chicken & Fast Casual",
    taglineEs: "Menú Digital Dark UI, Domicilios & Comandas",
    taglineEn: "Dark UI Digital Menu, Delivery & Tickets",
    logoColor: "from-amber-500 to-orange-600",
    initials: "CK"
  },
  {
    id: "don-rafael",
    name: "Don Rafael Grill",
    logo: null, // Pega aquí la URL del logo de la empresa
    url: "https://donrafael.menu.eternalia.co",
    categoryEs: "Restaurante & Parrilla",
    categoryEn: "Steakhouse & Grill",
    taglineEs: "Menú QR en Mesa & Carta de Vinos",
    taglineEn: "Table QR Menu & Wine Pairing",
    logoColor: "from-red-600 to-amber-600",
    initials: "DR"
  },
  {
    id: "smash-burger",
    name: "Smash Burger Lab",
    logo: null, // Pega aquí la URL del logo de la empresa
    url: "https://smashburger.pedidos.eternalia.co",
    categoryEs: "Hamburguesas & Delivery",
    categoryEn: "Smash Burgers & Delivery",
    taglineEs: "Checkout en 1 Clic Directo a WhatsApp",
    taglineEn: "1-Click Direct WhatsApp Ordering",
    logoColor: "from-orange-500 to-red-500",
    initials: "SB"
  },
  {
    id: "pizza-nostra",
    name: "Pizza Nostra Artesanal",
    logo: null, // Pega aquí la URL del logo de la empresa
    url: "https://pizzanostra.pedidos.eternalia.co",
    categoryEs: "Pizzería a la Leña",
    categoryEn: "Artisan Wood-Fired Pizza",
    taglineEs: "Personalizador de Pizzas Mitad y Mitad",
    taglineEn: "Half-and-Half Custom Pizza Builder",
    logoColor: "from-rose-500 to-amber-600",
    initials: "PN"
  },
  {
    id: "taqueria-central",
    name: "La Taquería Central",
    logo: null, // Pega aquí la URL del logo de la empresa
    url: "https://taqueriacentral.menu.eternalia.co",
    categoryEs: "Taquería Tradicional",
    categoryEn: "Authentic Mexican Tacos",
    taglineEs: "Combos de Tacos & Gestión de Horarios",
    taglineEn: "Taco Combos & Live Kitchen Schedule",
    logoColor: "from-red-500 to-yellow-500",
    initials: "TC"
  },
  {
    id: "cafe-origen",
    name: "Café Origen & Grano",
    logo: null, // Pega aquí la URL del logo de la empresa
    url: "https://cafeorigen.menu.eternalia.co",
    categoryEs: "Café de Especialidad",
    categoryEn: "Specialty Coffee Roasters",
    taglineEs: "Pedidos Anticipados Pick & Go",
    taglineEn: "Pre-Order Pick & Go Workflow",
    logoColor: "from-amber-700 to-yellow-600",
    initials: "CO"
  },
  {
    id: "sushi-master",
    name: "Sushi Master Oriente",
    logo: null, // Pega aquí la URL del logo de la empresa
    url: "https://sushimaster.menu.eternalia.co",
    categoryEs: "Sushi Bar & Asian Fusion",
    categoryEn: "Sushi Bar & Asian Cuisine",
    taglineEs: "Catálogo Fotográfico HD & Opciones Veganas",
    taglineEn: "HD Photo Catalog & Vegan Choices",
    logoColor: "from-purple-600 to-pink-500",
    initials: "SM"
  },
  {
    id: "dulce-pecado",
    name: "Dulce Pecado Repostería",
    logo: null, // Pega aquí la URL del logo de la empresa
    url: "https://dulcepecado.menu.eternalia.co",
    categoryEs: "Repostería & Postres",
    categoryEn: "French Pastry & Gelato",
    taglineEs: "Tortas Personalizadas y Despacho Rápido",
    taglineEn: "Bespoke Cakes & Rapid Delivery",
    logoColor: "from-pink-500 to-rose-400",
    initials: "DP"
  },
  {
    id: "fogon-brasa",
    name: "Fogón & Brasa Gourmet",
    logo: null, // Pega aquí la URL del logo de la empresa
    url: "https://fogon-brasa.eternalia.co",
    categoryEs: "Cocina de Autor",
    categoryEn: "Flame Grill & Fine Dining",
    taglineEs: "Carta Digital Interactiva y Reservas",
    taglineEn: "Digital Menu & Dining Room Tables",
    logoColor: "from-amber-600 to-red-600",
    initials: "FB"
  },
  {
    id: "orquideas-oriente",
    name: "Vivero Orquídeas del Oriente",
    logo: null, // Pega aquí la URL del logo de la empresa
    url: "https://orquideasdeloriente.eternalia.co",
    categoryEs: "Viveros & Agroindustria",
    categoryEn: "Botanical Nurseries & Agro",
    taglineEs: "Catálogo Floral y Asesoría Paisajista",
    taglineEn: "Floral Catalog & Landscape Design",
    logoColor: "from-emerald-600 to-teal-700",
    initials: "VO"
  },
  {
    id: "electro-volt",
    name: "ElectroVolt Marinilla",
    logo: null, // Pega aquí la URL del logo de la empresa
    url: "https://electrovolt.eternalia.co",
    categoryEs: "Servicios Técnicos",
    categoryEn: "Certified Engineering Services",
    taglineEs: "Redes Eléctricas RETIE & Urgencias 24/7",
    taglineEn: "Electrical Grids & 24/7 Response",
    logoColor: "from-cyan-500 to-blue-600",
    initials: "EV"
  },
  {
    id: "trans-logistica",
    name: "TransLogística San Nicolás",
    logo: null, // Pega aquí la URL del logo de la empresa
    url: "https://translogistica.eternalia.co",
    categoryEs: "Logística & Transporte",
    categoryEn: "Fleet Logistics & Dispatch",
    taglineEs: "Telemetría de Carga e Interconexión de Envíos",
    taglineEn: "Cargo Telemetry & Live Fleet Route",
    logoColor: "from-indigo-600 to-purple-600",
    initials: "TL"
  }
];
