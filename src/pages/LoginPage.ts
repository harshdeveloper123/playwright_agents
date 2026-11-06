import type { Page } from '@playwright/test';
import { LoginLocators } from '../locators/LoginLocators';

export class LoginPage {
  readonly locators: LoginLocators;

  constructor(private readonly page: Page) {
    this.locators = new LoginLocators(page);
  }

  async navigateToLogin(): Promise<void> {
    await this.page.goto('/');
  }

  async enterUsername(username: string): Promise<void> {
    await this.locators.username.fill(username);
  }

  async enterPassword(password: string): Promise<void> {
    await this.locators.password.fill(password);
  }

  async submit(): Promise<void> {
    await this.locators.submitButton.click();
  }

  async login(username: string, password: string): Promise<void> {
    await this.enterUsername(username);
    await this.enterPassword(password);
    await this.submit();
  }
}