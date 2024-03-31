import { test, expect } from '@playwright/test';

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
const invalidPasswords = ['qwertyu', 'Qwerty1', 'Qwertyui', 'QwertyuiQwertyu1'];

test.describe('Sign Up Positive Flow', ()=>{
    
    test.beforeEach(async ({ page })=>{
        await page.goto(''); 
    });

    // Delete test user after each successful sign up
    test.afterEach(async ({page})=>{
        const settingsBtn = page.getByRole('link', { name: 'Settings' });
        const removeAccountBtn = page.getByRole('button', { name: 'Remove my account' });
        const confirmRemoveAccountBtn = page.getByRole('button', { name: 'Remove' });
        await settingsBtn.click();
        await removeAccountBtn.click();
        await confirmRemoveAccountBtn.click();
    });

    test('Should be successfully signed up', async ({page})=>{
        
        const signUpBtn = page.getByRole('button', { name: 'Sign up' });
        const nameInput =  page.locator('#signupName');
        const lastNameInput = page.locator('#signupLastName');
        const emailInput = page.locator('#signupEmail');
        const passwordInput = page.getByLabel('Password', { exact: true });
        const reenterPasswordInput = page.getByLabel('Re-enter password');
        const registerBtn = page.getByRole('button', { name: 'Register' });
        const myProfileBtn = page.getByRole('button', { name: 'My profile' });

        await signUpBtn.click();
        await nameInput.fill(testName);
        await lastNameInput.fill(testLastName);
        await emailInput.fill(testEmail);
        await passwordInput.fill(testPassword);
        await reenterPasswordInput.fill(testPassword);
        await registerBtn.click();

        await expect(myProfileBtn).toBeVisible();
    });
});

