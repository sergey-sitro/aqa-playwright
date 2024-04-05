import { test, expect } from '@playwright/test';
import {WelcomePage} from '../../src/pageObjects/WelcomePage/WelcomePage.js';
import {GaragePage} from '../../src/pageObjects/GaragePage/GaragePage.js';
import {NavBar} from '../../src/pageObjects/GaragePage/components/NavBar.js';
import {RemoveUserPopup} from '../../src/pageObjects/GaragePage/SettingsPage/components/RemoveUserPopup.js';
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
            let navBar
            let settingsPage
            let removeUserPopup

            test.beforeEach(async ({page}) => {
                garagePage = new GaragePage(page);
                navBar = new NavBar(page);
                removeUserPopup = new RemoveUserPopup(page)
            });

            // Delete test user after each successful sign up
            test.afterEach(async () => {
                settingsPage = await navBar.clickSettingsBtn();
                await navBar.clickSettingsBtn();
                await settingsPage.clickRemoveAccountBtn();
                await removeUserPopup.clickConfirmRemoveAccountBtn();
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
                test('Name input field validation', async () => {
                    await test.step('Empty name field validation', async () => {
                        await signUpPopup.nameInput.focus();
                        await signUpPopup.nameInput.blur();
                        await expect(signUpPopup.nameValidationError).toHaveText('Name required');
                        await expect(signUpPopup.nameInput).toHaveCSS('border-color', testData.errorBorderColorCSS);
                        await expect(signUpPopup.registerBtn, "Register button should be disabled").toBeDisabled();
            
                        await signUpPopup.nameInput.fill(testData.testName);
                        await expect(signUpPopup.nameValidationError).toBeHidden();
                    });
                    
                    await test.step('Invalid name validation', async ()=>{
                        await signUpPopup.nameInput.fill(testData.invalidName);
                        await expect(signUpPopup.nameValidationError).toHaveText('Name is invalid');
                        await expect(signUpPopup.nameInput).toHaveCSS('border-color', testData.errorBorderColorCSS);
                        await expect(signUpPopup.registerBtn, 'Register button should be disabled').toBeDisabled();
            
                        await signUpPopup.nameInput.fill(testData.testName);
                        await expect(signUpPopup.nameValidationError).toBeHidden();
                    });
            
                    await test.step('Invalid length validation', async ()=>{
                        await signUpPopup.nameInput.fill(testData.shortName);
                        await expect(signUpPopup.nameValidationError).toHaveText('Name has to be from 2 to 20 characters long');
                        await expect(signUpPopup.nameInput).toHaveCSS('border-color', testData.errorBorderColorCSS);
                        await expect(signUpPopup.registerBtn, 'Register button should be disabled').toBeDisabled();
            
                        await signUpPopup.nameInput.fill(testData.minimumLengthName);
                        await expect(signUpPopup.nameValidationError).toBeHidden();
            
                        await signUpPopup.nameInput.fill(testData.maximumLengthName);
                        await expect(signUpPopup.nameValidationError).toBeHidden();
            
                        await signUpPopup.nameInput.fill(testData.longName);
                        await expect(signUpPopup.nameValidationError).toHaveText('Name has to be from 2 to 20 characters long');
                        await expect(signUpPopup.nameInput).toHaveCSS('border-color', testData.errorBorderColorCSS);
                        await expect(signUpPopup.registerBtn, 'Register button should be disabled').toBeDisabled();
                    });
                });
            
                test('Last name input field validation', async () => { 
                    await test.step('Empty Last name field validation', async () => {
                        await signUpPopup.lastNameInput.focus();
                        await signUpPopup.lastNameInput.blur();
                        await expect(signUpPopup.lastNameValidationError).toHaveText('Last name required');
                        await expect(signUpPopup.lastNameInput).toHaveCSS('border-color', testData.errorBorderColorCSS);
                        await expect(signUpPopup.registerBtn, 'Register button should be disabled').toBeDisabled();
            
                        await signUpPopup.lastNameInput.fill(testData.testLastName);
                        await expect(signUpPopup.lastNameValidationError).toBeHidden();
                    });
            
                    await test.step('Invalid Last name validation', async () => {
                        await signUpPopup.lastNameInput.fill(testData.invalidLastName);
                        await expect(signUpPopup.lastNameValidationError).toHaveText('Last name is invalid');
                        await expect(signUpPopup.lastNameInput).toHaveCSS('border-color', testData.errorBorderColorCSS);
                        await expect(signUpPopup.registerBtn, 'Register button should be disabled').toBeDisabled();
            
                        await signUpPopup.lastNameInput.fill(testData.testLastName);
                        await expect(signUpPopup.lastNameValidationError).toBeHidden();
                    });
            
                    await test.step('Invalid length validation', async () => {
                        await signUpPopup.lastNameInput.fill(testData.shortLastName);
                        await expect(signUpPopup.lastNameValidationError).toHaveText('Last name has to be from 2 to 20 characters long');
                        await expect(signUpPopup.lastNameInput).toHaveCSS('border-color', testData.errorBorderColorCSS);
                        await expect(signUpPopup.registerBtn, 'Register button should be disabled').toBeDisabled();
            
                        await signUpPopup.lastNameInput.fill(testData.minimumLengthLastName);
                        await expect(signUpPopup.lastNameValidationError).toBeHidden();
            
                        await signUpPopup.lastNameInput.fill(testData.maximumLengthLastName);
                        await expect(signUpPopup.lastNameValidationError).toBeHidden();
            
                        await signUpPopup.lastNameInput.fill(testData.longLastName);
                        await expect(signUpPopup.lastNameValidationError).toHaveText('Last name has to be from 2 to 20 characters long');
                        await expect(signUpPopup.lastNameInput).toHaveCSS('border-color', testData.errorBorderColorCSS);
                        await expect(signUpPopup.registerBtn, 'Register button should be disabled').toBeDisabled();
                    });
                });
            
                test('Email input field validation', async () => {
                    await test.step('Empty Email field validation', async ()=>{
                        await signUpPopup.emailInput.focus();
                        await signUpPopup.emailInput.blur();
                        await expect(signUpPopup.emailValidationError).toHaveText('Email required');
                        await expect(signUpPopup.emailInput).toHaveCSS('border-color', testData.errorBorderColorCSS);
                        await expect(signUpPopup.registerBtn, 'Register button should be disabled').toBeDisabled();
            
                        await signUpPopup.emailInput.fill(testData.testEmail);
                        await expect(signUpPopup.emailValidationError).toBeHidden();
                    });
            
                    await test.step('Incorrect Email validation', async ()=>{
                        for (let i = 0; i < testData.invalidEmails.length; i++) {
                            await signUpPopup.emailInput.fill(testData.invalidEmails[i]);
                            await expect(signUpPopup.emailValidationError).toHaveText('Email is incorrect');
                            await expect(signUpPopup.emailInput).toHaveCSS('border-color', testData.errorBorderColorCSS);
                            await expect(signUpPopup.registerBtn, 'Register button should be disabled').toBeDisabled();
                        }
                
                        await signUpPopup.emailInput.fill(testData.testEmail);
                        await expect(signUpPopup.emailValidationError).toBeHidden();
                    });
                });
                
                test('Password input field validation', async ()=>{
                    await test.step('Empty Password field validation', async ()=>{
                        await signUpPopup.passwordInput.focus();
                        await signUpPopup.passwordInput.blur();
                        await expect(signUpPopup.passwordValidationError).toHaveText('Password required');
                        await expect(signUpPopup.passwordInput).toHaveCSS('border-color', testData.errorBorderColorCSS);
                        await expect(signUpPopup.registerBtn, 'Register button should be disabled').toBeDisabled();
            
                        await signUpPopup.passwordInput.fill(testData.testPassword);
                        await expect(signUpPopup.passwordValidationError).toBeHidden();
                    });
                    
                    await test.step('Invalid Password field validation', async ()=>{
                        for (let i = 0; i < testData.invalidPasswords.length; i++) {
                            await signUpPopup.passwordInput.fill(testData.invalidPasswords[i]);
                            await expect(signUpPopup.passwordValidationError).toHaveText('Password has to be from 8 to 15 characters long and contain at least one integer, one capital, and one small letter');
                            await expect(signUpPopup.passwordInput).toHaveCSS('border-color', testData.errorBorderColorCSS);
                            await expect(signUpPopup.registerBtn, 'Register button should be disabled').toBeDisabled();
                        }
                
                        await signUpPopup.passwordInput.fill(testData.testPassword);
                        await expect(signUpPopup.passwordValidationError).toBeHidden();
                    });
                });
                
                test('Re-enter password input field validation', async () => {
                    await test.step('Empty Re-enter password field validation', async () => {
                        await signUpPopup.reenterPasswordInput.focus();
                        await signUpPopup.reenterPasswordInput.blur();
                        await expect(signUpPopup.reenterPasswordValidationError).toHaveText('Re-enter password required');
                        await expect(signUpPopup.reenterPasswordInput).toHaveCSS('border-color', testData.errorBorderColorCSS);
                        await expect(signUpPopup.registerBtn, 'Register button should be disabled').toBeDisabled();
            
                        await signUpPopup.reenterPasswordInput.fill(testData.testPassword);
                        await expect(signUpPopup.reenterPasswordValidationError).toHaveText('Passwords do not match');
                    });
                    
                    await test.step('Invalid Re-enter password field validation', async ()=>{
                        for (let i = 0; i < testData.invalidPasswords.length; i++) {
                            await signUpPopup.reenterPasswordInput.fill(testData.invalidPasswords[i]);
                            await expect(signUpPopup.reenterPasswordValidationError).toHaveText('Password has to be from 8 to 15 characters long and contain at least one integer, one capital, and one small letter');
                            await expect(signUpPopup.reenterPasswordInput).toHaveCSS('border-color', testData.errorBorderColorCSS);
                            await expect(signUpPopup.registerBtn, 'Register button should be disabled').toBeDisabled();
                        }
                
                        await signUpPopup.reenterPasswordInput.fill(testData.testPassword);
                        await expect(signUpPopup.reenterPasswordValidationError).toHaveText('Passwords do not match');
                    });
                });
            });
        });
    });
});
