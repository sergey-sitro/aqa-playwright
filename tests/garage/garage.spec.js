import { test, expect } from '../../src/fixtures/userFixtures.js'

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
})
