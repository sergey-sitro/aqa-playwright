import { test, expect } from '@playwright/test';
import {WelcomePage} from '../../src/pageObjects/WelcomePage/WelcomePage.js';
import {GaragePage} from '../../src/pageObjects/GaragePage/GaragePage.js';
import * as testData from '../../src/data/testData.js';

test.describe('Auth', () => {

    test.describe('Sign Up', () => {
        let signUpPopup
        let welcomePage

        test.beforeEach(async ({page}) => {
            welcomePage = new WelcomePage(page);
            await welcomePage.navigate();
            signUpPopup = await welcomePage.openSignUpPopup()
        });

        test.describe('Positive flow', () => {
            let garagePage

            test.beforeEach(async ({page}) => {
                garagePage = new GaragePage(page);
            });

            // Delete test user after each successful sign up
            test.afterEach(async () => {
                await garagePage.clickSettingsBtn();
                await garagePage.clickRemoveAccountBtn();
                await garagePage.clickConfirmRemoveAccountBtn();
            });

            test('user should be able to sign up', async () => {
                await signUpPopup.nameInput.fill(testData.testName);
                await signUpPopup.lastNameInput.fill(testData.testLastName);
                await signUpPopup.emailInput.fill(testData.testEmail);
                await signUpPopup.passwordInput.fill(testData.testPassword);
                await signUpPopup.reenterPasswordInput.fill(testData.testPassword);
                await signUpPopup.registerBtn.click();

                await expect(garagePage.myProfileBtn).toBeVisible();
                expect(await garagePage.getCurrentUrl(), "User should be redirected to garage page").toEqual('/panel/garage');
            });
        });

        test.describe('Negative flow', () => {
            test.describe('Input fields validation', () => {
            
                test.afterEach(async () => {
                    await expect(signUpPopup.registerBtn).toBeDisabled();
                });
            
                test('Name input field validation', async () => {
                    await test.step('Empty name field validation', async () => {
                        await signUpPopup.nameInput.focus();
                        await signUpPopup.nameInput.blur();
                        await expect(signUpPopup.emptyNameError).toBeVisible();
                        await expect(signUpPopup.nameInput).toHaveCSS('border-color', testData.errorBorderColorCSS);
            
                        await signUpPopup.nameInput.fill(testData.testName);
                        await expect(signUpPopup.emptyNameError).toBeHidden();
                    });
                    
                    await test.step('Invalid name validation', async ()=>{
                        await signUpPopup.nameInput.fill(testData.invalidName);
                        await expect(signUpPopup.invalidNameError).toBeVisible();
                        await expect(signUpPopup.nameInput).toHaveCSS('border-color', testData.errorBorderColorCSS);
            
                        await signUpPopup.nameInput.fill(testData.testName);
                        await expect(signUpPopup.invalidNameError).toBeHidden();
                    });
            
                    await test.step('Invalid length validation', async ()=>{
                        await signUpPopup.nameInput.fill(testData.shortName);
                        await expect(signUpPopup.nameLengthValidationError).toBeVisible();
                        await expect(signUpPopup.nameInput).toHaveCSS('border-color', testData.errorBorderColorCSS);
            
                        await signUpPopup.nameInput.fill(testData.minimumLengthName);
                        await expect(signUpPopup.nameLengthValidationError).toBeHidden();
            
                        await signUpPopup.nameInput.fill(testData.maximumLengthName);
                        await expect(signUpPopup.nameLengthValidationError).toBeHidden();
            
                        await signUpPopup.nameInput.fill(testData.longName);
                        await expect(signUpPopup.nameLengthValidationError).toBeVisible();
                        await expect(signUpPopup.nameInput).toHaveCSS('border-color', testData.errorBorderColorCSS);
                    });
                });
            
                test('Last name input field validation', async () => { 
                    await test.step('Empty Last name field validation', async () => {
                        await signUpPopup.lastNameInput.focus();
                        await signUpPopup.lastNameInput.blur();
                        await expect(signUpPopup.emptyLastNameError).toBeVisible();
                        await expect(signUpPopup.lastNameInput).toHaveCSS('border-color', testData.errorBorderColorCSS);
            
                        await signUpPopup.lastNameInput.fill(testData.testLastName);
                        await expect(signUpPopup.emptyLastNameError).toBeHidden();
                    });
            
                    await test.step('Invalid Last name validation', async () => {
                        await signUpPopup.lastNameInput.fill(testData.invalidLastName);
                        await expect(signUpPopup.invalidLastNameError).toBeVisible();
                        await expect(signUpPopup.lastNameInput).toHaveCSS('border-color', testData.errorBorderColorCSS);
            
                        await signUpPopup.lastNameInput.fill(testData.testLastName);
                        await expect(signUpPopup.invalidLastNameError).toBeHidden();
                    });
            
                    await test.step('Invalid length validation', async () => {
                        await signUpPopup.lastNameInput.fill(testData.shortLastName);
                        await expect(signUpPopup.lastNameLengthValidationError).toBeVisible();
                        await expect(signUpPopup.lastNameInput).toHaveCSS('border-color', testData.errorBorderColorCSS);
            
                        await signUpPopup.lastNameInput.fill(testData.minimumLengthLastName);
                        await expect(signUpPopup.lastNameLengthValidationError).toBeHidden();
            
                        await signUpPopup.lastNameInput.fill(testData.maximumLengthLastName);
                        await expect(signUpPopup.lastNameLengthValidationError).toBeHidden();
            
                        await signUpPopup.lastNameInput.fill(testData.longLastName);
                        await expect(signUpPopup.lastNameLengthValidationError).toBeVisible();
                        await expect(signUpPopup.lastNameInput).toHaveCSS('border-color', testData.errorBorderColorCSS);
                    });
                });
            
                test('Email input field validation', async ({page}) => {
                    await test.step('Empty Email field validation', async ()=>{
                        await signUpPopup.emailInput.focus();
                        await signUpPopup.emailInput.blur();
                        await expect(signUpPopup.emptyEmailError).toBeVisible();
                        await expect(signUpPopup.emailInput).toHaveCSS('border-color', testData.errorBorderColorCSS);
            
                        await signUpPopup.emailInput.fill(testData.testEmail);
                        await expect(signUpPopup.emptyEmailError).toBeHidden();
                    });
            
                    await test.step('Incorrect Email validation', async ()=>{
                        for (let i = 0; i < testData.invalidEmails.length; i++) {
                            await signUpPopup.emailInput.fill(testData.invalidEmails[i]);
                            await expect(signUpPopup.invalidEmailError).toBeVisible();
                            await expect(signUpPopup.emailInput).toHaveCSS('border-color', testData.errorBorderColorCSS);
                        }
                
                        await signUpPopup.emailInput.fill(testData.testEmail);
                        await expect(signUpPopup.invalidEmailError).toBeHidden();
                    });
                });
                
                test('Password input field validation', async ()=>{
                    await test.step('Empty Password field validation', async ()=>{
                        await signUpPopup.passwordInput.focus();
                        await signUpPopup.passwordInput.blur();
                        await expect(signUpPopup.emptyPasswordError).toBeVisible();
                        await expect(signUpPopup.passwordInput).toHaveCSS('border-color', testData.errorBorderColorCSS);
            
                        await signUpPopup.passwordInput.fill(testData.testPassword);
                        await expect(signUpPopup.emptyPasswordError).toBeHidden();
                    });
                    
                    await test.step('Invalid Password field validation', async ()=>{
                        for (let i = 0; i < testData.invalidPasswords.length; i++) {
                            await signUpPopup.passwordInput.fill(testData.invalidPasswords[i]);
                            await expect(signUpPopup.invalidPasswordError).toBeVisible();
                            await expect(signUpPopup.passwordInput).toHaveCSS('border-color', testData.errorBorderColorCSS);
                        }
                
                        await signUpPopup.passwordInput.fill(testData.testPassword);
                        await expect(signUpPopup.invalidPasswordError).toBeHidden();
                    });
                });
                
                test('Re-enter password input field validation', async () => {
                    await test.step('Empty Re-enter password field validation', async () => {
                        await signUpPopup.reenterPasswordInput.focus();
                        await signUpPopup.reenterPasswordInput.blur();
                        await expect(signUpPopup.emptyReenterPasswordError).toBeVisible();
                        await expect(signUpPopup.reenterPasswordInput).toHaveCSS('border-color', testData.errorBorderColorCSS);
            
                        await signUpPopup.reenterPasswordInput.fill(testData.testPassword);
                        await expect(signUpPopup.emptyReenterPasswordError).toBeHidden();
                    });
                    
                    await test.step('Invalid Re-enter password field validation', async ()=>{
                        for (let i = 0; i < testData.invalidPasswords.length; i++) {
                            await signUpPopup.reenterPasswordInput.fill(testData.invalidPasswords[i]);
                            await expect(signUpPopup.invalidReenterPasswordError).toBeVisible();
                            await expect(signUpPopup.reenterPasswordInput).toHaveCSS('border-color', testData.errorBorderColorCSS);
                        }
                
                        await signUpPopup.reenterPasswordInput.fill(testData.testPassword);
                        await expect(signUpPopup.invalidReenterPasswordError).toBeHidden();
                    });
                });
            });
        });
    });
});
