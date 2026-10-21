/**
 * @JC
 * 
 * Here we:
 * - Import our custom fixture named myFixture.
 * - Use the myFixtures properties in a test scenario.
 */

// Import our 'test' fixture from myFixture
import { test } from "../../fixture/myFixture"

// In our test scenario 'fixture demo', we access out fixture properties
// age and email 
test('fixture demo', async ({ page, age, email }) => {
    console.log(`age from fixture is: ${age}`)
    console.log(`email from fixture is: ${email}`)
})