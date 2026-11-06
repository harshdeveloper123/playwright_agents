# Cart Feature — SauceDemo

## Objective

Validate that an authenticated user can add products to the SauceDemo cart, review selected products, and remove products from the cart or inventory page.

## Preconditions

- The application is accessible through the existing BASE_URL configuration.
- The user can authenticate using the existing standard-user login setup.
- The authenticated browser state has been prepared by the Playwright setup project, and the test can access the inventory page using the saved state.
- Cart functionality requires an authenticated user; Cart tests must load the saved Playwright authentication state from `playwright/.auth/user.json`.
- Cart tests must reuse this saved authentication state instead of logging in before every test.
- Existing Login and Inventory Page Objects, fixtures, and helpers should be reused wherever appropriate.

## Scenarios

1. Verify that a newly authenticated user with no selected products sees an empty cart and no cart item count.
2. Verify that adding one product from the inventory changes its action from "Add to cart" to "Remove" and displays a cart count of one.
3. Verify that opening the cart after adding one product displays that product's name, description, price, and quantity of one.
4. Verify that adding two distinct products displays exactly those two products in the cart and a cart count of two; products not selected are absent.
5. Verify that removing the only product from the cart removes it from the list and clears the cart item count.
6. Verify that removing one of two products from the cart removes only that product, preserves the other product, and updates the cart count to one.
7. Verify that removing a product from the inventory page removes it from the cart and updates the cart count accordingly.
8. Verify that removing the final product leaves the cart with no product entries and no cart item count.

## Test Configuration and Data

- Reuse the existing authentication configuration and fixtures to load `playwright/.auth/user.json`; do not log in before every Cart test.
- Reuse existing authentication helpers only when they load the saved state rather than repeat the login flow.
- Use existing application configuration and test data wherever available.
- Do not hardcode credentials in test specifications.
- Scenario details that depend on the application's rendered cart controls or product fields should be confirmed before implementation.

## Framework Rules

- Follow the root `AGENTS.md`.
- Inspect existing locator definitions, Page Objects, fixtures, configuration, and tests before generating files.
- Reuse existing Login and Inventory Page Objects instead of duplicating their functionality.
- Create or extend a Cart Page Object and corresponding locator definitions only when needed.
- Store locator definitions in `src/locators/`.
- Store Page Objects in `src/pages/`.
- Store test specifications in `tests/e2e/` using the `.spec.ts` suffix.
- Store the test plan in `specs/`.
- Keep cart-specific tests separate from existing Login and Inventory test specifications.
- Prefer accessible semantic locators.
- Do not use MCP or live browser inspection during planning or code generation.
- Do not claim tests pass unless actual execution results confirm it.

## Out of Scope

- Checkout and payment workflows.
- Login validation scenarios already covered by the Login feature.
- Inventory sorting and product catalog validation covered by the Inventory feature.

## Assumptions and Open Questions

- These scenarios assume the standard, uncustomized public SauceDemo experience: inventory product actions toggle between "Add to cart" and "Remove"; the cart icon shows the number of selected products; cart entries show product name, description, price, and a fixed quantity of one; and products can be removed from both the cart and inventory page.
- The empty-cart checks assert that no product entries or cart item count remain; they do not depend on a particular empty-state message.
- Confirm whether the target test environment uses the standard SauceDemo behavior described above. Cart persistence after reload or across browser sessions is unspecified and is not covered by this story.
