import { SignInPopup } from "./components/SignInPopup.js";
import { SignUpPopup } from "./components/SignUpPopup.js";
import BasePage from "../BasePage.js";

export class WelcomePage  extends BasePage{
    _signUpBtnSelector

    constructor(page) {
        super(page, "/");
        this._signUpBtn = page.getByRole('button', { name: 'Sign up' });
    }

    async openSignInPopup(){
        await this.header.signInButton.click();
        return new SignInPopup(this._page);
    }

    async openSignUpPopup(){
        await this._signUpBtn.click();
        return new SignUpPopup(this._page);
    }
}
