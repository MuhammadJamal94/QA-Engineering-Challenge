import { Locator, Page } from "@playwright/test"

export class HomePage {
    readonly page: Page;
    readonly postalCode: Locator;
    readonly houseNumber: Locator;
    readonly houseNumberSuffixList: Locator;
    readonly calculateButton: Locator

    constructor(page: Page) {
        this.page = page;
        this.postalCode = page.locator('[name = "postalCode"]');
        this.houseNumber = page.locator('[name="houseNumber"]');
        this.houseNumberSuffixList = page.getByTestId('houseNumberSuffix');
        this.calculateButton = page.locator('[data-label="Bereken je maandbedrag"]');
    }

    async goTo() {
        await this.page.goto('https://www.eneco.nl/');
    }
}