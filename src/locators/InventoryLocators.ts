import type { Locator, Page } from '@playwright/test';
import { LoginLocators } from './LoginLocators';

export class InventoryLocators {
  constructor(private readonly page: Page) {}

  get heading(): Locator {
    return new LoginLocators(this.page).authenticatedMarker;
  }

  get productItems(): Locator {
    // Product cards and details lack semantic grouping/labels; use SauceDemo's stable data-test hooks.
    return this.page.locator('[data-test="inventory-item"]');
  }

  get sortControl(): Locator {
    return this.page.getByRole('combobox', { name: 'Sort products' });
  }

  productItemByName(name: string): Locator {
    return this.productItems.filter({ has: this.page.getByText(name, { exact: true }) });
  }

  addToCartButton(item: Locator): Locator {
    return item.getByRole('button', { name: 'Add to cart', exact: true });
  }

  removeButton(item: Locator): Locator {
    return item.getByRole('button', { name: 'Remove', exact: true });
  }

  productName(item: Locator): Locator {
    return item.locator('[data-test="inventory-item-name"]');
  }

  productDescription(item: Locator): Locator {
    return item.locator('[data-test="inventory-item-desc"]');
  }

  productPrice(item: Locator): Locator {
    return item.locator('[data-test="inventory-item-price"]');
  }

  productImage(item: Locator): Locator {
    return item.getByRole('img');
  }
}