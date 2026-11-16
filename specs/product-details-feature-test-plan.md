# Product Details Feature Test Plan

**Source:** `docs/stories/product-details-feature.md`  
**Configuration:** The Playwright setup project reads `BASE_URL`, `STANDARD_USERNAME`, and `STANDARD_PASSWORD` from the root `.env`, authenticates, and saves `playwright/.auth/user.json`. Product Details tests must reuse that state; do not include credentials in feature tests.  
**Existing POMs:** Reuse `src/pages/InventoryPage.ts` and `src/locators/InventoryLocators.ts` to enter details from the inventory where appropriate. Add Product Details abstractions only if needed by implementation.  
**Test location:** Keep these scenarios separate in `tests/e2e/product-details.spec.ts`.  
**Status:** Based on the user story, repository files, and Playwright MCP browser exploration of the Backpack and Bike Light details pages, including add/remove and return-to-inventory behavior. No automated test execution was performed.

## Scope and Common Preconditions

Cover opening product details from the inventory by product name or image, matching product-specific information, available details-page actions, adding/removing a product, returning to the inventory, and opening another product. Inventory sorting, cart-page workflows, and checkout are out of scope.

- Use a fresh browser context initialized with the saved standard-user state for each scenario.
- The root Playwright configuration loads `.env`, uses `BASE_URL` as `baseURL`, and configures Chromium, Firefox, and WebKit projects to reuse `playwright/.auth/user.json`. The `setup` project creates that state through `tests/seed.spec.ts`.
- Do not repeat login in Product Details tests or hardcode credentials.
- Begin each scenario with an empty cart unless its steps explicitly add a product. Prepare the required cart state within that scenario.
- Use the product's inventory entry as the expected source for its displayed name, description, price, and image.
- Browser exploration confirmed product-name and image entry points, matching details for Sauce Labs Backpack and Sauce Labs Bike Light, the `Back to products` control, and the Backpack add/remove state transition. The other four products' details were not individually inspected; verify the complete catalog as specified below.
- Follow root `AGENTS.md` locator, POM, file-location, and test execution/reporting rules. Browser exploration is not automated test execution.

## Scenarios

### PROD-001: Open Product Details by Name

**Priority:** High  
**Preconditions:** Fresh browser context initialized with `playwright/.auth/user.json`; inventory is displayed and the cart is empty.  
**Test data:** One product currently displayed in inventory; record its name.

**Test steps:**
1. Select the product's name in the inventory.
2. Observe the page that opens.

**Expected result:** The selected product's details page opens and displays that product's details.

### PROD-002: Open Product Details by Image

**Priority:** Medium  
**Preconditions:** Fresh browser context initialized with `playwright/.auth/user.json`; inventory is displayed and the cart is empty.  
**Test data:** One product currently displayed in inventory; record its name and image.

**Test steps:**
1. Select the product's image in the inventory.
2. Observe the page that opens.

**Expected result:** The selected product's details page opens and displays information for the product whose image was selected.

### PROD-003: Verify Details Match Each Inventory Product

**Priority:** High  
**Preconditions:** Fresh browser context initialized with `playwright/.auth/user.json`; inventory displays its product catalog.  
**Test data:** For every product currently displayed, record its name, description, price, and image.

**Test steps:**
1. For each product in the inventory, record the displayed name, description, price, and image.
2. Open that product's details page using its name or image.
3. Compare the details-page name, description, price, and image with the recorded inventory product.
4. Return to the inventory before selecting the next product.

**Expected result:** Each details page displays the name, description, price, and image corresponding to the product selected from inventory; no details from another product are shown.

### PROD-004: Verify Initial Details-Page Actions

**Priority:** High  
**Preconditions:** Fresh browser context initialized with `playwright/.auth/user.json`; a product not in the cart has been opened from inventory.  
**Test data:** One displayed inventory product, not added to the cart.

**Test steps:**
1. Inspect the product details page.
2. Verify the return-to-inventory control is available.
3. Verify the product's available cart action.

**Expected result:** The page provides the `Back to products` control and an `Add to cart` action for the product that is not in the cart.

### PROD-005: Add a Product from Its Details Page

**Priority:** High  
**Preconditions:** Fresh browser context initialized with `playwright/.auth/user.json`; a product not in the cart has been opened from inventory.  
**Test data:** One displayed inventory product.

**Test steps:**
1. Select `Add to cart` on the product details page.
2. Observe the product action and cart indicator.

**Expected result:** The product action changes to `Remove` and the cart indicator shows one item.

### PROD-006: Remove a Product from Its Details Page

**Priority:** High  
**Preconditions:** Fresh browser context initialized with `playwright/.auth/user.json`; the cart is empty and one product's details page is open.  
**Test data:** One displayed inventory product.

**Test steps:**
1. Select `Add to cart` and verify the cart indicator shows one item and the action changes to `Remove`.
2. Select `Remove` on the details page.
3. Observe the product action and cart indicator.

**Expected result:** The product action returns to `Add to cart`; because the cart is otherwise empty, the cart indicator no longer shows an item count.

### PROD-007: Return to the Inventory

**Priority:** High  
**Preconditions:** Fresh browser context initialized with `playwright/.auth/user.json`; a product details page has been opened from inventory.  
**Test data:** One displayed inventory product.

**Test steps:**
1. Select `Back to products`.
2. Observe the page and product catalog.

**Expected result:** The inventory page is displayed with its product catalog.

### PROD-008: Open a Different Product After Returning

**Priority:** Medium  
**Preconditions:** Fresh browser context initialized with `playwright/.auth/user.json`; inventory contains at least two products and the cart is empty.  
**Test data:** Two distinct products currently displayed in inventory; record their names and details.

**Test steps:**
1. Open the first product and verify its details correspond to that product.
2. Select `Back to products`.
3. Open the second product.
4. Compare the displayed details with the second inventory product.

**Expected result:** The second details page displays the second product's information, not information from the previously viewed product.

## Automation Considerations

- Prefer user-facing semantic locators in the existing order: `getByRole()`, `getByLabel()`, `getByText()`, then `getByTestId()` where appropriate.
- Reuse `InventoryPage` and `InventoryLocators` for reusable inventory behavior. Keep any new details-page selectors in the appropriate locator class and reusable interactions in a Page Object.
- Product name and image entries, the cart actions, and the back control were observed during browser exploration. Inspect the application or existing locators as needed before selecting implementation locators; do not prescribe brittle selectors or invent element attributes.

## Coverage Summary

Eight independent scenarios cover name/image entry points, details accuracy across the catalog, initial details actions, add/remove state and cart indicator, returning to inventory, and opening a different product afterward.

## Assumptions

- The target is the standard SauceDemo application, with the authenticated standard-user state generated by the existing setup project.
- Each scenario receives an independent browser context and prepares its own cart state.
- Product detail values are expected to match the corresponding inventory entry, as stated by the user story.

## Missing Information

- Live exploration verified full details only for Sauce Labs Backpack and Sauce Labs Bike Light. The matching details for the other four products should be verified while implementing/running the catalog-wide scenario.
- Invalid product IDs, unauthenticated direct access to a details URL, responsive layouts, and cart persistence across reloads are not specified by the story and were not explored; no expected behavior is asserted for them.
