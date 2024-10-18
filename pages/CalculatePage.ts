import { Locator, Page, expect } from "@playwright/test";

export class CalculatePage {
  readonly page: Page;
  readonly nextButton: Locator;
  readonly electricityAndGazOption: Locator;
  readonly gazOnlyOption: Locator;
  readonly electricityOption: Locator;
  readonly enterDataMyslefOption: Locator;
  readonly helpMeOption: Locator;
  readonly annualElectricityConsumption: Locator;
  readonly offPeakElectricityConsumption: Locator;
  readonly gasUsage: Locator;
  readonly hasSolarPanels: Locator;
  readonly noSolarPanels: Locator;
  readonly isMovingOption: Locator;
  readonly notMovingOption: Locator;

  constructor(page: Page) {
    this.page = page;
    this.electricityAndGazOption = page.getByLabel("Stroom & gas");
    this.gazOnlyOption = page.getByLabel("Alleen gas");
    this.electricityOption = page.getByLabel("Alleen stroom");
    this.enterDataMyslefOption = page.getByLabel(
      "Ja, ik vul mijn verbruik zelf in"
    );
    this.helpMeOption = page.getByLabel("Nee, help mij inschatten");
    this.annualElectricityConsumption = page.locator(
      '[name="usageElectricityHigh"]'
    );
    this.offPeakElectricityConsumption = page.locator(
      '[name="usageElectricityLow"]'
    );
    this.gasUsage = page.locator('[name="usageGas"]');
    this.hasSolarPanels = page.getByLabel('Ja, ik wek zelf stroom op');
    this.noSolarPanels = page.getByLabel('Nee, ik wek zelf geen stroom');
    this.isMovingOption = page.getByLabel('Ja, ik ga verhuizen');
    this.notMovingOption = page.getByLabel('Nee, ik ga niet verhuizen');
    this.nextButton = page.getByRole("button", { name: "Volgende" });
  }

  // Method to select a radio button based on the option provided
  async selectPowerOption(option: string) {
    switch (option) {
      case "Stroom & gas":
        await this.electricityAndGazOption.check();
        await expect(this.electricityAndGazOption).toBeChecked();
        break;
      case "Alleen gas":
        await this.gazOnlyOption.check();
        await expect(this.gazOnlyOption).toBeChecked();
        break;
      case "Alleen stroom":
        await this.electricityOption.check();
        await expect(this.electricityOption).toBeChecked();
        break;
      default:
        throw new Error(`Option "${option}" is not valid.`);
    }
  }

  // Method to select solar panel radio button based on the option provided
  async selectSolarPanelsOption(option: string) {
    switch (option) {
      case "noPanels":
        await this.noSolarPanels.check();
        await expect(this.noSolarPanels).toBeChecked();
        break;
      case "hasPanels":
        await this.hasSolarPanels.check();
        await expect(this.hasSolarPanels).toBeChecked();
        break;
      default:
        throw new Error(`Option "${option}" is not valid.`);
    }
  }

  // Method to select moving status radio button based on the option provided
  async isMoving(option: string) {
    switch (option) {
      case "true":
        await this.isMovingOption.check();
        await expect(this.isMovingOption).toBeChecked();
        break;
      case "false":
        await this.notMovingOption.check();
        await expect(this.notMovingOption).toBeChecked();
        break;
      default:
        throw new Error(`Option "${option}" is not valid.`);
    }
  }
}
