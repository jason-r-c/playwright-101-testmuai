import {test, expect} from '@playwright/test'
import moment from "moment"

test('Calendar demo: Fill calendar with fill() on /key-press page', async ({page}) => {
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

test('Calendar demo: select Previous Month And First Day of that month', async ({ page }) => {
    await page.goto('https://www.testmuai.com/selenium-playground/jquery-date-picker-demo/')

    /**
     * Store locators to prevous, next and month select element.
     */
    const dateTextBox = await page.getByRole('textbox', {name: 'From'})
    const calBtnPrev = await page.getByTitle('Prev')
    const monthDropdown = await page.locator('td[data-handler="selectDay"]')

   /**
    * Click previous button to select previous month, get the month number
    * then click the first of the month
    */
    await selectPreviousMonthAndFirstDay()

    async function selectPreviousMonthAndFirstDay() {
        await dateTextBox.click()
        await calBtnPrev.click()
        let dataMonthVal = await monthDropdown.first().getAttribute('data-month')
        await page.locator(`td[data-month="${dataMonthVal}"] a`).first().click()
    }

    await page.pause()
})

test('Calendar demo: Select previous month until we reach Jan', async ({ page }) => {
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
    let endDate: string = 'Jan'

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

test('Calendar demo: moment.js', async ({ page }) => {
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
    let currentlySelectedYear = await page.locator('.ui-datepicker-year').innerText()
    console.log(`currentlySelectedYear is ${currentlySelectedYear}`+'\n')
    let endDate: string = 'Mar 2027'

    /**
     * moment.js used for checking if endDate is before the current month
     */
    const isBeforeCurrentMonth = moment(endDate, "MMM YYYY").isBefore()
    console.log(`${endDate} is before ${moment().format("MMM YYYY")} = ${isBeforeCurrentMonth}`+'\n')

    /**
     * Loop until the currently selected month equals endDate var.
     */
    while(`${currentlySelectedMonth} ${currentlySelectedYear}` != endDate) {
        if(isBeforeCurrentMonth) {
            await navigateCalendarMonths('navBackward')  
        } else {
            await navigateCalendarMonths('navForward')    
        }
    }
    console.log(`no longer navigating. The currently selected month 
        ${currentlySelectedMonth} ${currentlySelectedYear} 
        matches our end date of ${endDate}`)     

    /**
     * Clicks forward or backward on a calendar month.
     * 
     * @param navFlag Determines whether navigate forward or backward. 
     */
    async function navigateCalendarMonths(navFlag) {
        console.log(`<<< $currentlySelectedMonth/$currentlySelectedYear '${currentlySelectedMonth} ${currentlySelectedYear}' is not equal to $endDate '${endDate}'`)

        navFlag == 'navBackward' ? await calBtnPrev.click() : await calBtnNxt.click()
        console.log('clicked previous month')

        currentlySelectedMonth = await page.locator('[data-handler="selectMonth"] [selected="selected"]').innerText()
        currentlySelectedYear = await page.locator('.ui-datepicker-year').innerText()

        console.log('currentlySelectedMonth is: ' + currentlySelectedMonth)
        console.log(`the year and month together is: ${currentlySelectedMonth} ${currentlySelectedYear} >>>`+'\n')
    }

    //await page.pause()
})