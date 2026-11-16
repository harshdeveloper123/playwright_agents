# Product Details Feature — SauceDemo

## User Story

As an authenticated SauceDemo shopper, I want to open a product's details page so that I can review its information and decide whether to add it to my cart.

## Objective

Document the product-details journey from the inventory, including product-specific information, available cart actions, and returning to the product catalog.

## Scope

- Open a product details page from its inventory product name or image.
- Review the selected product's image, name, description, and price.
- Add or remove the selected product from the cart on the details page.
- Return to the inventory and open another product.

## Preconditions

- The application is accessible through the existing `BASE_URL` configuration.
- The shopper is authenticated as the standard SauceDemo user using the existing Playwright setup and saved browser state.
- The inventory page and its available products are displayed.
- Each scenario prepares its own product and cart state rather than relying on state left by another scenario.

## Functional Requirements

1. Selecting a product name or image from the inventory opens that product's details page.
2. The details page displays the selected product's image, name, description, and price.
3. The details page provides a control to return to the product inventory.
4. The details page provides a product cart action. Adding the product updates the cart indicator and changes the action to `Remove`; removing it restores the `Add to cart` action and clears the indicator when the cart is empty.
5. Returning to the inventory allows the shopper to open a different product and view that product's details.

## Acceptance Criteria

1. Opening a product from the inventory displays its corresponding details page.
2. The product image, name, description, and price on the details page match the product selected from the inventory.
3. The details page displays the `Back to products` control and the appropriate cart action.
4. Adding a product from its details page updates the cart indicator and changes its action to `Remove`.
5. Removing the product restores its `Add to cart` action and, when no other products are in the cart, clears the cart indicator.
6. Selecting `Back to products` returns to the inventory catalog.
7. After returning to the inventory, opening another product displays that second product's details rather than the previously viewed product's details.

## Testing Scenarios

1. **PROD-001 — Open product details by name.** Select a product name in the inventory and verify its details page opens.
2. **PROD-002 — Open product details by image.** Select a product image in the inventory and verify the corresponding details page opens.
3. **PROD-003 — Verify selected product information.** For each product in the inventory, compare its details-page image, name, description, and price with the selected inventory product.
4. **PROD-004 — Verify details-page actions.** Verify that the details page provides `Back to products` and the appropriate add/remove action for the product's cart state.
5. **PROD-005 — Add a product from its details page.** Add a product and verify the cart indicator updates and the action changes to `Remove`.
6. **PROD-006 — Remove a product from its details page.** Remove a previously added product and verify the action returns to `Add to cart` and the cart indicator reflects the remaining cart state.
7. **PROD-007 — Return to the inventory.** Select `Back to products` and verify the inventory catalog is displayed.
8. **PROD-008 — Open a different product after returning.** Open a second product after returning to the inventory and verify that the displayed information corresponds to the second selection.

## Test Configuration and Data

- Reuse the existing authentication configuration and saved state at `playwright/.auth/user.json`; do not log in before every Product Details test.
- Use the products displayed in the inventory as the source for expected product names, descriptions, prices, and images.
- Cover every product available in the catalog for product-information checks.
- Prepare an independent cart state for add/remove scenarios so existing cart contents do not affect expected counts.
- Do not hardcode login credentials in test specifications.

## Framework Rules

- Follow the root `AGENTS.md`.
- Inspect existing locator definitions, Page Objects, fixtures, configuration, and tests before implementation.
- Reuse existing Inventory Page Object and locator definitions where appropriate; add Product Details locators or a Page Object only when needed.
- Store locator definitions in `src/locators/`.
- Store Page Objects in `src/pages/`.
- Store test specifications in `tests/e2e/` using the `.spec.ts` suffix.
- Keep Product Details tests separate from Login, Inventory, Cart, and Checkout test specifications.
- Prefer accessible semantic locators and follow the existing Page Object Model responsibilities.
- Do not claim tests pass unless actual execution results confirm it.

## Out of Scope

- Inventory sorting and general catalog behavior covered by the Inventory feature.
- Cart page contents, product removal from the cart page, and broader cart workflows covered by the Cart feature.
- Checkout and order completion covered by the Checkout feature.
- Product reviews, ratings, variants, stock levels, and product attributes not displayed by the target application.

## Assumptions and Unverified Observations

- The target is the standard SauceDemo application and an authenticated standard user.
- Live exploration confirmed the product-details flow for Sauce Labs Backpack and Sauce Labs Bike Light: each showed the selected product's matching image, name, description, and price.
- Live exploration observed the `Back to products` control and verified that it returns to the inventory catalog.
- Live exploration observed adding the Backpack from its details page, the cart indicator changing to one item, the action changing to `Remove`, and removing it restoring an empty-cart indicator and `Add to cart`.
- The inventory displayed six products. The details pages for the other four products were not individually opened during discovery; matching details for every catalog product remain to be verified by the planned scenarios.
- Behavior for invalid product IDs, unauthenticated direct access, and responsive layouts was not verified and is not specified by this story.

## Browser Evidence

- [Inventory page screenshot](../../.playwright-mcp/product-details-inventory.png)
- [Backpack details screenshot](../../.playwright-mcp/product-details-backpack.png)
- [Bike Light details screenshot](../../.playwright-mcp/product-details-bike-light.png)
