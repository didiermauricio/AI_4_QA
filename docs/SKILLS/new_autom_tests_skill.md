---
name: playwright-pom-generator
description: Generates end-to-end test automation scripts using Playwright by analyzing a Requirements Traceability Matrix (RTM). Generates modular Page Object Model (POM) classes, test cases with Gherkin naming conventions, corner and success cases, optimal selector strategies, and reusable helper functions following industry best practices. Highly configurable by framework architecture pattern, programming language (TypeScript, Python, JavaScript), and test naming style. Use when provided with an RTM, user stories mapping, or test case requirements.
---

# Playwright POM & Test Automation Generator (test cases design)

Generate clean, robust, and scalable Playwright automated test suites starting directly from a test cases design document.

## Parameters & Defaults

Unless explicitly overridden by the user request, use these configurable defaults:
- **Primary Input**: Requirements Traceability Matrix (RTM) in Markdown, CSV, or JSON table format.
- **Design Pattern**: Page Object Model (POM) with modular helpers/utilities.
- **Programming Language**: TypeScript (`.ts`)
- **Test Naming Convention**: Gherkin format (`Given [context], when [action], then [outcome]`)
- **Test Runner**: `@playwright/test`

If the user specifies alternate parameters (e.g., Python, JavaScript, App Actions, or standard camelCase titles), adapt the generated code accordingly.

---

## Strategy & Core Architecture Rules

### 1. Optimal Selector Hierarchy (Locators Strategy)
Always prioritize user-facing, resilient locators over implementation details. Follow this strict order of preference:

1. **Accessibility / User-Visible Role**: `page.getByRole('button', { name: 'Submit' })`, `page.getByRole('heading', { level: 1 })`.
2. **Form Control Labels**: `page.getByLabel('Email Address')`.
3. **Placeholder & Text Content**: `page.getByPlaceholder('Search... ')`, `page.getByText('Welcome back')`.
4. **Explicit Test IDs (Fallback for non-semantic elements)**: `page.getByTestId('custom-dropdown-item')`.
5. **CRITICAL BANS**: 
   - Never use brittle CSS selectors (`div > button.btn-primary.active`).
   - Never use absolute/relative XPath (`//div[2]/form/input[1]`).
   - Never use auto-generated dynamic attributes (`#button-10492-input`).

### 2. Test Case Selection: Success & Corner Cases
For every requirement in the RTM, generate a balanced test suite that covers both standard and edge scenarios:

- **Success Cases (Happy Path)**:
  - Standard user flow with valid inputs and expected full completion.
  - Verification of state changes, URL transitions, and success UI feedback.
- **Corner Cases (Edge & Failure Paths)**:
  - **Boundary Value Analysis**: Minimum/maximum input lengths, zero-amounts, boundary dates.
  - **Negative Inputs**: Invalid formats (SQLi strings, script tags, invalid email patterns, special characters).
  - **State Anomalies**: Empty form submission, network latency/timeouts, session expiry, disabled button interactions.
  - **UI/Layout Resilience**: Text overflow, hidden/overlapped element interactions, double-click/rapid submission prevention.

### 3. Modular Reusability & Helper Creation Strategy
To eliminate redundant code across Page Objects and Spec files:

- **Page Object Actions vs. Generic Helpers**:
  - Encapsulate page-specific user interactions inside the Page Object class.
  - Extract cross-cutting capabilities into static/instantiable Utility Helpers (e.g., `ApiHelper`, `AuthHelper`, `DataGeneratorHelper`, `WaitHelper`).
- **Reuse Existing Functions**:
  - Before writing inline page logic (e.g., handling authentication or seeding data), invoke existing fixtures or helper methods.
- **Custom Playwright Fixtures**:
  - Extend `@playwright/test` `test` object to automatically inject Page Objects and Shared Helpers into test contexts, avoiding manual instantiation in every `beforeEach`.

---

## Workflow & Execution Steps

1. **Parse Requirements Traceability Matrix (RTM)**:
   - Extract Business Requirements, User Stories, Functional/Technical Requirements, Test Case IDs, and Scenarios.
   - Group scenarios logically into Page Objects and Helper utilities.

2. **Generate Helper Utilities (if applicable)**:
   - Create reusable helper functions for common tasks (authentication, API setup, mock data generation, complex table parsing).

3. **Generate Page Object Classes**:
   - Apply the **Selector Hierarchy** to initialize page locators.
   - Implement reusable, async action methods with proper return types (`Promise<void>`).

4. **Generate Comprehensive Test Suites**:
   - Implement both **Success Cases** and **Corner/Edge Cases** mapped to RTM Test Case IDs.
   - Format titles using Gherkin (`Given [context], when [action], then [outcome]`).
   - Apply web-first auto-retrying assertions (`await expect(locator).toBeVisible()`).

---

## Standard Output Template (TypeScript Example)

### Helper Utility: `utils/AuthHelper.ts`
```typescript
import { Page, request } from '@playwright/test';

export class AuthHelper {
  /**
   * Reusable helper to bypass UI login via direct API session injection
   */
  static async loginViaApi(page: Page, userCredentials: { email: string; token: string }): Promise<void> {
    await page.context().addCookies([
      {
        name: 'session_token',
        value: userCredentials.token,
        domain: 'example.com',
        path: '/',
      },
    ]);
  }
}
```
### Golden Rules
   - if pattern is not already applied first apply it
   - if class name are not indicated ask for them, if not is provided propose an adecuated names based on funtionality

