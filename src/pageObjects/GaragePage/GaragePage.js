import BasePage from "../BasePage.js";

export class GaragePage extends BasePage{
    _settingsBtn
    _removeAccountBtn
    _confirmRemoveAccountBtn
    _myProfileBtn
    
    constructor(page) {
        super(page, "/panel/garage");
        this.settingsBtn = page.getByRole('link', { name: 'Settings' });
        this.removeAccountBtn = page.getByRole('button', { name: 'Remove my account' });
        this.confirmRemoveAccountBtn = page.getByRole('button', { name: 'Remove' });
        this.myProfileBtn = page.getByRole('button', { name: 'My profile' });
    }

    async clickSettingsBtn () {
        await this.settingsBtn.click();
    }

    async clickRemoveAccountBtn () {
        await this.removeAccountBtn.click();
    }

    async clickConfirmRemoveAccountBtn () {
        await this.confirmRemoveAccountBtn.click();
    }
}
