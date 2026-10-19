import {test, Page, expect } from "@playwright/test"
import RegisterPage from "../../pages/registerPage"
import LoginPage from "../../pages/loginPage"
import HomePage from "../../pages/homePage"


const email = 'john.doe@test3.com'
const password = 'pass123'
test('Register test_01', async ({ page, baseURL }) => {
    
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