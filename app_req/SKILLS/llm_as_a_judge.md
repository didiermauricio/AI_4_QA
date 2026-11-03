---
description: Audits the open Playwright test using LLM as a Judge standards.
---

Act as a Principal QA Automation Architect and audit the active Playwright test file against strict industry quality standards.

## Quality Standards & Rules:
1. **Locators (30%)**:
   - MUST use semantic user-facing locators: `getByRole()`, `getByLabel()`, `getByPlaceholder()`, `getByTestId()`.
   - NEVER use absolute/relative XPaths (`//div[2]/button`) or dynamic CSS classes.
2. **Determinism (30%)**:
   - NEVER use `page.waitForTimeout()` or static sleeps.
   - MUST use web-first auto-retrying assertions (`await expect(locator).toBeVisible()`).
3. **Architecture & Maintainability (20%)**:
   - Enforce Page Object Model (POM) or clean separation of actions vs assertions.
   - Extract cross-cutting logic into reusable helpers.
4. **Naming & BDD (20%)**:
   - Test titles MUST follow Gherkin format (`Given [context], when [action], then [outcome]`) and reference RTM/Requirement IDs.

## Output Structure:
1. **Quality Score**: Score from 1 to 10.
2. **Quality Gate Verdict**: `PASSED` (Score >= 8 and ZERO Critical issues) or `FAILED`.
3. **Findings Table**: List issues with Severity (`CRITICAL`, `WARNING`, `INFO`), Category, and Description.
4. **Refactored Code Block**: Provide the fully corrected TypeScript implementation.
5. **final report**: consolidate all the results in a markdown file and put it on "tests\report_llm_as_a_judge"