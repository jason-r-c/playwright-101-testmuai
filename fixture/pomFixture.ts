import { test as baseTest } from "@playwright/test"

/**
 * @JC
 * 
 * Here: 
 * - Import all classes so that we can instantiate/create instances of class
 * as use as fixtures
 */
import RegisterPage from "../pages/registerPage"
import LoginPage from "../pages/loginPage"
import HomePage from "../pages/homePage"
import SpecialHotPage from "../pages/specialHotPage"
import DesktopsPage from "../pages/desktopsPage"

type pages = {
    registerPage : RegisterPage,
    loginPage : LoginPage,
    homePage : HomePage,
    specialHotPage : SpecialHotPage,
    desktopsPage: DesktopsPage
}

const testPages = baseTest.extend<pages>({
    registerPage: async({ page }, use) => {
        await use(new RegisterPage(page))
    },
    loginPage: async({ page }, use) => {
        await use(new LoginPage(page))
    },
    homePage: async({ page }, use) => {
        await use(new HomePage(page))
    },
    specialHotPage: async({ page }, use) => {
        await use(new SpecialHotPage(page))
    },
    desktopsPage: async({ page }, use) => {
        await use(new DesktopsPage(page))
    }
})

export const test = testPages