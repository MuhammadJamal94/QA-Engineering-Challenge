import { Locator, Page, expect } from "@playwright/test"
import { BasePage } from "./BasePage";

export class HomePage extends BasePage {
    readonly page: Page;
    readonly postalCode: Locator;
    readonly houseNumber: Locator;
    readonly houseNumberSuffixList: Locator;
    readonly calculateButton: Locator

    constructor(page: Page) {
        super(page);
        this.page = page;
        this.postalCode = page.locator('[name = "postalCode"]');
        this.houseNumber = page.locator('[name="houseNumber"]');
        this.houseNumberSuffixList = page.getByTestId('houseNumberSuffix');
        this.calculateButton = page.locator('[data-label="Bereken je maandbedrag"]');
    }

    async goTo() {
        await this.page.goto('https://www.eneco.nl/');
        await this.acceptCookies();
    }

    async checkAddressIsVisible(address: string) {
        await expect(this.page.getByText(address)).toBeVisible();
    }
}