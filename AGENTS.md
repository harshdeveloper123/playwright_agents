# Playwright Project Rules

These rules apply to the Planner, Generator, and Healer agents.

## Folder Structure

- Store reusable locator definitions in `src/locators/`, organized by page or feature (for example, `LoginLocators.ts`, `CartLocators.ts`, or `FormLocators.ts`).
- Store Page Object classes and reusable page actions in `src/pages/` (for example, `LoginPage.ts`, `CartPage.ts`, or `FormPage.ts`).
- Store Playwright test specifications in `tests/e2e/` using the `.spec.ts` suffix.
- Store Markdown test plans in `specs/`.

## Locator Responsibilities

- Keep selectors in the relevant locator class under `src/locators/`.
- Prefer accessible Playwright locators in this order: `getByRole()`, `getByLabel()`, `getByText()`, then `getByTestId()` when appropriate.
- Avoid brittle CSS selectors and XPath unless necessary; document exceptions in a code comment.
- Inspect and reuse existing locator definitions before adding selectors. Do not duplicate existing selectors.

## Page Object Responsibilities

- Give each page or feature a corresponding Page Object when it has reusable page behavior.
- Page Objects must use their corresponding locator definitions rather than duplicating selectors.
- Put reusable actions such as navigation, form submission, login, and cart operations in Page Object methods.
- Keep test-specific assertions and scenario orchestration in `.spec.ts` files.
- Reuse and extend existing Page Objects where appropriate instead of creating duplicate classes.
- Do not create abstractions for trivial one-off behavior.

## Agent Responsibilities

- **Planner:** Inspect project files and produce a Markdown test plan in `specs/`. Do not write or modify tests.
- **Generator:** Read the relevant plan and existing Page Objects before creating tests in `tests/e2e/`.
- **Healer:** Inspect actual error messages and test output before proposing or making the smallest justified fix.

## Generator Workflow

Before generating or modifying tests:

1. Read this `AGENTS.md` and the relevant test plan.
2. Inspect existing locator classes, Page Objects, fixtures, configuration, and tests.
3. Reuse existing framework patterns and environment variables.
4. Create or update locator definitions under `src/locators/` when needed.
5. Create or update Page Objects under `src/pages/` when reusable page behavior is needed.
6. Create or update tests under `tests/e2e/` using the `.spec.ts` suffix.
7. Check imports and paths, and avoid duplicate implementations.
8. Report missing application information rather than inventing verified behavior.
9. Run relevant Playwright CLI tests when requested or appropriate, and report actual results honestly.

## Healer Workflow

- Use actual failure messages and test output to investigate failures.
- Inspect the affected test, locator class, and Page Object.
- Make the smallest justified correction in the appropriate layer.
- Do not move locators into test files as a workaround.
- Do not claim a fix works without verification.
- If no failure output, report, or reproducible test result is
  available, request the missing evidence instead of guessing.
- Distinguish a suspected root cause from a verified root cause.
- Do not change unrelated tests or framework configuration
  while fixing a localized failure.

## Universal Constraints

- These rules apply to all features, including Login, Forms, Cart, Checkout, and future features.
- Do not use MCP, connect to MCP servers, or perform live browser inspection.
- Use only project files, Copilot's native tools, and the Playwright Test CLI when needed.
- State assumptions honestly. Do not claim tests, browser behavior, or fixes were verified unless the available output confirms it.
