import { test } from "../../fixture/pomFixture"
import { Page, expect } from "@playwright/test"

/**
 * @JC
 * Pulls in json data so can use in the test script.
 */
import * as data from "../../test-data/addToCart.test.data.json"

/**
 * @JC
 * 
 * Here:
 * - Imports no longer used as we are using Fixtures in place of separate imports.
 * Therefore Commented out.
 
 import RegisterPage from "../../pages/registerPage"
 import LoginPage from "../../pages/loginPage"
 import HomePage from "../../pages/homePage"
 import SpecialHotPage from "../../pages/specialHotPage"
 import DesktopsPage from "../../pages/desktopsPage"
 */ 

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
    test('Register test_01', async ({ page, baseURL, registerPage }) => {  

        // Random email address for every time test scenario is ran
        let randomNumber = Math.floor(Math.random() * 9000) +1000
        let emailForRegistrationOnly = randomNumber+data.email

        /**
         * @JC
         * As we are using the registerPage fixture we dont need to create instance of class                
         //const register = new RegisterPage(page)
         */

        await page.goto(`${baseURL}account/register`)        
        await registerPage.enterFirstName(data.firstname)
        await registerPage.enterLastName(data.lastname)        
        await registerPage.enterEmail(emailForRegistrationOnly)
        await registerPage.enterTelephone(data.phone_number)
        await registerPage.enterPassword(data.password)
        await registerPage.enterConfirmPassword(data.password)
        
        /**
         * @JC 
         * toBeChecked()is an example of a web first assertion
         */
        await expect(registerPage.isSubscribedChecked()).toBeChecked()

        await registerPage.clickAgreedTermsAndConditions()
        await registerPage.clickContinueToRegister()

        //await page.pause()   
    })

    /**
     * @JC
     * Presumes existing john.doe@test.com email address exists.
     * If fails, simply manually create, or, edit Register test_01 so it uses email
     * then run independently
     */
    test('Login test_02', async ({ page, baseURL, loginPage }) => {
        /**
         * @JC
         * As we are using the loginPage fixture we dont need to create instance of class                
         //const login = new LoginPage(page)
         */

        await page.goto(`${baseURL}account/login`)
        await loginPage.enterEmail(data.email)
        await loginPage.enterPassword(data.password)
        await loginPage.clickLogin()
        expect(await page.title()).toBe('My Account')

        //await page.pause()
    })


    /**
     * @JC
     * Presumes existing john.doe@test.com email address exists.
     * If fails, simply manually create, or, edit Register test_01 so it uses email
     * then run independently
     */
    test('Add to cart test_03', async ({ page, baseURL, loginPage, homePage, specialHotPage, desktopsPage }) => {
        
        /**
         * @JC
         * As we are using the loginPage, homePage, specialHotPage, desktopsPage 
         * fixtures we dont need to create instances of classes
         // const login = new LoginPage(page)
         // const homePage = new HomePage(page)
         // const specialHotPage = new SpecialHotPage(page)
         // const desktopsPage = new DesktopsPage(page)
         */

        await page.goto(`${baseURL}account/login`)
        await loginPage.login(data.email, data.password)

        await homePage.clickOnSpecialHotMenu()
        
        // Click Desktops in sidebar
        await specialHotPage.clickDesktopsCategory()
        
        // Desktops page
        await desktopsPage.selectFirstDeskopItem()
            
        // Confirms the cart notification is displyed
        const isCartVisible = await homePage.isToastVisible()
        await expect(isCartVisible).toBeVisible()
    })        

    
})