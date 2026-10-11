/**
 * @JC
 * 
 * Topics covered:
 * 
 * ) Download file
 * ) TODO: Promise.all()
 * ) Array destructuring
 */

import {test,expect} from '@playwright/test'

test('Download files', async({ page }) => {
    await page.goto('https://www.testmuai.com/selenium-playground/generate-file-to-download-demo/')

    // type into text box
    await page.type('#textbox', 'Hello World!')

    // Get the button with a name of 'Generate File'
    await page.getByRole('button', {name: 'Generate File'}).click()

    /**
     * @JC
     * 
     * Array destructuring approach 1:
     * download1 is accessed WITHOUT using arrya notation
     */
    const [download1] = await Promise.all([
        page.waitForEvent('download'),
        page.getByRole('link', {name: 'Download'}).click()
    ])
    console.log(`Array destructuring approach 1: $download1 is ${await download1.path()}`+'\n')

    /**
     * @JC
     * 
     * Array destructuring approach 2:
     * download2 is accessed USING array notation
     */
    const download2 = await Promise.all([
        page.waitForEvent('download'),
        page.getByRole('link', {name: 'Download'}).click()
    ])
    console.log(`Array destructuring approach 2: $download2 is ${await download2[0].path()}`+'\n')

    /**
     * @JC
     * 
     * Note: 
     * Downloaded files are deleted when the browser context that produced them is closed.
     * 
     * So, Using path() will save to somewhere like the below, but the file is removed 
     * once the test has stopped:
     * 
     * /Users/jason/Repository/playwright-101-testmuai/test-results/
     * .playwright-artifacts-66/ced94403-dc23-411c-9c78-5e0b2b499e07
     */
    const path = await download1.path()
    console.log(`Note: Downloaded files are deleted when the browser context that produced them is closed.`)
    console.log(`eg, $path will no longer be accessible once the test has stopped: ${path}`)
    
    
    
    await page.pause()
})