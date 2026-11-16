import { expect, test } from '@playwright/test';
import { CartPage } from '../../src/pages/CartPage';
import { InventoryPage, type InventoryProductDetails } from '../../src/pages/InventoryPage';
import { ProductDetailsPage } from '../../src/pages/ProductDetailsPage';

test.describe('SauceDemo product details', () => {
  test.beforeEach(async ({ page }) => {
    const inventoryPage = new InventoryPage(page);
    const cartPage = new CartPage(page);

    await page.goto('/inventory.html');
    await expect(inventoryPage.locators.heading).toBeVisible();
    await expect(cartPage.locators.cartBadge).toBeHidden();
  });

  test('[PROD-001] Open product details by name', async ({ page }) => {
    const inventoryPage = new InventoryPage(page);
    const detailsPage = new ProductDetailsPage(page);
    const product = (await inventoryPage.getProductDetails())[0];
    expect(product).toBeDefined();

    const imageSource = await inventoryPage.getProductImageSource(product!.name);
    const priceText = await inventoryPage.getProductPriceText(product!.name);
    await inventoryPage.openProduct(product!.name);

    await expectProductDetails(detailsPage, product!, priceText, imageSource);
  });

  test('[PROD-002] Open product details by image', async ({ page }) => {
    const inventoryPage = new InventoryPage(page);
    const detailsPage = new ProductDetailsPage(page);
    const product = (await inventoryPage.getProductDetails())[0];
    expect(product).toBeDefined();

    const imageSource = await inventoryPage.getProductImageSource(product!.name);
    const priceText = await inventoryPage.getProductPriceText(product!.name);
    await inventoryPage.openProductByImage(product!.name);

    await expectProductDetails(detailsPage, product!, priceText, imageSource);
  });

  test('[PROD-003] Verify details match each inventory product', async ({ page }) => {
    const inventoryPage = new InventoryPage(page);
    const detailsPage = new ProductDetailsPage(page);
    const products = await inventoryPage.getProductDetails();
    expect(products.length).toBeGreaterThan(0);

    for (const product of products) {
      const inventoryImageSource = await inventoryPage.getProductImageSource(product.name);
      const inventoryPrice = await inventoryPage.getProductPriceText(product.name);
      await inventoryPage.openProduct(product.name);
      await expectProductDetails(detailsPage, product, inventoryPrice, inventoryImageSource);
      await detailsPage.backToProducts();
      await expect(inventoryPage.locators.heading).toBeVisible();
    }
  });

  test('[PROD-004] Verify initial details-page actions', async ({ page }) => {
    const inventoryPage = new InventoryPage(page);
    const detailsPage = new ProductDetailsPage(page);
    const product = (await inventoryPage.getProductDetails())[0];
    expect(product).toBeDefined();

    await inventoryPage.openProduct(product!.name);
    await detailsPage.waitForProduct(product!.name);

    await expect(detailsPage.locators.backToProductsButton).toBeVisible();
    await expect(detailsPage.locators.addToCartButton).toBeVisible();
  });

  test('[PROD-005] Add a product from its details page', async ({ page }) => {
    const inventoryPage = new InventoryPage(page);
    const detailsPage = new ProductDetailsPage(page);
    const cartPage = new CartPage(page);
    const product = (await inventoryPage.getProductDetails())[0];
    expect(product).toBeDefined();

    await inventoryPage.openProduct(product!.name);
    await detailsPage.addToCart();

    await expect(detailsPage.locators.removeButton).toBeVisible();
    await expect(cartPage.locators.cartBadge).toHaveText('1');
  });

  test('[PROD-006] Remove a product from its details page', async ({ page }) => {
    const inventoryPage = new InventoryPage(page);
    const detailsPage = new ProductDetailsPage(page);
    const cartPage = new CartPage(page);
    const product = (await inventoryPage.getProductDetails())[0];
    expect(product).toBeDefined();

    await inventoryPage.openProduct(product!.name);
    await detailsPage.addToCart();
    await expect(cartPage.locators.cartBadge).toHaveText('1');
    await expect(detailsPage.locators.removeButton).toBeVisible();

    await detailsPage.removeFromCart();

    await expect(detailsPage.locators.addToCartButton).toBeVisible();
    await expect(cartPage.locators.cartBadge).toBeHidden();
  });

  test('[PROD-007] Return to the inventory', async ({ page }) => {
    const inventoryPage = new InventoryPage(page);
    const detailsPage = new ProductDetailsPage(page);
    const product = (await inventoryPage.getProductDetails())[0];
    expect(product).toBeDefined();

    await inventoryPage.openProduct(product!.name);
    await detailsPage.backToProducts();

    await expect(inventoryPage.locators.heading).toBeVisible();
    await expect(inventoryPage.locators.productItems.first()).toBeVisible();
    expect(await inventoryPage.locators.productItems.count()).toBeGreaterThan(0);
  });

  test('[PROD-008] Open a different product after returning', async ({ page }) => {
    const inventoryPage = new InventoryPage(page);
    const detailsPage = new ProductDetailsPage(page);
    const products = await inventoryPage.getProductDetails();
    expect(products.length).toBeGreaterThanOrEqual(2);
    const firstProduct = products[0]!;
    const secondProduct = products[1]!;

    const firstImageSource = await inventoryPage.getProductImageSource(firstProduct.name);
    const firstPrice = await inventoryPage.getProductPriceText(firstProduct.name);
    await inventoryPage.openProduct(firstProduct.name);
    await expectProductDetails(detailsPage, firstProduct, firstPrice, firstImageSource);
    await detailsPage.backToProducts();

    const secondImageSource = await inventoryPage.getProductImageSource(secondProduct.name);
    const secondPrice = await inventoryPage.getProductPriceText(secondProduct.name);
    await inventoryPage.openProduct(secondProduct.name);
    await expectProductDetails(detailsPage, secondProduct, secondPrice, secondImageSource);
  });
});

async function expectProductDetails(
  detailsPage: ProductDetailsPage,
  product: InventoryProductDetails,
  priceText: string,
  inventoryImageSource: string,
): Promise<void> {
  await detailsPage.waitForProduct(product.name);
  await expect(detailsPage.locators.productName(product.name)).toBeVisible();
  await expect(detailsPage.locators.productDescription(product.description)).toBeVisible();
  await expect(detailsPage.locators.productPrice(priceText)).toBeVisible();
  await expect(await detailsPage.getProductImageSource(product.name)).toBe(inventoryImageSource);
}
