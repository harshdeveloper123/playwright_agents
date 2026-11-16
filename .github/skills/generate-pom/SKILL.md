---
name: generate-pom
description: Generate TypeScript Playwright tests from a supplied Markdown test plan using the existing project's Page Object Model, locators, fixtures, authentication setup, and coding conventions.
argument-hint: Provide the Markdown test plan path under specs/
disable-model-invocation: true
---

# Generate Playwright Tests Using Page Object Model

Generate Playwright test specifications from the specific Markdown test plan supplied in the user's request.

Follow the existing project architecture, root `AGENTS.md`, and established implementation conventions. Do not introduce a new framework structure or duplicate existing functionality.

## 1. Read and Understand the Test Plan

- Read the specific Markdown test plan supplied under `specs/`.
- If the plan path is missing or ambiguous, ask the user for clarification before creating code.
- Do not treat `README.md` as a test plan.
- Read and understand all scenarios, unique test IDs, priorities, preconditions, test data, expected results, assumptions, and missing information.
- Use the supplied plan as the implementation reference.
- Do not silently skip scenarios or change their intended coverage.

## 2. Inspect the Existing Framework

Before writing code, inspect:

- Root `AGENTS.md`.
- Relevant project folder structure.
- Existing locator classes under `src/locators/`.
- Existing Page Objects under `src/pages/`.
- Existing test specifications under `tests/e2e/`.
- Fixtures and authentication setup.
- `playwright.config.ts` and related configuration.
- `package.json` scripts and relevant dependencies.
- Existing environment-variable usage and implementation patterns.

Understand how the existing framework handles browser contexts, authentication, navigation, test data, and reusable actions.

Use the supplied test plan as the primary implementation reference. When repository evidence is insufficient to clarify application behavior or UI implementation details, use the configured Playwright MCP server to navigate to relevant application pages, explore workflows, interact with UI elements, inspect DOM structure, accessibility information, attributes, labels, and visible content, and capture screenshots when useful. Other available MCP tools may be used when necessary. Browser exploration clarifies implementation details; it does not independently redefine test requirements. If observed application behavior contradicts the supplied plan, report the discrepancy rather than silently changing the requirements. Do not invent functionality or expected behavior.

## 3. Reuse Existing Framework Components

- Reuse existing Page Objects, locator classes, fixtures, helpers, environment variables, and action methods wherever possible.
- Do not create duplicate classes, methods, selectors, or files.
- Extend existing abstractions when appropriate instead of creating unnecessary new ones.
- Follow the responsibilities defined in `AGENTS.md`.

Create or update files only when required by the supplied plan:

- Locator definitions: `src/locators/<Feature>Locators.ts`
- Page Objects: `src/pages/<Feature>Page.ts`
- Test specifications: `tests/e2e/<feature>.spec.ts`

Create the `src/locators/` and `src/pages/` directories if they do not exist. Do not create empty placeholder files.

## 4. Locator and Page Object Implementation

### Locator classes

- Keep reusable selectors in the appropriate locator classes.
- Use MCP browser inspection when existing repository evidence is insufficient to identify reliable locators or verify relevant element properties and interaction behavior. Do not invent selectors or rely on unsupported assumptions.
- Prefer locators in this order where appropriate:
  1. `getByRole()`
  2. `getByLabel()`
  3. `getByText()`
  4. `getByTestId()`
- Avoid brittle CSS selectors and XPath.
- If CSS or XPath is necessary, add a code comment explaining why.
- Reuse existing selectors before introducing new ones.

### Page Objects

- Keep reusable page actions and interactions in Page Objects.
- Follow the existing project's naming, constructor, locator initialization, and method conventions.
- Avoid placing scenario-specific orchestration or test assertions in Page Objects.
- Do not create unnecessary abstractions for one-time operations.

### Test specifications

- Create TypeScript Playwright test files using the `.spec.ts` suffix.
- Place feature tests under `tests/e2e/`.
- Keep scenario orchestration and assertions in the specification files.
- Map each test to its corresponding scenario in the supplied plan.
- Preserve unique test IDs in test titles or nearby comments for requirement-to-test traceability.
- Keep scenarios independent and follow their specified preconditions.

