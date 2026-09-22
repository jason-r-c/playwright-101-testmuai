import {test, expect} from 'playwright/test'

test('Interact with Frames', async ({ page }) => {
    /**
     * Count the amount of frames in the web page
     */
    await page.goto('https://letcode.in/frame')
    const allFrames = page.frames()
    console.log('All frames count is: '+allFrames.length)

   /**
     * @JC
     * Find a frame and fill it in.
     */    
   //await fillInputFields()
   async function fillInputFields() {
       const myFrame = page.frame('firstFr')
       console.log('myFrame is: ' + myFrame)
       await myFrame?.fill('input[name="fname"]', 'jay jay')
       await myFrame?.fill('input[name="lname"]', 'cocomelon')
       expect(await myFrame?.locator('p.text-sm').textContent()).toContain('jay jay cocomelon')
   }

    /**
     * @JC
     * Frame locator
     * Enters the given iframe allow selecting elements in that iframe.
     * Porbably better than page.frame()
     * 
     */
    //await frameLocator()
    async function frameLocator() {
        const frame = page.frameLocator('#firstFr')
        await frame.locator('input[name="fname"]').fill('johan')
        await frame.locator('input[name="lname"]').fill('manzambi')
        expect(await frame.locator('p.text-sm').textContent()).toContain('johan manzambi')
    }

    /**
     * @JC
     * Interact with nested frames
     */
    await nestedFrames()
    async function nestedFrames() {
        const myFrame = page.frameLocator('#firstFr')
        const nestedFrame = myFrame.frameLocator('iframe[src="/innerframe"]')
        await nestedFrame.locator('input[name="email"]').fill('jctest@example.com')
    }
    
})