import {test, expect} from '@playwright/test'

test('Calendar using /key-press page', async ({page}) => {
    /**
     * NOTE    
     * Bootstrap demo page is broken!
     * 
     * Using /key-press
     */
    await page.goto('https://www.testmuai.com/selenium-playground/key-press/')
    let date = '01/01/2026'
    await page.fill('#my_field', date)


    /**
     * TODO
     * 
     * jQuery demo
     */
    //const calendar = page.getByRole('textbox', { name: 'From'})

    await page.pause()
})

test('testing', async ({ page }) => {
    await page.goto('https://www.testmuai.com/selenium-playground/jquery-date-picker-demo/')
    let date = ""
    
    await page.locator("#from").click()

    await page.pause()

})