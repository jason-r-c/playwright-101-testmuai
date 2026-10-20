import { Page } from "@playwright/test"

export default class SpecialHotPage {
    
    constructor(public page: Page) { }

    async addFirstProductToTheCart() { }

    async clickDesktopsCategory() {
        await this.page.locator('#entry_212503 a')
            .first().click()
    }

}