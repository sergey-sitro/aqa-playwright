import { test, expect } from '@playwright/test';
import { SignUpPage } from './SignUpPage';
import { skip } from 'node:test';

// // Locators
// const signUpBtn = page.getByRole('button', { name: 'Sign up' });
// const nameInput =  page.locator('#signupName');
// const lastNameInput = page.locator('#signupLastName');
// const emailInput = page.locator('#signupEmail');
// const passwordInput = page.getByLabel('Password', { exact: true });
// const reenterPasswordInput = page.getByLabel('Re-enter password');
// const registerBtn = page.getByRole('button', { name: 'Register' });
// const myProfileBtn = page.getByRole('button', { name: 'My profile' });
// const emptyNameError = page.getByText('Name required');
// const emptyLastNameError = page.getByText('Last name required');
// const emptyEmailError = page.getByText('Email required');
// const emptyPasswordError = page.getByText('Password required');
// const invalidNameError = page.getByText('Name is invalid');
// const invalidLastNameError = page.getByText('Last name is invalid');
// const invalidEmailError = page.getByText('Email is incorrect');
// const nameLengthValidationError = page.getByText('Name has to be from 2 to 20 characters long');
// const invalidPasswordError = page.getByText('Password has to be from 8 to 15 characters long and contain at least one integer, one capital, and one small letter');
// const lastNameLengthValidationError = page.getByText('Last name has to be from 2 to 20 characters long');
// const settingsBtn = page.getByRole('link', { name: 'Settings' });
// const removeAccountBtn = page.getByRole('button', { name: 'Remove my account' });
// const confirmRemoveAccountBtn = page.getByRole('button', { name: 'Remove' });

// Test data
const errorBorderColorCSS = 'rgb(220, 53, 69)';
const testName = 'testName';
const testLastName = 'testLastName';
const testEmail = 'test-email@test.test';
const testPassword = 'Qwertyui1';
const invalidName = 'test123';
const invalidLastName = 'test123';
const shortName = 't';
const longName = 'test123test123test123';
const minimumLengthName = 'te';
const maximumLengthName = 'test123test123test12';
const shortLastName = 't';
const minimumLengthLastName = 'te';
const maximumLengthLastName = 'test123test123test12';
const longLastName = 'test123test123test123';
const invalidEmails = ['test', 'test@', 'test@test', 'test@test.'];



test.describe('Sign Up Positive Flow', ()=>{
    
    test.beforeEach(async ({ page })=>{
        await page.goto('');
    })

    // Delete test user after each successful sign up
    test.afterEach(async ({page})=>{
        const signUpPage = new SignUpPage(page);
        await signUpPage.settingsBtn.click();
        await signUpPage.removeAccountBtn.click();
        await signUpPage.confirmRemoveAccountBtn.click();
    })

    test('Should be successfully signed up', async ({page})=>{
        const signUpPage = new SignUpPage(page);

        await signUpPage.signUpBtn.click();
        await signUpPage.nameInput.fill(testName);
        await signUpPage.lastNameInput.fill(testLastName);
        await signUpPage.emailInput.fill(testEmail);
        await signUpPage.passwordInput.fill(testPassword);
        await signUpPage.reenterPasswordInput.fill(testPassword);
        await signUpPage.registerBtn.click();

        await expect(signUpPage.myProfileBtn).toBeVisible();
    })
})

