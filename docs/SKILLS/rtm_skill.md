---
name: generador-rtm
description: Genera una Matriz de Trazabilidad de Requisitos (RTM / Requirements Traceability Matrix) en formato de tabla Markdown mapeando Requisitos de Negocio, Historias de Usuario, Requisitos Funcionales/Técnicos, Casos de Prueba (QA) y Estado de Verificación a partir de un documento, imágenes, arquitectura o lista de requerimientos. Utilízala cuando el usuario solicite crear una RTM, matriz de trazabilidad o mapear requerimientos con casos de prueba en español.
---

# Generador de Matriz de Trazabilidad de Requisitos (RTM)

Transforma documentación heterogénea (historias de usuario, especificaciones funcionales, diagramas o capturas de pantalla) en una **Matriz de Trazabilidad de Requisitos (RTM)** estructurada, determinista y lista para auditoría.

---

## Principios Arquitectónicos y Estándares de Calidad

1. **Trazabilidad Bidireccional**: Cada Requisito de Negocio debe mapearse secuencialmente a su Historia de Usuario, Requisito Funcional, Casos de Prueba (QA) y Estado de Verificación.
2. **Identificación Estándar**: Uso de prefijos formales (`REQ-` para Negocio, `US-` para Historias de Usuario, `RF-` / `RT-` para Funcional/Técnico, `TC-` para Casos de Prueba).
3. **Cobertura Exhaustiva**: Inclusión obligatoria de casos de éxito (Happy Path), casos límite (Boundary Value Analysis) y casos negativos/anomalías de UI.
4. **Formato Markdown Limpio**: Presentación en tablas estructuradas de alta legibilidad, facilitando su exportación a Jira, Confluence, Excel o repositorios Git.

---

## Parámetros y Valores por Defecto

| Parámetro | Valor por Defecto | Opciones / Alternativas |
| :--- | :--- | :--- |
| **Entrada Principal** | Documentación / OCR / Imágenes / User Stories | Diagramas de Arquitectura, Especificaciones API |
| **Idioma de Salida** | Español | Inglés, Catalán |
| **Formato de Salida** | Tabla Markdown + Matriz de Cobertura | JSON Schema, CSV |
| **Profundidad de QA** | Casos Positivos, Negativos y Edge Cases | Cobertura Sanity / Smoke |

---

## Estructura Obligatoria de la RTM

La matriz generada debe incluir las siguientes columnas:

1. **ID Requisito (REQ)**: Identificador único del requisito de negocio.
2. **Historia de Usuario (US)**: ID y título de la User Story relacionada.
3. **Requisito Funcional / Técnico (RF/RT)**: Detalle del comportamiento esperado o restricción técnica.
4. **ID Caso de Prueba (TC)**: Identificador único del test de QA.
5. **Título del Caso de Prueba (Gherkin/BDD)**: Nombre del test (`Given ... When ... Then ...`).
6. **Tipo de Prueba**: Positiva (Happy Path), Negativa, Límite (BVA), Seguridad/Performance.
7. **Estado de Verificación**: `Pendiente`, `Automatizado (Playwright)`, `Manual`, `No Aplica`.

---

## Reglas de Transformación e Inferencia

Cuando la información de entrada sea parcial o provenga de imágenes/diagramas:

- **Análisis Visual (OCR/Screenshots)**: Extraer etiquetas de formularios, botones, flujos de navegación y estados de error implícitos.
- **Desglose de Ambigüedades**: Si una Historia de Usuario es vaga, inferir los Requisitos Funcionales (`RF`) asociados a validaciones de campo, seguridad y persistencia de datos.
- **Mapeo para Automatización**: Generar los `TC` pensando en su posterior automatización con frameworks como Playwright / POM.

---

## Plantilla Estándar de Salida

### 1. Resumen de Cobertura de Requerimientos

| Métrica | Cantidad | Cobertura % |
| :--- | :--- | :--- |
| **Requisitos de Negocio (REQ)** | N | 100% |
| **Historias de Usuario (US)** | N | 100% |
| **Casos de Prueba Totales (TC)** | N | -- |
| **Casos de Prueba Positivos** | N | -- |
| **Casos de Prueba Negativos / Edge Cases** | N | -- |

### 2. Matriz de Trazabilidad (RTM)

| ID REQ | User Story (US) | Requisito Funcional (RF) | ID TC | Título del Caso de Prueba (Gherkin) | Tipo de Prueba | Estado |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| **REQ-AUTH-01** | US-001: Login de Usuario | RF-AUTH-01: El sistema debe validar credenciales válidas y redirigir al Dashboard. | **TC-AUTH-001** | Given un usuario registrado, When ingresa usuario y contraseña correctos, Then accede al Dashboard. | Positiva (Happy Path) | Automatizado |
| **REQ-AUTH-01** | US-001: Login de Usuario | RF-AUTH-02: El sistema debe mostrar mensaje de error ante credenciales inválidas. | **TC-AUTH-002** | Given un usuario en la pantalla de login, When ingresa clave incorrecta, Then se muestra alerta de error. | Negativa | Automatizado |
| **REQ-AUTH-01** | US-001: Login de Usuario | RF-AUTH-03: Bloqueo de cuenta por reintento de contraseña (3 intentos). | **TC-AUTH-003** | Given un usuario, When falla 3 veces consecutivas la clave, Then la cuenta pasa a estado bloqueada. | Límite / Seguridad | Pendiente |