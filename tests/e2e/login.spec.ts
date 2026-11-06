import { expect, test } from '@playwright/test';
import { LoginPage } from '../../src/pages/LoginPage';

const standardUsername = process.env.STANDARD_USERNAME;
const standardPassword = process.env.STANDARD_PASSWORD;
const lockedUsername = process.env.LOCKED_USERNAME;
const lockedPassword = process.env.LOCKED_PASSWORD;

async function expectLoginError(loginPage: LoginPage): Promise<void> {
  await expect(loginPage.locators.error).toBeVisible();
  await expect(loginPage.locators.error).toHaveText(/\S/);
}

test.describe('SauceDemo login', () => {
  test.beforeEach(async ({ page }) => {
    test.skip(!process.env.BASE_URL, 'Set BASE_URL in the root .env file.');
    await new LoginPage(page).navigateToLogin();
  });

  test('signs in with the standard user', async ({ page }) => {
    test.skip(
      !standardUsername || !standardPassword,
      'Set STANDARD_USERNAME and STANDARD_PASSWORD in the root .env file.',
    );

    const loginPage = new LoginPage(page);
    await loginPage.login(standardUsername!, standardPassword!);

    await expect(loginPage.locators.authenticatedMarker).toBeVisible();
  });

  test('rejects invalid credentials', async ({ page }) => {
    test.skip(
      !standardUsername || !standardPassword,
      'Set STANDARD_USERNAME and STANDARD_PASSWORD in the root .env file.',
    );

    const loginPage = new LoginPage(page);
    await loginPage.login(`${standardUsername!}_invalid`, standardPassword!);

    await expectLoginError(loginPage);
    await expect(loginPage.locators.authenticatedMarker).not.toBeVisible();
  });

  test('rejects the locked-out user', async ({ page }) => {
    test.skip(
      !lockedUsername || !lockedPassword,
      'Set LOCKED_USERNAME and LOCKED_PASSWORD in the root .env file.',
    );

    const loginPage = new LoginPage(page);
    await loginPage.login(lockedUsername!, lockedPassword!);

    await expectLoginError(loginPage);
    await expect(loginPage.locators.authenticatedMarker).not.toBeVisible();
  });

  test('validates both required fields when empty', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.submit();

    await expectLoginError(loginPage);
  });

  test('validates an empty username', async ({ page }) => {
    test.skip(!standardPassword, 'Set STANDARD_PASSWORD in the root .env file.');

    const loginPage = new LoginPage(page);
    await loginPage.enterPassword(standardPassword!);
    await loginPage.submit();

    await expectLoginError(loginPage);
  });

  test('validates an empty password', async ({ page }) => {
    test.skip(!standardUsername, 'Set STANDARD_USERNAME in the root .env file.');

    const loginPage = new LoginPage(page);
    await loginPage.enterUsername(standardUsername!);
    await loginPage.submit();

    await expectLoginError(loginPage);
  });

  test('masks the password input', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.enterPassword('non-sensitive-test-value');

    await expect(loginPage.locators.password).toHaveAttribute('type', 'password');
  });
});
