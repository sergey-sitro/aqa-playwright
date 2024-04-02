import BaseComponent from "../../../components/BaseComponent.js";

export class SignUpPopup extends BaseComponent {
    _nameInput
    _lastNameInput
    _emailInput
    _passwordInput
    _reenterPasswordInput
    _registerBtn
    _emptyNameError
    _invalidNameError
    _nameLengthValidationError
    _emptyLastNameError
    _invalidLastNameError
    _lastNameLengthValidationError
    _emptyEmailError
    _invalidEmailError
    _emptyPasswordError
    _invalidPasswordError
    _emptyReenterPasswordError
    _invalidReenterPasswordError

    constructor(page) {
        super(page, page.locator('app-signup-modal'));
        this.nameInput =  page.locator('#signupName');
        this.lastNameInput = page.locator('#signupLastName');
        this.emailInput = page.locator('#signupEmail');
        this.passwordInput = page.getByLabel('Password', { exact: true });
        this.reenterPasswordInput = page.getByLabel('Re-enter password');
        this.registerBtn = page.getByRole('button', { name: 'Register' });
        this.emptyNameError = page.getByText('Name required');
        this.invalidNameError = page.getByText('Name is invalid');
        this.nameLengthValidationError = page.getByText('Name has to be from 2 to 20 characters long');
        this.emptyLastNameError = page.getByText('Last name required');
        this.invalidLastNameError = page.getByText('Last name is invalid');
        this.lastNameLengthValidationError = page.getByText('Last name has to be from 2 to 20 characters long');
        this.emptyEmailError = page.getByText('Email required');
        this.invalidEmailError = page.getByText('Email is incorrect');
        this.emptyPasswordError = page.getByText('Password required');
        this.invalidPasswordError = page.getByText('Password has to be from 8 to 15 characters long and contain at least one integer, one capital, and one small letter');
        this.emptyReenterPasswordError = page.getByText('Re-enter password required');
        this.invalidReenterPasswordError = page.getByText('Password has to be from 8 to 15 characters long and contain at least one integer, one capital, and one small letter');
    }
}
