import type { Page } from '@playwright/test';
import { ProductDetailsLocators } from '../locators/ProductDetailsLocators';

export class ProductDetailsPage {
  readonly locators: ProductDetailsLocators;

  constructor(page: Page) {
    this.locators = new ProductDetailsLocators(page);
  }

  async addToCart(): Promise<void> {
    await this.locators.addToCartButton.click();
  }

  async returnToInventory(): Promise<void> {
    await this.locators.backToInventoryButton.click();
  }
}
