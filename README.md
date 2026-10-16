# Eternalia • Holding Tecnológico & Ecosistema SaaS

Plataforma corporativa oficial y clúster tecnológico de **Eternalia**, el holding que unifica soluciones SaaS avanzadas, directorios comerciales hiperlocales inteligentes, vitrinas interactivas y software vertical para industrias críticas.

---

## 🌐 Despliegue en Producción (Live URLs)

- **Sitio Web Oficial:** [https://eternalia-511c9.web.app](https://eternalia-511c9.web.app)
- **Dominio Alternativo:** [https://eternalia-511c9.firebaseapp.com](https://eternalia-511c9.firebaseapp.com)
- **Clúster Administrativo (Dashboard):** [https://eternalia-511c9.web.app/admin](https://eternalia-511c9.web.app/admin)

---

## ⚡ Tecnologías & Stack

- **Frontend Core:** React 18 (SPA) + Vite 5
- **Estilos & UI:** Vanilla CSS + Tailwind CSS 3.4 (Paleta HSL Oscura estilo Linear / Vercel / Silicon Valley)
- **Backend & Cloud:** Firebase (Spark Plan $0 USD)
  - **Firebase Hosting:** Distribución global por CDN con SSL/HTTPS automático
  - **Cloud Firestore:** Base de datos NoSQL reactiva para leads, proyectos y comercios
  - **Firebase Authentication:** Soporte para inicio de sesión con Google y Correo/Contraseña
- **Mapas & Geolocalización:** Leaflet con CartoDB Dark Matter tiles
- **Iconografía & Tipografía:** Lucide React, Plus Jakarta Sans & JetBrains Mono (Google Fonts)
- **Internacionalización:** Sistema bilingüe interactivo (Español / Inglés) con persistencia

---

## 🏛️ Módulos de la Plataforma

1. **Portal Público Corporativo (`/`):**
   - Terminal interactiva interactuable en el Hero (`HeroTerminal.jsx`)
   - Ecosistema Bento Grid con métricas de capital y rendimiento (`BentoGrid.jsx`)
   - Vitrina de proyectos reales con tabs verticales y video hubs (`ProjectsShowcase.jsx`, `VideoHub.jsx`)
   - Cotizador instantáneo de software con cálculo dinámico de presupuesto (`QuoteEngine.jsx`)
   - Directorio hiperlocal interactivo con vista de tarjetas y mapa en tiempo real (`DirectoryDemo.jsx`, `DirectoryMap.jsx`)
   - Monitor de infraestructura y uptime en tiempo real (`InfrastructureStatus.jsx`)
   - Modales de contacto y relación con inversionistas (`ContactModal.jsx`, `InvestorRelationsModal.jsx`)

2. **Panel de Administración (`/admin`):**
   - Autenticación con Google y correo corporativo (`AdminLogin.jsx`)
   - Gestión integral de cotizaciones recibidas (`inquiries`)
   - Gestión y edición de comercios del directorio (`businesses`)
   - Módulo de administración de proyectos verticales (`projects`)

---

## 🔐 Credenciales de Acceso Administrativo

El panel de administración permite dos métodos de acceso:
1. **Google Sign-In:** Botón "Continuar con cuenta de Google" con cualquier correo autorizado.
2. **Acceso Rápido / Credenciales Demo:**
   - **Correo:** `admin@eternalia.io`
   - **Contraseña:** `Eternalia2026!`

---

## 🚀 Puesta en Marcha Local

### 1. Clonar el repositorio
```bash
git clone https://github.com/torvi30/eternalia.git
cd eternalia
```

### 2. Configurar variables de entorno
Copia el archivo de plantilla:
```bash
cp .env.example .env
```

### 3. Instalar dependencias
```bash
npm install
```

### 4. Iniciar servidor de desarrollo
```bash
npm run dev
```

### 5. Compilar y Desplegar a Producción (Firebase)
```bash
npm run build
firebase deploy --only hosting
```

---

## 📁 Estructura del Proyecto

```
eternalia/
├── src/
│   ├── assets/           # Recursos visuales e imágenes
│   ├── components/       # Componentes modulares de interfaz
│   ├── context/          # AuthContext (Firebase + Google) y LanguageContext
│   ├── data/             # Configuración y datos iniciales de comercios y proyectos
│   ├── firebase/         # Inicialización de Firebase SDK (db, auth)
│   ├── pages/            # PublicLanding, AdminLogin, AdminDashboard
│   ├── services/         # Servicios de Firestore (businessService, inquiryService, etc.)
│   ├── App.jsx           # Enrutamiento principal
│   └── main.jsx          # Punto de entrada de React
├── .firebaserc           # ID del proyecto de Firebase (eternalia-511c9)
├── firebase.json         # Configuración de Firebase Hosting y rewrites
├── tailwind.config.js    # Configuración de diseño y colores
└── vite.config.js        # Configuración del bundler
```

---

© 2026 Eternalia Tech Holding. Todos los derechos reservados.