test.describe('Input fields validation', ()=>{
    test.beforeEach(async ({page})=>{
        await page.goto('');
        const signUpPage = new SignUpPage(page);
        await signUpPage.signUpBtn.click();
    })

    test.afterEach(async ({page})=> {
        const signUpPage = new SignUpPage(page);
        await expect(signUpPage.registerBtn).toBeDisabled();
    })

    test('"Name" input field validation', async ({page})=>{
        const signUpPage = new SignUpPage(page);
// test.step.afterEach
        // Empty name field validation
        await signUpPage.nameInput.focus();
        await signUpPage.nameInput.blur();
        
 // TO AFTER EACH??       // Border of input field is red
        await expect(signUpPage.nameInput).toHaveCSS('border-color', errorBorderColorCSS);

        await expect(signUpPage.emptyNameError).toBeVisible();
        await signUpPage.nameInput.fill(testName);
        await expect(signUpPage.emptyNameError).toBeHidden();

        // Invalid name validation
        await signUpPage.nameInput.fill(invalidName);
        await expect(signUpPage.invalidNameError).toBeVisible();
        await signUpPage.nameInput.fill(testName);
        await expect(signUpPage.invalidNameError).toBeHidden();

        // Invalid length validation
        await signUpPage.nameInput.fill(shortName);
        await expect(signUpPage.nameLengthValidationError).toBeVisible();
        await signUpPage.nameInput.fill(minimumLengthName);
        await expect(signUpPage.nameLengthValidationError).toBeHidden();
        await signUpPage.nameInput.fill(maximumLengthName);
        await expect(signUpPage.nameLengthValidationError).toBeHidden();
        await signUpPage.nameInput.fill(longName);
        await expect(signUpPage.nameLengthValidationError).toBeVisible();
    })

    test('Last name input field validation', async ({page})=>{
        const signUpPage = new SignUpPage(page);
        // Empty Last name field validation
        await signUpPage.lastNameInput.focus();
        await signUpPage.lastNameInput.blur();

        // Border of input field is red
        await expect(signUpPage.lastNameInput).toHaveCSS('border-color', errorBorderColorCSS);

        await expect(signUpPage.emptyLastNameError).toBeVisible();
        await signUpPage.lastNameInput.fill(testLastName);
        await expect(signUpPage.emptyLastNameError).toBeHidden();

        // Invalid Last name validation
        await signUpPage.lastNameInput.fill(invalidLastName);
        await expect(signUpPage.invalidLastNameError).toBeVisible();
        await signUpPage.lastNameInput.fill(testLastName);
        await expect(signUpPage.invalidLastNameError).toBeHidden();

        // Invalid length validation
        await signUpPage.lastNameInput.fill(shortLastName);
        await expect(signUpPage.lastNameLengthValidationError).toBeVisible();
        await signUpPage.lastNameInput.fill(minimumLengthLastName);
        await expect(signUpPage.lastNameLengthValidationError).toBeHidden();
        await signUpPage.lastNameInput.fill(maximumLengthLastName);
        await expect(signUpPage.lastNameLengthValidationError).toBeHidden();
        await signUpPage.lastNameInput.fill(longLastName);
        await expect(signUpPage.lastNameLengthValidationError).toBeVisible();
    })

    test('Email input field validation', async ({page})=>{
        const signUpPage = new SignUpPage(page);
        // Empty Email field validation
        await signUpPage.emailInput.focus();
        await signUpPage.emailInput.blur();

        // Border of input field is red
        await expect(signUpPage.emailInput).toHaveCSS('border-color', errorBorderColorCSS);

        await expect(signUpPage.emptyEmailError).toBeVisible();
        await signUpPage.emailInput.fill(testEmail);
        await expect(signUpPage.emptyEmailError).toBeHidden();

        // Incorrect Email validation

        for (let i = 0; i < invalidEmails.length; i++) {
            await signUpPage.emailInput.fill(invalidEmails[i]);
            await expect(signUpPage.invalidEmailError).toBeVisible();
        }

        await signUpPage.emailInput.fill(testEmail);
        await expect(signUpPage.invalidEmailError).toBeHidden();
    })
    
    test('"Password" input field validation', async ({page})=>{
        const signUpPage = new SignUpPage(page);
        // Empty Password field validation
        await signUpPage.passwordInput.focus();
        await signUpPage.passwordInput.blur();

        // Border of input field is red
        await expect(signUpPage.passwordInput).toHaveCSS('border-color', errorBorderColorCSS);

        await expect(signUpPage.emptyPasswordError).toBeVisible();

        // Invalid Password field validation
        await signUpPage.passwordInput.fill('qwertyu');
        await expect(signUpPage.invalidPasswordError).toBeVisible();
        await signUpPage.passwordInput.fill('Qwerty1');
        await expect(signUpPage.invalidPasswordError).toBeVisible();
        await signUpPage.passwordInput.fill('Qwertyui');
        await expect(signUpPage.invalidPasswordError).toBeVisible();
        await signUpPage.passwordInput.fill('QwertyuiQwertyu1');
        await expect(signUpPage.invalidPasswordError).toBeVisible();
        await signUpPage.passwordInput.fill('Qwertyui1');
        await expect(signUpPage.invalidPasswordError).toBeHidden();
    })
    
    test,skip('"Re-enter password" input field validation', async ({page})=>{
        const passwordInput = page.getByLabel('Re-enter password', { exact: true });
        const invalidPWvalidationError = 'Password has to be from 8 to 15 characters long and contain at least one integer, one capital, and one small letter';
        // Empty Password field validation
        await passwordInput.focus();
        await passwordInput.blur();

        // Border of input field is red
        await expect(passwordInput).toHaveCSS('border-color', 'rgb(220, 53, 69)');

        await expect(page.getByText('Re-enter password required')).toBeVisible();

        // Invalid Password field validation
        await passwordInput.fill('qwertyu');
        await expect(page.getByText(`${invalidPWvalidationError}`)).toBeVisible();
        await passwordInput.fill('Qwerty1');
        await expect(page.getByText(`${invalidPWvalidationError}`)).toBeVisible();
        await passwordInput.fill('Qwertyui');
        await expect(page.getByText(`${invalidPWvalidationError}`)).toBeVisible();
        await passwordInput.fill('QwertyuiQwertyu1');
        await expect(page.getByText(`${invalidPWvalidationError}`)).toBeVisible();
        await passwordInput.fill('Qwertyui1');
        await expect(page.getByText(`${invalidPWvalidationError}`)).toBeHidden();
    })
})