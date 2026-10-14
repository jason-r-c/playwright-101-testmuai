import { Page } from "@playwright/test"

export default class LoginPage  {

    constructor(public page: Page) { }

    async enterEmail(email: string) {
        await this.page.getByRole('textbox', {name: 'email'})
            .fill(email)
    }

    async enterPassword(password: string) {
        await this.page.getByRole('textbox', {name: 'password'})
            .fill(password)
    }

    async clickLogin() {
        await this.page.getByRole('button', {name: 'Login'})
    }
}