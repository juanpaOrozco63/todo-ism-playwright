import { Locator, Page } from "@playwright/test";

export class Principal {
    private readonly page: Page;
    private readonly loginLink: Locator;

    constructor(page: Page) {
        this.page = page;
        this.loginLink = this.page
                            .getByRole('navigation')
                            .getByRole('link', { name: 'Login' });
    }

    openWebPage = async () => {
        await this.page.goto('http://127.0.0.1:5000/#intro');
    }

    clickOnLogin = async () => {
        await this.loginLink.click();
    }
}
