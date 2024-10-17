import { test, expect } from "@playwright/test";
import { HomePage } from "../pages/HomePage";
import testData from "../data/testData.json"

test.describe("Sales Flow Tests", () => {
  let homePage: HomePage;

  test.beforeEach(async ({page}) => {
    homePage = new HomePage(page);

    await homePage.goTo();
  });

  test('check user can enter address successfully', async () => {
    await homePage.postalCode.fill(testData.postalCode);
    await homePage.houseNumber.fill(testData.houseNumber);
    await homePage.houseNumberSuffixList.selectOption(testData.houseNumberSuffixList);
    await homePage.checkAddressIsVisible(testData.address);
  });
});
