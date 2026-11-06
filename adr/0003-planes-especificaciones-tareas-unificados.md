# ADR-0003: Metodología de Desarrollo Dirigida por Planes, Especificaciones y Tareas Unificadas

- **Estado:** Aceptado
- **Fecha:** 2026-11-06
- **Autores:** Equipo EternalIA
- **Decisores:** Equipo de Arquitectura & Gobernanza de Desarrollo

---

## Contexto

En el desarrollo continuo del ecosistema Eternalia, la introducción de nuevas funcionalidades (frontends, módulos de backend, integraciones de pago, componentes de visualización y herramientas administrativas) requiere un estándar de ingeniería predecible y riguroso.

La ejecución directa de código sin una fase explícita de planificación produce:
- Dispersión entre los objetivos de negocio y la solución técnica implementada.
- Omisión de casos borde, requerimientos de accesibilidad (WCAG) o seguridad.
- Dificultad para auditar el progreso real y verificar los criterios de aceptación.
- Fragmentación documental cuando las especificaciones, las tareas y el plan residen en ubicaciones o herramientas separadas.

Para resolver esto, se necesita un estándar arquitectónico obligatorio que centralice el ciclo de vida de cada funcionalidad en un único artefacto claro y versionado.

---

## Decisión

A partir de este ADR:

### 1. Directorio Oficial de Funcionalidades (`plans/`)
Se crea y establece la carpeta raíz `plans/` como la única fuente de la verdad para la planificación, especificación y seguimiento de tareas de cualquier funcionalidad en el repositorio.

### 2. Estructura Unificada en un Mismo Archivo (3-en-1)
Cada funcionalidad tendrá un archivo individual con formato:
`plans/XXXX-nombre-de-funcionalidad.md` (o `plans/YYYYMMDD-nombre-de-funcionalidad.md`).

Este archivo **DEBE consolidar en un solo documento** las siguientes tres secciones obligatorias:

1. **Parte 1: Plan de Implementación (`# 1. Plan de Implementación`):**
   - Contexto y justificación del negocio.
   - Alcance (*In Scope* y *Out of Scope*).
   - Diagrama o descripción de arquitectura y dependencias afectadas.
   - Análisis de riesgos y mitigaciones.

2. **Parte 2: Especificaciones Técnicas y Funcionales (`# 2. Especificaciones`):**
   - Requerimientos funcionales detallados.
   - Requerimientos de UI/UX (soporte estricto Dark/Light Mode según ADR-0002).
   - Modelo de datos, contratos de componentes y llamadas a servicios/APIs.
   - Criterios de aceptación verificables (formato *Given / When / Then*).

3. **Parte 3: Desglose de Tareas Accionables (`# 3. Lista de Tareas y Verificación`):**
   - Checklist exhaustivo con casillas de verificación `[ ]` / `[x]`.
   - Organizado en fases secuenciales (Preparación, Implementación UI/Lógica, Pruebas y Cierre).
   - Obligación de marcar `[x]` a medida que se completen las tareas.

### 3. Regla de Cumplimiento Obligatorio para Agentes de IA y Desarrolladores
- **No se implementa código sin plan:** Antes de codificar cualquier funcionalidad nueva, el desarrollador o agente de IA debe generar o revisar el archivo correspondiente en `plans/`.
- **Actualización en vivo:** Las casillas de tareas deben actualizarse conforme el código sea integrado.
- **Revisión en Commit:** Los commits asociados a la funcionalidad deben referenciar el progreso del plan.

---

## Consecuencias

### Positivas
- **Alineación Total:** Tanto desarrolladores humanos como agentes de IA tienen una hoja de ruta idéntica y no ambigua.
- **Cero Fragmentación:** El plan, los requerimientos y el avance de tareas coexisten en el mismo archivo Markdown versionado en Git.
- **Calidad y Previsibilidad:** Todo desarrollo nace con criterios de aceptación claros y validaciones técnicas predefinidas.

### Mitigaciones
- Se provee una plantilla oficial [`plans/TEMPLATE.md`](../plans/TEMPLATE.md) para que la creación de un nuevo plan tome menos de 2 minutos.

