import test, { expect } from "@playwright/test";
import path from "path";

test("Masking Dynamic Data in Projects Table", async ({ page }) => {
  await page.goto("https://tredgate.com/pmtool");
  // Přihlásíme se do aplikace
  await page.locator("#username").fill("protest");
  await page.locator("#password").fill("copilotProtest1");
  await page.locator("[type='submit']").click();
  // Otevřeme stránku s projekty
  await page.locator("#Projects").click();
  // Počkáme na načtení tabulky s projekty
  await expect(page.locator(".table-striped")).toBeVisible();
  // Provedeme vizuální kontrolu s maskováním dynamických dat
  await expect(page).toHaveScreenshot("projects-table-masked.png", {
    mask: [
      page.locator("//td"), // Maskování všech buněk tabulky
      page.locator('[test_id="search_input"]'), // Maskování vyhledávacího pole
    ],
    fullPage: true,
  });
});

test("Hiding Dynamic Data by CSS in Tredgate.cz", async ({ page }) => {
  await page.goto("https://tredgate.cz/");
  await page.locator(".cmplz-deny").click(); // skrytí cookie banneru
  await expect(page).toHaveScreenshot("tredgate-hidden-elements.png", {
    fullPage: true,
    stylePath: path.resolve(__dirname, "homepage_hidden_elements.css"), // Cesta k CSS, který skryje dynamické prvky na stránce pomocí   visibility: hidden; display: none;
  });
});
