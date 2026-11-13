import type { Locator, Page } from '@playwright/test';

export class ProductDetailsLocators {
  constructor(private readonly page: Page) {}

  private get detailsContainer(): Locator {
    // The details section has no accessible container; scope these controls away from inventory cards.
    return this.page.locator('.inventory_details_desc_container');
  }

  productName(name: string): Locator {
    return this.page.getByText(name, { exact: true });
  }

  productDescription(description: string): Locator {
    return this.page.getByText(description, { exact: true });
  }

  productPrice(price: string): Locator {
    return this.detailsContainer.getByText(price, { exact: true });
  }

  productImage(name: string): Locator {
    return this.page.getByRole('img', { name, exact: true });
  }

  get addToCartButton(): Locator {
    return this.detailsContainer.getByRole('button', { name: 'Add to cart', exact: true });
  }

  get removeButton(): Locator {
    return this.page.getByRole('button', { name: 'Remove', exact: true });
  }

  get backToInventoryButton(): Locator {
    return this.page.getByRole('button', { name: 'Back to products', exact: true });
  }
}
