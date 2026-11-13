import type { Locator, Page } from '@playwright/test';

export class LoginLocators {
  constructor(private readonly page: Page) {}

  get username(): Locator {
    return this.page.getByPlaceholder('Username');
  }

  get password(): Locator {
    return this.page.getByRole('textbox', { name: 'Password' });
  }

  get submitButton(): Locator {
    return this.page.getByRole('button', { name: 'Login' });
  }

  get error(): Locator {
    // SauceDemo exposes this stable data-test hook; its attribute is not Playwright's default test-id.
    return this.page.locator('[data-test="error"]');
  }

  get authenticatedMarker(): Locator {
    return this.page.getByText('Products', { exact: true });
  }
}