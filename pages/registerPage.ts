import { Page } from "@playwright/test"

export default class RegisterPage {
    /**
     * Constructor() 
     * is a special method that runs when you create an instance of a class.
     * 
     * constructor() — Runs when a new instance of the class is created.
     * public page — Creates a public property called page and assigns 
     * it the value passed into the constructor.
     * : Page — Specifies that page must be a Playwright Page object.
     * 
     * @param page 
     */
    constructor(public page: Page) { }

    /**
     * @JC
     * 
     * function keyword:
     * we do not need to declare the function keyword
     * as these are class methods
     * 
     * parameter type:
     * firstName specifies its type as string which is 
     * recommended
     */
    async enterFirstName(firstName: string) {
        await this.page.getByRole('textbox', {name: 'firstname'})
            .fill(firstName)
    }
    async enterLastName(lastName: string) {
        await this.page.getByRole('textbox', {name: 'lastname'})
            .fill(lastName)
    }
    async enterEmail(email: string) {
        await this.page.getByRole('textbox', {name: 'email'})
            .fill(email)
    }
    async enterTelephone(phone: string) {
        await this.page.getByRole('textbox', {name: 'telephone'})
            .fill(phone)
    }
    async enterPassword(password: string) {
        await this.page.getByRole('textbox', {name: 'password'})
            .fill(password)
    }
    async enterConfirmPassword(password: string) {
        await this.page.getByRole('textbox', {name: 'confirm'})
            .fill(password)
    }
    async isSubscribed() {
        return await this.page.getByLabel('input-newsletter-no').isChecked()
    }
    async clickAgreedTermsAndConditions() {
        await this.page.getByRole('textbox', {name: 'input-agree'}).click()
    }
    async clickContinueToRegister() {
        await this.page.getByRole('textbox', {name: 'Continue'}).click()
    }


}