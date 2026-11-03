# SportHub News

Web directory of sports newspapers that gathers on a single page the links of five publications: **Marca**, **Diario AS**, **Mundo Deportivo**, **Sport**, and **La Gazzetta dello Sport**. The interface allows locating a publication by name, URL, or acronym.

The application is built with a simple MVC architecture, server-side rendering, and local storage in a JSON file.

## Features

- Directory of sports newspapers with name, URL, and acronym.
- Search by name, domain, or acronym.
- Links to official sites open in a new tab.
- Deletion of newspapers from the list with persistence in the JSON file.
- Interface adaptable to small and large screens.
- Editable sample data stored locally.

## Technology stack

| Technology | Usage |
| --- | --- |
| **Node.js** | Application runtime |
| **JavaScript (ES Modules)** | Server-side logic |
| **Express 5** | HTTP server and MVC application |
| **EJS** | Server-rendered templates |
| **HTML5 / CSS3** | UI structure and styling |
| **JSON** | Local data storage |
| **Playwright** | End-to-end test execution |
| **TypeScript** | Playwright test implementation |

No external database service is required to run this version. Data is loaded from `data/links.json`.

## Requirements

- Node.js **18 or newer** (current LTS version recommended).
- npm, included with Node.js.

Verify the installed versions:

```bash
node --version
npm --version
```

## Installation and execution

From the project root, install dependencies:

```bash
npm install
```

Start the web app:

```bash
npm start
```

Open the app in a browser:

```text
http://localhost:3000
```

Development mode with automatic restart:

```bash
npm run dev
```

### Configure the port

By default, the server uses port `3000`. You can change it by defining the `PORT` environment variable before starting the application.

In PowerShell:

```powershell
$env:PORT = 4000
npm start
```

On macOS or Linux:

```bash
PORT=4000 npm start
```

## Project structure

```text
.
├── app.js                         # Express server configuration
├── app_req/
│   └── SKILLS/
│       ├── llm_as_a_judge.md     # QA audit rubric for automated tests
│       ├── new_tests_skill.md    # Test generation guidance
│       └── testing_skill.md      # QA automation conventions
├── data/
│   └── links.json                 # Sport publication data
├── public/
│   └── styles.css                 # Application styling
├── src/
│   ├── controllers/
│   │   └── HomeController.js      # Handles page data and requests
│   ├── db/
│   │   └── JsonDatabase.js        # JSON read/write logic
│   ├── models/
│   │   ├── Link.js                # Publication model
│   │   └── LinkRepository.js      # Data access and filtering
│   └── views/
│       └── home.ejs               # Main page template
├── tests/
│   ├── example.spec.ts            # Playwright test example
│   └── report_llm_as_a_judge/
│       └── llm_as_a_judge_report.md
├── package.json
├── playwright.config.ts
├── README.md
├── test-results/
└── playwright-report/
```

## Application behavior

The app presents a list of sports media outlets and lets users:

- browse the current catalog
- search by publication name, URL, or short code
- open each source in a new tab
- remove entries from the list

The data is loaded from `data/links.json`, and deletions are persisted back to the file.

## Installing Playwright

If Playwright is not already installed in the project, install it as a development dependency:

```bash
npm install -D @playwright/test
```

Then install the browser binaries used by Playwright:

```bash
npx playwright install
```

If the dependencies were already installed with this repo, the command above is usually not necessary because the package is already included in `package.json`.

## Running the tests

From the project root, run the full test suite:

```bash
npx playwright test
```

Run a single spec file:

```bash
npx playwright test tests/example.spec.ts
```

Run only a matching test name:

```bash
npx playwright test -g "has title"
```

Open the generated HTML report:

```bash
npx playwright show-report
```

This project uses Playwright for browser-based validation of the app and follows QA standards such as semantic locators, web-first assertions, and requirement-driven naming conventions.

## Requirements-to-automation workflow

This project is set up to support a requirements-driven QA flow:

1. Review or define a requirement list or RTM entries.
2. Generate or refine Playwright tests using Gherkin naming.
3. Prefer semantic locators such as `getByRole()`, `getByLabel()`, and `getByTestId()`.
4. Use web-first assertions instead of fixed waits.
5. Apply the quality rules in `app_req/SKILLS/llm_as_a_judge.md`.
6. Save the resulting audit in `tests/report_llm_as_a_judge/`.

This keeps the automation aligned with modern browser testing quality standards.

## Quality gate standards included

The repository now includes a review rubric that checks:

- semantic and resilient selectors
- deterministic waits and auto-retrying assertions
- separation of actions and assertions
- maintainable test structure with Page Object Model practices
- Gherkin-style test titles with requirement references

## Current scope

This project is still a lightweight sample app focused on managing sports links, while the automation side demonstrates a practical way to turn requirements into reliable Playwright tests and QA artifacts.
