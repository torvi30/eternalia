# Plan 0006: Sección de Directorio Comercial Local Multi-Municipio y Promociones Activas (Estado: Completado)

## 1. Plan de Implementación

### 1.1 Contexto y Necesidad
EternalIA no solo provee software operativo individual (punto de venta, comandas, menú QR), sino que orquesta una red hiperlocal de comercio: un **Directorio Comercial segmentado por Municipio/Pueblo** (Marinilla, Rionegro, San Antonio y el Oriente Antioqueño).
En este directorio, los comensales y vecinos pueden buscar comercios en tiempo real, filtrar por negocios abiertos, ver **promociones flash y descuentos activos** (ej. "Buñuelos con queso", ofertas de fin de semana), y contactar o pedir directamente por WhatsApp o menú sin comisiones.
El usuario solicitó integrar una sección nueva, elegante y profesional que destaque esta capacidad de directorio territorial y la activación de promociones.

### 1.2 Alcance
- **Componente Nuevo**: `src/components/LocalDirectorySection.jsx`.
- **Integración en Landing Principal**: Incorporar la sección en `src/pages/PublicLanding.jsx` inmediatamente después de `FeaturedProducts` y antes de `CompanyMarquee`.
- **Navegación y Acceso Directo**: Agregar enlace en `src/components/Navbar.jsx` ("Directorio Local") con scroll suave hacia la sección.
- **Muestra Interactiva Fiel a Producción**:
  - Filtro por Municipio/Pueblo (Marinilla, Rionegro, San Antonio, Todos).
  - Filtros rápidos por estado y promociones: `Con Descuentos / Ofertas`, `Abiertos Ahora`, `Todos`.
  - Tarjetas interactivas con los comercios reales que el cliente mostró (La esquina del sabor, Chicken king, La Amistacita, Alegrarte, Brosty Rul, Mandilocas, etc.).
  - Badge visual de promoción activa (`🔥 Buñuelos con queso`) y banner de oferta.
  - Botón de acción para el visitante (`Pedir por WhatsApp` / `Ver Menú`).
  - Banner de conversión para dueños de comercios con CTA hacia `ContactModal`.
  - Modal o visor de capturas de pantalla reales del directorio oficial (`public/directory/directorio-*.jpg`).
- **Soporte Dark/Light Mode (ADR-0002)** con contraste WCAG 2.1 AA.
- **Commits con Coautoría Obligatoria (ADR-0001)**: `Co-authored-by: jsdnlb <jsdnlb@users.noreply.github.com>`.

---

## 2. Especificaciones Técnicas y Funcionales

### 2.1 Requerimientos Funcionales
1. **RF-01**: Selector de municipios (Pueblos) que filtre los negocios dinámicamente.
2. **RF-02**: Filtro rápido de "Con Descuentos" para mostrar comercios con ofertas activas destacadas con fuego (`🔥`).
3. **RF-03**: Filtro de "Abiertos Ahora" para reflejar la sincronización de horarios en tiempo real.
4. **RF-04**: Buscador interactivo por texto (nombre de negocio o plato/producto).
5. **RF-05**: Botón de conversión "¿Tienes un negocio en tu pueblo? Súmalo al Directorio" que abra el modal de contacto corporativo.
6. **RF-06**: Botón para previsualizar capturas reales del sistema en escritorio completo.

### 2.2 Requerimientos de Diseño (ADR-0002)
- Modo Oscuro: Fondos `#0c0d14` y `#11121a`, bordes `border-white/10`, textos legibles con acentos en cian, ámbar y esmeralda.
- Modo Claro: Fondos `bg-slate-100/60` y tarjetas `bg-white`, sombras suaves `shadow-lg`, contraste AA.
- Responsive total: Carrusel deslizable en móviles (`overflow-x-auto no-scrollbar`), cuadrícula de 2 a 4 columnas en tablets y escritorios.

---

## 3. Desglose de Tareas Accionables

- [x] **Fase 1: Preparación y Activos**
  - [x] Crear directorio `public/directory/` y copiar las capturas enviadas por el usuario (`directorio-general.jpg`, `directorio-promociones.jpg`, `directorio-filtros.jpg`).
  - [x] Consolidar datos de muestra estructurados con los comercios reales de las capturas (Marinilla, Rionegro, San Antonio) y promociones activas.

- [x] **Fase 2: Creación del Componente `LocalDirectorySection.jsx`**
  - [x] Desarrollar la cabecera con badge territorial, título persuasivo y métricas en vivo.
  - [x] Implementar barra de búsqueda y filtros reactivos (pueblo, ofertas, abiertos, categorías).
  - [x] Diseñar las tarjetas de comercios con badges de estado, ofertas destacadas y enlaces directos a WhatsApp/Web.
  - [x] Incorporar lightbox para ver las capturas de producción a pantalla completa.
  - [x] Agregar bloque de llamado a la acción comercial para negocios locales.

- [x] **Fase 3: Integración en Landing y Navbar**
  - [x] Integrar `LocalDirectorySection` en `src/pages/PublicLanding.jsx`.
  - [x] Añadir enlace de navegación y drawer en `src/components/Navbar.jsx`.
  - [x] Actualizar traducciones ES/EN en `src/data/translations.js` si aplica.

- [x] **Fase 4: Verificación, Lint, Build y Commit**
  - [x] Validar responsive en 320px, 768px y 1280px+.
  - [x] Ejecutar `npm run lint` y `npm run build`.
  - [x] Realizar commit bajo ADR-0001 y push a `origin main`.
