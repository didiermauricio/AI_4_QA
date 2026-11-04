# Casos de prueba — SportHub News

Casos derivados de la [Matriz de Trazabilidad de Requisitos](./RTM.md). Los identificadores siguen el formato `TC-[REQ_ID]-[CONTADOR]`; los escenarios están escritos en Gherkin y cada caso indica requisito, tipo y precondiciones.

| Test Case ID | ID de automatización existente | Estado |
| :--- | :--- | :--- |
| TC-REQ-VIS-01-01 | TC-REQ-VIS-01-01 | Automatizado |
| TC-REQ-VIS-01-02 | TC-REQ-VIS-01-02 | Automatizado |
| TC-REQ-VIS-01-03 | TC-REQ-VIS-01-03 | Automatizado |
| TC-REQ-VIS-01-04 | TC-REQ-VIS-01-04 | Automatizado |
| TC-REQ-GEST-01-01 | TC-REQ-GEST-01-01 | Automatizado |
| TC-REQ-GEST-01-02 | TC-REQ-GEST-01-02 | Automatizado |
| TC-REQ-GEST-01-03 | TC-REQ-GEST-01-03 | Automatizado |
| TC-REQ-GEST-01-04 | TC-REQ-GEST-01-04 | Automatizado |
| TC-REQ-GEST-01-05 | TC-REQ-GEST-01-05 | Automatizado |
| TC-REQ-CAL-01-01 | TC-REQ-CAL-01-01 | Automatizado |
| TC-REQ-CAL-01-02 | TC-REQ-CAL-01-02 | Automatizado |
| TC-REQ-CAL-01-03 | TC-REQ-CAL-01-03 | Automatizado |
| TC-REQ-CAL-01-04 | TC-REQ-CAL-01-04 | Automatizado |
| TC-REQ-CAL-01-05 | TC-REQ-CAL-01-05 | Automatizado |

## REQ-VIS-01 — Visualización del listado de periódicos deportivos

### TC-REQ-VIS-01-01 — Mostrar el listado con datos y acciones

- **Test Case ID:** TC-REQ-VIS-01-01
- **Requirement ID:** REQ-VIS-01
- **Requirement Title:** Visualización del listado de periódicos deportivos
- **Test Type:** Positive
- **Preconditions:** Hay al menos un periódico válido en el almacenamiento de prueba, con nombre, URL, portada/logo y acción de eliminación disponibles.

```gherkin
Feature: REQ-VIS-01 - Visualización del listado de periódicos deportivos

  @REQ-VIS-01 @TC-REQ-VIS-01-01 @Positive
  Scenario: Mostrar los periódicos registrados con sus datos y acciones
    Given que hay periódicos válidos registrados
    When el usuario abre la página principal de SportHub News
    Then se muestra una fila por cada periódico registrado
    And cada fila muestra el enlace, el nombre, la portada o logo y una acción para eliminar
```

### TC-REQ-VIS-01-02 — Mostrar nombre e imagen del periódico

- **Test Case ID:** TC-REQ-VIS-01-02
- **Requirement ID:** REQ-VIS-01
- **Requirement Title:** Visualización de los datos de cada periódico
- **Test Type:** Positive
- **Preconditions:** Hay un periódico registrado con nombre conocido y una imagen de portada/logo que carga correctamente.

```gherkin
Feature: REQ-VIS-01 - Visualización del listado de periódicos deportivos

  @REQ-VIS-01 @TC-REQ-VIS-01-02 @Positive
  Scenario: Mostrar el nombre y la imagen del periódico registrado
    Given que hay un periódico registrado con un nombre y una imagen válidos
    When el usuario abre el listado de periódicos
    Then la fila del periódico muestra su nombre
    And la imagen de portada o logo es visible
```

### TC-REQ-VIS-01-03 — Abrir el sitio del periódico en una pestaña nueva

- **Test Case ID:** TC-REQ-VIS-01-03
- **Requirement ID:** REQ-VIS-01
- **Requirement Title:** Abrir el enlace de cada periódico en una pestaña nueva
- **Test Type:** Positive
- **Preconditions:** El listado contiene un periódico con un enlace válido a su sitio oficial.

```gherkin
Feature: REQ-VIS-01 - Enlaces a los sitios de los periódicos

  @REQ-VIS-01 @TC-REQ-VIS-01-03 @Positive
  Scenario: Abrir el sitio del periódico sin reemplazar la página del listado
    Given que se muestra un periódico con un enlace válido
    And el usuario está en la página principal de SportHub News
    When el usuario activa el enlace del periódico
    Then el sitio correspondiente se abre en una pestaña nueva
    And la pestaña original conserva el listado de SportHub News
```

### TC-REQ-VIS-01-04 — Mostrar un listado vacío sin filas residuales

- **Test Case ID:** TC-REQ-VIS-01-04
- **Requirement ID:** REQ-VIS-01
- **Requirement Title:** Visualización cuando no hay periódicos registrados
- **Test Type:** Boundary
- **Preconditions:** El almacenamiento de prueba está vacío.

