// seed.spec.ts

import { test, expect } from '@playwright/test';
import { mkdir } from 'node:fs/promises';
import { LoginPage } from '../src/pages/LoginPage';

test('Authenticate and save browser state', async ({ page, browserName }) => {
  // Run the seed test only in Chromium to avoid multiple browsers
  // writing to the same authentication file.
  test.skip(browserName !== 'chromium', 'Seed authentication runs only in Chromium');

  const username = process.env.STANDARD_USERNAME;
  const password = process.env.STANDARD_PASSWORD;

  if (!username || !password) {
    throw new Error('STANDARD_USERNAME or STANDARD_PASSWORD is missing from .env');
  }

  const loginPage = new LoginPage(page);

  // 1. Open the application.
  await loginPage.navigateToLogin();

  // 2. Log in using the existing Page Object.
  await loginPage.login(username, password);

  // 3. Verify that authentication succeeded.
  await expect(loginPage.locators.authenticatedMarker).toBeVisible();

  // 4. Create the directory if it does not exist.
  await mkdir('playwright/.auth', { recursive: true });

  // 5. Save the authenticated browser state.
  await page.context().storageState({
    path: 'playwright/.auth/user.json',
  });
});