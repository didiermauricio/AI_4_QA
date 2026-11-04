# Matriz de Trazabilidad de Requisitos (RTM)

Documento base: `app_req/App_Requirements.pdf`  
Aplicación: `SportHub News`  
Fuente complementaria: `README.md`, `app.js`, `src/**`, `data/links.json`

---

## 1. Resumen de Cobertura de Requerimientos

| Métrica | Cantidad | Cobertura % |
| :--- | :--- | :--- |
| **Requisitos de Negocio (REQ)** | 8 | 100% |
| **Historias de Usuario (US)** | 8 | 100% |
| **Casos de Prueba Totales (TC)** | 12 | -- |
| **Casos de Prueba Positivos** | 7 | -- |
| **Casos de Prueba Negativos / Edge Cases** | 5 | -- |

---

## 2. Matriz de Trazabilidad (RTM)

| ID REQ | User Story (US) | Requisito Funcional / Técnico (RF/RT) | ID TC | Título del Caso de Prueba (Gherkin) | Tipo de Prueba | Estado |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| **REQ-01** | **US-001: Ver catálogo de periódicos deportivos** | RF-01: El sistema debe mostrar una lista de periódicos con nombre, URL y acrónimo inicial. | **TC-APP-001** | Given que el usuario accede a la página principal, When el sistema carga la vista, Then se muestra el catálogo con los periódicos disponibles. | Positiva (Happy Path) | Automatizado (Playwright) |
| **REQ-01** | **US-001: Ver catálogo de periódicos deportivos** | RF-02: La vista debe renderizar el nombre, enlace oficial y un identificador visual por cada periódico. | **TC-APP-002** | Given que existe un periódico en la base local, When se visualiza la tabla, Then cada fila muestra nombre, URL y logo/acrónimo. | Positiva (Happy Path) | Automatizado (Playwright) |
| **REQ-02** | **US-002: Buscar periódicos por nombre, dominio o acrónimo** | RF-03: El sistema debe permitir buscar por nombre, dominio o código corto (period). | **TC-APP-003** | Given que el usuario ingresa un texto de búsqueda, When escribe una coincidencia parcial, Then la lista se filtra con los resultados relevantes. | Positiva (Happy Path) | Automatizado (Playwright) |
| **REQ-02** | **US-002: Buscar periódicos por nombre, dominio o acrónimo** | RF-04: Si la búsqueda está vacía, el sistema debe devolver la lista completa sin errores. | **TC-APP-004** | Given que el usuario deja el campo vacío, When ejecuta la búsqueda, Then se muestran todos los periódicos del catálogo. | Negativa / Edge Case | Automatizado (Playwright) |
| **REQ-03** | **US-003: Abrir enlaces de periódico en nueva pestaña** | RF-05: Cada enlace debe abrir el sitio oficial del periódico en una nueva pestaña o contexto externo. | **TC-APP-005** | Given que el usuario selecciona una referencia del periódico, When hace clic en el enlace, Then la página del medio se abre en una pestaña nueva. | Positiva (Happy Path) | Manual |
| **REQ-04** | **US-004: Eliminar un periódico del catálogo** | RF-06: El usuario debe poder eliminar un periódico del listado y confirmar la acción antes de borrarlo. | **TC-APP-006** | Given que el usuario quiere eliminar un periódico, When confirma la acción, Then el registro desaparece del catálogo. | Positiva (Happy Path) | Automatizado (Playwright) |
| **REQ-04** | **US-004: Eliminar un periódico del catálogo** | RF-07: La eliminación debe persistirse en el archivo JSON local para que el cambio no se pierda al recargar la página. | **TC-APP-007** | Given que se elimina un periódico, When recarga la página, Then el registro sigue ausente y la persistencia sigue activa. | Positiva (Happy Path) | Automatizado (Playwright) |
| **REQ-04** | **US-004: Eliminar un periódico del catálogo** | RF-08: Si el usuario cancela la confirmación, el registro no debe eliminarse. | **TC-APP-008** | Given que el usuario cancela la confirmación de borrado, When se responde la alerta, Then el periódico sigue presente en la lista. | Negativa | Manual |
| **REQ-05** | **US-005: Acceso y navegación responsive** | RF-09: La interfaz debe adaptarse a distintos tamaños de pantalla sin romper la estructura y la legibilidad. | **TC-APP-009** | Given que la aplicación se visualiza en móvil y en escritorio, When se redimensiona la ventana, Then la tabla y los controles siguen siendo legibles y funcionales. | Límite / UI | Manual |
| **REQ-06** | **US-006: Datos iniciales y almacenamiento local** | RF-10: El sistema debe cargar una muestra inicial de periódicos desde un archivo JSON local, sin requerir base de datos externa. | **TC-APP-010** | Given que la aplicación inicia por primera vez, When se lee el archivo de datos, Then se cargan las entradas iniciales del catálogo. | Positiva (Happy Path) | Automatizado (Playwright) |
| **REQ-06** | **US-006: Datos iniciales y almacenamiento local** | RF-11: Los cambios en el catálogo deben escribirse en JSON local con estructura estable y serialización correcta. | **TC-APP-011** | Given que un registro es borrado o actualizado, When se guarda la estructura de datos, Then el JSON almacena la información válida sin errores de formato. | Límite / Seguridad | Pendiente |
| **REQ-07** | **US-007: Soporte de ejecución local** | RT-01: La aplicación debe ejecutarse en Node.js 18+ con npm y server-side rendering con Express, EJS y Playwright para QA. | **TC-APP-012** | Given que el proyecto está instalado, When se ejecuta la app con npm start, Then el servidor responde correctamente en el puerto configurado y la vista desplegada está operativa. | Positiva (Happy Path) | Automatizado (Playwright) |

---

## 3. Matriz de Requisitos de Negocio y Cobertura funcional

| ID REQ | Título de Negocio | Historias asociadas | Estado | Observación |
| :--- | :--- | :--- | :--- | :--- |
| **REQ-01** | Catálogo de periódicos deportivos | US-001 | Cubierto | Lista visible con nombre, URL y acrónimo |
| **REQ-02** | Búsqueda de periódicos | US-002 | Cubierto | Filtrado por nombre, dominio y acrónimo |
| **REQ-03** | Apertura de enlaces externos | US-003 | Cubierto | Acceso a medios oficiales |
| **REQ-04** | Eliminación con persistencia | US-004 | Cubierto | Borrado confirmado y guardado localmente |
| **REQ-05** | Responsive y legibilidad | US-005 | Parcialmente cubierto | Requiere validación manual de UX |
| **REQ-06** | Datos locales y persistencia de archivo | US-006 | Cubierto | JSON como almacenamiento local |
| **REQ-07** | Ejecución local y entorno de QA | US-007 | Cubierto | Node.js + Express + Playwright |

---

## 4. Notas de auditoría y cobertura QA

- La prueba principal del sistema está centrada en la funcionalidad del catálogo, la búsqueda y la eliminación persistente.
- Los casos negativos y edge cases deben cubrir: campo de búsqueda vacío, confirmación cancelada, pérdida de estado al recargar y comportamiento responsivo.
- El enfoque recomendado para automatización es Playwright con selectores semánticos (`getByRole`, `getByLabel`, `getByText`) y aserciones web-first.
- La trazabilidad se mantiene alineada con la arquitectura MVC del proyecto y el archivo `data/links.json` como almacenamiento local.
