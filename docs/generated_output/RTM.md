# Matriz de Trazabilidad de Requisitos (RTM) — SportHub News

## Resumen de cobertura

| Métrica | Cantidad | Cobertura |
| :--- | ---: | ---: |
| Requisitos de negocio (REQ) | 3 | 100 % trazados a casos de prueba |
| Historias de usuario (US) | 3 | 100 % trazadas a requisitos y pruebas |
| Casos de prueba (TC) | 14 | — |
| Casos positivos (Happy Path) | 7 | — |
| Casos negativos / límite / resiliencia | 7 | — |
| Casos automatizados con Playwright | 14 de 14 | 100 % |
| Casos que pasan en la última ejecución (Chromium) | 5 de 14 | 36 % |
| Casos que fallan por brechas de implementación | 9 de 14 | 64 % |

> La cobertura de trazabilidad y automatización es del 100 %. La última ejecución en Chromium pasó 5 casos y falló 9 por brechas de implementación; consulta «Observaciones de implementación». La lista detallada está en [Casos de prueba](./RTM_Test_Cases.md).

## Matriz de trazabilidad

| ID REQ | User Story (US) | Requisito Funcional / Técnico (RF) | ID TC | Título del Caso de Prueba (Gherkin/BDD) | Tipo de Prueba | Estado |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| **REQ-VIS-01** | **US-01: Visualización del listado de periódicos deportivos** | **RF-VIS-01:** Al entrar en la aplicación, mostrar una tabla organizada con enlace, nombre y portada/logo de cada periódico, además de una acción explícita para eliminar la fila. | **TC-REQ-VIS-01-01** | Given que hay periódicos registrados, When el usuario abre la aplicación, Then ve una fila por periódico con enlace, nombre, portada/logo y acción de eliminar. | Positiva (Happy Path) | Automatizado (Playwright) |
| **REQ-VIS-01** | **US-01: Visualización del listado de periódicos deportivos** | **RF-VIS-01:** Mostrar los datos de cada periódico en la tabla. | **TC-REQ-VIS-01-02** | Given un periódico registrado, When se muestra su fila, Then el nombre y la imagen representativa de su portada o logo son visibles. | Positiva (Happy Path) | Automatizado (Playwright) |
| **REQ-VIS-01** | **US-01: Visualización del listado de periódicos deportivos** | **RF-VIS-02:** El enlace de cada periódico debe abrir su sitio en una pestaña nueva. | **TC-REQ-VIS-01-03** | Given que se muestra un periódico, When el usuario activa su enlace, Then el sitio del periódico se abre en una pestaña nueva. | Positiva (Happy Path) | Automatizado (Playwright) |
| **REQ-VIS-01** | **US-01: Visualización del listado de periódicos deportivos** | **RF-VIS-03 (inferido):** La tabla no debe presentar registros inexistentes cuando no hay periódicos. | **TC-REQ-VIS-01-04** | Given que no hay periódicos registrados, When el usuario abre el listado, Then no se muestran filas de datos obsoletas o ficticias. | Límite (lista vacía; inferido) | Automatizado (Playwright) |
| **REQ-GEST-01** | **US-02: Gestión de entradas (añadir y eliminar periódicos)** | **RF-GEST-01:** Permitir añadir un periódico con nombre, URL del enlace y URL de imagen/portada obligatorios; mostrar el nuevo registro al final del listado después de guardarlo. | **TC-REQ-GEST-01-01** | Given que el usuario completa los tres campos requeridos con datos válidos, When guarda el periódico, Then el nuevo registro aparece al final del listado. | Positiva (Happy Path) | Automatizado (Playwright) |
| **REQ-GEST-01** | **US-02: Gestión de entradas (añadir y eliminar periódicos)** | **RF-GEST-02:** Eliminar únicamente el periódico de la fila seleccionada y actualizar el listado sin recargar la página. | **TC-REQ-GEST-01-02** | Given que hay varios periódicos, When el usuario elimina uno, Then desaparece solo esa fila y el listado se actualiza sin recargar la página. | Positiva (Happy Path) | Automatizado (Playwright) |
| **REQ-GEST-01** | **US-02: Gestión de entradas (añadir y eliminar periódicos)** | **RF-GEST-03 (derivado de la maqueta):** Conservar las bajas en el almacenamiento local. | **TC-REQ-GEST-01-03** | Given que se eliminó un periódico, When se vuelve a cargar la aplicación, Then el listado conserva la baja. | Positiva (persistencia) | Automatizado (Playwright) |
| **REQ-GEST-01** | **US-02: Gestión de entradas (añadir y eliminar periódicos)** | **RF-GEST-02:** La eliminación debe funcionar también cuando solo queda un periódico. | **TC-REQ-GEST-01-04** | Given que el listado contiene un único periódico, When el usuario lo elimina, Then la fila desaparece y no se conserva un registro residual. | Límite (último registro) | Automatizado (Playwright) |
| **REQ-GEST-01** | **US-02: Gestión de entradas (añadir y eliminar periódicos)** | **RF-GEST-03 (derivado de la maqueta):** Conservar las altas en el almacenamiento local. | **TC-REQ-GEST-01-05** | Given que se añadió un periódico, When se vuelve a cargar la aplicación, Then el listado conserva el nuevo registro. | Positiva (persistencia) | Automatizado (Playwright) |
| **REQ-CAL-01** | **US-03: Validaciones de entrada y calidad de datos** | **RF-CAL-01:** Rechazar campos obligatorios vacíos, mostrar un error claro y no añadir el registro. | **TC-REQ-CAL-01-01** | Given que falta al menos uno de los campos obligatorios, When el usuario intenta guardar, Then ve un mensaje de error y el registro no se añade. | Negativa | Automatizado (Playwright) |
| **REQ-CAL-01** | **US-03: Validaciones de entrada y calidad de datos** | **RF-CAL-02:** Rechazar una URL de enlace con formato no válido y explicar el error. | **TC-REQ-CAL-01-02** | Given que los campos obligatorios están completos, When el usuario introduce una URL de enlace mal formada y guarda, Then ve un error claro y no se añade el registro. | Negativa | Automatizado (Playwright) |
| **REQ-CAL-01** | **US-03: Validaciones de entrada y calidad de datos** | **RF-CAL-02:** Rechazar una URL/recurso de portada no válido y explicar el error. | **TC-REQ-CAL-01-03** | Given que el usuario completa los otros campos, When introduce una URL/recurso de portada no válido y guarda, Then ve un error claro y no se añade el registro. | Negativa | Automatizado (Playwright) |
| **REQ-CAL-01** | **US-03: Validaciones de entrada y calidad de datos** | **RF-CAL-03:** Si la imagen de portada no se puede renderizar (por ejemplo, error 404), mostrar una imagen alternativa. | **TC-REQ-CAL-01-04** | Given que un periódico tiene una imagen de portada que devuelve error al cargarse, When se renderiza su fila, Then se muestra una imagen de respaldo en lugar de una imagen rota. | Negativa / resiliencia | Automatizado (Playwright) |
| **REQ-CAL-01** | **US-03: Validaciones de entrada y calidad de datos** | **RF-CAL-01 (caso límite inferido):** Tratar los campos compuestos solo por espacios como valores vacíos. | **TC-REQ-CAL-01-05** | Given que uno o más campos obligatorios contienen únicamente espacios, When el usuario intenta guardar, Then ve un mensaje de error y el registro no se añade. | Límite (BVA; inferido) | Automatizado (Playwright) |

