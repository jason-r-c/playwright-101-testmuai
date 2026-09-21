import {test} from '@playwright/test'

test('Handling dropdowns', async ({ page }) => {
    await page.goto('https://www.testmuai.com/selenium-playground/select-dropdown-demo/')
    await page.selectOption('#select-demo', {
        label: 'Monday'
    })

    /**
     * @JC
     * Select multiple options within a mult-select box by passing an arrya of strings
     */
    await page.selectOption('#multi-select', ['Florida', 'New York', 'Ohio'])
    //await page.pause()
})

test('jQuery dropdown', async ({ page }) => {
    await page.goto('https://www.testmuai.com/selenium-playground/jquery-dropdown-search-demo/')
    await selectCountry(page, 'Japan')    
    await selectCountry(page, 'Denmark')    
    await selectCountry(page, 'South Africa')    
    //await page.pause()
})

/** 
 * @JC
 * We must accept the page object as an argument so that we can use it in the function.
 */
async function selectCountry(page, countryName) {
    await page.click('#country+span')
    await page.locator('ul#select2-country-results')
        .locator('li', {
            hasText: countryName
        }).click()
}
