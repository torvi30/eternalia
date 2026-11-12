# [FEATURE-0007]: Rediseño Enterprise SaaS: Navbar Unificado, Hero de Alto Impacto con Métricas y Showcase Visual

- **Estado:** Completado
- **Fecha de Inicio:** 2026-11-12
- **Responsable / Agente:** design-seo-specialist & mobile-experience-specialist
- **ADR Relacionados:** ADR-0001 (Commits Co-autor), ADR-0002 (Dual Dark/Light & SEO), ADR-0003 (Planes Unificados), ADR-0004 (Mobile-First Excellence)

---

# 1. Plan de Implementación

### 1.1 Contexto y Objetivo
El usuario requiere elevar la calidad visual de EternalIA para que luzca como una plataforma SaaS enterprise de clase mundial, tomando como referencia directa competidores y líderes globales como **ServiceNow LATAM**, Stripe y Linear.
Actualmente, la barra de navegación presentaba botones aislados tipo cápsula ("pills") que le daban un aspecto fragmentado y poco institucional; el titular del Hero sufría de saltos de línea irregulares (ej. la palabra *"impulsa"* aislada en su propia línea en desktop); y el espacio del Hero carecía de visuales de producto inmediatos, métricas de credibilidad y profundidad visual en Modo Claro.

El objetivo es rediseñar integralmente el **Navbar**, la atmósfera del **Hero**, la tipografía institucional y desplegar una vitrina interactiva de software real en el primer pantallazo, garantizando soporte dual (Dark/Light) y fluidez móvil absoluta (ADR-0004).

### 1.2 Alcance
- **En Alcance (In Scope):**
  - **Navbar Enterprise Unificado:**
    - Barra de navegación flotante tipo isla de cristal integrada (`glass-header`), con borde sutil, desenfoque de fondo y diseño cohesivo.
    - Menú institucional: *Empresas & Clientes*, *Restaurantes OS*, *Directorio Comercial*, *Seguridad & SLA*.
    - Acciones de conversión duales: Botón secundario *"Hablar con Asesor"* (outline/ghost) + Botón primario *"Comenzar"* con micro-interacciones.
    - Utilidades refinadas: Interruptor de Modo Claro/Oscuro y selector de idioma (`ES / EN`) perfectamente integrados sin generar ruido visual.
    - Versión móvil: Tira de navegación táctil optimizada (`overflow-x-auto no-scrollbar`), ergonómica y accesible sin menús ocultos.
  - **Hero Section Enterprise:**
    - Insignia de estado institucional: `● PLATAFORMA CLOUD ACTIVA | SERVIDORES DE ALTA DISPONIBILIDAD`.
    - Titular armónico y balanceado (`text-balance`), eliminando palabras huérfanas en resoluciones desktop y mobile.
    - Botones de acción duales: *"Explorar Software para Restaurantes ➔"* y *"Agendar Asesoría / Demostración"*.
    - **Tira de Métricas y KPIs de Credibilidad:** Cuatro pilares de confianza empresariales (0% Comisiones, < 3s Latencia, 99.9% SLA Uptime, +50 Comercios Activos).
    - **Showcase Visual del Software en el Hero:** Mockup interactivo en ventana de navegador con gradientes ambientales, previsualización real de la plataforma y etiquetas de estado.
  - **Atmósfera y Modo Claro / Oscuro (ADR-0002):**
    - En Modo Claro: Sustituir el fondo blanco plano por una atmósfera sofisticada de gradientes sutiles (`from-slate-50 via-blue-50/25 to-indigo-50/20`), sombras suaves y bordes nítidos.
    - En Modo Oscuro: Mantener el fondo obsidian `#09090b` con auras en azul eléctrico, índigo y cian.
- **Fuera de Alcance (Out of Scope):**
  - Módulos de autenticación de usuarios o dashboards administrativos (mantenemos la landing pública y directa según lineamientos del usuario).

### 1.3 Arquitectura y Componentes Afectados
- `src/components/Navbar.jsx`: Rediseño estructural a cabecera enterprise unificada.
- `src/components/Hero.jsx`: Rediseño con titular balanceado, CTAs dobles, métricas de credibilidad y ventana visual de software.
- `src/index.css`: Refinamiento de variables CSS para el fondo en light mode y sombras de cristal enterprise.

---

# 2. Especificaciones Técnicas y Funcionales

### 2.1 Historias de Usuario
- **Como** empresario o dueño de restaurante que visita Eternalia,
- **Quiero** percibir una infraestructura de software sólida, moderna y de nivel corporativo desde el primer segundo,
- **Para que** tenga plena confianza de cotizar y contratar las soluciones tecnológicas para mi negocio.

### 2.2 Requerimientos de UI/UX (ADR-0002 y ADR-0004)
- **Navbar:** Altura compacta (`h-14` a `h-16`), tipografía `font-semibold text-xs sm:text-sm`, micro-animación `active:scale-95`, accesibilidad por teclado y foco visual.
- **Hero:** Cero palabras aisladas en saltos de línea. El titular debe componerse en 2 o 3 líneas armónicas.
- **Métricas:** Tarjetas compactas con números legibles (`font-extrabold`) y etiquetas en contraste WCAG 2.1 AA.
- **Soporte Móvil:** Compatibilidad probada desde 320px hasta 430px y superiores.

---

# 3. Desglose de Tareas Accionables

- [x] **3.1** Rediseñar `src/components/Navbar.jsx` con estructura de navegación Enterprise SaaS inspirada en ServiceNow.
- [x] **3.2** Optimizar `src/components/Hero.jsx` incorporando titular balanceado, CTAs duales, tira de métricas clave y showcase de producto.
- [x] **3.3** Ajustar fondos y sombras en `src/index.css` para dotar de profundidad y sofisticación al Light Mode.
- [x] **3.4** Auditar y verificar responsividad móvil estricta (ADR-0004) y contraste accesible (ADR-0002).
- [x] **3.5** Compilar producción (`npm run build`), pasar linter y confirmar con commit coautorado (ADR-0001).
