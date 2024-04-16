import { test as setup } from "@playwright/test";
import { WelcomePage } from "../../src/pageObjects/WelcomePage/WelcomePage.js";
import { expect } from "../../src/fixtures/userFixtures.js";
import { REGULAR_USER_STORAGE_STATE_PATH } from "../../src/consts.js";
import { regularUser } from "../../src/data/users.js";

setup.describe('Setup', ()=>{
    setup("Login and Save as Regular User", async({page})=>{
        const welcomePage = new WelcomePage(page)
        await welcomePage.navigate()
        const signInPopup = await welcomePage.openSignInPopup()
        await signInPopup.emailInput.fill(regularUser.email);
        await signInPopup.passwordInput.fill(regularUser.password);
        await signInPopup.signInButton.click()
    
        await expect(page).toHaveURL(/garage/)
    
        await page.context().storageState({
            path: REGULAR_USER_STORAGE_STATE_PATH
        })
    })
})