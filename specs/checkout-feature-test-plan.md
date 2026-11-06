# Checkout Feature Test Plan

**Source:** [`docs/stories/checkout-feature.md`](../docs/stories/checkout-feature.md)  
**Test location:** `tests/e2e/checkout.spec.ts` (planned; not created during planning).  
**Execution target:** Chromium only. Use the existing `chromium` project, which depends on `setup` and loads `playwright/.auth/user.json`. Do not repeat login in each Checkout scenario.  
**Status:** Planned from the feature story and checked-in project files. No live browser inspection or test execution was performed.

## Scope and Common Preconditions

Validate the authenticated user's path from cart to Checkout, required checkout information, the order overview and totals, cancellation, order completion, and return to Inventory. Login, inventory sorting, actual payment processing, and cart behavior unrelated to entering or leaving Checkout are out of scope.

- The application is accessed through the existing `BASE_URL` configuration.
- The `setup` project authenticates and writes `playwright/.auth/user.json`; the `chromium` project depends on setup and uses that saved state. Checkout scenarios must use this state and must not log in themselves.
- Run Checkout scenarios in the Chromium project only, as requested. Do not select Firefox or WebKit for this feature workflow.
- Give each scenario an independent browser context initialized from the saved authenticated state. Prepare only the products needed for that scenario from Inventory, then open the cart and start Checkout.
- Each scenario requires an isolated cart containing only the products specified in its test data. Cart reset/isolation behavior is not established by the current project files; see Missing Information.
- Reuse the existing Inventory and Cart Page Objects where appropriate. Checkout-specific reusable behavior belongs in a Checkout Page Object and locator definitions, if needed during generation. Keep scenario orchestration and assertions in the spec.
- Prefer accessible roles, labels, and visible text for fields, buttons, headings, errors, product details, and totals. Do not prescribe CSS or XPath selectors; use a test ID only if project evidence shows an accessible locator is not suitable.
- The checkout controls and displayed values below are requirements from the story, not behavior verified by live inspection.

## Scenarios

### CHK-001: Start Checkout from the Cart

**Priority:** High  
**Preconditions:** Fresh Chromium context using the saved authenticated state; the user is on Inventory; the cart contains no unrelated products.  
**Test data:** One product selected from Inventory by its displayed name.

**Test steps:**
1. Add the selected product to the cart.
2. Open the cart and select Checkout.
3. Inspect the checkout information page.

**Expected result:** The `Checkout: Your Information` page is displayed with First Name, Last Name, and Zip/Postal Code fields, plus Cancel and Continue controls.

### CHK-002: Require a First Name

**Priority:** High  
**Preconditions:** Fresh Chromium context using the saved authenticated state; one product has been added and Checkout is on the information page.  
**Test data:** Leave First Name empty; enter non-empty values in Last Name and Zip/Postal Code.

**Test steps:**
1. Leave First Name blank and fill in Last Name and Zip/Postal Code.
2. Select Continue.

**Expected result:** The user remains on the information page and sees `Error: First Name is required`. The order overview is not displayed.

### CHK-003: Require a Last Name

**Priority:** High  
**Preconditions:** Fresh Chromium context using the saved authenticated state; one product has been added and Checkout is on the information page.  
**Test data:** Enter a non-empty First Name and Zip/Postal Code; leave Last Name empty.

**Test steps:**
1. Fill in First Name and Zip/Postal Code, leaving Last Name blank.
2. Select Continue.

**Expected result:** The user remains on the information page and sees `Error: Last Name is required`.

### CHK-004: Require a Postal Code

**Priority:** High  
**Preconditions:** Fresh Chromium context using the saved authenticated state; one product has been added and Checkout is on the information page.  
**Test data:** Enter non-empty First Name and Last Name; leave Zip/Postal Code empty.

**Test steps:**
1. Fill in First Name and Last Name, leaving Zip/Postal Code blank.
2. Select Continue.

**Expected result:** The user remains on the information page and sees `Error: Postal Code is required`.

### CHK-005: Continue with Complete Information

**Priority:** High  
**Preconditions:** Fresh Chromium context using the saved authenticated state; one product has been added and Checkout is on the information page.  
**Test data:** Non-empty First Name, Last Name, and Zip/Postal Code values; no specific format is required by the story.

**Test steps:**
1. Enter non-empty values in all three required fields.
2. Select Continue.

**Expected result:** The application navigates to `Checkout: Overview`.

### CHK-006: Review the Selected Products

**Priority:** High  
**Preconditions:** Fresh Chromium context using the saved authenticated state; two distinct products have been selected from Inventory and Checkout has advanced to the overview.  
**Test data:** Two distinct products available in Inventory. Capture each product's displayed name, description, and price from Inventory before starting Checkout.

**Test steps:**
1. Add exactly the two selected products to the cart and proceed through Checkout with non-empty values in all required fields.
2. On the overview, compare its product entries with the captured Inventory details.
3. Verify each product's quantity and check whether any unselected product appears.

