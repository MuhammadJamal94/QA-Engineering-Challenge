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
  readonly selectedDate: Locator;

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
    this.checkYourOrderButton = page.locator(
      '[data-label = "Controleer je bestelling"]'
    );
    this.selectedDate = page.locator('[name = "deliveryDate"]');
  }

  async selectDateFromPicker(date: string): Promise<void> {
    // Click the date input field to open the date picker
    await this.page.click('input[name="deliveryDate"]');

    // Wait for the date picker dialog to appear
    await this.page.waitForSelector('div[role="dialog"]');

    // Split the date into day, month, and year
    const [day, month, year] = date.split("-");

    // Select the year from the dropdown
    console.log(day, month, year);
    // await this.page.locator('select[name="years"]').waitFor();
    await this.page.locator('select[name="years"]').selectOption(year);

    // Click the day button in the calendar
    await this.page.click(
      `button[aria-label="${parseInt(day)} ${new Intl.DateTimeFormat("nl-NL", {
        month: "long",
      }).format(new Date(`${year}-${month}-01`))} ${year}"]`
    );
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

  async getNextMonthDate(): Promise<string> {
    const today = new Date();
    const nextMonth = new Date(today.setMonth(today.getMonth() + 1));

    const day = nextMonth.getDate().toString().padStart(2, "0");
    const month = (nextMonth.getMonth() + 1).toString().padStart(2, "0");
    const year = nextMonth.getFullYear().toString();

    return `${day}-${month}-${year}`;
  }
}
