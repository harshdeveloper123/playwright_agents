import type { Page } from '@playwright/test';
import { InventoryPage } from './InventoryPage';
import { ProductDetailsLocators } from '../locators/ProductDetailsLocators';

export class ProductDetailsPage {
  readonly locators: ProductDetailsLocators;
  private readonly inventoryPage: InventoryPage;

  constructor(page: Page) {
    this.locators = new ProductDetailsLocators(page);
    this.inventoryPage = new InventoryPage(page);
  }

  async waitForProduct(name: string): Promise<void> {
    await this.locators.productName(name).waitFor({ state: 'visible' });
    await this.locators.productImage(name).waitFor({ state: 'visible' });
  }

  async getProductImageSource(name: string): Promise<string> {
    const source = await this.locators.productImage(name).getAttribute('src');
    if (source === null) {
      throw new Error(`Product image source is missing for "${name}"`);
    }
    return source;
  }

  async addToCart(): Promise<void> {
    await this.locators.addToCartButton.click();
  }

  async removeFromCart(): Promise<void> {
    await this.locators.removeButton.click();
  }

  async backToProducts(): Promise<void> {
    await this.locators.backToProductsButton.click();
    await this.inventoryPage.locators.productItems.first().waitFor({ state: 'visible' });
  }
}
