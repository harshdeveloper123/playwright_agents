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
- Agents may use the configured Playwright MCP server when browser exploration or inspection adds value to the task.

## Generator Workflow

Before generating or modifying tests:

1. Read this `AGENTS.md` and the relevant test plan.
2. Inspect existing locator classes, Page Objects, fixtures, configuration, and tests.
3. Reuse existing framework patterns and environment variables.
4. Create or update locator definitions under `src/locators/` when needed.
5. Create or update Page Objects under `src/pages/` when reusable page behavior is needed.
6. Create or update tests under `tests/e2e/` using the `.spec.ts` suffix.
7. Check imports and paths, and avoid duplicate implementations.
8. Explore the actual application with Playwright MCP when useful to understand workflows, validate expected behavior, and identify reliable locators. Report behavior that cannot be confirmed rather than inventing it.
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
- Agents may use available Playwright MCP tools to navigate to application URLs, follow workflows, interact with UI elements, and inspect page content, DOM structure, accessibility information, and element attributes.
- Capture screenshots when useful for understanding, analyzing, or documenting application behavior. Do not expose credentials or other sensitive information in screenshots, logs, or generated files.
- Use live browser observations to understand application behavior and identify reliable locators when needed. If behavior cannot be confirmed, state the limitation rather than assuming functionality.
- Continue to prefer accessible locators in this order: `getByRole()`, `getByLabel()`, `getByText()`, then `getByTestId()` when appropriate. Reuse existing locator definitions and Page Objects wherever possible; avoid brittle CSS selectors and XPath unless necessary and documented.
- Use MCP browser interaction for exploration and inspection; use Playwright Test execution tools or terminal commands to run and validate automated tests. Choose tools appropriate to the task.
- Use MCP when it adds value and avoid unnecessary browser interactions. Do not modify application data, perform destructive actions, or submit irreversible operations unless explicitly required by the testing task.
- State assumptions honestly. Do not claim tests, browser behavior, or fixes were verified unless the available output confirms it.