## Trazabilidad de origen y supuestos

- **Fuente:** `App_Requirements.pdf`, páginas 1–2: historias HU-01, HU-02 y HU-03, criterios de aceptación y maqueta.
- Los IDs REQ, RF y TC se asignaron para esta matriz; no aparecen como identificadores en la fuente.
- La fuente exige una URL de imagen/portada en el formulario y también menciona un “archivo no válido”. Para este RTM, ese caso se interpreta como una URL/recurso de portada no válido; si se pretende cargar archivos, deberá precisarse el flujo de carga.
- Los casos de lista vacía y campos con solo espacios son pruebas de límite inferidas para completar la cobertura; no se presentan como criterios explícitos del PDF.
- El botón “Restablecer iniciales” aparece en la maqueta, pero el PDF no especifica su comportamiento, por lo que no se añadió como requisito verificable.

## Observaciones de implementación

Al contrastar los requisitos con el código actual, se observan brechas que impiden considerar estos casos verificados:

- La vista muestra un listado y enlaces, pero el dato de portada es texto (`logoText`), no una imagen con alternativa de respaldo.
- No se encontró formulario ni ruta para añadir periódicos, ni las validaciones de los campos descritas.
- La baja usa un envío POST seguido de redirección; por tanto, no cumple el criterio de actualizar la lista sin recargar la página.
- Aunque las bajas se escriben en el JSON local, no existe flujo de alta que permita verificar la persistencia de altas.
- La especificación dice “3 columnas” de datos y también requiere una acción de eliminación por fila; la matriz interpreta esa acción como una columna/acción adicional.
- El PDF no define un estado visual para el listado vacío ni límites de longitud; no se inventaron pruebas para esos comportamientos salvo los casos límite identificados explícitamente como inferidos.
