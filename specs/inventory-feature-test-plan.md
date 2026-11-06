# Inventory Feature Test Plan

**Source:** `docs/stories/inventory-feature.md`  
**Configuration:** The setup project reads `BASE_URL`, `STANDARD_USERNAME`, and `STANDARD_PASSWORD` from the root `.env`, authenticates, and saves `playwright/.auth/user.json`. Inventory tests must reuse that state; do not include credentials in Inventory tests.  
**Existing POMs:** Reuse `src/pages/LoginPage.ts` and `src/locators/LoginLocators.ts` in the setup project that creates the authenticated state. Inventory tests should use the existing `src/locators/InventoryLocators.ts` and `src/pages/InventoryPage.ts`.  
**Test location:** Keep these scenarios separate from `tests/e2e/login.spec.ts`; use `tests/e2e/inventory.spec.ts`.  
**Status:** Planned from the updated story and repository files. No live browser inspection or test execution was performed.

## Scope and Common Preconditions

Validate that the saved standard-user authentication state opens the inventory view, its heading and product display, product details, and requested sort modes. Cart changes, cart validation, checkout, payment, and login validation scenarios are out of scope.

- Use an independent fresh browser context for each scenario.
- The root Playwright configuration loads `.env`, uses `BASE_URL` as `baseURL`, and sets `testDir` to `./tests`, which includes `tests/e2e/`.
- The `setup` project runs `tests/seed.spec.ts`, which uses `LoginPage.login()` and saves the authenticated state to `playwright/.auth/user.json`; the Chromium, Firefox, and WebKit projects depend on setup and load that file through `storageState`.
- Inventory tests must use the authenticated state loaded by their configured project. Do not call `LoginPage.login()` or repeat the login flow in Inventory test setup.
- Follow root `AGENTS.md` locator, POM, file-location, and no-MCP rules. Do not use live browser inspection.
- The current `InventoryLocators` uses the text `Products` as its inventory marker and current inventory sort actions use the labels `Name (Z to A)`, `Price (low to high)`, and `Price (high to low)`. Confirm these against application evidence before asserting or changing them.

## Scenarios

### INV-001: Saved Standard-User State Opens Inventory

**Priority:** High  
**Preconditions:** Fresh browser context initialized with `playwright/.auth/user.json`; the setup project has authenticated the standard user.  
**Test data:** The saved authenticated browser state; Inventory tests do not read credentials or perform login.

**Test steps:**
1. Start the test in a configured browser project.
2. Verify that the saved authenticated session opens the inventory view.

**Expected result:** The authenticated state opens the inventory view, verified using the current inventory marker or another stable application-backed signal; do not invent a URL or copy.

### INV-002: Inventory Page Displays Its Heading

**Priority:** High  
**Preconditions:** Fresh browser context initialized with `playwright/.auth/user.json`.  
**Test data:** The saved authenticated browser state.

**Test steps:**
1. Start the test in a configured browser project and use the inventory view loaded from saved state.
2. Locate the inventory heading using the accessible role and name supported by application evidence. The current inventory locator uses exact text `Products` as a marker; confirm whether it is exposed as a heading before using a heading-role assertion.

**Expected result:** The expected inventory heading is visible on the inventory view.

### INV-003: Product Inventory Is Displayed

**Priority:** High  
**Preconditions:** Fresh browser context initialized with `playwright/.auth/user.json`; the inventory view is available.  
**Test data:** Product data supplied by the application's inventory.

**Test steps:**
1. Use the inventory view loaded from the saved authenticated state.
2. Verify at least one product item is visible.

**Expected result:** The inventory contains one or more visible product entries. Do not hardcode a product count; the story does not specify one.

### INV-004: Product Entries Display Required Details

**Priority:** High  
**Preconditions:** Fresh browser context initialized with `playwright/.auth/user.json`; standard-user product entries are visible.  
**Test data:** Product data supplied by the application's inventory.

**Test steps:**
1. For each displayed product, verify its name, description, and price are present and non-empty.
2. Where the application supports a product image, verify that image is present and visible.

**Expected result:** Every displayed product has a name, description, and price, plus an image where the application supports one. Do not require specific content, image alt text, or product count unless supported by application requirements or project evidence.

### INV-005: Default Product Order Is Name Ascending When Documented

**Priority:** Low  
**Preconditions:** Fresh browser context initialized with `playwright/.auth/user.json`. Application documentation or other project evidence explicitly confirms name-ascending as the default. If that evidence is absent, skip/block this scenario rather than assuming the default.  
**Test data:** Product names in their initial rendered order.

**Test steps:**
1. Read the product names in their initial displayed order.
2. Compare that order with ascending name order using the application's documented comparison rules.

**Expected result:** The initial product order is name ascending when that default is documented.

### INV-006: Sort Products by Name Descending

**Priority:** Medium  
**Preconditions:** Fresh browser context initialized with `playwright/.auth/user.json`; inventory products are visible.  
**Test data:** Product names in their rendered order; use the supported name-descending sort option. The current POM uses `Name (Z to A)`; confirm the option against application evidence.

**Test steps:**
1. Select the accessible name-descending sort option.
2. Read product names in displayed order.
3. Compare them with descending name order using the application's comparison rules.

**Expected result:** Product names are ordered from Z to A.

### INV-007: Sort Products by Price Low to High

**Priority:** Medium  
**Preconditions:** Fresh browser context initialized with `playwright/.auth/user.json`; inventory products are visible.  
**Test data:** Product prices in their rendered order; use the supported low-to-high sort option. The current POM uses `Price (low to high)`; confirm the option against application evidence.

**Test steps:**
1. Select the accessible price-low-to-high sort option.
2. Read the displayed product prices.
3. Compare prices as numeric values from lowest to highest.

**Expected result:** Products are ordered by nondecreasing numeric price, not lexicographic text order.

### INV-008: Sort Products by Price High to Low

**Priority:** Medium  
**Preconditions:** Fresh browser context initialized with `playwright/.auth/user.json`; inventory products are visible.  
**Test data:** Product prices in their rendered order; use the supported high-to-low sort option. The current POM uses `Price (high to low)`; confirm the option against application evidence.

**Test steps:**
1. Select the accessible price-high-to-low sort option.
2. Read the displayed product prices.
3. Compare prices as numeric values from highest to lowest.

**Expected result:** Products are ordered by nonincreasing numeric price.

## Coverage Summary

Covers loading inventory using the saved standard-user state, its heading and product list, product names/descriptions/prices/images, the documented default name order when confirmed, and all three requested sorting modes. Login validation and cart/checkout flows remain excluded.

## Assumptions

- The configured setup project can authenticate the standard user and save `playwright/.auth/user.json`; the test environment is available through `BASE_URL`.
- Each test starts in a fresh browser context initialized from the saved authentication state. The Login Page Object is used by the setup project, not by each Inventory test.
- Current locator and sort-option values in the existing inventory POM reflect the intended application controls; verify against application evidence during generation.

## Missing Information

- The story does not define the exact accessible name/role of the inventory heading, product count or expected product data, image behavior, sort-control name, or tie-breaking rules for equal names/prices.
- The story makes the default name-ascending behavior conditional on documented application behavior. The current test spec skips this scenario because the checked-in plan/evidence did not confirm the default; retain that condition until evidence is available.
- Confirm which product images are supported and what visible/accessible behavior is required before writing more specific assertions.
- The current `tests/e2e/inventory.spec.ts` still logs in before each test, which conflicts with the updated story and this plan. Align it with the configured `storageState` workflow before the generated suite satisfies this plan.
