# SportHub News

Directorio web de periódicos deportivos que reúne en una sola página los enlaces de cinco publicaciones: **Marca**, **Diario AS**, **Mundo Deportivo**, **Sport** y **La Gazzetta dello Sport**. La interfaz permite localizar una publicación por nombre, URL o sigla.

La aplicación está construida con una arquitectura MVC sencilla, renderizado del lado del servidor y almacenamiento local en un archivo JSON.

## Funcionalidades

- Listado de periódicos deportivos con nombre, URL y sigla.
- Búsqueda por nombre, dominio o sigla.
- Enlaces a los sitios oficiales, abiertos en una pestaña nueva.
- Eliminación de periódicos de la lista con persistencia en el archivo JSON.
- Interfaz adaptable a pantallas pequeñas y grandes.
- Datos de ejemplo editables localmente.

## Tecnologías

| Tecnología | Uso |
| --- | --- |
| **Node.js** | Entorno de ejecución del servidor. |
| **JavaScript (ES Modules)** | Lenguaje y organización de los módulos del servidor. |
| **Express 5** | Servidor HTTP y ruta principal de la aplicación. |
| **EJS** | Plantillas HTML renderizadas en el servidor. |
| **HTML5 y CSS3** | Estructura, estilos y diseño adaptable de la página. |
| **JSON** | Almacenamiento local de los datos iniciales. |

No se requiere un servicio externo de base de datos para ejecutar esta versión. Los datos se cargan desde `data/links.json`.

## Requisitos

- Node.js **18 o superior** (se recomienda una versión LTS actual).
- npm, incluido con Node.js.

Comprueba las versiones instaladas:

```bash
node --version
npm --version
```

## Instalación y ejecución

Desde la carpeta raíz del proyecto, instala las dependencias:

```bash
npm install
```

Inicia el servidor:

```bash
npm start
```

Abre [http://localhost:3000](http://localhost:3000) en el navegador.

Para desarrollo, también está disponible el modo con reinicio automático al detectar cambios:

```bash
npm run dev
```

### Configurar el puerto

Por defecto, el servidor usa el puerto `3000`. Puedes cambiarlo definiendo la variable de entorno `PORT` antes de iniciar la aplicación.

En PowerShell:

```powershell
$env:PORT = 4000
npm start
```

En macOS o Linux:

```bash
PORT=4000 npm start
```

## Organización del proyecto

```text
.
├── app.js                         # Configura Express, las vistas y la ruta principal
├── data/
│   └── links.json                 # Datos de los periódicos
├── public/
│   └── styles.css                 # Estilos de la interfaz
└── src/
    ├── controllers/
    │   └── HomeController.js      # Prepara los datos que recibe la página
    ├── db/
    │   └── JsonDatabase.js        # Lectura y escritura del archivo JSON
    ├── models/
    │   ├── Link.js                # Modelo de un periódico
    │   └── LinkRepository.js      # Acceso y búsqueda de publicaciones
    └── views/
        └── home.ejs               # Plantilla HTML de la página
```

## Arquitectura

La página aplica una separación MVC ligera:

1. **Modelo y datos:** `Link` representa una publicación; `LinkRepository` consulta y filtra publicaciones; `JsonDatabase` encapsula la lectura y escritura del archivo JSON.
2. **Controlador:** `HomeController` recibe el término de búsqueda, solicita los datos al repositorio y prepara el modelo para la vista.
3. **Vista:** `home.ejs` genera el HTML con los datos recibidos. `public/styles.css` define la presentación visual.
4. **Servidor:** `app.js` configura Express y conecta la ruta `GET /` con el controlador.

La búsqueda se envía como parámetro `q` en la URL. Por ejemplo: `http://localhost:3000/?q=marca`.

## Editar los periódicos

Abre `data/links.json` y modifica los registros. Cada publicación tiene esta estructura:

```json
{
  "id": 1,
  "url": "https://www.marca.com",
  "name": "Marca",
  "period": "MA",
  "logoText": "MA",
  "order": 1
}
```

Mantén el formato JSON válido para que la aplicación pueda leer el archivo. `name` es el nombre mostrado, `url` es el enlace oficial y `period` se utiliza en la búsqueda. `logoText` contiene la sigla que aparece en la columna de portada/logo.

## Scripts disponibles

| Comando | Descripción |
| --- | --- |
| `npm start` | Inicia el servidor. |
| `npm run dev` | Inicia el servidor con reinicio automático al cambiar archivos. |
| `npm test` | No hay pruebas automatizadas configuradas todavía. |

## Alcance actual

Esta versión está enfocada en consultar, buscar y eliminar publicaciones. Los datos se mantienen en el archivo JSON del proyecto. No incluye todavía un panel de administración para añadir o editar periódicos desde la interfaz.
