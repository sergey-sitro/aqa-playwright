import { test, expect } from '../../src/fixtures/userFixtures.js'
// import { USER_MOCK_RESPONSE } from "./fixtures/user.js";

test.describe('Add cars to garage', () => {
    test('Add Ford Focus', async ({garagePage}) => {
        await expect(garagePage.addCarButton).toBeVisible();

        const addCarPopup = await garagePage.openAddCarPopup();
        await addCarPopup.brandDropdown.selectOption('Ford');
        await addCarPopup.modelDropdown.selectOption('Focus');
        await addCarPopup.mileageInput.fill('100');
        await addCarPopup.addButton.click();

        await expect(garagePage.carItem).toBeVisible();

        const editCarPopup = await garagePage.openEditCarPopup();
        const removeCarPopup = await editCarPopup.clickRemoveCarBtn();
        await removeCarPopup.clickConfirmRemoveCarBtn();
    });

    test.describe('Garage (network)', () => {
        test('should display received user name from mock', async ({ profilePage }) => {

            // const mockedUserName = USER_MOCK_RESPONSE.data.name + ' ' + USER_MOCK_RESPONSE.data.lastName;
            const userName = await profilePage.getUserName();

            // For component UI testing with mocks I'd use hardcoded values
            expect(userName).toStrictEqual('Mock User');
        });
    })
})
