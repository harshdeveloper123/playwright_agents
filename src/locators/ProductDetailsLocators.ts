import type { Locator, Page } from '@playwright/test';

export class ProductDetailsLocators {
  constructor(private readonly page: Page) {}

  productImage(name: string): Locator {
    return this.page.getByRole('img', { name, exact: true });
  }

  productName(name: string): Locator {
    return this.page.getByText(name, { exact: true });
  }

  productDescription(description: string): Locator {
    return this.page.getByText(description, { exact: true });
  }

  productPrice(price: string): Locator {
    return this.page.getByText(price, { exact: true });
  }

  get addToCartButton(): Locator {
    return this.page.getByRole('button', { name: 'Add to cart', exact: true });
  }

  get removeButton(): Locator {
    return this.page.getByRole('button', { name: 'Remove', exact: true });
  }

  get backToProductsButton(): Locator {
    return this.page.getByRole('button', { name: 'Back to products', exact: true });
  }
}
