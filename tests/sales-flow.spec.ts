import { test, expect } from "@playwright/test";
import { HomePage } from "../pages/HomePage";

test.describe("Sales Flow Tests", () => {
  let homePage: HomePage;

  test.beforeEach(async ({page}) => {
    homePage = new HomePage(page);

    await homePage.goTo();
    await page.locator('[data-label="Accepteren"]').click();
  });

  test('check user can enter address successfully', async () => {
    await homePage.postalCode.fill('9713RD');
    await homePage.houseNumber.fill('63');
    await homePage.houseNumberSuffixList.selectOption('A');
  });
});
