# [FEATURE-0001]: Sistema Dual (Dark/Light Mode) y Estrategia SEO Integral

- **Estado:** Completado
- **Fecha de Inicio:** 2026-11-06
- **Responsable / Agente:** `design-seo-specialist`
- **ADR Relacionados:** [ADR-0001](../adr/0001-coautor-jsdnlb-en-commits.md), [ADR-0002](../adr/0002-sistema-diseno-light-mode-estrategia-seo-agente-experto.md), [ADR-0003](../adr/0003-planes-especificaciones-tareas-unificados.md)

---

# 1. Plan de Implementación

### 1.1 Contexto y Objetivo
La landing page de Eternalia contaba con una estética de alta tecnología exclusivamente en modo oscuro. Para ampliar el alcance de clientes corporativos, mejorar la ergonomía visual y garantizar accesibilidad universal (WCAG 2.1 AA), se requiere habilitar un Modo Claro (Light Mode) en el 100% de los componentes sin comprometer la identidad corporativa. Paralelamente, se debe dotar al portal de una arquitectura SEO robusta para indexación y compartición en redes.

### 1.2 Alcance
- **En Alcance (In Scope):**
  - Creación de `ThemeContext` con persistencia en `localStorage` y detección del sistema.
  - Conmutador accesible (Sol / Luna) en la barra de navegación desktop y drawer móvil.
  - Adaptación estética completa (glassmorphism claro, fondos luminosos, tipografías de alto contraste).
  - Conmutación dinámica de tiles en Leaflet (`dark_all` vs `light_all` de CartoDB).
  - Implementación SEO técnica: Metadatos Open Graph, Twitter Cards, Schema.org JSON-LD, robots.txt y sitemap.xml.
- **Fuera de Alcance (Out of Scope):**
  - Panel administrativo `/admin` (conserva su suite de estilos independientes en esta fase).

### 1.3 Arquitectura y Componentes Afectados
- `src/context/ThemeContext.jsx` (Nuevo proveedor de tema)
- `src/index.css` (Tokens y clases adaptativas `.glass-panel`, `.glass-card`, scrollbar y Leaflet)
- `index.html` (Metadatos SEO y Schema.org)
- Componentes de Landing: `Navbar`, `Hero`, `BentoGrid`, `ProjectsShowcase`, `QuoteEngine`, `DirectoryDemo`, `DirectoryMap`, `TechSpecs`, `InfrastructureStatus`, `CallToAction`, `Footer`, `ContactModal`, `InvestorRelationsModal`.

### 1.4 Riesgos y Mitigaciones
| Riesgo | Probabilidad / Impacto | Mitigación |
|---|---|---|
| Contraste insuficiente en textos secundarios | Medio / Alto | Uso sistemático de escalas `zinc-900`/`zinc-700` en light mode |
| Falla visual en el mapa interactivo | Bajo / Medio | Cambio reactivo de la capa de tiles de Leaflet según `isDark` |

---

# 2. Especificaciones Técnicas y Funcionales

### 2.1 Historias de Usuario
- **Como** visitante o inversor de Eternalia,
- **Quiero** alternar fácilmente entre modo claro y modo oscuro desde cualquier dispositivo,
- **Para que** pueda leer la información cómodamente según las condiciones de iluminación de mi entorno.

- **Como** motor de búsqueda (Googlebot/Bingbot) o red social,
- **Quiero** acceder a metadatos estructurados y archivos de indexación,
- **Para que** las soluciones SaaS y directorios de Eternalia se indexen con snippets enriquecidos.

### 2.2 Requerimientos Funcionales (RF)
- **RF-01:** El tema por defecto debe persistir la última selección del usuario en `localStorage('eternalia-theme')`.
- **RF-02:** En ausencia de guardado previo, se detecta `prefers-color-scheme`.
- **RF-03:** El switch en el Navbar debe alternar instantáneamente la clase `.dark` / `.light` en `document.documentElement`.
- **RF-04:** El mapa de Leaflet debe actualizar sus teselas a CartoDB Positron en modo claro sin parpadeo.

### 2.3 Requerimientos de UI/UX y Accesibilidad (ADR-0002)
- **Ratio de Contraste:** Mínimo 4.5:1 para texto base y 3:1 para acentos interactivos.
- **Microinteracciones:** Transición suave de rotación en los iconos de Sol y Luna.

### 2.4 Criterios de Aceptación (Given / When / Then)
```gherkin
Escenario 1: Alternancia de tema
  Dado que el usuario visita la landing page
  Cuando hace clic en el botón con icono de Sol/Luna en el Navbar
  Entonces el fondo cambia a modo claro/oscuro
  Y la preferencia se guarda en localStorage
  Y el mapa de Marinilla actualiza su capa de teselas
```

---

# 3. Lista de Tareas y Verificación (Tasks)

### Fase 1: Arquitectura y Proveedor de Tema
- [x] Tarea 1.1: Crear `ThemeContext.jsx` con métodos `toggleTheme` y persistencia.
- [x] Tarea 1.2: Envolver la aplicación en `App.jsx` con `<ThemeProvider>`.
- [x] Tarea 1.3: Configurar variables CSS y estilos base de modo claro en `index.css`.

### Fase 2: Implementación en Componentes de Landing
- [x] Tarea 2.1: Agregar botón de alternancia en `Navbar.jsx` (desktop y drawer móvil).
- [x] Tarea 2.2: Adaptar `Hero.jsx`, métricas y terminal interactiva.
- [x] Tarea 2.3: Adaptar tarjetas y terminales de conversión en `BentoGrid.jsx`.
- [x] Tarea 2.4: Adaptar catálogo y filtros en `ProjectsShowcase.jsx`.
- [x] Tarea 2.5: Adaptar simulador de inversión en `QuoteEngine.jsx`.
- [x] Tarea 2.6: Adaptar `DirectoryDemo.jsx` y teselas de `DirectoryMap.jsx`.
- [x] Tarea 2.7: Adaptar `TechSpecs.jsx`, `InfrastructureStatus.jsx`, `CallToAction.jsx` y `Footer.jsx`.
- [x] Tarea 2.8: Adaptar modales `ContactModal.jsx` e `InvestorRelationsModal.jsx`.

### Fase 3: Optimización SEO
- [x] Tarea 3.1: Configurar Open Graph, Twitter Cards y canonical URL en `index.html`.
- [x] Tarea 3.2: Insertar datos estructurados Schema.org JSON-LD en `index.html`.
- [x] Tarea 3.3: Crear `public/robots.txt` y `public/sitemap.xml`.

### Fase 4: Aseguramiento de Calidad y Cierre
- [x] Tarea 4.1: Compilar proyecto con `npm run build` verificando 0 errores.
- [x] Tarea 4.2: Confirmar commits bajo ADR-0001 con coautoría obligatoria de `jsdnlb`.
