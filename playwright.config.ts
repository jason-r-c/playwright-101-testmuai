import { defineConfig, devices } from '@playwright/test';

/**
 * Read environment variables from file.
 * https://github.com/motdotla/dotenv
 */
// import dotenv from 'dotenv';
// import path from 'path';
// dotenv.config({ path: path.resolve(__dirname, '.env') });

/**
 * See https://playwright.dev/docs/test-configuration.
 */
export default defineConfig({
  testDir: './tests',
  /* Run tests in files in parallel */
  fullyParallel: true,
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,
  /* Retry on CI only */
  retries: process.env.CI ? 2 : 0,
  /* Opt out of parallel tests on CI. */
  workers: process.env.CI ? 1 : undefined,
  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  reporter: [
    ['html', { outputFolder: 'playwright-report' }],
    ['list'],
  ],
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  
  outputDir: 'test-results',

  /**
   * @JC
   * Runs the actual test specified in the array
   */
  // testMatch: ['tests/XXX.spec.ts'],

  use: {
    headless: false,
    /* Base URL to use in actions like `await page.goto('')`. */
    // baseURL: 'http://localhost:3000',

    /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
    trace: 'on',

    /** 
     * @JC
     * launchOptions > slowMo:
     * is a debugging option that deliberately slows down Playwright's actions, so you can actually watch what your test is doing. Playwright defines slowMo as the number of milliseconds by which Playwright operations are slowed down; the default is 0.
     */
    launchOptions: {
      slowMo: 1000
    },

    /**
     * @JC
     * baseURL
     * Sets the url of site that will always be used for testing against
     * This is the concept of 'fixtures'
     * To use in a test: test('Register test_01', async ({ page, baseURL }) => {}
     */
    baseURL: 'https://ecommerce-playground.lambdatest.io/index.php?route='
  },

  /* Configure projects for major browsers */
  projects: [
    // {
    //   name: 'chromium',
    //   use: { ...devices['Desktop Chrome'] },
    // },

    /**
     * @JC
     * Commented out as firefox has a bug upstream
     * See https://github.com/microsoft/playwright/issues/42768?utm_source=chatgpt.com
     
    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
    },
     */

    /**
     * @JC
     * Commented out purely just so Chrome runs
    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'] },
    },
    */

    /* Test against mobile viewports. */
    // {
    //   name: 'Mobile Chrome',
    //   use: { ...devices['Pixel 5'] },
    // },
    {
      name: 'Mobile Safari',
      use: { ...devices['iPhone 12'] },
    },

    /* Test against branded browsers. */
    // {
    //   name: 'Microsoft Edge',
    //   use: { ...devices['Desktop Edge'], channel: 'msedge' },
    // },
    // {
    //   name: 'Google Chrome',
    //   use: { ...devices['Desktop Chrome'], channel: 'chrome' },
    // },
  ],

  /* Run your local dev server before starting the tests */
  // webServer: {
  //   command: 'npm run start',
  //   url: 'http://localhost:3000',
  //   reuseExistingServer: !process.env.CI,
  // },
});
