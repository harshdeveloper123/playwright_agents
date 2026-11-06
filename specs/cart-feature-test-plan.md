# Cart Feature Test Plan

**Source:** `docs/stories/cart-feature.md`  
**Configuration:** The setup project reads `BASE_URL`, `STANDARD_USERNAME`, and `STANDARD_PASSWORD` from the root `.env`, authenticates, and saves `playwright/.auth/user.json`. Cart tests must load that saved state; do not include credential values in Cart tests.  
**Existing POMs:** Reuse `src/pages/LoginPage.ts` in the setup project that creates the authenticated state, and reuse the existing inventory abstractions in Cart tests where appropriate. The repository currently has no Cart Page Object or cart-specific locator definitions; the existing Inventory Page Object does not provide cart actions.  
**Test location:** Keep these scenarios separate from Login and Inventory tests in `tests/e2e/cart.spec.ts`.  
**Status:** Planned from the updated story and checked-in project files. No live browser inspection or test execution was performed.

## Scope and Common Preconditions

Cover the empty-cart baseline, adding one or more products from inventory, the cart count and product details, removing products from the cart or inventory page, and the state after the final product is removed. Checkout, payment, login validation, and inventory sorting/catalog validation are out of scope.

- Use a fresh browser context for each scenario.
- The root Playwright configuration loads `.env`, uses `BASE_URL` as `baseURL`, and sets `testDir` to `./tests`, which includes `tests/e2e/`.
- The `setup` project runs `tests/seed.spec.ts`, which authenticates with `LoginPage.login()` and saves the browser state to `playwright/.auth/user.json`; the Chromium, Firefox, and WebKit projects depend on setup and load that file through `storageState`.
- Each Cart test must use the authenticated state loaded by its configured project. Do not call `LoginPage.login()` or repeat the login flow in Cart test setup.
- Begin each scenario in a fresh browser context initialized from the saved state, with no products selected, then add only the products required by that scenario.
- Use the story's named product actions (`Add to cart` and `Remove`), cart count, and product details as expected behavior. Prefer accessible semantic locators for the corresponding visible controls and content.
- Reuse existing inventory abstractions where appropriate. Add cart locators and a Cart Page Object for reusable cart behavior; keep scenario-specific setup and assertions in the test specification.
- The story assumes the standard, uncustomized public SauceDemo behavior. Confirm the target environment uses that behavior before automating these assertions; do not substitute different copy or controls without updating the requirements.

## Scenarios

### CART-001: Add One Product from Inventory

**Priority:** High  
**Preconditions:** Fresh browser context; required environment variables are configured; standard user is authenticated on the inventory page.  
**Test data:** One product currently displayed in inventory, identified by its displayed name.

**Test steps:**
1. Select the product's `Add to cart` action.
2. Verify that the same product's action changes to `Remove`.
3. Verify that the cart count displays one.

**Expected result:** The selected product is marked for removal and the cart count is one.

### CART-002: Cart Contains Exactly the Selected Products

**Priority:** High  
**Preconditions:** Fresh browser context; standard user is authenticated on the inventory page.  
**Test data:** Two distinct products displayed in inventory; record their displayed names.

**Test steps:**
1. Select `Add to cart` for each of the two products.
2. Verify that the cart count displays two.
3. Open the cart and compare its product names with the two selected names.
4. Verify that no other product is listed.

**Expected result:** The cart contains exactly the two selected products and displays a count of two.

### CART-003: Cart Displays Selected Product Details

**Priority:** Medium  
**Preconditions:** Fresh browser context; standard user is authenticated on the inventory page.  
**Test data:** One inventory product; record its displayed name, description, and price.

**Test steps:**
1. Record the selected product's name, description, and price from inventory.
2. Add that product and open the cart.
3. Verify that the cart entry shows the same name, description, and price.
4. Verify that the product quantity is one.

**Expected result:** The cart entry matches the product details shown in inventory and displays a quantity of one.

### CART-004: Remove the Only Product from the Cart

