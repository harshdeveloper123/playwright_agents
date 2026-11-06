# Login Feature — SauceDemo

## Objective

Validate the login functionality of https://www.saucedemo.com/ using our existing Playwright framework and Page Object Model.

## Scenarios

1. Log in successfully using valid standard-user credentials.
2. Reject invalid credentials and display an appropriate error.
3. Reject a locked-out user and display the appropriate error.
4. Validate the login form when both fields are empty.
5. Validate the login form when the username is empty.
6. Validate the login form when the password is empty.
7. Verify that the password field masks entered characters.

## Test Configuration and Data

Read configuration from the root .env file:
Out of Scope
- BASE_URL
- STANDARD_USERNAME
- STANDARD_PASSWORD
- LOCKED_USERNAME
- LOCKED_PASSWORD
Shopping cart, checkout, and payment workflows are excluded from this login exercise.
Use a deliberately invalid username or password for the invalid-credentials scenario. Do not hardcode credentials in test specifications.

## Framework Rules

- Follow the root AGENTS.md.
- Reuse existing Page Objects, fixtures, and helper methods.
- Store Page Objects in src/pages/.
- Store test specifications in tests/e2e/ using the .spec.ts extension.
- Prefer accessible semantic locators.
- Do not use MCP or live browser inspection during code generation.
- Do not claim tests pass unless execution results confirm it.

## Out of Scope

- Shopping cart, checkout, and payment workflows are excluded from this login exercise.