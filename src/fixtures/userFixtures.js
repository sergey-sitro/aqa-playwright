import { expect as baseExpect, test as base } from "@playwright/test";
import { WelcomePage } from "../pageObjects/WelcomePage/WelcomePage.js";
import GaragePage from "../pageObjects/GaragePage/GaragePage.js";
import { REGULAR_USER_STORAGE_STATE_PATH } from "../consts.js";

export const test = base.extend({
    welcomePage: async ({page}, use)=>{
        const welcomePage = new WelcomePage(page)
        await use(welcomePage)
    },
    page: async ({browser}, use)=>{
        const ctx = await browser.newContext({
            storageState: REGULAR_USER_STORAGE_STATE_PATH
        })
        const page = await ctx.newPage()

        await use(page)

        await ctx.close()
    },
    garagePage: async ({page}, use)=>{
        const garagePage = new GaragePage(page)
        await garagePage.navigate()

        await use(garagePage)
    },
})

export const expect = baseExpect