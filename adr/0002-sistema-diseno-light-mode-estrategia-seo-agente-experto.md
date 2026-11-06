# ADR-0002: Sistema de Diseño Dual (Dark/Light Mode), Estrategia SEO Integral y Definición del Agente Especialista en UI/UX y SEO

- **Estado:** Aceptado
- **Fecha:** 2026-11-06
- **Autores:** Equipo EternalIA
- **Decisores:** Equipo de Arquitectura, Especialista en UI/UX & SEO

---

## Contexto

El portal corporativo de **EternalIA** se concebía inicialmente bajo una estética puramente oscura (*cyber-luxury / dark-mode*). Si bien proyecta modernidad tecnológica, presenta dos limitaciones fundamentales que impactan el alcance del producto:

1. **Accesibilidad y Preferencia Visual (Light Mode):**  
   Una porción significativa de clientes corporativos, inversores y usuarios navegan en entornos con alta iluminación o prefieren interfaces en modo claro por confort visual. La carencia de un modo claro de alta fidelidad disminuye la conversión y la accesibilidad (normas WCAG 2.1 AA).

2. **Posicionamiento Orgánico y Visibilidad (SEO):**  
   Para posicionar a EternalIA como un holding tecnológico de vanguardia y acelerar la indexación de sus plataformas SaaS, se requiere una arquitectura técnica de SEO sólida: metadatos Open Graph, Twitter Cards, datos estructurados (Schema.org JSON-LD), robots.txt, sitemap y semántica web estricta.

3. **Gobernanza de Diseño y SEO por un Experto:**  
   Para evitar inconsistencias visuales o degradación en rendimiento, se determina que las decisiones estéticas y de indexación deben estar regidas por un **Agente Especialista en Diseño UI/UX y SEO**, el cual establece las pautas de contraste, diseño responsivo, microinteracciones y estándares de motores de búsqueda.

---

## Decisión

### 1. Creación y Rol del Agente Especialista en Diseño UI/UX y SEO
Se formaliza e implementa el perfil del **Agente Especialista en Diseño UI/UX y SEO** (`design-seo-specialist`). Este rol tiene autoridad técnica y estética para:
- Dictar y auditar la paleta de colores, tokens de diseño y ratios de contraste (mínimo 4.5:1 en texto base y 3:1 en elementos de interfaz).
- Velar por la coherencia de microinteracciones, glassmorphism adaptativo y transiciones suaves entre temas.
- Definir la taxonomía de encabezados (`h1` único por página, jerarquía `h2`/`h3`), metadatos y esquemas enriquecidos JSON-LD.
- Auditar Core Web Vitals (LCP, FID/INP, CLS) asegurando que los efectos visuales no penalicen la carga ni el SEO.

### 2. Arquitectura de Modo Claro (Light Mode) en Toda la Landing
Se aprueba la implementación de un sistema de tema dual:
- **`ThemeContext` & `ThemeProvider`:** Proveedor React con estado reactivo (`theme: 'dark' | 'light'`), persistencia en `localStorage` y detección automática de preferencia de sistema operativo (`prefers-color-scheme`).
- **Tailwind `darkMode: 'class'`:** Manipulación de la clase `.dark` / `.light` en el elemento raíz `<html>`.
- **Adaptación Estética para Light Mode:**
  - Fondo base: Zinc ultra-claro (`#f8fafc` / `#fafafa`) con gradientes suaves y luminosos.
  - Tarjetas y paneles: Glassmorphism claro (`rgba(255, 255, 255, 0.85)` con bordes sutiles `rgba(0, 0, 0, 0.08)` y sombras multicapa suaves).
  - Tipografía: Negros y grises carbón de alta legibilidad (`text-zinc-900`, `text-zinc-700`, `text-zinc-500`).
  - Acentos de marca: Índigo (`#4f46e5`), cían (`#0284c7`) y esmeralda (`#059669`) ajustados para máximo contraste.
  - Mapa interactivo Leaflet: Estilizado para modo claro/oscuro preservando la legibilidad de marcadores y controles.
  - Selector de tema interactivo (Toggle Sun/Moon) ubicado en el `Navbar` tanto en desktop como en el menú móvil.

### 3. Estrategia SEO Integral
- **Metadatos y Redes Sociales:** Inclusión de etiquetas canónicas, `description` enriquecida, Open Graph completo (`og:title`, `og:description`, `og:image`, `og:type`, `og:url`) y Twitter Cards (`summary_large_image`).
- **Datos Estructurados Schema.org (JSON-LD):** Esquemas de `Organization` (holding EternalIA), `WebSite` con búsqueda y `SoftwareApplication` para las soluciones del ecosistema.
- **Archivos de Indexación:** Creación y mantenimiento de `public/robots.txt` y `public/sitemap.xml`.
- **Accesibilidad y Semántica:** Jerarquía de encabezados semántica, atributos `alt` y `aria-label` en controles interactivos.

---

## Consecuencias

### Positivas
- Cobertura completa de preferencias de usuario con una interfaz elegante tanto en modo oscuro como en modo claro.
- Aumento proyectado en métricas de retención, tiempo en página e indexación orgánica en Google y motores de búsqueda modernos.
- Existencia de un agente y reglas permanentes que velan por el rigor visual y el SEO en futuras adiciones al código.

### Mitigaciones
- Todos los nuevos componentes que se agreguen a la landing o a la aplicación deben soportar explícitamente clases condicionales `dark:` y modos contrastados.
