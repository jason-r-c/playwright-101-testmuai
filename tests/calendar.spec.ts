import {test, expect} from '@playwright/test'

test('Calendar using /key-press page', async ({page}) => {
    /**
     * NOTE    
     * Bootstrap demo page is broken!
     * 
     * Using /key-press
     */
    //await fillPlainInputField()

    async function fillPlainInputField() {
        await page.goto('https://www.testmuai.com/selenium-playground/key-press/')
        let date = '01/01/2026'
        await page.fill('#my_field', date)
    }
})

test('Calendar demo using Moment', async ({ page }) => {
    await page.goto('https://www.testmuai.com/selenium-playground/jquery-date-picker-demo/')
    let date = ""
    
    await page.getByRole('textbox', {name: 'From'}).click()

    /**
     * Store locators to prevous, next and month select element.
     */
   const calBtnPrev = await page.getByTitle('Prev').click()
   const calBtnNxt = await page.getByTitle('Next').click()
   const calSelectMonth = await page.getByRole('combobox').click()


    await page.pause()

})