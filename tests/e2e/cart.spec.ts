import { expect, test } from '@playwright/test';
import { CartPage } from '../../src/pages/CartPage';
import { InventoryPage } from '../../src/pages/InventoryPage';

test.describe('SauceDemo cart', () => {
  test.beforeEach(async ({ page }) => {
    const inventoryPage = new InventoryPage(page);
    await page.goto('/inventory.html');
    await expect(inventoryPage.locators.heading).toBeVisible();
  });

  test('[CART-001] Add one product from inventory', async ({ page }) => {
    const inventoryPage = new InventoryPage(page);
    const cartPage = new CartPage(page);
    const products = await inventoryPage.getProductDetails();
    expect(products.length).toBeGreaterThan(0);

    const product = products[0]!;
    await inventoryPage.addProductToCart(product.name);

    const item = inventoryPage.locators.productItemByName(product.name);
    await expect(inventoryPage.locators.removeButton(item)).toBeVisible();
    await expect(cartPage.locators.cartBadge).toHaveText('1');
  });

  test('[CART-002] Cart contains exactly the selected products', async ({ page }) => {
    const inventoryPage = new InventoryPage(page);
    const cartPage = new CartPage(page);
    const products = await inventoryPage.getProductDetails();
    expect(products.length).toBeGreaterThanOrEqual(2);

    const selectedNames = products.slice(0, 2).map((product) => product.name);
    for (const name of selectedNames) {
      await inventoryPage.addProductToCart(name);
    }

    await expect(cartPage.locators.cartBadge).toHaveText('2');
    await cartPage.open();

    const cartNames = await cartPage.getProductNames();
    expect(cartNames).toHaveLength(2);
    expect([...cartNames].sort()).toEqual([...selectedNames].sort());
  });

  test('[CART-003] Cart displays selected product details', async ({ page }) => {
    const inventoryPage = new InventoryPage(page);
    const cartPage = new CartPage(page);
    const products = await inventoryPage.getProductDetails();
    expect(products.length).toBeGreaterThan(0);

    const product = products[0]!;
    await inventoryPage.addProductToCart(product.name);
    await cartPage.open();

    await expect(cartPage.getProductDetails()).resolves.toEqual([{
      ...product,
      quantity: 1,
    }]);
  });

  test('[CART-004] Remove the only product from the cart', async ({ page }) => {
    const inventoryPage = new InventoryPage(page);
    const cartPage = new CartPage(page);
    const product = (await inventoryPage.getProductDetails())[0];
    expect(product).toBeDefined();

    await inventoryPage.addProductToCart(product!.name);
    await cartPage.open();
    await cartPage.removeProduct(product!.name);

    await expect(cartPage.locators.cartItems).toHaveCount(0);
    await expect(cartPage.locators.cartBadge).toBeHidden();
  });

  test('[CART-005] Removing one product leaves the other cart product', async ({ page }) => {
    const inventoryPage = new InventoryPage(page);
    const cartPage = new CartPage(page);
    const products = await inventoryPage.getProductDetails();
    expect(products.length).toBeGreaterThanOrEqual(2);

    const selectedProducts = products.slice(0, 2);
    for (const product of selectedProducts) {
      await inventoryPage.addProductToCart(product.name);
    }

    await cartPage.open();
    await cartPage.removeProduct(selectedProducts[0]!.name);

    await expect(cartPage.locators.cartBadge).toHaveText('1');
    await expect(cartPage.getProductNames()).resolves.toEqual([selectedProducts[1]!.name]);
  });

  test('[CART-006] Cart is empty after the final product is removed', async ({ page }) => {
    const inventoryPage = new InventoryPage(page);
    const cartPage = new CartPage(page);
    const products = await inventoryPage.getProductDetails();
    expect(products.length).toBeGreaterThanOrEqual(2);

    const selectedProducts = products.slice(0, 2);
    for (const product of selectedProducts) {
      await inventoryPage.addProductToCart(product.name);
    }

    await cartPage.open();
    await cartPage.removeProduct(selectedProducts[0]!.name);
    await expect(cartPage.getProductNames()).resolves.toEqual([selectedProducts[1]!.name]);
    await cartPage.removeProduct(selectedProducts[1]!.name);

    await expect(cartPage.locators.cartItems).toHaveCount(0);
    await expect(cartPage.locators.cartBadge).toBeHidden();
  });

  test('[CART-007] Saved authenticated session starts with an empty cart', async ({ page }) => {
    const cartPage = new CartPage(page);

    await expect(cartPage.locators.cartBadge).toBeHidden();
    await cartPage.open();
    await expect(cartPage.locators.cartItems).toHaveCount(0);
  });

  test('[CART-008] Remove a product from the inventory page', async ({ page }) => {
    const inventoryPage = new InventoryPage(page);
    const cartPage = new CartPage(page);
    const product = (await inventoryPage.getProductDetails())[0];
    expect(product).toBeDefined();

    await inventoryPage.addProductToCart(product!.name);
    await inventoryPage.removeProductFromInventory(product!.name);

    const item = inventoryPage.locators.productItemByName(product!.name);
    await expect(inventoryPage.locators.addToCartButton(item)).toBeVisible();
    await expect(cartPage.locators.cartBadge).toBeHidden();
    await cartPage.open();
    await expect(cartPage.locators.cartItemByName(product!.name)).toHaveCount(0);
  });
});
