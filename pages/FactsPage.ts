import { Locator, Page } from "@playwright/test";

export class FactsPage {
  readonly page: Page;
  readonly deliveryDate: Locator;
  readonly nextButton: Locator;
  readonly dhrRadioBtn: Locator;
  readonly mevrRadioBtn: Locator;
  readonly firstName: Locator;
  readonly lastName: Locator;
  readonly initials: Locator;
  readonly surnamePrep: Locator;
  readonly birthDay: Locator;
  readonly birthMonth: Locator;
  readonly birthYear: Locator;
  readonly phoneNumber: Locator;
  readonly email: Locator;
  readonly checkYourOrderButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.dhrRadioBtn = page.locator('[data-label = "Dhr."]');
    this.mevrRadioBtn = page.locator('[data-label = "Mevr."]');
    this.firstName = page.locator('[name = "firstName"]');
    this.lastName = page.locator('[name = "surname"]');
    this.initials = page.locator('[name = "initials"]');
    this.surnamePrep = page.locator('[name = "surnamePreposition"]');
    this.birthDay = page.locator('[name = "day"]');
    this.birthMonth = page.locator('[name = "month"]');
    this.birthYear = page.locator('[name = "year"]');
    this.phoneNumber = page.locator('[name = "phoneNumber"]');
    this.email = page.locator('[name = "emailAddress"]');
    this.nextButton = page.locator('[data-label = "Volgende"]');
    this.checkYourOrderButton = page.locator('[data-label = "Controleer je bestelling"]');
  }

  async selectDateFromPicker(date: string): Promise<void> {
    // Click the date input field to open the date picker
    await this.page.click('input[name="deliveryDate"]');

    // Assume you can pick the day from a date picker after that
    // If the picker opens a calendar, you can interact with it:
    // This is just a generic example, you will need to adjust the locator according to your DOM
    await this.page.click(`text=${date}`);
  }

  async fillPersonalInformation(userInfo: {
    salutation: string;
    firstName: string;
    lastName: string;
    initials: string;
    surnamePrep: string;
    birth: {
      day: string;
      month: string;
      year: string;
    };
  }) {
    await this.page.locator(`[data-label = "${userInfo.salutation}"]`).click();
    await this.firstName.fill(userInfo.firstName);
    await this.lastName.fill(userInfo.lastName);
    await this.initials.fill(userInfo.initials);
    await this.surnamePrep.fill(userInfo.surnamePrep);
    await this.birthDay.fill(userInfo.birth.day);
    await this.birthMonth.fill(userInfo.birth.month);
    await this.birthYear.fill(userInfo.birth.year);
  }

async isLivingInAddress(answer: boolean): Promise<void> {
    try {
      const label = answer ? "Ja" : "Nee";
      const option = this.page.getByLabel(label);
      
      if (option) {
        await option.click();
      } else {
        throw new Error(`Option ${label} not found.`);
      }
    } catch (error) {
      console.error("Failed to select an option:", error);
      throw error;
    }
  }
}
