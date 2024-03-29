import {test, expect} from '@playwright/test';

test.describe('Sign Up Positive Flow', ()=>{
    test.beforeEach(async ({page})=>{
        await page.goto('');
    })

    // Delete test user after each successful sign up
    test.afterEach(async ({page})=>{
        await page.getByRole('link', { name: 'Settings' }).click();
        await page.getByRole('button', { name: 'Remove my account' }).click();
        await page.getByRole('button', { name: 'Remove' }).click();
    })

    test('Should be successfully signed up', async ({page})=>{
        await page.getByRole('button', { name: 'Sign up' }).click();
        await page.locator('#signupName').click();
        await page.locator('#signupName').fill('testName');
        await page.locator('#signupLastName').fill('testLastName');
        await page.locator('#signupEmail').fill('test-email@test.test');
        await page.getByLabel('Password', { exact: true }).fill('Qwertyui1');
        await page.getByLabel('Re-enter password').fill('Qwertyui1');
        await page.getByRole('button', { name: 'Register' }).click();

        await expect(page.getByRole('button', { name: 'My profile' })).toBeVisible();
    })
})

test.describe('Input fields validation', ()=>{
    test.beforeEach(async ({page})=>{
        await page.goto('');
        await page.getByRole('button', { name: 'Sign up' }).click();
    })

    test.afterEach(async ({page})=> {
        await expect(page.getByRole('button', { name: 'Register' })).toBeDisabled();
    })

    test('"Name" input field validation', async ({page})=>{
        // Empty name field validation
        await page.locator('#signupName').focus();
        await page.locator('#signupName').blur();
        
        // Border of input field is red
        await expect(page.locator('#signupName')).toHaveCSS('border-color', 'rgb(220, 53, 69)');

        await expect(page.getByText('Name required')).toBeVisible();
        await page.locator('#signupName').fill('test');
        await expect(page.getByText('Name required')).toBeHidden();

        // Invalid name validation
        await page.locator('#signupName').fill('test123');
        await expect(page.getByText('Name is invalid')).toBeVisible();
        await page.locator('#signupName').fill('testName');
        await expect(page.getByText('Name is invalid')).toBeHidden();

        // Invalid length validation
        await page.locator('#signupName').fill('t');
        await expect(page.getByText('Name has to be from 2 to 20 characters long')).toBeVisible();
        await page.locator('#signupName').fill('te');
        await expect(page.getByText('Name has to be from 2 to 20 characters long')).toBeHidden();
        await page.locator('#signupName').fill('test123test123test12');
        await expect(page.getByText('Name has to be from 2 to 20 characters long')).toBeHidden();
        await page.locator('#signupName').fill('test123test123test123');
        await expect(page.getByText('Name has to be from 2 to 20 characters long')).toBeVisible();
    })

    test('"Last name" input field validation', async ({page})=>{
        // Empty Last name field validation
        await page.locator('#signupLastName').focus();
        await page.locator('#signupLastName').blur();

        // Border of input field is red
        await expect(page.locator('#signupLastName')).toHaveCSS('border-color', 'rgb(220, 53, 69)');

        await expect(page.getByText('Last name required')).toBeVisible();
        await page.locator('#signupLastName').fill('testLastName');
        await expect(page.getByText('Last name required')).toBeHidden();

        // Invalid Last name validation
        await page.locator('#signupLastName').fill('test123');
        await expect(page.getByText('Last name is invalid')).toBeVisible();
        await page.locator('#signupLastName').fill('test');
        await expect(page.getByText('Last name is invalid')).toBeHidden();

        // Invalid length validation
        await page.locator('#signupLastName').fill('t');
        await expect(page.getByText('Last name has to be from 2 to 20 characters long')).toBeVisible();
        await page.locator('#signupLastName').fill('te');
        await expect(page.getByText('Last name has to be from 2 to 20 characters long')).toBeHidden();
        await page.locator('#signupLastName').fill('test123test123test12');
        await expect(page.getByText('Last name has to be from 2 to 20 characters long')).toBeHidden();
        await page.locator('#signupLastName').fill('test123test123test123');
        await expect(page.getByText('Last name has to be from 2 to 20 characters long')).toBeVisible();
    })

    test('"Email" input field validation', async ({page})=>{
        // Empty Email field validation
        await page.locator('#signupEmail').focus();
        await page.locator('#signupEmail').blur();

        // Border of input field is red
        await expect(page.locator('#signupEmail')).toHaveCSS('border-color', 'rgb(220, 53, 69)');

        await expect(page.getByText('Email required')).toBeVisible();
        await page.locator('#signupEmail').fill('test@test.test');
        await expect(page.getByText('Email required')).toBeHidden();

        // Incorrect Email validation
        await page.locator('#signupEmail').fill('test');
        await expect(page.getByText('Email is incorrect')).toBeVisible();
        await page.locator('#signupEmail').fill('test@');
        await expect(page.getByText('Email is incorrect')).toBeVisible();
        await page.locator('#signupEmail').fill('test@test.');
        await expect(page.getByText('Email is incorrect')).toBeVisible();
        await page.locator('#signupEmail').fill('test@test.test');
        await expect(page.getByText('Email is incorrect')).toBeHidden();
    })
    
    test('"Password" input field validation', async ({page})=>{
        const passwordInput = page.getByLabel('Password', { exact: true });
        const invalidPWvalidationError = 'Password has to be from 8 to 15 characters long and contain at least one integer, one capital, and one small letter';
        // Empty Password field validation
        await passwordInput.focus();
        await passwordInput.blur();

        // Border of input field is red
        await expect(passwordInput).toHaveCSS('border-color', 'rgb(220, 53, 69)');

        await expect(page.getByText('Password required')).toBeVisible();

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
    
    test('"Re-enter password" input field validation', async ({page})=>{
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