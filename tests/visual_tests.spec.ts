import { test, expect } from "@playwright/test";
import path from "path";

test("Tredgate.cz Vizuální test stránky Playwright Akademie", async ({
  page,
}) => {
  await page.goto("https://tredgate.cz/playwright-akademie/"); // otevření stránky
  const denyButton = page.locator(".cmplz-deny"); // uložení tlačítka pro skrytí cookie banneru
  await denyButton.click(); // skrytí cookie banneru
  await expect(denyButton).not.toBeVisible(); // ověření, že cookie banner je skrytý

  await expect(page).toHaveScreenshot("tredgate-page-masked.png", {
    fullPage: true, // srovnání celé stránky
    animations: "disabled", // vypnutí animací
    mask: [
      // maskování elementů, které se mohou měnit
      page.locator("table#table_1"), // schování elementů, které se mohou měnit (tabulka s termíny)
    ],
  });
});

// Tento test nemaskuje elementy, které se mohou měnit, a proto bude pravděpodobně neúspěšný
test("potenciálně neúspěšný vizuální test - domovská stránka", async ({
  page,
}) => {
  await page.goto("https://tredgate.cz/"); // Domovská stránka se mění (recenze) a to včetně výšky elementů, což způsobí neúspěšný test
  const denyButton = page.locator(".cmplz-deny"); // uložení tlačítka pro skrytí cookie banneru
  await denyButton.click(); // skrytí cookie banneru
  await expect(denyButton).not.toBeVisible(); // ověření, že cookie banner je skrytý

  await expect(page).toHaveScreenshot("tredgate-home-page-failing.png", {
    fullPage: true, // zobrazení celé stránky
    animations: "disabled", // vypnutí animací
  });
});

test("Vizuální test částí domovské stránky", async ({ page }) => {
  await page.goto("https://tredgate.cz/"); // Domovská stránka se mění (recenze) a to včetně výšky elementů, což způsobí neúspěšný test
  const denyButton = page.locator(".cmplz-deny"); // uložení tlačítka pro skrytí cookie banneru
  await denyButton.click(); // skrytí cookie banneru
  await expect(denyButton).not.toBeVisible(); // ověření, že cookie banner je skrytý

  const coursesPanel = page.locator("#post-72"); // uložení panelu s kurzy
  await expect(coursesPanel).toHaveScreenshot("courses-panel.png"); // srovnání screenshotu panelu s kurzy
});

test("Vizuální testování - schování prvku dle CSS", async ({ page }) => {
  await page.goto("https://tredgate.cz/"); // Domovská stránka se mění (recenze) a to včetně výšky elementů, což způsobí neúspěšný test
  const denyButton = page.locator(".cmplz-deny"); // uložení tlačítka pro skrytí cookie banneru
  await denyButton.click(); // skrytí cookie banneru

  await expect(page).toHaveScreenshot("tredgate-home-page-hidden-element.png", {
    fullPage: true, // srovnání celé stránky
    animations: "disabled", // vypnutí animací
    stylePath: path.join(__dirname, "styles_to_hide.css"), // cesta k CSS souboru, který skryje elementy (v tomto případě je soubor umístěn ve stejné složce jako test)
  });
});
