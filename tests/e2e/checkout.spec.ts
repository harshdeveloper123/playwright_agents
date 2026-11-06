import { expect, test } from '@playwright/test';
import { CartPage } from '../../src/pages/CartPage';
import { CheckoutPage } from '../../src/pages/CheckoutPage';
import { InventoryPage } from '../../src/pages/InventoryPage';

async function startCheckout(
  inventoryPage: InventoryPage,
  cartPage: CartPage,
  checkoutPage: CheckoutPage,
  productCount = 1,
) {
  const products = await inventoryPage.getProductDetails();
  expect(products.length).toBeGreaterThanOrEqual(productCount);
  const selectedProducts = products.slice(0, productCount);

  for (const product of selectedProducts) {
    await inventoryPage.addProductToCart(product.name);
  }

  await cartPage.open();
  await checkoutPage.start();
  return selectedProducts;
}

async function continueWithValidInformation(checkoutPage: CheckoutPage): Promise<void> {
  await checkoutPage.fillInformation({
    firstName: 'Test',
    lastName: 'Customer',
    postalCode: '12345',
  });
  await checkoutPage.continue();
}

test.describe('SauceDemo checkout', () => {
  test.beforeEach(async ({ page }) => {
    const inventoryPage = new InventoryPage(page);
    await page.goto('/inventory.html');
    await expect(inventoryPage.locators.heading).toBeVisible();
  });

  test('[CHK-001] Start checkout from the cart', async ({ page }) => {
    const inventoryPage = new InventoryPage(page);
    const cartPage = new CartPage(page);
    const checkoutPage = new CheckoutPage(page);
    await startCheckout(inventoryPage, cartPage, checkoutPage);

    await expect(checkoutPage.locators.informationTitle).toBeVisible();
    await expect(checkoutPage.locators.firstName).toBeVisible();
    await expect(checkoutPage.locators.lastName).toBeVisible();
    await expect(checkoutPage.locators.postalCode).toBeVisible();
    await expect(checkoutPage.locators.cancelButton).toBeVisible();
    await expect(checkoutPage.locators.continueButton).toBeVisible();
  });

  test('[CHK-002] Require a first name', async ({ page }) => {
    const inventoryPage = new InventoryPage(page);
    const cartPage = new CartPage(page);
    const checkoutPage = new CheckoutPage(page);
    await startCheckout(inventoryPage, cartPage, checkoutPage);
    await checkoutPage.fillInformation({ lastName: 'Customer', postalCode: '12345' });
    await checkoutPage.continue();

    await expect(checkoutPage.locators.error).toHaveText('Error: First Name is required');
    await expect(checkoutPage.locators.informationTitle).toBeVisible();
    await expect(checkoutPage.locators.overviewTitle).toBeHidden();
  });

  test('[CHK-003] Require a last name', async ({ page }) => {
    const inventoryPage = new InventoryPage(page);
    const cartPage = new CartPage(page);
    const checkoutPage = new CheckoutPage(page);
    await startCheckout(inventoryPage, cartPage, checkoutPage);
    await checkoutPage.fillInformation({ firstName: 'Test', postalCode: '12345' });
    await checkoutPage.continue();

    await expect(checkoutPage.locators.error).toHaveText('Error: Last Name is required');
    await expect(checkoutPage.locators.informationTitle).toBeVisible();
  });

  test('[CHK-004] Require a postal code', async ({ page }) => {
    const inventoryPage = new InventoryPage(page);
    const cartPage = new CartPage(page);
    const checkoutPage = new CheckoutPage(page);
    await startCheckout(inventoryPage, cartPage, checkoutPage);
    await checkoutPage.fillInformation({ firstName: 'Test', lastName: 'Customer' });
    await checkoutPage.continue();

    await expect(checkoutPage.locators.error).toHaveText('Error: Postal Code is required');
    await expect(checkoutPage.locators.informationTitle).toBeVisible();
  });

  test('[CHK-005] Continue with complete information', async ({ page }) => {
    const inventoryPage = new InventoryPage(page);
    const cartPage = new CartPage(page);
    const checkoutPage = new CheckoutPage(page);
    await startCheckout(inventoryPage, cartPage, checkoutPage);
    await continueWithValidInformation(checkoutPage);

    await expect(checkoutPage.locators.overviewTitle).toBeVisible();
  });

  test('[CHK-006] Review the selected products', async ({ page }) => {
    const inventoryPage = new InventoryPage(page);
    const cartPage = new CartPage(page);
    const checkoutPage = new CheckoutPage(page);
    const selectedProducts = await startCheckout(inventoryPage, cartPage, checkoutPage, 2);
    await continueWithValidInformation(checkoutPage);

    const overviewProducts = await checkoutPage.getOverviewProducts();
    expect(overviewProducts).toHaveLength(2);
    expect(overviewProducts.every((product) => product.quantity === 1)).toBe(true);
    expect(overviewProducts.map(({ quantity: _quantity, ...product }) => product).sort((a, b) => a.name.localeCompare(b.name)))
      .toEqual(selectedProducts.map(({ name, description, price }) => ({ name, description, price }))
        .sort((a, b) => a.name.localeCompare(b.name)));
  });

  test('[CHK-007] Review order totals and demo information', async ({ page }) => {
    const inventoryPage = new InventoryPage(page);
    const cartPage = new CartPage(page);
    const checkoutPage = new CheckoutPage(page);
    await startCheckout(inventoryPage, cartPage, checkoutPage);
    await continueWithValidInformation(checkoutPage);

    const overviewProducts = await checkoutPage.getOverviewProducts();
    const totals = await checkoutPage.getDisplayedTotals();
    const expectedItemTotal = Math.round(overviewProducts.reduce((sum, product) => sum + product.price, 0) * 100) / 100;
    const expectedTax = Math.round(expectedItemTotal * 0.08 * 100) / 100;

    expect(totals.itemTotal).toBe(expectedItemTotal);
    expect(totals.tax).toBe(expectedTax);
    expect(totals.total).toBe(Math.round((expectedItemTotal + expectedTax) * 100) / 100);
    await expect(checkoutPage.locators.paymentInformation).toBeVisible();
    await expect(checkoutPage.locators.shippingInformation).toBeVisible();
  });

  test('[CHK-008] Cancel checkout information', async ({ page }) => {
    const inventoryPage = new InventoryPage(page);
    const cartPage = new CartPage(page);
    const checkoutPage = new CheckoutPage(page);
    const selectedProducts = await startCheckout(inventoryPage, cartPage, checkoutPage);
    await checkoutPage.cancelInformation();

    await expect(cartPage.locators.heading).toBeVisible();
    await expect(cartPage.getProductNames()).resolves.toEqual([selectedProducts[0]!.name]);
  });

  test('[CHK-009] Complete the order', async ({ page }) => {
    const inventoryPage = new InventoryPage(page);
    const cartPage = new CartPage(page);
    const checkoutPage = new CheckoutPage(page);
    await startCheckout(inventoryPage, cartPage, checkoutPage);
    await continueWithValidInformation(checkoutPage);
    await checkoutPage.finish();

    await expect(checkoutPage.locators.completeTitle).toBeVisible();
    await expect(checkoutPage.locators.orderConfirmation).toBeVisible();
    await expect(checkoutPage.locators.dispatchConfirmation).toBeVisible();
  });

  test('[CHK-010] Return home after completion', async ({ page }) => {
    const inventoryPage = new InventoryPage(page);
    const cartPage = new CartPage(page);
    const checkoutPage = new CheckoutPage(page);
    await startCheckout(inventoryPage, cartPage, checkoutPage);
    await continueWithValidInformation(checkoutPage);
    await checkoutPage.finish();
    await checkoutPage.backHome();

    await expect(inventoryPage.locators.heading).toBeVisible();
    await expect(cartPage.locators.cartBadge).toBeHidden();
    await cartPage.open();
    await expect(cartPage.locators.cartItems).toHaveCount(0);
    await expect(cartPage.locators.cartBadge).toBeHidden();
  });
});