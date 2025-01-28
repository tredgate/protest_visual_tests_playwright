import test, { expect } from "@playwright/test";

test("Simple Section Visual Test", async ({ page }) => {
  await page.goto("https://tredgate.com/pmtool");
  await expect(page.locator(".content-login")).toHaveScreenshot(
    "login-form.png"
  );
});

test("Single Element Visual Test", async ({ page }) => {
  await page.goto("https://tredgate.com/pmtool");
  await expect(page.locator("#username")).toHaveScreenshot(
    "username-input.png"
  );
});
