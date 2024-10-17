import { Page } from "@playwright/test";

export class BasePage {
    protected page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    // Accept Cookies Function
    async acceptCookies() {
        const acceptButton = this.page.getByRole('button', { name: 'Accepteren' });
        if(acceptButton) {
            await acceptButton.click();
        }
    }
}