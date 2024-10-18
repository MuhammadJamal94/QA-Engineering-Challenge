import { test, expect } from "@playwright/test";
import { HomePage } from "../pages/HomePage";
import { CalculatePage } from "../pages/CalculatePage";
import testData from "../data/testData.json";
import { OfferPage } from "../pages/OfferPage";

test.describe("Sales Flow Tests", () => {
  let homePage: HomePage;
  let calculatePage: CalculatePage;
  let offerPage: OfferPage;

  test.beforeEach(async ({ page }) => {
    homePage = new HomePage(page);
    calculatePage = new CalculatePage(page);
    offerPage = new OfferPage(page);

    await homePage.goTo();
  });

  test("check user can enter address successfully", async () => {
    await homePage.postalCode.fill(testData.postalCode);
    await homePage.houseNumber.fill(testData.houseNumber);
    await homePage.houseNumberSuffixList.selectOption(
      testData.houseNumberSuffixList
    );
    await homePage.checkAddressIsVisible(testData.address);
    await homePage.calculateButton.click();

    // calculate page
    await calculatePage.selectPowerOption("Stroom & gas");
    await calculatePage.nextButton.click();

    await calculatePage.enterDataMyslefOption.click();
    await calculatePage.nextButton.click();

    await calculatePage.annualElectricityConsumption.fill("1500");
    await calculatePage.offPeakElectricityConsumption.fill("500");
    await calculatePage.gasUsage.fill("222");
    await calculatePage.nextButton.click();

    await calculatePage.selectSolarPanelsOption("noPanels");
    await calculatePage.nextButton.click();

    await calculatePage.isMoving("false");
    await calculatePage.nextButton.click();

    // offer page
    await offerPage.fixedOption.check();
    await offerPage.selectRandomOffer();
  });
});