```gherkin
Feature: REQ-VIS-01 - Visualización del listado de periódicos deportivos

  @REQ-VIS-01 @TC-REQ-VIS-01-04 @Boundary
  Scenario: No mostrar filas de periódicos cuando el almacenamiento está vacío
    Given que no hay periódicos registrados
    When el usuario abre la página principal de SportHub News
    Then no se muestran filas de datos de periódicos
```

## REQ-GEST-01 — Gestión de entradas

### TC-REQ-GEST-01-01 — Añadir un periódico válido al final del listado

- **Test Case ID:** TC-REQ-GEST-01-01
- **Requirement ID:** REQ-GEST-01
- **Requirement Title:** Añadir un periódico con todos sus campos obligatorios
- **Test Type:** Positive
- **Preconditions:** El listado está disponible y el formulario para añadir periódicos se puede abrir.

```gherkin
Feature: REQ-GEST-01 - Añadir periódicos

  @REQ-GEST-01 @TC-REQ-GEST-01-01 @Positive
  Scenario: Añadir un periódico con datos válidos
    Given que el usuario abre el formulario para añadir un periódico
    When completa el nombre con "Diario de prueba"
    And completa la URL del enlace con "https://example.test/news"
    And completa la URL de portada con "https://example.test/news.png"
    And guarda el periódico
    Then el nuevo periódico aparece en el listado
    And aparece después de los periódicos que ya estaban registrados
```

### TC-REQ-GEST-01-02 — Eliminar solo el periódico seleccionado sin recargar

- **Test Case ID:** TC-REQ-GEST-01-02
- **Requirement ID:** REQ-GEST-01
- **Requirement Title:** Eliminar una fila y actualizar el listado sin recargar la página
- **Test Type:** Positive
- **Preconditions:** Hay al menos dos periódicos registrados y sus acciones de eliminación están disponibles.

```gherkin
Feature: REQ-GEST-01 - Eliminar periódicos

  @REQ-GEST-01 @TC-REQ-GEST-01-02 @Positive
  Scenario: Eliminar el periódico seleccionado sin afectar a los demás
    Given que el listado muestra varios periódicos
    And el usuario está en la página principal del listado
    When el usuario activa la acción para eliminar "Marca"
    Then la fila de "Marca" desaparece del listado
    And las filas de los demás periódicos permanecen visibles
    And el listado se actualiza sin recargar la página
```

### TC-REQ-GEST-01-03 — Conservar la eliminación después de recargar

- **Test Case ID:** TC-REQ-GEST-01-03
- **Requirement ID:** REQ-GEST-01
- **Requirement Title:** Conservar las bajas en el almacenamiento local
- **Test Type:** Positive
- **Preconditions:** Hay al menos dos periódicos registrados y el almacenamiento local puede guardar cambios.

```gherkin
Feature: REQ-GEST-01 - Persistencia de bajas

  @REQ-GEST-01 @TC-REQ-GEST-01-03 @Positive
  Scenario: Conservar la eliminación de un periódico al recargar la aplicación
    Given que el listado muestra varios periódicos
    When el usuario elimina "Marca"
    And vuelve a cargar la aplicación
    Then "Marca" no aparece en el listado
    And los demás periódicos siguen apareciendo
```

### TC-REQ-GEST-01-04 — Eliminar el último periódico

- **Test Case ID:** TC-REQ-GEST-01-04
- **Requirement ID:** REQ-GEST-01
- **Requirement Title:** Eliminar un periódico cuando es el único registro
- **Test Type:** Boundary
- **Preconditions:** El listado contiene exactamente un periódico.

```gherkin
Feature: REQ-GEST-01 - Eliminar periódicos

  @REQ-GEST-01 @TC-REQ-GEST-01-04 @Boundary
  Scenario: Eliminar el único periódico del listado
    Given que el listado contiene únicamente el periódico "Marca"
    When el usuario activa la acción para eliminar "Marca"
    Then la fila de "Marca" desaparece
    And no queda ningún registro residual en el listado
```

### TC-REQ-GEST-01-05 — Conservar una nueva alta después de recargar

- **Test Case ID:** TC-REQ-GEST-01-05
- **Requirement ID:** REQ-GEST-01
- **Requirement Title:** Conservar las altas en el almacenamiento local
- **Test Type:** Positive
- **Preconditions:** El listado y el formulario para añadir periódicos están disponibles; el almacenamiento local puede guardar cambios.
- **Automation Status:** Automatizado en `tests/sporthub.spec.ts`.

```gherkin
Feature: REQ-GEST-01 - Persistencia de altas

  @REQ-GEST-01 @TC-REQ-GEST-01-05 @Positive
  Scenario: Conservar un periódico nuevo al recargar la aplicación
    Given que el usuario abre el formulario para añadir un periódico
    And completa "Diario de prueba" con URLs válidas
    When el usuario guarda el periódico
    And vuelve a cargar la aplicación
    Then "Diario de prueba" aparece en el listado
    And sus datos guardados se muestran correctamente
```

