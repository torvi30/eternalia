# [FEATURE-XXXX]: Nombre de la Funcionalidad

- **Estado:** [ Borrador | En Progreso | Completado | Descartado ]
- **Fecha de Inicio:** AAAA-MM-DD
- **Responsable / Agente:** [ Nombre del Desarrollador / design-seo-specialist / etc. ]
- **ADR Relacionados:** [ ADR-0001, ADR-0002, ADR-0003 ]

---

# 1. Plan de Implementación

### 1.1 Contexto y Objetivo
> Descripción concisa del problema que se busca resolver y por qué es importante para Eternalia.

### 1.2 Alcance
- **En Alcance (In Scope):**
  - Requerimiento A
  - Requerimiento B
- **Fuera de Alcance (Out of Scope):**
  - Elementos diferidos para etapas posteriores

### 1.3 Arquitectura y Componentes Afectados
- Componentes UI / Vistas:
- Estado / Contextos / Servicios:
- Base de datos / Firebase:

### 1.4 Riesgos y Mitigaciones
| Riesgo | Probabilidad / Impacto | Estrategia de Mitigación |
|---|---|---|
| Ejemplo: Pérdida de contraste en light mode | Media / Alto | Uso estricto de tokens WCAG 2.1 AA |

---

# 2. Especificaciones Técnicas y Funcionales

### 2.1 Historias de Usuario
- **Como** [tipo de usuario: visitante / comerciante / admin],
- **Quiero** [acción específica],
- **Para que** [beneficio obtenido].

### 2.2 Requerimientos Funcionales (RF)
- **RF-01:** Descripción del comportamiento esperado.
- **RF-02:** Validaciones y flujos alternativos.

### 2.3 Requerimientos de UI/UX y Accesibilidad (ADR-0002)
- **Dark Mode:** Comportamiento y clases `dark:`.
- **Light Mode:** Contraste mínimo 4.5:1, fondos limpios y legibilidad.
- **Responsividad:** Adaptabilidad móvil estricta (0 scroll horizontal no deseado).

### 2.4 Criterios de Aceptación (Given / When / Then)
```gherkin
Escenario 1: Flujo exitoso
  Dado que el usuario se encuentra en [vista]
  Cuando realiza la acción [evento/click]
  Entonces el sistema debe [resultado esperado]
```

---

# 3. Lista de Tareas y Verificación (Tasks)

### Fase 1: Preparación y Arquitectura
- [ ] Tarea 1.1: Configurar modelos de datos o dependencias
- [ ] Tarea 1.2: Definir contratos de interfaces o contextos

### Fase 2: Implementación Técnica
- [ ] Tarea 2.1: Crear/modificar componentes base
- [ ] Tarea 2.2: Implementar soporte dual Dark & Light Mode
- [ ] Tarea 2.3: Conectar servicios o lógica reactiva

### Fase 3: Pruebas y Aseguramiento de Calidad
- [ ] Tarea 3.1: Probar en mobile, tablet y desktop
- [ ] Tarea 3.2: Verificar auditoría de contraste WCAG AA
- [ ] Tarea 3.3: Ejecutar `npm run build` sin errores

### Fase 4: Despliegue y Commit (ADR-0001)
- [ ] Tarea 4.1: Realizar commit incluyendo coautor obligatorio `jsdnlb`

