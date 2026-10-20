import { Page, expect } from "@playwright/test"

export default class HomePage {

    constructor(public page: Page) { }

    async clickOnHomePageMenu() {
        await this.page.locator('#entry_217834 a')            
            .first().click()
    }
    async clickOnSpecialHotMenu() {
        await this.page.locator('#entry_217834 a')            
            .nth(1).click()
    }

    /**
     * Note
     * addFirstProductToTheCart() Dosnt work very well for some reason....
     * The page constanly jumps and fails frequently
     */
    async addFirstProductToTheCart() {
        const product = this.page.locator('#entry_218399 .image a').first()
        await product.scrollIntoViewIfNeeded()
        await product.hover()
    
        await this.page.locator('#entry_218399 .product-action button[title="Add to Cart"]')
            .first().click()            
    }

    async isToastVisible() {
        const toast = this.page.locator('//a[.="View Cart "]')
        await toast.waitFor({state: 'visible'})
        return toast        
    }
}