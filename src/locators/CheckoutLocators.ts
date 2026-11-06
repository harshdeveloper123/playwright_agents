import type { Locator, Page } from '@playwright/test';
import { CartLocators } from './CartLocators';

export class CheckoutLocators {
  readonly cart: CartLocators;

  constructor(private readonly page: Page) {
    this.cart = new CartLocators(page);
  }

  get informationTitle(): Locator {
    return this.page.getByText('Checkout: Your Information', { exact: true });
  }

  get overviewTitle(): Locator {
    return this.page.getByText('Checkout: Overview', { exact: true });
  }

  get completeTitle(): Locator {
    return this.page.getByText('Checkout: Complete!', { exact: true });
  }

  get firstName(): Locator {
    return this.page.getByPlaceholder('First Name', { exact: true });
  }

  get lastName(): Locator {
    return this.page.getByPlaceholder('Last Name', { exact: true });
  }

  get postalCode(): Locator {
    return this.page.getByPlaceholder('Zip/Postal Code', { exact: true });
  }

  get error(): Locator {
    return this.page.getByText(/^Error: /);
  }

  get checkoutButton(): Locator {
    return this.page.getByRole('button', { name: 'Checkout', exact: true });
  }

  get continueButton(): Locator {
    return this.page.getByRole('button', { name: 'Continue', exact: true });
  }

  get cancelButton(): Locator {
    return this.page.getByRole('button', { name: 'Cancel', exact: true });
  }

  get finishButton(): Locator {
    return this.page.getByRole('button', { name: 'Finish', exact: true });
  }

  get backHomeButton(): Locator {
    return this.page.getByRole('button', { name: 'Back Home', exact: true });
  }

  get overviewItems(): Locator {
    return this.cart.cartItems;
  }

  quantity(item: Locator): Locator {
    return this.cart.quantity(item);
  }

  get itemTotal(): Locator {
    return this.page.getByText(/^Item total:/);
  }

  get tax(): Locator {
    return this.page.getByText(/^Tax:/);
  }

  get total(): Locator {
    return this.page.getByText(/^Total:/);
  }

  get paymentInformation(): Locator {
    return this.page.getByText('SauceCard #31337', { exact: true });
  }

  get shippingInformation(): Locator {
    return this.page.getByText(/^Free Pony Express Delivery!?$/);
  }

  get orderConfirmation(): Locator {
    return this.page.getByText('Thank you for your order!', { exact: true });
  }

  get dispatchConfirmation(): Locator {
    return this.page.getByText(
      'Your order has been dispatched, and will arrive just as fast as the pony can get there!',
      { exact: true },
    );
  }
}