**Expected result:** Exactly the two selected products are listed. Each name, description, and price matches Inventory; each quantity is one; no unselected product is listed.

### CHK-007: Review Order Totals and Demo Information

**Priority:** High  
**Preconditions:** Fresh Chromium context using the saved authenticated state; one or more products have been selected and Checkout has advanced to the overview.  
**Test data:** Product prices displayed on the overview; standard demo information specified by the story.

**Test steps:**
1. Calculate the item total by summing the listed product prices.
2. Compare the displayed item total with that sum.
3. Verify the displayed tax is 8% of the item total, applying the application's displayed currency rounding.
4. Verify the displayed total equals the item total plus tax, with displayed currency rounding.
5. Inspect the payment and shipping information.

**Expected result:** The item total matches the sum of listed prices; tax is 8% of that item total; total equals item total plus tax, using the application's displayed currency rounding. Payment Information shows `SauceCard #31337`, and Shipping Information shows `Free Pony Express Delivery`.

### CHK-008: Cancel Checkout Information

**Priority:** Medium  
**Preconditions:** Fresh Chromium context using the saved authenticated state; one product has been added and Checkout is on the information page.  
**Test data:** One product selected from Inventory by its displayed name.

**Test steps:**
1. Select Cancel on the checkout information page.
2. Inspect the resulting page and cart contents.

**Expected result:** The user returns to the cart, and the previously selected product remains in the cart.

### CHK-009: Complete the Order

**Priority:** High  
**Preconditions:** Fresh Chromium context using the saved authenticated state; Checkout has reached the overview after valid information was entered.  
**Test data:** At least one product selected for the order; non-empty First Name, Last Name, and Zip/Postal Code values.

**Test steps:**
1. Select Finish on the overview.
2. Inspect the completion heading and confirmation content.

**Expected result:** The `Checkout: Complete!` confirmation is displayed, including the exact message `Thank you for your order!` and the order-dispatch confirmation text described by the story. Do not assert exact dispatch wording until confirmed from application evidence.

### CHK-010: Return Home After Completion

**Priority:** High  
**Preconditions:** Fresh Chromium context using the saved authenticated state; an order has been completed and the completion page is displayed.  
**Test data:** One or more products included in the completed order; record their displayed names before completing it.

**Test steps:**
1. Select Back Home on the completion page.
2. Verify that Inventory is displayed.
3. Open the cart and inspect its contents and item count.

**Expected result:** The user returns to Inventory. The completed order's products are no longer in the cart, and no cart item count is displayed.

## Automation Considerations

- Use the existing Chromium project rather than changing project configuration. The setup dependency creates the authenticated storage state before Chromium tests.
- Use user-visible controls and content for navigation, field entry, validation, and completion assertions. The story identifies labels and control names for these interactions but the exact accessible roles should be confirmed from project evidence during generation.
- Derive product names, descriptions, and prices from the rendered Inventory data rather than hardcoding product catalog values.
- For order totals, compare numeric currency values using the application's displayed rounding. Do not infer a different rounding rule.
- Keep each scenario independent and prepare its cart contents explicitly; do not rely on state left by another test.

## Coverage Summary

Covers all ten requested scenarios: entering Checkout, each required-field validation error, continuing with complete information, verifying selected products and quantities, validating totals and demo payment/shipping details, canceling back to the cart, completing an order with the exact `Thank you for your order!` message, and returning home with the cart cleared. The plan targets Chromium and reuses the saved authenticated state.

## Assumptions

- The target environment follows the Checkout behavior described in the story, including the three required fields, stated validation messages, 8% tax, demo payment/shipping information, order completion, and return-home behavior.
- The configured setup produces a usable authenticated standard-user state in `playwright/.auth/user.json` before the Chromium project runs.
- Non-empty checkout values are sufficient for successful information submission; no name or postal-code format validation is in scope because none is specified.
- Cart contents can be isolated for each scenario. The scenarios should not depend on products left by another test.
- The test plan is not evidence that the Checkout flow has been run or verified.

## Missing Information

- The checkout implementation and Checkout-specific locators/Page Object are absent from the current checked-in project, so the exact accessible roles/names for controls and headings have not been independently corroborated. The story's labels and visible text are the planning basis.
- The story does not provide the exact order-dispatch confirmation wording; CHK-009 requires that confirmation text to be visible but intentionally does not invent its copy. Confirm exact wording before generating an exact-text assertion.
- The repository does not establish whether a fresh saved authenticated state guarantees an empty cart or how to reset cart state between independent scenarios. Confirm the available reset/isolation approach before generation; do not add an unsupported reset action.
- The story requires the application's displayed currency rounding but does not state a rounding algorithm for edge cases. Use displayed precision and confirm any needed rounding behavior if values at a boundary are introduced.
