import type { Page } from '@playwright/test';
import { InventoryLocators } from '../locators/InventoryLocators';

export interface InventoryProductDetails {
  name: string;
  description: string;
  price: number;
}

export class InventoryPage {
  readonly locators: InventoryLocators;

  constructor(page: Page) {
    this.locators = new InventoryLocators(page);
  }

  private async waitForProducts(): Promise<void> {
    await this.locators.productItems.first().waitFor({ state: 'visible' });
  }

  async getProductNames(): Promise<string[]> {
    await this.waitForProducts();
    const items = await this.locators.productItems.all();
    return Promise.all(items.map((item) => this.locators.productName(item).innerText()));
  }

  async getProductPrices(): Promise<number[]> {
    await this.waitForProducts();
    const items = await this.locators.productItems.all();
    return Promise.all(items.map(async (item) => {
      const priceText = await this.locators.productPrice(item).innerText();
      return Number(priceText.replace(/[^0-9.]/g, ''));
    }));
  }

  async getProductDetails(): Promise<InventoryProductDetails[]> {
    await this.waitForProducts();
    const items = await this.locators.productItems.all();
    return Promise.all(items.map(async (item) => {
      const [name, description, priceText] = await Promise.all([
        this.locators.productName(item).innerText(),
        this.locators.productDescription(item).innerText(),
        this.locators.productPrice(item).innerText(),
      ]);
      return {
        name,
        description,
        price: Number(priceText.replace(/[^0-9.]/g, '')),
      };
    }));
  }

  async getProductPriceText(name: string): Promise<string> {
    const item = this.locators.productItemByName(name);
    return this.locators.productPrice(item).innerText();
  }

  async getProductImageSource(name: string): Promise<string> {
    const item = this.locators.productItemByName(name);
    const source = await this.locators.productImage(item).getAttribute('src');
    if (source === null) {
      throw new Error(`Product image source is missing for "${name}"`);
    }
    return source;
  }

  async openProduct(name: string): Promise<void> {
    await this.locators.productName(this.locators.productItemByName(name)).click();
  }

  async addProductToCart(name: string): Promise<void> {
    await this.locators.addToCartButton(this.locators.productItemByName(name)).click();
  }

  async removeProductFromInventory(name: string): Promise<void> {
    await this.locators.removeButton(this.locators.productItemByName(name)).click();
  }

  async sortByNameDescending(): Promise<void> {
    await this.locators.sortControl.selectOption({ label: 'Name (Z to A)' });
  }

  async sortByPriceAscending(): Promise<void> {
    await this.locators.sortControl.selectOption({ label: 'Price (low to high)' });
  }

  async sortByPriceDescending(): Promise<void> {
    await this.locators.sortControl.selectOption({ label: 'Price (high to low)' });
  }
}