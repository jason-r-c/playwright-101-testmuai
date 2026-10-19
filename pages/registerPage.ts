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
        await this.page.locator('#input-firstname')
            .fill(firstName)
    }
    async enterLastName(lastName: string) {
        await this.page.locator('#input-lastname')
            .fill(lastName)
    }
    async enterEmail(email: string) {
        await this.page.locator('#input-email')
            .fill(email)
    }
    async enterTelephone(phone: string) {
        await this.page.locator('#input-telephone')
            .fill(phone)
    }
    async enterPassword(password: string) {
        await this.page.locator('#input-password')
            .fill(password)
    }
    async enterConfirmPassword(password: string) {
        this.page.getByRole('textbox', {name: 'confirm'})
            .fill(password)
    }

    /**
     * @JC
     * No need for async on this method.
     * async  makes a function return a Promise.
     * this.page.getByLabel() already returns a Locator immediately; it doesn't need await.
     * Removing async lets TypeScript infer the return type as Locator, which supports .toBeChecked()
     * 
     * @returns Locator for the subscribe checkbox
     */
    isSubscribedChecked() {
        //return this.page.getByLabel('input-newsletter-no')
        return this.page.locator('#input-newsletter-no')
    }
    async clickAgreedTermsAndConditions() {
        await this.page.locator('[for="input-agree"]')
            .click()
    }


    /**
     * @JC
     * 
     * Waits until the register page has fully loaded, 
     * then clicks on the register button
     */
    async clickContinueToRegister() {
        await Promise.all([
            this.page.waitForURL('**/register', {waitUntil: 'networkidle'}),
            this.page.locator('[value="Continue"]')
                .click()
        ])        
    }


}