import { test, expect } from "@playwright/test";
import { HomePage } from "../pages/HomePage";
import { CalculatePage } from "../pages/CalculatePage";
import { OfferPage } from "../pages/OfferPage";
import { FactsPage } from "../pages/FactsPage";
import { ControlPage } from "../pages/ControlPage";
import testData from "../data/testData.json";

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

  test("check user can complete sales flow successfully", async () => {
    test.slow();
    await test.step("check user can enter address data successfully", async () => {
      await homePage.postalCode.fill(testData.postalCode);
      await homePage.houseNumber.fill(testData.houseNumber);
      await homePage.houseNumberSuffixList.selectOption(
        testData.houseNumberSuffixList
      );
      await homePage.checkAddressIsVisible(testData.address);
      await homePage.calculateButton.click();
    });

    await test.step("check user can select type of energy", async () => {
      // calculate page
      await calculatePage.selectPowerOption(
        testData.powerOption.gasAndElectricity
      );
      await calculatePage.nextButton.click();
    });

    await test.step("check user can select to enter data", async () => {
      await calculatePage.enterDataMyslefOption.click();
      await expect(calculatePage.enterDataMyslefOption).toBeChecked();
      await calculatePage.nextButton.click();
    });

    await test.step("check user can enter consumption data", async () => {
      await calculatePage.annualElectricityConsumption.fill(
        testData.powerConsumption.annualElectricity
      );
      await calculatePage.offPeakElectricityConsumption.fill(
        testData.powerConsumption.offPeakElectricity
      );
      await calculatePage.gasUsage.fill(testData.powerConsumption.gas);
      await calculatePage.nextButton.click();
    });

    await test.step("check user can select no solar panels option", async () => {
      await calculatePage.selectSolarPanelsOption("noPanels");
      expect(calculatePage.noSolarPanels).toBeChecked();
      await calculatePage.nextButton.click();
    });

    await test.step("check user can select not moving option", async () => {
      await calculatePage.isMoving("false");
      await expect(calculatePage.notMovingOption).toBeChecked();
      await calculatePage.nextButton.click();
    });

    await test.step("check user can select an offer", async () => {
      // offer page
      await offerPage.fixedOption.check();
      await offerPage.selectRandomOfferAndGetPrice();
      await offerPage.nextButton.click();
    });

    await test.step("check user can continue with co2 toggle not checked", async () => {
      await expect(offerPage.co2EmissionsToggle).not.toBeChecked();
      await offerPage.toYourOfferButton.click();
    });

    await test.step("check user can continue to facts page", async () => {
      await offerPage.toYourDataButton.click();
    });

    await test.step("check user can select date", async () => {
      // facts page
      const nextMonthDate = await factsPage.getNextMonthDate();
      await factsPage.selectDateFromPicker(nextMonthDate);
      await expect(factsPage.selectedDate).toHaveValue(nextMonthDate);
      await factsPage.nextButton.click();
    });

    await test.step("check user can confirm living address", async () => {
      // checked the address
      await factsPage.isLivingInAddress(true);
      await factsPage.nextButton.click();
    });

    await test.step("check user can fill personal information", async () => {
      await factsPage.fillPersonalInformation(testData.validUser);
      await factsPage.nextButton.click();
    });

    await test.step("check user can fill phoneNumber and email", async () => {
      await factsPage.phoneNumber.fill(testData.validUser.phoneNumber);
      await factsPage.email.fill(testData.validUser.email);
      await factsPage.checkYourOrderButton.click();
    });

    await test.step("check user information in control page", async () => {
      // control page
      test.slow();
      const personalInfo = await controlPage.getPersonalInfo();

      expect(personalInfo.name).toContain(
        `${testData.validUser.firstName} ${testData.validUser.surnamePrep} ${testData.validUser.lastName}`
      );
      expect(personalInfo.birthDate).toContain(
        `${testData.validUser.birth.day}-${testData.validUser.birth.month}-${testData.validUser.birth.year}`
      );
      expect(personalInfo.phone).toContain(testData.validUser.phoneNumber);
      expect(personalInfo.email).toContain(testData.validUser.email);
    });
  });

  test("check user cannot proceed with invalid postal code", async () => {
    await homePage.postalCode.fill(testData.invalidPostalCode);
    await homePage.houseNumber.fill(testData.houseNumber);
    await homePage.calculateButton.click();
    await expect(homePage.errorMessage).toBeVisible();
    await expect(homePage.errorMessage).toHaveText('Verplicht veld.');  
  });

  test("check user cannot proceed with missing house number", async () => {
    await homePage.postalCode.fill(testData.postalCode);
    await homePage.calculateButton.click();
    await expect(homePage.errorMessage).toBeVisible();
    await expect(homePage.errorMessage).toHaveText('Verplicht veld.');
  });

  test("check user cannot proceed with invalid consumption data", async () => {
    await homePage.postalCode.fill(testData.postalCode);
    await homePage.houseNumber.fill(testData.houseNumber);
    await homePage.houseNumberSuffixList.selectOption(
      testData.houseNumberSuffixList
    );
    await homePage.calculateButton.click();

    await calculatePage.selectPowerOption(testData.powerOption.gasAndElectricity);
    await calculatePage.nextButton.click();
    await calculatePage.enterDataMyslefOption.click();
    await calculatePage.nextButton.click();

    await calculatePage.annualElectricityConsumption.fill(testData.invalidPowerConsumption.annualElectricity);
    await calculatePage.nextButton.click();
    await expect(calculatePage.errorMessage).toBeVisible();
    await expect(calculatePage.errorMessage).toContainText('Geef een geldig stroomverbruik op tussen de 1 en 10.000 kWh.');
  });
});