## 5. Authentication and Browser State

Authentication must follow the existing Playwright framework configuration.

Before implementing authenticated tests:

- Inspect `playwright.config.ts` and the existing setup project.
- Identify how authentication is performed and how the storage state is saved.
- Reuse the configured authenticated browser state when the project already provides it.
- Follow the existing browser context and project dependency configuration.

Important rules:

- Do not implement a login flow in `beforeEach` or individual feature tests when authenticated storage state is already configured.
- Do not duplicate authentication setup in feature-specific Page Objects or test specifications.
- Do not hardcode usernames, passwords, or sensitive test data.
- Do not create a separate authentication mechanism when an existing one is available.
- Start each scenario from the page and authentication state specified by its test plan.
- Respect the existing setup project's responsibility for creating or refreshing the saved authentication state.
- Do not modify fixtures or authentication configuration unless the user explicitly authorizes it.
- MCP browser exploration does not authorize changes to the established authentication architecture; continue to reuse existing authentication and storage state without duplicating login flows.

For example, if the setup project authenticates the standard user and saves `playwright/.auth/user.json`, and the feature projects reuse that state, the generated feature tests must use that configured state without logging in again before each test.

Do not assume that every feature requires authentication. Follow the supplied plan and existing project configuration.

## 6. Test Data and Expected Results

- Use test data specified in the plan and existing project evidence.
- Reuse existing environment variables and test-data utilities.
- Do not duplicate credentials or hardcode sensitive values.
- Do not invent product information, application behaviour, expected results, or selectors.
- Do not assume a URL, accessible name, control label, or UI state without supporting evidence.
- Where the plan identifies missing application information, inspect available project evidence first.
- If the information cannot be established, report the limitation instead of inventing an implementation.
- Clearly communicate any assumptions that affect test reliability.

## 7. File Modification Boundaries

Only create or update the files required for the feature:

- Relevant locator definitions.
- Relevant Page Objects.
- Relevant test specifications.

Do not:

- Modify the supplied Markdown test plan.
- Modify application code.
- Modify Playwright configuration.
- Modify existing fixtures unless explicitly authorized.
- Modify unrelated tests or framework files.
- Create duplicate files or unnecessary helper classes.

Follow root `AGENTS.md` and the existing framework conventions.

## 8. Tool and Execution Restrictions

- Use project files and existing framework components as the primary source for implementation conventions.
- Use available MCP tools for browser navigation, UI inspection, interaction, screenshots, and investigation when needed; avoid unnecessary browser interactions.
- Use Playwright Test CLI or appropriate execution tools to execute and validate generated automated tests when needed or explicitly requested. MCP browser exploration does not count as successful automated test execution.
- Do not claim that tests pass without actual Playwright execution output.

Report static code inspection, MCP browser exploration (if performed), and actual test execution separately. Do not claim tests pass based only on successful MCP browser interactions; use actual execution output when reporting test results.

## 9. Completion and Traceability Report

Before finishing, provide a structured report containing:

### A. Scenario-to-Test Mapping

Map every planned scenario and its unique test ID to the corresponding generated test.

Identify any scenario that could not be implemented and explain why.

### B. Files Created or Modified

List all created and modified files, including:

- Locator classes.
- Page Objects.
- Test specifications.

### C. Implementation Summary

Briefly explain:

- Existing components reused.
- New methods or locators introduced.
- Authentication and browser-state handling.
- How test independence and preconditions were maintained.

### D. Assumptions and Missing Information

Report any assumptions, unsupported requirements, unresolved selectors, or missing application information.

### E. Validation Results

Report:

- Static inspection performed.
- MCP browser exploration, if performed.
- TypeScript validation, if performed.
- Playwright CLI execution, if performed.
- Actual test results, including failures or skipped scenarios.

Never claim successful execution without supporting command output.

The generated implementation must maintain consistency with the existing Playwright framework and provide traceability from every implemented test back to its corresponding planned scenario.