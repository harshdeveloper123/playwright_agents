import { expect, test } from '@playwright/test';
import { InventoryPage } from '../../src/pages/InventoryPage';

test.describe('SauceDemo inventory', () => {
  test.beforeEach(async ({ page }) => {
    const inventoryPage = new InventoryPage(page);
    await page.goto('/inventory.html');
    await expect(inventoryPage.locators.heading).toBeVisible();
  });

  test('[INV-001] Saved standard-user state opens inventory', async ({ page }) => {
    const inventoryPage = new InventoryPage(page);
    await expect(inventoryPage.locators.heading).toBeVisible();
  });

  test('[INV-002] Inventory page displays its heading', async ({ page }) => {
    const inventoryPage = new InventoryPage(page);
    await expect(inventoryPage.locators.heading).toBeVisible();
  });

  test('[INV-003] Product inventory is displayed', async ({ page }) => {
    const inventoryPage = new InventoryPage(page);
    await expect(inventoryPage.locators.productItems.first()).toBeVisible();
    expect(await inventoryPage.locators.productItems.count()).toBeGreaterThan(0);
  });

  test('[INV-004] Product details and supported images are displayed', async ({ page }) => {
    const inventoryPage = new InventoryPage(page);
    const products = await inventoryPage.getProductDetails();

    expect(products.length).toBeGreaterThan(0);
    for (const product of products) {
      expect(product.name.trim()).not.toBe('');
      expect(product.description.trim()).not.toBe('');
      expect(Number.isFinite(product.price)).toBe(true);
    }

    const items = await inventoryPage.locators.productItems.all();
    for (const item of items) {
      const images = inventoryPage.locators.productImage(item);
      if (await images.count() > 0) {
        await expect(images.first()).toBeVisible();
      }
    }
  });

  test('[INV-005] Default product order is name ascending when documented', async ({ page }) => {
    test.skip(true, 'The checked-in plan does not confirm name-ascending as the documented default.');

    const inventoryPage = new InventoryPage(page);
    const names = await inventoryPage.getProductNames();
    expect(names).toEqual([...names].sort((left, right) => left.localeCompare(right)));
  });

  test('[INV-006] Products sort by name descending', async ({ page }) => {
    const inventoryPage = new InventoryPage(page);
    await inventoryPage.sortByNameDescending();

    const names = await inventoryPage.getProductNames();
    expect(names.length).toBeGreaterThan(0);
    expect(names).toEqual([...names].sort((left, right) => right.localeCompare(left)));
  });

  test('[INV-007] Products sort by price from low to high', async ({ page }) => {
    const inventoryPage = new InventoryPage(page);
    await inventoryPage.sortByPriceAscending();

    const prices = await inventoryPage.getProductPrices();
    expect(prices.length).toBeGreaterThan(0);
    expect(prices.every(Number.isFinite)).toBe(true);
    expect(prices).toEqual([...prices].sort((left, right) => left - right));
  });

  test('[INV-008] Products sort by price from high to low', async ({ page }) => {
    const inventoryPage = new InventoryPage(page);
    await inventoryPage.sortByPriceDescending();

    const prices = await inventoryPage.getProductPrices();
    expect(prices.length).toBeGreaterThan(0);
    expect(prices.every(Number.isFinite)).toBe(true);
    expect(prices).toEqual([...prices].sort((left, right) => right - left));
  });
});