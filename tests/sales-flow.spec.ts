import { test, expect } from "@playwright/test";
import { HomePage } from "../pages/HomePage";
import { CalculatePage } from "../pages/CalculatePage";
import testData from "../data/testData.json";
import { OfferPage } from "../pages/OfferPage";
import { FactsPage } from "../pages/FactsPage";
import { ControlPage } from "../pages/ControlPage";

test.describe("Sales Flow Tests", () => {
  let homePage: HomePage;
  let calculatePage: CalculatePage;
  let offerPage: OfferPage;
  let factsPage: FactsPage;
  let controlPage: ControlPage;

  test.beforeEach(async ({ page }) => {
    homePage = new HomePage(page);
    calculatePage = new CalculatePage(page);
    offerPage = new OfferPage(page);
    factsPage = new FactsPage(page);
    controlPage = new ControlPage(page);

    await homePage.goTo();
  });

  test("check user can enter address successfully", async ( {page} ) => {
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
    await offerPage.selectRandomOfferAndGetPrice();
    await offerPage.nextButton.click();

    await expect(offerPage.co2EmissionsToggle).not.toBeChecked();
    await offerPage.toYourOfferButton.click();

    await offerPage.toYourDataButton.click();

    // facts page
    // await factsPage.selectDateFromPicker('12-12-2024'); To be fixed
    await factsPage.nextButton.click();

    await factsPage.isLivingInAddress(true);

    await factsPage.nextButton.click();

    await factsPage.fillPersonalInformation(testData.validUser);
    await factsPage.nextButton.click();

    await factsPage.phoneNumber.fill(testData.validUser.phoneNumber);
    await factsPage.email.fill(testData.validUser.email);
    await factsPage.checkYourOrderButton.click();

    // control page
    await controlPage.getPersonalInfo();

  });
});
