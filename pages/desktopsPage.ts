import { Page } from "@playwright/test"

export default class DesktopsPage {
    
    constructor(public page: Page) { }

    async selectFirstDeskopItem() {
        await this.page.hover('//div[@class="image"]/a', {
            strict: false
        })
        
        await this.page.locator('//button[@title="Add to Cart"]')
            .nth(0).click()
    }

}