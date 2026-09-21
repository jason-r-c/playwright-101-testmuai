import {test, expect} from 'playwright/test'

test('Interact with Frames', async ({ page }) => {
    await page.goto('https://letcode.in/frame')
    const allFrames = page.frames()
    console.log('All frames count is: '+allFrames.length)

    const myFrame  = page.frame('firstFr')
    console.log('myFrame is: '+myFrame)
    await myFrame?.fill('input[name="fname"]', 'jay jay')
    await myFrame?.fill('input[name="lname"]', 'cocomelon')

    expect(await myFrame?.locator('p.text-sm').textContent()).toContain('jay jay cocomelon')

})