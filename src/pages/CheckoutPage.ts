import type { Page } from '@playwright/test';
import { CheckoutLocators } from '../locators/CheckoutLocators';

export interface CheckoutInformation {
  firstName?: string;
  lastName?: string;
  postalCode?: string;
}

export interface CheckoutProductDetails {
  name: string;
  description: string;
  price: number;
  quantity: number;
}

export interface CheckoutTotals {
  itemTotal: number;
  tax: number;
  total: number;
}

export class CheckoutPage {
  readonly locators: CheckoutLocators;

  constructor(private readonly page: Page) {
    this.locators = new CheckoutLocators(page);
  }

  async start(): Promise<void> {
    await this.locators.checkoutButton.click();
    await this.locators.informationTitle.waitFor({ state: 'visible' });
  }

  async fillInformation(information: CheckoutInformation): Promise<void> {
    if (information.firstName !== undefined) {
      await this.locators.firstName.fill(information.firstName);
    }
    if (information.lastName !== undefined) {
      await this.locators.lastName.fill(information.lastName);
    }
    if (information.postalCode !== undefined) {
      await this.locators.postalCode.fill(information.postalCode);
    }
  }

  async continue(): Promise<void> {
    await this.locators.continueButton.click();
  }

  async cancelInformation(): Promise<void> {
    await this.locators.cancelButton.click();
  }

  async finish(): Promise<void> {
    await this.locators.finishButton.click();
    await this.locators.completeTitle.waitFor({ state: 'visible' });
  }

  async backHome(): Promise<void> {
    await this.locators.backHomeButton.click();
  }

  async getOverviewProducts(): Promise<CheckoutProductDetails[]> {
    await this.locators.overviewItems.first().waitFor({ state: 'visible' });
    const items = await this.locators.overviewItems.all();
    return Promise.all(items.map(async (item) => {
      const [name, description, priceText, quantityText] = await Promise.all([
        this.locators.cart.inventory.productName(item).innerText(),
        this.locators.cart.inventory.productDescription(item).innerText(),
        this.locators.cart.inventory.productPrice(item).innerText(),
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

  async getDisplayedTotals(): Promise<CheckoutTotals> {
    const [itemTotalText, taxText, totalText] = await Promise.all([
      this.locators.itemTotal.innerText(),
      this.locators.tax.innerText(),
      this.locators.total.innerText(),
    ]);
    const parseAmount = (text: string): number => Number(text.replace(/[^0-9.]/g, ''));

    return {
      itemTotal: parseAmount(itemTotalText),
      tax: parseAmount(taxText),
      total: parseAmount(totalText),
    };
  }
}