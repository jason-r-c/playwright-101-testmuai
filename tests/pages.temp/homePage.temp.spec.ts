import { test } from "@playwright/test"

test('clickOnSpecialHotMenu()', async ({ page }) => {
    await page.goto('https://ecommerce-playground.lambdatest.io/index.php?route=common/home')

    await page.locator('span').filter({ hasText: 'Special' })
        .first().click()

    await page.pause()
})

test('addFirstProductToTheCart()', async ({ page }) => {
    await page.goto('https://ecommerce-playground.lambdatest.io/index.php?route=common/home')

    const product = page.locator('#entry_218399 .image a').first()
    await product.scrollIntoViewIfNeeded()
    await product.hover()

    await page.locator('#entry_218399 .product-action button[title="Add to Cart"]')
        .first().click()

    const toast = page.locator('//a[.="View Cart "]')
    await toast.waitFor({state: 'visible'})
    return toast
    
    //await page.pause()
})

test('', async ({ page }) => {
    await page.goto('https://ecommerce-playground.lambdatest.io/index.php?route=common/home')

    await page.locator('.toast-body').filter({hasText: 'View Cart'})
})

