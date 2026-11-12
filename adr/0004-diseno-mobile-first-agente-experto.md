# ADR-0004: Estándar de Arquitectura Mobile-First y Rol de Agente Experto en Experiencia Móvil

## Estado
**Aceptado**

## Fecha
2026-11-12

---

## 1. Contexto y Problemática
EternalIA es una plataforma digital y catálogo de soluciones SaaS para empresas reales, restaurantes y comercios locales. El 75%+ del tráfico entrante (clientes de restaurantes escaneando códigos QR, dueños de negocios cotizando por WhatsApp, directores comerciales) accede exclusivamente desde dispositivos móviles (smartphones de 320px a 430px de ancho).

Previamente, varias secciones presentaban inconsistencias visuales en pantallas móviles:
- Espaciados excesivos (`py-24`, márgenes muertos) que generaban fatiga de scroll.
- Títulos con tipografía sobredimensionada (`text-4xl` o `text-5xl` en viewport de 360px) que provocaban saltos de línea antiestéticos o palabras huérfanas desalineadas (ej. *"Red"* aislado).
- Botones CTA que ocupaban todo el ancho de forma tosca o elementos táctiles inferiores al tamaño mínimo de ergonomía táctil.
- Barras de navegación móviles que ocultaban enlaces esenciales tras menús hamburguesa complejos.

Asimismo, al analizar los registros de arquitectura de proyectos core del ecosistema (`/home/victor/Documentos/auth`), se identificó la necesidad de adaptar únicamente los estándares arquitectónicos pertinentes a una landing comercial de alta conversión:
1. **Separación de capas lingüísticas (ADR 008 de auth):** Copy de cara al usuario en **Español Profesional** de alta conversión; código, identificadores y tipos en **Inglés**.
2. **KISS & Eliminación de Backend (ADR 002 y 006 de auth):** Interacción directa cliente con Firebase (Firestore para prospectos/directorio) sin microservicios innecesarios ni sobreingeniería de roles/auth para la landing pública.
3. **Excelencia Mobile-First Mandataria:** Cada cambio en componentes UI debe pasar por una auditoría rigurosa y crítica de diseño móvil.

---

## 2. Decisión Arquitectónica

Se adopta oficialmente el **Estándar de Arquitectura Mobile-First** para EternalIA y se crea el rol formal del agente **`mobile-experience-specialist`**.

### 2.1 Principios del Estándar Mobile-First
1. **Rango de Viewports Obligatorio:**
   - La interfaz debe operar con perfección pixel-perfect desde **320px** (pantallas compactas como iPhone SE) hasta **430px** (smartphones modernos Pro Max / Ultra), pasando a tablet (**768px**) y desktop (**1024px+**).
   - **Zero Horizontal Overflow:** Queda terminantemente prohibido cualquier scroll horizontal accidental en la página (`max-w-full`, `overflow-x-clip` / `hidden`).
2. **Tipografía Proporcional y Balanceada:**
   - En pantallas móviles, los títulos principales no deben exceder `text-2xl` o `text-3xl` (`text-2xl sm:text-4xl md:text-5xl lg:text-6xl`).
   - Todos los títulos multilínea deben emplear `text-balance` o división semántica estructurada para erradicar palabras huérfanas en celulares.
   - El interlineado debe ser ágil (`leading-snug` o `leading-tight`) sin colisiones entre renglones.
3. **Ergonomía Táctil (Touch Targets):**
   - Todo botón, enlace, interruptor o pestaña debe poseer un área táctil mínima de **44x44px** (estándar WCAG 2.1 AAA / Apple HIG) con `touch-manipulation` y respuesta visual inmediata (`active:scale-95`).
4. **Densidad y Espaciado Adaptativo:**
   - Relleno vertical en móvil: Se reducen los saltos excesivos (`py-24` pasa a `py-12 sm:py-20 md:py-24`) para maximizar la información visible y acelerar la conversión.
   - Contenedores de tarjetas: Relleno compacto en móviles (`p-4 sm:p-8 rounded-2xl sm:rounded-3xl`).
5. **Navegación Móvil Rápida:**
   - Barra o tira horizontal deslizable accesible (`overflow-x-auto no-scrollbar`) que permita saltar a cualquier módulo clave en un toque sin fricción.
6. **Contraste Dual (Dark / Light):**
   - Todo componente debe mantener contraste accesible WCAG 2.1 AA en exteriores bajo luz solar directa tanto en Dark como en Light Mode.

---

## 3. Rol del Agente `mobile-experience-specialist`

Todo agente de IA o desarrollador que modifique la interfaz debe actuar bajo las directrices del **`mobile-experience-specialist`**:

### Checklist Crítico de Aprobación Móvil:
- [ ] ¿El componente se renderiza sin desbordamiento horizontal en un ancho de 320px?
- [ ] ¿Los botones e interactivos tienen área táctil confortable (mínimo 44px) y feedback activo?
- [ ] ¿Los títulos se leen de forma armónica sin palabras huérfanas ni tipografía desmesurada?
- [ ] ¿El espaciado vertical (`py-`, `my-`) evita scroll fatigue en celulares?
- [ ] ¿Los textos, badges y etiquetas tienen contraste legible en Dark y Light mode?
- [ ] ¿El botón flotante de WhatsApp y los modales no bloquean la interacción principal del usuario?

---

## 4. Consecuencias

### Positivas
- **Máxima Tasa de Conversión Móvil:** Experiencia de usuario inmediata, limpia y profesional para clientes que entran por QR o campañas de WhatsApp.
- **Rigor en Revisiones:** Cero regresiones visuales en teléfonos pequeños tras realizar modificaciones en desktop.
- **Carga Rápida y Fluidez:** Estilos eficientes con Tailwind sin dependencias pesadas de UI móvil.

### Consideraciones Operativas
- Antes de dar por finalizada cualquier tarea de interfaz, es obligatorio auditar y validar la presentación en vista móvil.

