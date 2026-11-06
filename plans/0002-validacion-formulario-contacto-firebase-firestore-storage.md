# [FEATURE-0002]: Validación y Conexión de Formularios de Contacto con Firestore y Firebase Storage

- **Estado:** Completado
- **Fecha de Inicio:** 2026-11-06
- **Responsable / Agente:** `design-seo-specialist` & Fullstack Agent
- **ADR Relacionados:** [ADR-0001](../adr/0001-coautor-jsdnlb-en-commits.md), [ADR-0002](../adr/0002-sistema-diseno-light-mode-estrategia-seo-agente-experto.md), [ADR-0003](../adr/0003-planes-especificaciones-tareas-unificados.md)

---

# 1. Plan de Implementación

### 1.1 Contexto y Objetivo
El usuario requiere validar y garantizar que el portal cuente con un formulario donde los visitantes, clientes e inversionistas puedan contactar a Eternalia y que este se encuentre plenamente conectado a los servicios en la nube de Firebase:
- **Cloud Firestore:** Almacenamiento persistente y estructurado de leads, cotizaciones y mensajes en las colecciones `inquiries` y `quotes`.
- **Firebase Storage (`firebasestorage.app`):** Soporte de subida y almacenamiento de adjuntos (archivos de requerimientos, PDFs, propuestas o imágenes) asociadas al contacto.

### 1.2 Alcance
- **En Alcance (In Scope):**
  - Validación del formulario institucional de Dirección Ejecutiva ([`ContactModal.jsx`](../src/components/ContactModal.jsx)).
  - Validación del formulario del Cotizador de Soluciones ([`QuoteEngine.jsx`](../src/components/QuoteEngine.jsx)).
  - Configuración y exportación de `storage` con `getStorage(app)` en [`src/firebase/config.js`](../src/firebase/config.js).
  - Implementación en [`src/services/inquiryService.js`](../src/services/inquiryService.js) de subida de archivos a Firebase Storage y registro en Firestore.
  - Soporte de adjunto opcional de archivo en `ContactModal.jsx` con diseño dual Dark/Light mode (ADR-0002).
  - Validación de lectura y visualización en el Panel Administrativo (`/admin`).
- **Fuera de Alcance (Out of Scope):**
  - Módulos de mensajería bidireccional en tiempo real (chat en vivo).

### 1.3 Arquitectura y Dependencias
- `src/firebase/config.js`: Inicialización de Firebase SDK con `db` (Firestore), `auth` y `storage` (Firebase Storage conectado a `eternalia-511c9.firebasestorage.app`).
- `src/services/inquiryService.js`: Funciones `saveInquiry`, `saveQuoteRequest`, `uploadInquiryAttachment`, `fetchInquiriesAndQuotes`.
- `src/components/ContactModal.jsx`: Formulario modal de contacto con selector de rol, mensaje y adjunto opcional.
- `src/components/QuoteEngine.jsx`: Cotizador con registro a Firestore.

---

# 2. Especificaciones Técnicas y Funcionales

### 2.1 Historias de Usuario
- **Como** cliente potencial o partner,
- **Quiero** enviar mis datos de contacto, rol institucional, mensaje y opcionalmente adjuntar un archivo (PDF/documento),
- **Para que** el equipo directivo de Eternalia reciba mi requerimiento en tiempo real y pueda contactarme.

- **Como** administrador de Eternalia,
- **Quiero** que todos los contactos se almacenen en Firestore con su link a Firebase Storage,
- **Para que** pueda gestionarlos desde el panel `/admin` con trazabilidad completa.

### 2.2 Requerimientos Funcionales
- **RF-01:** Validación de campos obligatorios: Nombre, Correo Electrónico y Mensaje.
- **RF-02:** Manejo de adjuntos: Si el usuario selecciona un archivo, se sube a Firebase Storage en la ruta `inquiries/{timestamp}_{filename}` y se adjunta la `downloadURL` en el documento de Firestore.
- **RF-03:** Resiliencia offline / fallback: Si Firebase no está accesible o se agota el timeout, se almacena una copia local en `localStorage` (`eternalia_local_leads`) garantizando cero pérdida de información.
- **RF-04:** Feedback visual: Estado de carga (`sending`), estado de éxito con animación y confirmación, y botón para cerrar o enviar otro mensaje.

### 2.3 Requerimientos de UI/UX y Accesibilidad (ADR-0002)
- Formulario adaptado a Modo Oscuro y Modo Claro con contraste WCAG 2.1 AA.
- Input de archivo estilizado y accesible, con visualización del nombre y peso del archivo cargado.

---

# 3. Lista de Tareas y Verificación (Tasks)

### Fase 1: Configuración de Firebase Storage
- [x] Tarea 1.1: Exportar `storage = getStorage(app)` en `src/firebase/config.js`.
- [x] Tarea 1.2: Implementar función auxiliar de subida `uploadInquiryAttachment(file)` en `src/services/inquiryService.js`.

### Fase 2: Formulario de Contacto y Adjuntos
- [x] Tarea 2.1: Agregar soporte de archivo adjunto en el estado de `ContactModal.jsx`.
- [x] Tarea 2.2: Diseñar el componente visual de carga de archivos (compatible con Dark y Light Mode).
- [x] Tarea 2.3: Conectar el envío del formulario con la subida a Firebase Storage y guardado en Firestore.

### Fase 3: Validación y Pruebas
- [x] Tarea 3.1: Validar guardado en Firestore y fallback en `localStorage`.
- [x] Tarea 3.2: Verificar compilación limpia con `npm run build`.
- [x] Tarea 3.3: Actualizar el estado de tareas a `[x]` en este documento.

### Fase 4: Commit Normativo (ADR-0001)
- [x] Tarea 4.1: Confirmar commit con coautor obligatorio `jsdnlb`.
