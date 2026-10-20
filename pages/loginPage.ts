import { Page } from "@playwright/test"

export default class LoginPage  {

    constructor(public page: Page) { }

    async login(email, password) {
        await this.enterEmail(email)
        await this.enterPassword(password)
        await this.clickLogin()
    }

    async enterEmail(email: string) {
        await this.page.locator('#input-email')//getByRole('textbox', {name: 'email'})
            .fill(email)
    }

    async enterPassword(password: string) {
        await this.page.getByRole('textbox', {name: 'password'})
            .fill(password)
    }

    /**
     * @JC
     * waitForLoadState() is just one way to wait before doing the login click
     * 
     * Something like:
     * await expect(page.getByRole('heading', { name: 'Dashboard' })).toBeVisible()
     * may be better as it checks for an element to be visible
     * 
     */
    async clickLogin() {
        await Promise.all([
            this.page.waitForLoadState('domcontentloaded'),
            await this.page.getByRole('button', {name: 'Login'})
                .click()            
        ])
    }
}