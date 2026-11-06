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

