# ADR-0001: Coautor obligatorio `jsdnlb` en todos los commits

- **Estado:** Aceptado
- **Fecha:** 2026-11-06
- **Autores:** Equipo EternalIA
- **Decisores:** Equipo de Desarrollo & Gobernanza del Repositorio

---

## Contexto

En el flujo de trabajo de desarrollo del proyecto **EternalIA**, la colaboración y atribución de contribuciones técnicas es fundamental. Se requiere asegurar la debida coautoría en el historial de control de versiones (Git/GitHub) para reflejar las contribuciones de arquitectura, revisión y desarrollo conjunto asociadas al colaborador o entidad técnica `jsdnlb`.

Anteriormente, los commits se realizaban únicamente con el autor local principal, omitiendo la coautoría requerida en las directrices de gobernanza del repositorio.

---

## Decisión

A partir de la aprobación de este ADR:

1. **Obligatoriedad del Coautor:**  
   Todo commit generado en este repositorio (sea creado por desarrolladores humanos, herramientas automáticas o asistentes de IA) **DEBE** incluir obligatoriamente el trailer de coautoría para `jsdnlb` en el mensaje de commit.

2. **Formato Estándar del Commit:**  
   En la sección final del mensaje del commit (separado por una línea en blanco del cuerpo o del título), se debe incluir:
   ```text
   Co-authored-by: jsdnlb <jsdnlb@users.noreply.github.com>
   ```

   *Ejemplo de mensaje de commit completo:*
   ```text
   feat(auth): agregar validacion de credenciales en login

   Implementacion de validaciones adicionales segun requerimientos.

   Co-authored-by: jsdnlb <jsdnlb@users.noreply.github.com>
   ```

3. **Mecanismos de Cumplimiento (Enforcement):**
   - **Reglas del Asistente de IA (`GEMINI.md` / `AGENTS.md`):** Se establece la regla en la configuración del agente para que cualquier commit ejecutado por el asistente de IA aplique automáticamente este trailer.
   - **Git Hook Local (`prepare-commit-msg`):** Se implementa un hook de Git que añade automáticamente la línea de coautor a cualquier commit local si no está ya presente.
   - **Revisión en Pull Requests / CI:** Commits en ramas principales deben verificar el cumplimiento de este lineamiento.

---

## Consecuencias

### Positivas
- Se garantiza la atribución consistente de `jsdnlb` en todo el historial de Git y en la interfaz de GitHub.
- El cumplimiento se automatiza tanto a nivel de agente de IA como a nivel de Git local, eliminando el error humano o el olvido manual.
- Se sienta el precedente y estándar para futuros registros de razonamiento arquitectónico (ADR) y su cumplimiento normativo.

### Neutrales / Mitigaciones
- Los desarrolladores deben tener configurado el hook de Git si hacen commits manuales fuera del agente, o incluir manualmente la línea si el hook estuviera inactivo.

