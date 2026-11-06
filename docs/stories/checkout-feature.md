# Checkout Feature — SauceDemo

## Objective

Validate that an authenticated standard SauceDemo user can start checkout from the cart, provide required checkout information, review the order, complete it, and return to the inventory page.

## Preconditions

- The application is accessible through the existing `BASE_URL` configuration.
- Checkout tests must use the authenticated browser state stored in `playwright/.auth/user.json`; tests must not log in before every test.
- The user is authenticated as the standard SauceDemo user and can navigate to the inventory page.
- Checkout starts from the cart. Tests should add the product or products needed for each scenario from Inventory before opening the cart and starting checkout.
- Each scenario should prepare its own cart contents so its expected order is independent of other scenarios.

## Scenarios

1. **CHK-001 — Start checkout from the cart.** Add a product from Inventory, open the cart, and select Checkout. Verify that the Checkout: Your Information page is displayed with First Name, Last Name, and Zip/Postal Code fields, plus Cancel and Continue controls.
2. **CHK-002 — Require a first name.** With a product in the cart, leave First Name blank and provide the other checkout information. Select Continue. Verify the user remains on the information page and sees `Error: First Name is required`; the order overview is not displayed.
3. **CHK-003 — Require a last name.** Provide a first name and postal code but leave Last Name blank. Select Continue. Verify the user remains on the information page and sees `Error: Last Name is required`.
4. **CHK-004 — Require a postal code.** Provide first and last names but leave Zip/Postal Code blank. Select Continue. Verify the user remains on the information page and sees `Error: Postal Code is required`.
5. **CHK-005 — Continue with complete information.** Add a product, enter non-empty values for all three required fields, and select Continue. Verify navigation to Checkout: Overview.
6. **CHK-006 — Review the selected products.** Add two distinct products and continue to the overview. Verify that exactly those products are listed, each product's name, description, and price match Inventory, each quantity is one, and unselected products are absent.
7. **CHK-007 — Review order totals and demo information.** On the overview, verify the item total equals the sum of listed product prices, the displayed tax is 8% of the item total, and the total equals item total plus tax (using the application's displayed currency rounding). Verify the standard demo Payment Information (`SauceCard #31337`) and Shipping Information (`Free Pony Express Delivery`) are displayed.
8. **CHK-008 — Cancel checkout information.** Start checkout with a product in the cart and select Cancel on the information page. Verify navigation back to the cart and that the previously selected product remains there.
9. **CHK-009 — Complete the order.** Continue from a valid checkout information form and select Finish on the overview. Verify the Checkout: Complete! confirmation, the `Thank you for your order!` message, and the order-dispatch confirmation text are displayed.
10. **CHK-010 — Return home after completion.** From the completion page, select Back Home. Verify navigation to Inventory and that the completed order's products are no longer in the cart and no cart item count is displayed.

## Test Configuration and Data

- Reuse the existing authentication configuration and fixtures to load `playwright/.auth/user.json`; do not log in before every Checkout test.
- Begin Checkout scenarios from the authenticated Inventory page, add only the products required by the scenario, and navigate to the cart to start checkout.
- Use distinct products available in the existing inventory for multi-product scenarios; derive expected product details and prices from the displayed inventory data.
- Use non-empty first name, last name, and postal-code values for valid-information scenarios. Do not infer or test formatting rules beyond the required-field behavior described here.
- Do not hardcode login credentials or introduce external payment data. SauceDemo's payment and shipping information are demonstration values shown in the order overview.

## Framework Rules

- Follow the root `AGENTS.md`.
- Reuse the saved authenticated browser state rather than repeating login in each test.
- Reuse existing Inventory and Cart Page Objects, fixtures, and helpers where appropriate; add Checkout-specific Page Objects or locators only when implementation requires them.
- Store locator definitions in `src/locators/` and Page Objects in `src/pages/`.
- Store Checkout test specifications in `tests/e2e/` using the `.spec.ts` suffix.
- Keep Checkout-specific tests separate from Login, Inventory, and Cart test specifications.
- Prefer accessible semantic locators and follow the existing Page Object Model responsibilities.
- Do not use MCP or live browser inspection during planning or code generation.
- Do not claim tests pass unless actual execution results confirm it.

## Out of Scope

- Login scenarios already covered by the Login feature.
- Inventory catalog and sorting behavior covered by the Inventory feature.
- Cart add/remove behavior covered by the Cart feature, except for preparing the cart needed to enter Checkout.
- Actual payment processing, payment-method entry, shipping selection, or delivery tracking; the public SauceDemo checkout presents demonstration summary information rather than a real transaction.
- Checkout behavior for non-standard or locked-out users.

## Assumptions and Open Questions

- These scenarios assume the standard, uncustomized public SauceDemo experience, including the three required checkout fields, the displayed required-field errors, fixed demo payment and shipping details, and the order completion and return-home flow.
- The saved `playwright/.auth/user.json` state represents an authenticated standard user and is available to the configured Playwright projects.
- Each test prepares its own cart contents and does not rely on cart persistence between tests.
- No blocking information is missing for the proposed scenarios. If the configured target environment differs from the standard public SauceDemo behavior, confirm the differences before implementation.
