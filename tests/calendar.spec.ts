import {test, expect} from '@playwright/test'

test('Calendar using /key-press page', async ({page}) => {
    /**
     * NOTE    
     * Bootstrap demo page is broken!
     * 
     * Using /key-press
     */
    await fillPlainInputField()

    async function fillPlainInputField() {
        await page.goto('https://www.testmuai.com/selenium-playground/key-press/')
        let date = '01/01/2026'
        await page.fill('#my_field', date)
    }
})

test('Calendar demo: select Previous Month And First Day', async ({ page }) => {
    /**
     * Store locators to prevous, next and month select element.
     */
    const dateTextBox = await page.getByRole('textbox', {name: 'From'})
    const calBtnPrev = await page.getByTitle('Prev')
    const calBtnNxt = await page.getByTitle('Next')
    const calSelectMonth = await page.getByRole('combobox')

    await page.goto('https://www.testmuai.com/selenium-playground/jquery-date-picker-demo/')

   /**
    * Click previous button to select previous month, get the month number
    * then click the first of the month
    */
    await selectPreviousMonthAndFirstDay()

    async function selectPreviousMonthAndFirstDay() {
        await dateTextBox.click()
        await calBtnPrev.click()
        let dataMonthVal = await page.locator('td[data-handler="selectDay"]').first().getAttribute('data-month')
        await page.locator(`td[data-month="${dataMonthVal}"] a`).first().click()
    }

    await page.pause()
})

test('Caalendar demo usig Moment.js', async ({ page }) => {
    // TODO
})