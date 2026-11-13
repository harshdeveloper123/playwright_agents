# Product Details Page Feature Test Plan

**Source:** [Product Page Feature story](../docs/stories/product-page-feature.md)  
**Configuration:** Playwright loads `BASE_URL` from the root `.env`. The setup project authenticates the standard user and saves `playwright/.auth/user.json`; the Chromium, Firefox, and WebKit projects reuse that state. Product Details tests must not log in before each test.  
**Existing abstractions:** Reuse `src/pages/InventoryPage.ts` and `src/locators/InventoryLocators.ts` to read inventory products and select a product. `src/locators/CartLocators.ts` contains the existing cart indicator locator. No Product Details Page Object, locator class, or test specification was found.  
**Test location:** Keep these scenarios separate in `tests/e2e/product-page.spec.ts`.  
**Status:** Planned from the story and checked-in project files. No live browser inspection or test execution was performed.

## Scope and Common Preconditions

Validate that selecting an inventory product opens its details, that the details match the selected product, that the product actions are available, that adding a product updates its cart state, and that shoppers can return to inventory and open another product. Inventory sorting, broader cart workflows, checkout, and product attributes not listed in the story are out of scope.

- Use an independent browser context initialized with the saved standard-user state for each scenario. Do not repeat the login flow in Product Details tests.
- Begin each scenario on the inventory page with the current product catalog visible. Select products from that catalog rather than relying on state from another scenario.
- For scenarios requiring all products, derive the set and expected name, description, price, and image from the products currently displayed in inventory; do not hardcode a product count or invent product data.
- Follow root `AGENTS.md`: use existing locator and Page Object patterns, keep reusable selectors/actions in their respective source folders, and do not use live browser inspection.
- Keep each scenario independent. The add-to-cart scenario requires a clean cart state so that its expected indicator value is not affected by previously selected products.
- Use observable user-facing page content and controls for assertions. Do not assume a detail-page URL, exact control labels, image comparison method, or cart-indicator format until confirmed by project evidence.

## Scenarios

### PROD-001: Open Each Product's Details

**Priority:** High  
**Preconditions:** Fresh browser context initialized with `playwright/.auth/user.json`; the inventory page and its product catalog are visible.  
**Test data:** Every product currently displayed in inventory; use each product's displayed name or image to open its details.

**Test steps:**
1. For each product in the inventory, select its name or image.
2. Verify that a product details view opens for the selected item.
3. Return to the inventory before selecting the next item, if needed.

**Expected result:** Each selected inventory product opens its corresponding details view.

### PROD-002: Verify Product Details Match the Inventory

**Priority:** High  
**Preconditions:** Fresh browser context initialized with `playwright/.auth/user.json`; the inventory catalog is visible.  
**Test data:** For every displayed product, record its inventory name, description, price, and image before opening its details.

**Test steps:**
1. Select a product from the inventory.
2. Compare the details view's name, description, and price with the values recorded for that product.
3. Verify that the details view displays the image corresponding to the selected inventory product.
4. Repeat for every product displayed in inventory.

**Expected result:** Each details view displays the same product name, description, price, and corresponding image as its inventory entry.

### PROD-003: Verify Product Actions Are Available

**Priority:** High  
**Preconditions:** Fresh browser context initialized with `playwright/.auth/user.json`; at least one product's details view is open.  
**Test data:** One product currently displayed in inventory.

**Test steps:**
1. Open a product's details from inventory.
2. Verify that the details view displays an action to add the product to the cart.
3. Verify that the details view displays a control for returning to inventory.

**Expected result:** Both the product action and a return-to-inventory control are available on the details view.

### PROD-004: Add a Product from Its Details

**Priority:** High  
**Preconditions:** Fresh browser context initialized with `playwright/.auth/user.json`; the shopper is on a product details view and the cart is empty.  
**Test data:** One product currently displayed in inventory.

**Test steps:**
1. Open the selected product's details from inventory.
2. Activate its add-to-cart action.
3. Verify that the cart indicator reflects that one product was added.
4. Verify that the product action changes to reflect the added state.

**Expected result:** The selected product is reflected in the cart indicator and its details-page action shows the updated added state. When the clean-cart precondition is confirmed, the indicator reflects one item.

### PROD-005: Return to the Inventory

**Priority:** High  
**Preconditions:** Fresh browser context initialized with `playwright/.auth/user.json`; a product details view opened from inventory.  
**Test data:** One product currently displayed in inventory.

**Test steps:**
1. Use the details view's return-to-inventory control.
2. Verify that the inventory page is displayed again.
3. Verify that the product catalog is visible.

**Expected result:** The shopper returns to the inventory page and can see its product catalog.

### PROD-006: Open a Different Product After Returning

**Priority:** Medium  
**Preconditions:** Fresh browser context initialized with `playwright/.auth/user.json`; at least two distinct products are displayed in inventory.  
**Test data:** Two different products from the current inventory; record their displayed names.

**Test steps:**
1. Open the first product's details and verify its identity.
2. Return to inventory.
3. Select the second product.
4. Verify that the details view identifies the second product and does not continue to show the first product's details.

**Expected result:** After returning and selecting a different product, the details view reflects the second selection rather than stale details from the first product.

## Coverage Summary

Covers opening details for every catalog product, matching the details to inventory data, the details-page actions, adding one product from its details, returning to the catalog, and switching to a different product after returning.

## Assumptions

- The configured authenticated state represents the standard SauceDemo shopper and can reach the inventory page.
- Product details are expected to match the corresponding inventory entry for name, description, price, and image, as stated in the story.
- A fresh test context and the story's clean-cart precondition are intended to prevent cart contents from leaking between scenarios.

## Missing Information

- The repository has no Product Details Page Object or locator class, so the detail view's accessible identity, product-selection controls, return control, and exact action labels still need confirmation before test generation.
- The story does not specify the detail-page URL or another stable signal that distinguishes a loaded details view.
- The required method for determining that the details image corresponds to the inventory image is not defined.
- Although the story requires a clean cart for PROD-004, the repository does not establish how to guarantee or prepare that state from the saved authentication file. Confirm setup behavior before asserting an exact cart count.
- The exact visible or accessible state of the product action after adding, and the cart indicator's expected representation, are not specified.
