import {test, expect, Page} from '@playwright/test'

/**
 * @JC 
 * reusable function: we must pass the page object into the function
 * Then we define the parameter page: Page as a page object type
 * @param page 
 */
async function openModalDemo(page: Page) {
    await page.goto('https://www.testmuai.com/selenium-playground/window-popup-modal-demo/')
    console.log('Modal demo site: '+page.url())
}

test('Interact with separate tabs', async ({ page }) => {
    /**
     * @JC
     * Array destructuring via const [newWindow] 
     * 
     * Promise.all() returns an array. eg
        const results = await Promise.all([
            promise1,
            promise2
        ]);
     */
    //await openNewWindow()
    async function openNewWindow() {
        await openModalDemo(page)
        const [newWindow] = await Promise.all([
            page.waitForEvent('popup'),
            page.getByRole('link', { name: 'Follow On Twitter' }).click()
        ])
        console.log('newWindow url is: ' + newWindow.url())
    }
})

test('Interact with multiple tabs', async ({ page }) => {
    await openModalDemo(page)

    const [multiPage] = await Promise.all([
        page.waitForEvent('popup'),
        page.getByText('Follow Twitter & Facebook').click()
    ])

    /**
     * @JC
     * waitForLoadState() waits for the pages in multiPage to load 
     * before running the rest of the code below
     */
    await multiPage.waitForLoadState()

    /**
     * @JC
     * context(): Browser Context = a separate user/session inside that browser.
     * So, tabs in 1 context cannot access tabs in a different context (nicely isolated).
     * 
     * pages() returns the amount of pages in the context.
     */
    const pages = multiPage.context().pages()
    console.log('Number of tabs: '+pages.length)

    /**
     * @JC
     * loop through the array of pages
     */    
    pages.forEach(tab => {
        console.log('Foreach through the tabs: '+tab.url())
    });

    /**
     * @JC
     * Find facebook page in the array of pages
     * then print the h1 tag contents.
     */
    let facebookPage: Page
    for(let i=0; i < pages.length; i++) {
        if(pages[i].url().includes('facebook') ) {
            console.log('This page is facebook: '+pages[i].url() )
            
            facebookPage = pages[i]
            console.log(await facebookPage.textContent('//h1'))
        }
    }
    //await page.pause()
    
})



