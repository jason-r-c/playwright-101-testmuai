import {test, expect} from '@playwright/test'

  /**
     * @JC
     * tabs
     * 
     */
test('Interact with multiple tabs', async ({ page }) => {
    await page.goto('https://www.testmuai.com/selenium-playground/window-popup-modal-demo/')
    //await page.locator("a[title='Follow @testmuai on Twitter']").click()
    console.log(page.url())

    const [newWindow] = await Promise.all([
        page.waitForEvent('popup'),
        page.getByRole('link', { name: 'Follow On Twitter' }).click()
    ])

    console.log('newWindow url is: '+newWindow.url())
})