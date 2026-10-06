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
    await page.goto('https://www.testmuai.com/selenium-playground/jquery-date-picker-demo/')

    /**
     * Store locators to prevous, next and month select element.
     */
    const dateTextBox = await page.getByRole('textbox', {name: 'From'})
    const calBtnPrev = await page.getByTitle('Prev')
    const calBtnNxt = await page.getByTitle('Next')
    const currentlySelectedMonth = await page.getByRole('combobox')

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

test('Calendar demo: Select previous month until reached Jan', async ({ page }) => {
    await page.goto('https://www.testmuai.com/selenium-playground/jquery-date-picker-demo/')
    /**
     * Store locators to prevous, next and month select element.
     */
    const dateTextBox = await page.getByRole('textbox', {name: 'From'})
    const calBtnPrev = await page.getByTitle('Prev')
    const calBtnNxt = await page.getByTitle('Next')

    /**
     * Click the textbox to trigger display of the calendar widget.
     * Get the text of the currently selected month.
     * Set date - we stop at this month .
     */
    await dateTextBox.click()
    let currentlySelectedMonth = await page.locator('[data-handler="selectMonth"] [selected="selected"]').innerText()
    let endDate = 'Jan'

    /**
     * Loop until the currently selected equals endDate var.
     */
    while(currentlySelectedMonth != endDate) {
        console.log(`currentlySelectedMonth ${currentlySelectedMonth} is not equal to endDate ${endDate}`)
        
        await calBtnPrev.click()        
        console.log('clicked previous month')
        
        currentlySelectedMonth = await page.locator('[data-handler="selectMonth"] [selected="selected"]').innerText()
        console.log('currentlySelectedMonth is: '+currentlySelectedMonth)
    }

    await page.pause()
})