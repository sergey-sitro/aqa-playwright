import {SignUpPopup} from "./components/SignUpPopup.js";
import BasePage from "../BasePage.js";
// import GaragePage from "../GaragePage/GaragePage.js";

export class WelcomePage  extends BasePage{
    _signUpBtnSelector

    constructor(page) {
        super(page, "/");
        this._signUpBtn = page.getByRole('button', { name: 'Sign up' });
    }

    async openSignUpPopup(){
        await this._signUpBtn.click();
        return new SignUpPopup(this._page);
    }

    // async loginAsGuest(){
    //     await this.header.guestLoginButton.click();
    //     return new GaragePage(this._page);
    // }
}
