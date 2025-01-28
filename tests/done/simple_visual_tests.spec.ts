import { test, expect } from "@playwright/test";

test("Simple Visual Test", async ({ page }) => {
  await page.goto("https://tredgate.com/eshop");
  // Homepage obsahuje dynamické prvky, otevřeme si produkt, jehož vzhled je stabilní
  await page.getByText("Apple Cinema 30").click();
  // Počkáme na načtení detailu produktu
  await expect(page.locator("h1")).toHaveText('Apple Cinema 30"');
  // Provedeme vizuální kontrolu
  await expect(page).toHaveScreenshot("simple-eshop.png");
});

test("Simple Full Page Visual Test", async ({ page }) => {
  await page.goto("https://tredgate.com/eshop");
  // Homepage obsahuje dynamické prvky, otevřeme si produkt, jehož vzhled je stabilní
  await page.getByText("Apple Cinema 30").click();
  // Počkáme na načtení detailu produktu
  await expect(page.locator("h1")).toHaveText('Apple Cinema 30"');
  // Provedeme vizuální kontrolu
  await expect(page).toHaveScreenshot("simple-eshop-full-page.png", {
    fullPage: true, // Tento parametr zajistí, že se zachytí celá stránka
  });
});

// Tento test je připravený pro nasimulování pádu vizuálního testu
test.skip("Failed Visual Test", async ({ page }) => {
  await page.goto("https://tredgate.com/eshop");
  // Spusťte generování snapshotu bez timeoutu, následně pro nasimulování pádu animací odstraňte komentář z následujícího řádku
  //await page.waitForTimeout(5000);
  await expect(page).toHaveScreenshot(
    "simple-eshop-full-page-no-animations.png",
    {
      fullPage: true,
    }
  );
});