**Priority:** High  
**Preconditions:** Fresh browser context; standard user is authenticated; one product has been added and is visible in the cart.  
**Test data:** One product displayed in inventory, identified by its displayed name.

**Test steps:**
1. Open the cart.
2. Select `Remove` for the product.
3. Verify that the product entry is gone and the cart count is no longer displayed.

**Expected result:** The cart contains no product entries and has no item count.

### CART-005: Removing One Product Leaves Other Cart Products

**Priority:** Medium  
**Preconditions:** Fresh browser context; standard user is authenticated; two distinct products have been added and are visible in the cart.  
**Test data:** Two distinct products displayed in inventory; record their names.

**Test steps:**
1. Open the cart containing both products.
2. Select `Remove` for one product.
3. Verify that the removed product is absent and the other product remains.
4. Verify that the cart count displays one.

**Expected result:** Only the product that was not removed remains in the cart, and the cart count is one.

### CART-006: Cart Is Empty After the Final Product Is Removed

**Priority:** Low  
**Preconditions:** Fresh browser context; standard user is authenticated; two distinct products have been added and are visible in the cart.  
**Test data:** Two distinct products displayed in inventory.

**Test steps:**
1. Open the cart and remove one of the two products.
2. Verify that the remaining product is still listed.
3. Select `Remove` for the remaining product.
4. Verify that no product entries or cart count remain.

**Expected result:** Removing the final product leaves the cart with no product entries and no item count.

### CART-007: Saved Authenticated Session Starts with an Empty Cart

**Priority:** High  
**Preconditions:** Fresh browser context initialized from `playwright/.auth/user.json`; the setup project has authenticated the standard user without selecting products.  
**Test data:** The standard user's saved authenticated browser state; Cart tests do not read credentials or perform login.

**Test steps:**
1. Start the test in a configured browser project and verify that the saved authenticated session reaches the inventory page.
2. Verify that no cart item count is displayed.
3. Open the cart.
4. Verify that no product entries are listed.

**Expected result:** The saved authenticated session with no selected products shows an empty cart and no cart item count; the test does not log in again.

### CART-008: Remove a Product from the Inventory Page

**Priority:** Medium  
**Preconditions:** Fresh browser context; standard user is authenticated on the inventory page; one product has been added to the cart.  
**Test data:** One product displayed in inventory, identified by its displayed name.

**Test steps:**
1. Select `Remove` for the added product while still on the inventory page.
2. Verify that the product's action changes back to `Add to cart`.
3. Verify that the cart count is no longer displayed.
4. Open the cart and verify that the product is absent.

**Expected result:** Removing the product from inventory also removes it from the cart and clears the cart item count.

## Coverage Summary

Covers all eight story scenarios: a newly authenticated empty cart; adding one product and verifying its action and count; viewing a product's details and quantity; adding two products while excluding unselected products; removing the only product; removing one of two products while retaining the other; removing a product from inventory; and removing the final product. Checkout and payment are excluded.

## Assumptions

- The target uses the standard, uncustomized public SauceDemo cart behavior stated in the story: product actions toggle between `Add to cart` and `Remove`; the cart icon displays the selected item count; cart entries show name, description, price, and quantity one; and removal is available from the cart and inventory page.
- The configured setup project runs before Cart tests and creates `playwright/.auth/user.json` for the standard user without selecting products. Each test uses a fresh browser context initialized from this saved state.
- Each test selects products from the inventory by their displayed names rather than hardcoding product data.
- The empty-cart result is verified by the absence of product entries and cart count; no particular empty-state message is required.

## Missing Information

- The story describes the standard public SauceDemo experience, but the repository contains no cart-specific locators, Page Object, or tests to corroborate those controls. Confirm that the target test environment matches the story before generating tests.
- The current `tests/e2e/cart.spec.ts` still logs in before each test, which conflicts with the updated story and this plan. It must be aligned with the configured `storageState` workflow before the generated suite satisfies this plan.
- Cart persistence across page reloads or browser sessions is unspecified and is not covered.