## REQ-CAL-01 — Validaciones de entrada y calidad de datos

### TC-REQ-CAL-01-01 — Rechazar un campo obligatorio vacío

- **Test Case ID:** TC-REQ-CAL-01-01
- **Requirement ID:** REQ-CAL-01
- **Requirement Title:** Rechazar campos obligatorios vacíos
- **Test Type:** Negative
- **Preconditions:** El formulario para añadir periódicos está disponible.

```gherkin
Feature: REQ-CAL-01 - Validación de campos obligatorios

  @REQ-CAL-01 @TC-REQ-CAL-01-01 @Negative
  Scenario Outline: Rechazar el formulario cuando falta un campo obligatorio
    Given que el usuario abre el formulario para añadir un periódico
    When completa el nombre con "<nombre>"
    And completa la URL del enlace con "<url>"
    And completa la URL de portada con "<portada>"
    And intenta guardar el periódico
    Then se muestra un mensaje de validación
    And el periódico no se añade al listado

    Examples:
      | nombre           | url                            | portada                            |
      |                  | https://example.test/news      | https://example.test/news.png      |
      | Diario de prueba |                                | https://example.test/news.png      |
      | Diario de prueba | https://example.test/news      |                                    |
```

### TC-REQ-CAL-01-02 — Rechazar una URL de enlace mal formada

- **Test Case ID:** TC-REQ-CAL-01-02
- **Requirement ID:** REQ-CAL-01
- **Requirement Title:** Rechazar una URL de enlace no válida
- **Test Type:** Negative
- **Preconditions:** El formulario para añadir periódicos está disponible.

```gherkin
Feature: REQ-CAL-01 - Validación de URLs

  @REQ-CAL-01 @TC-REQ-CAL-01-02 @Negative
  Scenario: Rechazar una URL de enlace mal formada
    Given que el usuario abre el formulario para añadir un periódico
    And completa el nombre con "Diario de prueba"
    And completa la URL de portada con "https://example.test/news.png"
    When completa la URL del enlace con "no-es-una-url"
    And intenta guardar el periódico
    Then se muestra un mensaje que identifica el error de validación
    And el periódico no se añade al listado
```

### TC-REQ-CAL-01-03 — Rechazar una URL de portada no válida

- **Test Case ID:** TC-REQ-CAL-01-03
- **Requirement ID:** REQ-CAL-01
- **Requirement Title:** Rechazar una URL de portada no válida
- **Test Type:** Negative
- **Preconditions:** El formulario para añadir periódicos está disponible.

```gherkin
Feature: REQ-CAL-01 - Validación de URLs

  @REQ-CAL-01 @TC-REQ-CAL-01-03 @Negative
  Scenario: Rechazar una URL de portada mal formada
    Given que el usuario abre el formulario para añadir un periódico
    And completa el nombre con "Diario de prueba"
    And completa la URL del enlace con "https://example.test/news"
    When completa la URL de portada con "no-es-una-url"
    And intenta guardar el periódico
    Then se muestra un mensaje que identifica el error de validación
    And el periódico no se añade al listado
```

### TC-REQ-CAL-01-04 — Mostrar una imagen alternativa si la portada falla

- **Test Case ID:** TC-REQ-CAL-01-04
- **Requirement ID:** REQ-CAL-01
- **Requirement Title:** Mostrar una imagen alternativa si la portada no se puede cargar
- **Test Type:** Edge Case (resilience)
- **Preconditions:** Hay un periódico registrado cuya URL de portada responde con un error, por ejemplo HTTP 404.

```gherkin
Feature: REQ-CAL-01 - Resiliencia al cargar imágenes

  @REQ-CAL-01 @TC-REQ-CAL-01-04 @EdgeCase
  Scenario: Mostrar una imagen alternativa cuando falla la portada
    Given que un periódico tiene una portada que devuelve un error al cargarse
    When se muestra la fila del periódico
    Then se muestra una imagen alternativa en lugar de una imagen rota
```

### TC-REQ-CAL-01-05 — Rechazar campos obligatorios con solo espacios

- **Test Case ID:** TC-REQ-CAL-01-05
- **Requirement ID:** REQ-CAL-01
- **Requirement Title:** Tratar los campos compuestos solo por espacios como vacíos
- **Test Type:** Boundary (inferred)
- **Preconditions:** El formulario para añadir periódicos está disponible.

```gherkin
Feature: REQ-CAL-01 - Validación de campos obligatorios

  @REQ-CAL-01 @TC-REQ-CAL-01-05 @Boundary
  Scenario Outline: Rechazar un campo obligatorio que contiene solo espacios
    Given que el usuario abre el formulario para añadir un periódico
    And completa los demás campos obligatorios con valores válidos
    When introduce exactamente tres espacios ASCII en el campo "<campo>"
    And intenta guardar el periódico
    Then se muestra un mensaje de validación
    And el periódico no se añade al listado

    Examples:
      | campo             |
      | nombre            |
      | URL del enlace    |
      | URL de portada    |
```
