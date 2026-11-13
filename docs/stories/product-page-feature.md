# Product Details Page Feature — SauceDemo

## User Story

As an authenticated SauceDemo shopper, I want to open a product's details page so that I can review the product information before deciding whether to add it to my cart.

## Objective

Validate that selecting each product from the inventory opens the correct product details page, displays the product's information and available actions, and allows the shopper to return to the inventory.

## Preconditions

- The application is accessible through the existing `BASE_URL` configuration.
- The shopper is authenticated as the standard SauceDemo user.
- Tests use the authenticated browser state stored in `playwright/.auth/user.json`; they must not log in before every test.
- The inventory page and its available products are displayed.
- Each scenario should select a product from the current inventory rather than depend on state left by another scenario.

## Acceptance Criteria

1. Selecting a product from the inventory opens that product's details page.
2. The details page shows the selected product's matching name, description, price, and image.
3. The details page provides the available product action and a way to return to the inventory.
4. Returning to the inventory displays the product catalog.
5. If a product is added to the cart from its details page, the cart indicator reflects the selected product and the product action reflects its updated state.

## Scenarios

1. **PROD-001 — Open each product's details.** For every product shown in the inventory, select its name or image. Verify that a details page opens for the selected product.
2. **PROD-002 — Verify product details.** On each product's details page, verify that the displayed name, description, price, and image match the product selected from the inventory.
3. **PROD-003 — Verify product actions.** Verify that the details page displays the available add-to-cart action and a control to return to the inventory.
4. **PROD-004 — Add a product from its details page.** Add a product to the cart from its details page. Verify that the cart indicator updates and that the product action reflects that the product has been added.
5. **PROD-005 — Return to the inventory.** Use the details page's return control. Verify that the inventory page and product catalog are displayed again.
6. **PROD-006 — Open another product after returning.** Return to the inventory, select a different product, and verify that the details page shows the second product's information rather than details from the previously viewed product.

## Test Configuration and Data

- Reuse the existing authentication configuration and fixtures to load `playwright/.auth/user.json`; do not log in before every Product Details test.
- Use the products displayed in the inventory as the source of expected names, descriptions, prices, and images.
- Cover every product available in the catalog for product-detail checks.
- Prepare an independent browser state for the add-to-cart scenario so existing cart contents do not affect its expected count.
- Do not hardcode login credentials in test specifications.

## Framework Rules

- Follow the root `AGENTS.md`.
- Inspect existing locator definitions, Page Objects, fixtures, configuration, and tests before generating files.
- Reuse the existing Inventory Page Object and locator definitions where appropriate; add Product Details locators or a Page Object only when needed.
- Store locator definitions in `src/locators/`.
- Store Page Objects in `src/pages/`.
- Store test specifications in `tests/e2e/` using the `.spec.ts` suffix.
- Keep Product Details tests separate from Login, Inventory, Cart, and Checkout test specifications.
- Prefer accessible semantic locators.
- Do not use MCP or live browser inspection during planning or code generation.
- Do not claim tests pass unless actual execution results confirm it.

## Out of Scope

- Inventory sorting and general catalog behavior covered by the Inventory feature.
- Cart page contents, product removal, and broader cart workflows covered by the Cart feature.
- Checkout and order completion covered by the Checkout feature.
- Product reviews, ratings, variants, stock levels, or other information not shown by the target application.

## Assumptions and Open Questions

- The feature is intended for the standard SauceDemo experience and authenticated standard user.
- The product image, name, description, and price shown on the details page are expected to match the corresponding inventory item.
- The details page exposes a return-to-inventory control and an add-to-cart action. Confirm the exact visible labels and behavior in the target environment before test implementation.
- No additional product attributes beyond those listed above are assumed.
