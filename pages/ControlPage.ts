import { Page } from "@playwright/test";

export class ControlPage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async getPersonalInfo() {
    await this.page.waitForSelector('div:has(h3:has-text("Je gegevens"))');

    // Selects the parent div containing "Je gegevens"
    const personalInfoContainerSelector = 'div:has(h3:has-text("Je gegevens"))';

    // More specific selector for each of the personal information fields
    const personalInfoFieldsSelector = `${personalInfoContainerSelector} p`;

    // Extract the text content of the relevant paragraphs
    const personalInfo = await this.page.$$eval(
      personalInfoFieldsSelector,
      (elements) => {
        return elements
          .slice(1)
          .map((element) => element.textContent?.trim() || "");
      }
    );

    // personalInfo will contain an array of the information
    const [name, birthDate, phone, email] = personalInfo;

    console.log(name);
    console.log(birthDate);
    console.log(phone);
    console.log(email);

    return {
      name,
      birthDate,
      phone,
      email,
    };
  }
}
