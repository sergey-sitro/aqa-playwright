export class SignUpPage {
    constructor(page) {
        this.page = page;
        this.signUpBtn = page.getByRole('button', { name: 'Sign up' });
        this.nameInput = page.locator('#signupName');
        this.lastNameInput = page.locator('#signupLastName');
        this.emailInput = page.locator('#signupEmail');
        this.passwordInput = page.getByLabel('Password', { exact: true });
        this.reenterPasswordInput = page.getByLabel('Re-enter password');
        this.registerBtn = page.getByRole('button', { name: 'Register' });
        this.myProfileBtn = page.getByRole('button', { name: 'My profile' });
        this.emptyNameError = page.getByText('Name required');
        this.emptyLastNameError = page.getByText('Last name required');
        this.emptyEmailError = page.getByText('Email required');
        this.emptyPasswordError = page.getByText('Password required');
        this.invalidNameError = page.getByText('Name is invalid');
        this.invalidLastNameError = page.getByText('Last name is invalid');
        this.invalidEmailError = page.getByText('Email is incorrect');
        this.nameLengthValidationError = page.getByText('Name has to be from 2 to 20 characters long');
        this.invalidPasswordError = page.getByText('Password has to be from 8 to 15 characters long and contain at least one integer, one capital, and one small letter');
        this.lastNameLengthValidationError = page.getByText('Last name has to be from 2 to 20 characters long');
        this.settingsBtn = page.getByRole('link', { name: 'Settings' });
        this.removeAccountBtn = page.getByRole('button', { name: 'Remove my account' });
        this.confirmRemoveAccountBtn = page.getByRole('button', { name: 'Remove' });
    }
}
