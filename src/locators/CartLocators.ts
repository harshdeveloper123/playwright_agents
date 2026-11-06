import type { Locator, Page } from '@playwright/test';
import { InventoryLocators } from './InventoryLocators';

export class CartLocators {
  readonly inventory: InventoryLocators;

  constructor(private readonly page: Page) {
    this.inventory = new InventoryLocators(page);
  }

  get cartLink(): Locator {
    // The standard SauceDemo cart icon has no text label, so use its stable data-test hook.
    return this.page.locator('[data-test="shopping-cart-link"]');
  }

  get cartBadge(): Locator {
    return this.page.locator('[data-test="shopping-cart-badge"]');
  }

  get heading(): Locator {
    return this.page.getByText('Your Cart', { exact: true });
  }

  get cartItems(): Locator {
    return this.inventory.productItems;
  }

  cartItemByName(name: string): Locator {
    return this.cartItems.filter({ has: this.page.getByText(name, { exact: true }) });
  }

  quantity(item: Locator): Locator {
    return item.locator('[data-test="item-quantity"]');
  }
}
