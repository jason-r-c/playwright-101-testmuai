import {test, Page, expect } from "@playwright/test"
import RegisterPage from "../../pages/registerPage"
import LoginPage from "../../pages/loginPage"
import HomePage from "../../pages/homePage"
import SpecialHotPage from "../../pages/specialHotPage"
import DesktopsPage from "../../pages/desktopsPage"


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

test('Login test_02', async ({ page, baseURL }) => {
    const login = new LoginPage(page)
    await page.goto(`${baseURL}account/login`)
    await login.enterEmail(email)
    await login.enterPassword(password)
    await login.clickLogin()
    expect(await page.title()).toBe('My Account')
})

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
        

    //await homePage.addFirstProductToTheCart()
    
    // const isCartVisible = await homePage.isToastVisible()
    // await expect(isCartVisible).toBeVisible()
    

    //await page.pause()
})