/**
 * @JC
 * 
 * Background:
 * Ther page object automatically does the following (so that we dont have to):
 * const browser = await webkit.launch();
 * const context = await browser.newContext();
 * const page = await context.newPage();
 * 
 * Here we: 
 * - Extend the core Playwright test object with our own object.
 * - This creates a fixture use elsewhere.
 * 
 */

// import the core test object but enhance with our own stuff.
import {test as myTest} from "@playwright/test"

// Define our own object which is used for extending test/myTest
type jasoncarney = {
    age: number,
    email: string
}

// Actually extends test/myTest using jasoncarney object,
// jasoncarney is classed as tthe Type.
// Once the Type has been set, we then set the jasoncarney Type properties.
const myFixtureTest = myTest.extend<jasoncarney>({
    age: 101,
    email: "test@test.com"
})

// Exports the fixture for use elsewhere
export const test = myFixtureTest