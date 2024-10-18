import { Locator, Page, expect } from "@playwright/test";

export class OfferPage {
  readonly page: Page;
  readonly dynamicOption: Locator;
  readonly fixedOption: Locator;
  readonly nextButton: Locator;
  readonly cardsOptions: Locator;
  readonly toYourOfferButton: Locator;
  readonly co2EmissionsToggle: Locator;
  readonly toYourDataButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.dynamicOption = page.getByLabel("Dynamisch");
    this.fixedOption = page.getByLabel("Vast");
    this.nextButton = page.getByRole("button", { name: "Volgende" });
    this.cardsOptions = page.locator(".sparky-cardOverlay");
    this.toYourOfferButton = page.locator('[data-label="Naar je aanbod"]');
    this.co2EmissionsToggle = page.locator('#hasUpsellGas');
    this.toYourDataButton = page.locator('[data-label="Naar je gegevens"]');
  }

  async selectRandomOfferAndGetPrice() {
    const offers = await this.cardsOptions.count();

    if (offers > 0) {
      const randomIndex = Math.floor(Math.random() * offers); // Generate a random index between 0 and offers-1
      const selectedOffer = this.cardsOptions.nth(randomIndex);

      // Click the randomly selected offer
      await selectedOffer.click();

      // Locate the price element based on its structure or surrounding elements (span within a specific parent)
      const priceText = await selectedOffer
        .locator("span.sparky-text")
        .nth(1)
        .textContent(); // Adjust as needed

      console.log(`Selected Offer Index: ${randomIndex}, Price: ${priceText}`);
      return priceText; // Optionally return the price
    } else {
      throw new Error("No offers available to select.");
    }
  }

  // async selectRandomOffer() {
  //     const offers = await this.cardsOptions.count();

  //     if (offers > 0) {
  //         const randomIndex = Math.floor(Math.random() * offers);  // Generate a random index between 0 and offers-1
  //         await this.cardsOptions.nth(randomIndex).click();  // Click the offer at the random index
  //     } else {
  //         throw new Error('No offers available to select.');
  //     }
  // }
}
