import { defineConfig, devices } from '@playwright/test';

import dotenv from 'dotenv';
dotenv.config();

export default defineConfig({
  testDir: './tests',

  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: 'html',

  use: {
    baseURL: process.env.BASE_URL,
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
     video: 'retain-on-failure',
  },

  projects: [
    // Runs authentication before the other projects.
    {
      name: 'setup',
      testMatch: '**/seed.spec.ts',
      use: {
        ...devices['Desktop Chrome'],
      },
    },

    // Chromium tests reuse the saved authentication state.
    {
      name: 'chromium',
      testIgnore: '**/seed.spec.ts',
      dependencies: ['setup'],
      use: {
        ...devices['Desktop Chrome'],
        storageState: 'playwright/.auth/user.json',
      },
    },

    // Firefox tests reuse the saved authentication state.
    {
      name: 'firefox',
      testIgnore: '**/seed.spec.ts',
      dependencies: ['setup'],
      use: {
        ...devices['Desktop Firefox'],
        storageState: 'playwright/.auth/user.json',
      },
    },

    // WebKit tests reuse the saved authentication state.
    {
      name: 'webkit',
      testIgnore: '**/seed.spec.ts',
      dependencies: ['setup'],
      use: {
        ...devices['Desktop Safari'],
        storageState: 'playwright/.auth/user.json',
      },
    },
  ],
});