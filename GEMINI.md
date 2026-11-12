# Reglas del Proyecto EternalIA

## Cumplimiento de ADRs (Decisiones de Razonamiento Arquitectónico)
- Todas las decisiones registradas en la carpeta `adr/` son de **cumplimiento obligatorio** e ineludible para todo agente de IA y desarrollador en este proyecto.
- Antes de proponer o realizar cambios de arquitectura o flujos de trabajo, revisar el historial en `adr/README.md`.

## Regla de Commits (ADR-0001)
- **Coautor Obligatorio**: CADA commit realizado en este repositorio DEBE incluir al final del mensaje de commit la siguiente línea de coautoría:
  ```text
  Co-authored-by: jsdnlb <jsdnlb@users.noreply.github.com>
  ```
- Al generar o sugerir comandos de `git commit`, siempre incluye esta línea separada por una línea en blanco.
  Ejemplo:
  ```bash
  git commit -m "tipo(alcance): descripcion breve" -m "Co-authored-by: jsdnlb <jsdnlb@users.noreply.github.com>"
  ```

## Regla de Diseño y SEO (ADR-0002)
- **Soporte Completo Dark / Light Mode**: Todo componente creado o modificado en la landing page debe soportar ambos modos mediante clases `dark:` y variables adaptativas con contraste WCAG 2.1 AA.
- **Auditoría de SEO**: Mantener metadatos, datos estructurados Schema.org, semántica HTML y velocidad de carga en los más altos estándares bajo el rol de `design-seo-specialist`.

## Regla de Planes, Especificaciones y Tareas (ADR-0003)
- **Obligatoriedad de Plan Previo**: Toda funcionalidad nueva o cambio mayor debe contar con un archivo consolidado en `plans/` que contenga en el mismo documento:
  1. Plan de Implementación (arquitectura, alcance, dependencias).
  2. Especificaciones Técnicas y Funcionales (requerimientos, diseño Dark/Light, contratos, criterios de aceptación).
  3. Desglose de Tareas Accionables (checklist interactivo `[ ]` / `[x]`).
- **Seguimiento Activo**: Las tareas deben actualizarse a `[x]` a medida que se implemente la solución.

## Regla de Arquitectura y Experiencia Móvil (ADR-0004)
- **Rol Mandatario `mobile-experience-specialist`**: Todo agente o desarrollador que modifique elementos de la interfaz de usuario debe asumir una postura crítica y rigurosa sobre la experiencia móvil antes de aprobar cualquier cambio.
- **Checklist Crítico Obligatorio**:
  1. *Cero Desbordamiento Horizontal*: Compatibilidad estricta desde 320px hasta 430px y superiores.
  2. *Tipografía y Text-Balance*: Títulos proporcionados (`text-2xl` a `text-3xl` en móvil), sin palabras huérfanas en saltos de línea.
  3. *Ergonomía Táctil*: Zonas de toque y botones con área mínima de 44x44px y feedback táctil inmediato (`active:scale-95`).
  4. *Densidad Visual Saludable*: Espaciados verticales reducidos en móvil (`py-12 sm:py-20 md:py-24`) para evitar fatiga de scroll.
  5. *Separación de Idiomas*: Copy visible en español profesional y código/identificadores en inglés.

