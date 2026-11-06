import type { Page } from '@playwright/test';
import { CartLocators } from '../locators/CartLocators';

export interface CartProductDetails {
  name: string;
  description: string;
  price: number;
  quantity: number;
}

export class CartPage {
  readonly locators: CartLocators;

  constructor(page: Page) {
    this.locators = new CartLocators(page);
  }

  async open(): Promise<void> {
    await this.locators.cartLink.click();
    await this.locators.heading.waitFor({ state: 'visible' });
  }

  async getProductNames(): Promise<string[]> {
    const items = await this.locators.cartItems.all();
    return Promise.all(items.map((item) => this.locators.inventory.productName(item).innerText()));
  }

  async getProductDetails(): Promise<CartProductDetails[]> {
    const items = await this.locators.cartItems.all();
    return Promise.all(items.map(async (item) => {
      const [name, description, priceText, quantityText] = await Promise.all([
        this.locators.inventory.productName(item).innerText(),
        this.locators.inventory.productDescription(item).innerText(),
        this.locators.inventory.productPrice(item).innerText(),
        this.locators.quantity(item).innerText(),
      ]);

      return {
        name,
        description,
        price: Number(priceText.replace(/[^0-9.]/g, '')),
        quantity: Number(quantityText),
      };
    }));
  }

  async removeProduct(name: string): Promise<void> {
    const item = this.locators.cartItemByName(name);
    await this.locators.inventory.removeButton(item).click();
  }
}
