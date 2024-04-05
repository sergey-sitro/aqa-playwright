import BaseComponent from "../../../components/BaseComponent.js";

export class SignUpPopup extends BaseComponent {
    _nameInputSelector = '#signupName';
    _lastNameInputSelector = '#signupLastName';
    _emailInputSelector = '#signupEmail';
    _passwordInputSelector = '#signupPassword';
    _reenterPasswordInputSelector = '#signupRepeatPassword';
    _registerBtnSelector = { name: 'Register' };

    constructor(page) {
        super(page, page.locator('app-signup-modal'));
        this.nameInput =  this.container.locator(this._nameInputSelector);
        this.lastNameInput = this.container.locator(this._lastNameInputSelector);
        this.emailInput = this.container.locator(this._emailInputSelector);
        this.passwordInput = this.container.locator(this._passwordInputSelector);
        this.reenterPasswordInput = this.container.locator(this._reenterPasswordInputSelector);
        this.registerBtn = this.container.getByRole('button', this._registerBtnSelector);
        this.nameValidationError = this.container.locator(`${this._nameInputSelector} + .invalid-feedback`);
        this.lastNameValidationError = this.container.locator(`${this._lastNameInputSelector} + .invalid-feedback`);
        this.emailValidationError = this.container.locator(`${this._emailInputSelector} + .invalid-feedback`);
        this.passwordValidationError = this.container.locator(`${this._passwordInputSelector} + .invalid-feedback`);
        this.reenterPasswordValidationError = this.container.locator(`${this._reenterPasswordInputSelector} + .invalid-feedback`);
    }
}