test.describe('Input fields validation', ()=>{
    
    test.beforeEach(async ({page})=>{
        await page.goto('');
        const signUpBtn = page.getByRole('button', { name: 'Sign up' });
        await signUpBtn.click();
    });

    test.afterEach(async ({page})=> {
        const registerBtn = page.getByRole('button', { name: 'Register' });
        await expect(registerBtn).toBeDisabled();
    });

    test('Name input field validation', async ({page})=>{

        const nameInput =  page.locator('#signupName');
        const emptyNameError = page.getByText('Name required');
        const invalidNameError = page.getByText('Name is invalid');
        const nameLengthValidationError = page.getByText('Name has to be from 2 to 20 characters long');

        await test.step('Empty name field validation', async ()=>{
            await nameInput.focus();
            await nameInput.blur();
            await expect(emptyNameError).toBeVisible();
            await expect(nameInput).toHaveCSS('border-color', errorBorderColorCSS);

            await nameInput.fill(testName);
            await expect(emptyNameError).toBeHidden();
        });
        
        await test.step('Invalid name validation', async ()=>{
            await nameInput.fill(invalidName);
            await expect(invalidNameError).toBeVisible();
            await expect(nameInput).toHaveCSS('border-color', errorBorderColorCSS);

            await nameInput.fill(testName);
            await expect(invalidNameError).toBeHidden();
        });

        await test.step('Invalid length validation', async ()=>{
            await nameInput.fill(shortName);
            await expect(nameLengthValidationError).toBeVisible();
            await expect(nameInput).toHaveCSS('border-color', errorBorderColorCSS);

            await nameInput.fill(minimumLengthName);
            await expect(nameLengthValidationError).toBeHidden();

            await nameInput.fill(maximumLengthName);
            await expect(nameLengthValidationError).toBeHidden();

            await nameInput.fill(longName);
            await expect(nameLengthValidationError).toBeVisible();
            await expect(nameInput).toHaveCSS('border-color', errorBorderColorCSS);
        });
    });

    test('Last name input field validation', async ({page})=>{

        const lastNameInput = page.locator('#signupLastName');
        const emptyLastNameError = page.getByText('Last name required');
        const invalidLastNameError = page.getByText('Last name is invalid');
        const lastNameLengthValidationError = page.getByText('Last name has to be from 2 to 20 characters long');

        await test.step('Empty Last name field validation', async ()=>{
            await lastNameInput.focus();
            await lastNameInput.blur();
            await expect(emptyLastNameError).toBeVisible();
            await expect(lastNameInput).toHaveCSS('border-color', errorBorderColorCSS);

            await lastNameInput.fill(testLastName);
            await expect(emptyLastNameError).toBeHidden();
        });

        await test.step('Invalid Last name validation', async ()=>{
            await lastNameInput.fill(invalidLastName);
            await expect(invalidLastNameError).toBeVisible();
            await expect(lastNameInput).toHaveCSS('border-color', errorBorderColorCSS);

            await lastNameInput.fill(testLastName);
            await expect(invalidLastNameError).toBeHidden();
        });

        await test.step('Invalid length validation', async ()=>{
            await lastNameInput.fill(shortLastName);
            await expect(lastNameLengthValidationError).toBeVisible();
            await expect(lastNameInput).toHaveCSS('border-color', errorBorderColorCSS);

            await lastNameInput.fill(minimumLengthLastName);
            await expect(lastNameLengthValidationError).toBeHidden();

            await lastNameInput.fill(maximumLengthLastName);
            await expect(lastNameLengthValidationError).toBeHidden();

            await lastNameInput.fill(longLastName);
            await expect(lastNameLengthValidationError).toBeVisible();
            await expect(lastNameInput).toHaveCSS('border-color', errorBorderColorCSS);
        });
    });

    test('Email input field validation', async ({page})=>{

        const emailInput = page.locator('#signupEmail');
        const emptyEmailError = page.getByText('Email required');
        const invalidEmailError = page.getByText('Email is incorrect');

        await test.step('Empty Email field validation', async ()=>{
            await emailInput.focus();
            await emailInput.blur();
            await expect(emptyEmailError).toBeVisible();
            await expect(emailInput).toHaveCSS('border-color', errorBorderColorCSS);

            await emailInput.fill(testEmail);
            await expect(emptyEmailError).toBeHidden();
        });

        await test.step('Incorrect Email validation', async ()=>{
            for (let i = 0; i < invalidEmails.length; i++) {
                await emailInput.fill(invalidEmails[i]);
                await expect(invalidEmailError).toBeVisible();
                await expect(emailInput).toHaveCSS('border-color', errorBorderColorCSS);
            }
    
            await emailInput.fill(testEmail);
            await expect(invalidEmailError).toBeHidden();
        });
    });
    
    test('Password input field validation', async ({page})=>{

        const passwordInput = page.getByLabel('Password', { exact: true });
        const emptyPasswordError = page.getByText('Password required');
        const invalidPasswordError = page.getByText('Password has to be from 8 to 15 characters long and contain at least one integer, one capital, and one small letter');

        await test.step('Empty Password field validation', async ()=>{
            await passwordInput.focus();
            await passwordInput.blur();
            await expect(emptyPasswordError).toBeVisible();
            await expect(passwordInput).toHaveCSS('border-color', errorBorderColorCSS);

            await passwordInput.fill(testPassword);
            await expect(emptyPasswordError).toBeHidden();
        });
        
        await test.step('Invalid Password field validation', async ()=>{
            for (let i = 0; i < invalidPasswords.length; i++) {
                await passwordInput.fill(invalidPasswords[i]);
                await expect(invalidPasswordError).toBeVisible();
                await expect(passwordInput).toHaveCSS('border-color', errorBorderColorCSS);
            }
    
            await passwordInput.fill(testPassword);
            await expect(invalidPasswordError).toBeHidden();
        });
    });
    
    test('Re-enter password input field validation', async ({page})=>{
        const reenterPasswordInput = page.getByLabel('Re-enter password', { exact: true });
        const emptyReenterPasswordError = page.getByText('Re-enter password required');
        const invalidReenterPasswordError = page.getByText('Password has to be from 8 to 15 characters long and contain at least one integer, one capital, and one small letter');

        await test.step('Empty Re-enter password field validation', async ()=>{
            await reenterPasswordInput.focus();
            await reenterPasswordInput.blur();
            await expect(emptyReenterPasswordError).toBeVisible();
            await expect(reenterPasswordInput).toHaveCSS('border-color', errorBorderColorCSS);

            await reenterPasswordInput.fill(testPassword);
            await expect(emptyReenterPasswordError).toBeHidden();
        });
        
        await test.step('Invalid Re-enter password field validation', async ()=>{
            for (let i = 0; i < invalidPasswords.length; i++) {
                await reenterPasswordInput.fill(invalidPasswords[i]);
                await expect(invalidReenterPasswordError).toBeVisible();
                await expect(reenterPasswordInput).toHaveCSS('border-color', errorBorderColorCSS);
            }
    
            await reenterPasswordInput.fill(testPassword);
            await expect(invalidReenterPasswordError).toBeHidden();
        });
    });
});
