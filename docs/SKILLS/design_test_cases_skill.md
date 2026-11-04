---
name: rtm-test-case-generator
description: Generates detailed, step-by-step test cases in Gherkin format (Given-When-Then) derived directly from a Requirements Traceability Matrix (RTM) or functional requirements document. Use when asked to generate Gherkin test cases from an RTM, write step-by-step test scenarios from requirements, or map test cases back to RTM requirement IDs, create a MD file format at same level with the test cases list designed.
---

# RTM Test Case Generator

This skill converts requirements from a Requirements Traceability Matrix (RTM) or user stories into fully structured, step-by-step test cases written in **BDD Gherkin format** (`Given-When-Then`).

## When to Use

Use this skill whenever the user asks to:
- Generate Gherkin test cases from an RTM table or requirement list.
- Create step-by-step test scenarios linked to specific Requirement IDs (`REQ-XXX`).
- Map functional requirements to test suites using BDD syntax.

---

## Test Case Generation Guidelines

### 1. Structure of Each Test Case

Every generated test case must follow this exact structure:

1. **Test Case ID & Metadata**:
   - **Test Case ID**: `TC-[REQ_ID]-[COUNTER]` (e.g., `TC-REQ-001-01`)
   - **Requirement ID**: The RTM requirement ID being validated (e.g., `REQ-001`)
   - **Requirement Title**: Brief summary of the requirement
   - **Test Type**: Positive, Negative, Boundary, or Edge Case
   - **Preconditions**: Initial system state required before running the steps

2. **Gherkin Scenario Block**:
   - `Feature`: High-level functionality matching the requirement scope
   - `Scenario` / `Scenario Outline`: Specific behavior being tested
   - `Given`: Initial context / starting state
   - `When`: Action performed by the user or system
   - `Then`: Expected outcome or state verification
   - `And` / `But`: Additional context, actions, or assertions

---

## Step-by-Step Workflow

### Step 1: Parse the RTM Input
Extract the key fields from the provided RTM:
- Requirement ID (`REQ-XXX`)
- Requirement Description
- Acceptance Criteria / User Story reference
- Priority / Criticality

### Step 2: Determine Coverage Strategy
For each requirement, create scenarios covering:
- **Happy Path (Positive Test)**: Standard execution flow.
- **Negative Path (Error Handling)**: Invalid inputs, unauthorized access, system failure.
- **Boundary/Edge Cases**: Min/max values, empty states, limits.

### Step 3: Format Scenarios in Standard Gherkin Syntax

#### Standard Scenario Example:
```gherkin
Feature: REQ-001 - User Authentication

  @REQ-001 @TC-REQ-001-01 @Positive
  Scenario: Successful login with valid credentials
    Given the user is on the login page "[https://app.example.com/login](https://app.example.com/login)"
    And the user has an active registered account
    When the user enters "user@example.com" into the email field
    And the user enters "ValidPass123!" into the password field
    And clicks the "Log In" button
    Then the system redirects the user to the dashboard page "/dashboard"
    And a welcome notification "Welcome back!" should be displayed

  @REQ-001 @TC-REQ-001-02 @Negative
  Scenario: Login failure with incorrect password
    Given the user is on the login page "[https://app.example.com/login](https://app.example.com/login)"
    When the user enters "user@example.com" into the email field
    And the user enters "WrongPassword!" into the password field
    And clicks the "Log In" button
    Then an error message "Invalid email or password" should be displayed on screen
    And the user remains on the login page "/login"