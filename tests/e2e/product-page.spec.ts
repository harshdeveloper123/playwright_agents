import { expect, test } from '@playwright/test';
import { CartPage } from '../../src/pages/CartPage';
import { InventoryPage } from '../../src/pages/InventoryPage';
import { ProductDetailsPage } from '../../src/pages/ProductDetailsPage';

test.describe('SauceDemo product details', () => {
  test.beforeEach(async ({ page }) => {
    const inventoryPage = new InventoryPage(page);
    await page.goto('/inventory.html');
    await expect(inventoryPage.locators.heading).toBeVisible();
  });

  test("[PROD-001] Open each product's details", async ({ page }) => {
    const inventoryPage = new InventoryPage(page);
    const productDetailsPage = new ProductDetailsPage(page);
    const products = await inventoryPage.getProductDetails();
    expect(products.length).toBeGreaterThan(0);

    for (const product of products) {
      await inventoryPage.openProduct(product.name);
      await expect(productDetailsPage.locators.productName(product.name)).toBeVisible();
      await productDetailsPage.returnToInventory();
      await expect(inventoryPage.locators.productItems.first()).toBeVisible();
    }
  });

  test('[PROD-002] Verify product details match the inventory', async ({ page }) => {
    const inventoryPage = new InventoryPage(page);
    const productDetailsPage = new ProductDetailsPage(page);
    const products = await inventoryPage.getProductDetails();
    expect(products.length).toBeGreaterThan(0);

    for (const product of products) {
      const expectedPrice = await inventoryPage.getProductPriceText(product.name);
      const expectedImageSource = await inventoryPage.getProductImageSource(product.name);
      await inventoryPage.openProduct(product.name);

      await expect(productDetailsPage.locators.productName(product.name)).toBeVisible();
      await expect(productDetailsPage.locators.productDescription(product.description)).toBeVisible();
      await expect(productDetailsPage.locators.productPrice(expectedPrice)).toBeVisible();
      await expect(productDetailsPage.locators.productImage(product.name)).toHaveAttribute('src', expectedImageSource);

      await productDetailsPage.returnToInventory();
      await expect(inventoryPage.locators.productItems.first()).toBeVisible();
    }
  });

  test('[PROD-003] Verify product actions are available', async ({ page }) => {
    const inventoryPage = new InventoryPage(page);
    const productDetailsPage = new ProductDetailsPage(page);
    const product = (await inventoryPage.getProductDetails())[0];
    expect(product).toBeDefined();

    await inventoryPage.openProduct(product!.name);
    await expect(productDetailsPage.locators.productName(product!.name)).toBeVisible();
    await expect(productDetailsPage.locators.addToCartButton).toBeVisible();
    await expect(productDetailsPage.locators.backToInventoryButton).toBeVisible();
  });

  test('[PROD-004] Add a product from its details', async ({ page }) => {
    const inventoryPage = new InventoryPage(page);
    const productDetailsPage = new ProductDetailsPage(page);
    const cartPage = new CartPage(page);
    const product = (await inventoryPage.getProductDetails())[0];
    expect(product).toBeDefined();

    await expect(cartPage.locators.cartBadge).toBeHidden();
    await inventoryPage.openProduct(product!.name);
    await expect(productDetailsPage.locators.productName(product!.name)).toBeVisible();
    await productDetailsPage.addToCart();

    await expect(cartPage.locators.cartBadge).toHaveText('1');
    await expect(productDetailsPage.locators.removeButton).toBeVisible();
  });

  test('[PROD-005] Return to the inventory', async ({ page }) => {
    const inventoryPage = new InventoryPage(page);
    const productDetailsPage = new ProductDetailsPage(page);
    const product = (await inventoryPage.getProductDetails())[0];
    expect(product).toBeDefined();

    await inventoryPage.openProduct(product!.name);
    await expect(productDetailsPage.locators.productName(product!.name)).toBeVisible();
    await productDetailsPage.returnToInventory();

    await expect(inventoryPage.locators.heading).toBeVisible();
    await expect(inventoryPage.locators.productItems.first()).toBeVisible();
  });

  test('[PROD-006] Open a different product after returning', async ({ page }) => {
    const inventoryPage = new InventoryPage(page);
    const productDetailsPage = new ProductDetailsPage(page);
    const products = await inventoryPage.getProductDetails();
    expect(products.length).toBeGreaterThanOrEqual(2);
    const firstProduct = products[0]!;
    const secondProduct = products[1]!;

    await inventoryPage.openProduct(firstProduct.name);
    await expect(productDetailsPage.locators.productName(firstProduct.name)).toBeVisible();
    await productDetailsPage.returnToInventory();
    await expect(inventoryPage.locators.productItems.first()).toBeVisible();

    await inventoryPage.openProduct(secondProduct.name);
    await expect(productDetailsPage.locators.productName(secondProduct.name)).toBeVisible();
    await expect(productDetailsPage.locators.productName(firstProduct.name)).toBeHidden();
  });
});
