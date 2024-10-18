import { Locator, Page, expect } from "@playwright/test";

export class OfferPage {
    readonly page: Page;
    readonly dynamicOption: Locator;
    readonly fixedOption: Locator;
    readonly nextButton: Locator;
    readonly cardsOptions: Locator;

    constructor(page: Page) {
        this.page = page;
        this.dynamicOption = page.getByLabel('Dynamisch');
        this.fixedOption = page.getByLabel('Vast');
        this.nextButton = page.getByRole("button", { name: "Volgende" }); 
        this.cardsOptions = page.locator('.sparky-cardOverlay');      
    }

    async selectRandomOffer() {
        const offers = await this.cardsOptions.count();
        await this.cardsOptions.nth(1).click();
    }
}