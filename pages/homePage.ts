import { Page } from "@playwright/test"

export default class HomePage {

    constructor(public page: Page) { }

    async clickOnSpecialHotMenu() {
        await this.page.locator('span').filter({ hasText: 'Special' })
            .first().click()
    }
}