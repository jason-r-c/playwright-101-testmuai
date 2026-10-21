import {test, Page, expect } from "@playwright/test"

/**
 * @JC
 * 
 * Here: 
 * - Import all classes so that we can instantiate/create instances of class
 */
import RegisterPage from "../../pages/registerPage"
import LoginPage from "../../pages/loginPage"
import HomePage from "../../pages/homePage"
import SpecialHotPage from "../../pages/specialHotPage"
import DesktopsPage from "../../pages/desktopsPage"

const email = 'john.doe@test3.com'
const password = 'pass123'

 /**
  * @JC
  * Useful on a test by test basis for specifyng which browser to use
  * 
    test.use({
        browserName: "webkit"
    })
*/

/**
 * @JC 
 * test.describe(): Runs all test scenarios at once/in parallel
 */
test.describe("Page object test demo", async () => {
        
    // Overrides the baseURL varible set in playwright.config.ts.
    // It only overrides it in this file/all test scenarios in this file.
    /* UNCOMMENT TO USE
    test.use({
        baseURL: 'override-base-url.com'
    })
    */

    /**
     * @JC
     * Registers with a new email address every time test scenario is ran.
     */
    test('Register test_01', async ({ page, baseURL }) => {  

        // Random email address for every time test scenario is ran
        let randomNumber = Math.floor(Math.random() * 9000) +1000
        let emailForRegistrationOnly = randomNumber+email
        
        const register = new RegisterPage(page)
        await page.goto(`${baseURL}account/register`)
        
        await register.enterFirstName('John')
        await register.enterLastName('Doe')
        
        await register.enterEmail(email)
        await register.enterTelephone('12345678910')
        await register.enterPassword(password)
        await register.enterConfirmPassword(password)
        
        /**
         * @JC 
         * toBeChecked()is an example of a web first assertion
         */
        await expect(register.isSubscribedChecked()).toBeChecked()

        await register.clickAgreedTermsAndConditions()
        await register.clickContinueToRegister()

        //await page.pause()   
    })

    /**
     * @JC
     * Presumes existing john.doe@test.com email address exists.
     * If fails, simply manually create, or, edit Register test_01 so it uses email
     * then run independently
     */
    test('Login test_02', async ({ page, baseURL }) => {
        const login = new LoginPage(page)
        await page.goto(`${baseURL}account/login`)
        await login.enterEmail(email)
        await login.enterPassword(password)
        await login.clickLogin()
        expect(await page.title()).toBe('My Account')

        //await page.pause()
    })

    /**
     * @JC
     * Presumes existing john.doe@test.com email address exists.
     * If fails, simply manually create, or, edit Register test_01 so it uses email
     * then run independently
     */
    test('Add to cart test_03', async ({ page, baseURL }) => {
        
        const login = new LoginPage(page)
        const homePage = new HomePage(page)
        const specialHotPage = new SpecialHotPage(page)
        const desktopsPage = new DesktopsPage(page)

        await page.goto(`${baseURL}account/login`)
        await login.login(email, password)

        await homePage.clickOnSpecialHotMenu()
        
        // Click Desktops in sidebar
        await specialHotPage.clickDesktopsCategory()
        
        // Desktops page
        await desktopsPage.selectFirstDeskopItem()
            
        // Confirms the cart notification is displyed
        const isCartVisible = await homePage.isToastVisible()
        await expect(isCartVisible).toBeVisible()

        //await page.pause()
    })        


})