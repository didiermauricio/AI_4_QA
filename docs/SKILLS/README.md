# Skills directory

This folder contains the QA automation and requirements-analysis skills used in this project.

The goal is to turn business requirements into a traceable, testable, and automatable workflow with Playwright and BDD-style test design.

## Available skills

### 1. `design_test_cases_skill.md`
Purpose:
- Convert requirements or user stories into structured test cases.
- Focus on positive, negative, boundary, and edge-case coverage.

Typical use:
- Drafting QA test definitions from requirements.
- Designing scenarios before automation.

### 2. `llm_as_a_judge.md`
Purpose:
- Audit Playwright tests using quality rules similar to an LLM-as-a-Judge rubric.
- Evaluate selector quality, determinism, architecture, and Gherkin naming.

Typical use:
- Reviewing generated tests.
- Checking whether automation meets quality gates.

### 3. `new_autom_tests_skill.md`
Purpose:
- Generate Playwright automation from RTM/test case documentation.
- Produce Page Object Model (POM) patterns and reusable test structure.

Typical use:
- Automating requirement-driven scenarios.
- Creating robust end-to-end tests from test case definitions.

### 4. `new_tests_skill.md`
Purpose:
- Generate code for new Playwright tests based on requirements or app behavior.
- Emphasize clean naming conventions, semantic selectors, and maintainability.

Typical use:
- Producing new Playwright specs from user stories or RTM entries.

### 5. `rtm_skill.md`
Purpose:
- Generate a Requirements Traceability Matrix (RTM) from requirements documents.
- Map business requirements to user stories, functional requirements, test IDs, and verification state.

Typical use:
- Building a traceability matrix for project QA.
- Connecting requirements to test coverage.

### 6. `testing_skill.md`
Purpose:
- Provide Playwright testing guidance and best practices.
- Cover browser automation, locators, assertions, and reliable test design.

Typical use:
- Writing stable browser tests.
- Learning recommended testing patterns.

## Workflow in this project

A typical flow is:

1. Define or review requirements.
2. Build the RTM using `rtm_skill.md`.
3. Design test cases using `design_test_cases_skill.md`.
4. Generate automation using `new_autom_tests_skill.md` or `new_tests_skill.md`.
5. Validate the suite using `llm_as_a_judge.md`.
6. Keep the Playwright tests aligned with the current app behavior and requirement coverage.

## Recommended order

For new work, the usual sequence is:

- `rtm_skill.md`
- `design_test_cases_skill.md`
- `new_autom_tests_skill.md`
- `llm_as_a_judge.md`

This ensures requirements, test design, implementation, and review stay connected and traceable.
