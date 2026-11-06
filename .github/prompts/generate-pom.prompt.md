---
description: Generate Playwright tests from a supplied plan using existing project patterns
argument-hint: Provide the Markdown plan path under specs/
agent: "playwright-test-generator"
---


Read the specific Markdown test plan supplied under `specs/`. If its path is missing or ambiguous, ask for clarification before creating code. Do not treat `README.md` as a test plan. Follow the root `AGENTS.md`.

Inspect the relevant existing project structure, locator definitions in `src/locators/`, Page Objects in `src/pages/`, tests, fixtures, and Playwright configuration before writing. Also review relevant package scripts and existing implementation patterns.

Reuse existing Page Objects, locators, fixtures, environment variables, and action methods wherever possible. Do not create duplicate files, classes, methods, or selectors.

When required by the plan, create or update the following files using the existing project conventions:

- Locator definitions: `src/locators/<Feature>Locators.ts`
- Page Objects: `src/pages/<Feature>Page.ts`
- Test specifications: `tests/e2e/<feature>.spec.ts`

Create `src/locators/` and `src/pages/` directories if they do not already exist. Do not create empty placeholder files.

Follow the locator and Page Object responsibilities defined in `AGENTS.md`. Prefer `getByRole()`, `getByLabel()`, `getByText()`, then `getByTestId()` where appropriate. Avoid brittle CSS selectors and XPath; if either is necessary, add a code comment explaining why.

Create TypeScript Playwright test specifications under `tests/e2e/` using the `.spec.ts` suffix. Map the tests to the supplied plan scenarios and preserve their unique test IDs in test titles or nearby comments for traceability. Keep scenario orchestration and assertions in spec files, reusable actions in Page Objects, and selectors in locator classes.

Reuse existing authentication helpers, fixtures, and environment variables when applicable. Do not duplicate credentials or hardcode sensitive test data. Only add feature-specific setup or test data when required by the supplied plan and supported by project evidence.

Do not modify the supplied test plan, application code, or configuration. Do not modify fixtures unless the user explicitly authorizes it. Create or update only the locator definitions, Page Objects, and test specifications required by the plan and permitted by `AGENTS.md`.

Use only native Copilot tools and project files. Use direct Playwright Test CLI execution only when needed or requested. Do not use MCP, connect to MCP servers, run browser automation for inspection, or perform live browser inspection.

Do not invent application behavior, expected results, selectors, or test data when the available requirements and project evidence do not support them. Report missing information and assumptions clearly.

## Before finishing:

1. Map every planned scenario and test ID to its corresponding generated test.
2. Report any scenario that could not be implemented and explain why.
3. Summarize all files created or modified, including locator classes, Page Objects, and test specifications.
4. Report any assumptions or missing application information.
5. Report validation performed and actual Playwright CLI results, if execution was performed. Never claim tests pass unless actual execution output confirms it.