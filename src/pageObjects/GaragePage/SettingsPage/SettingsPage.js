import BasePage from "../../BasePage";

export class SettingsPage extends BasePage{
    
    _removeAccountBtn
    
    constructor(page) {
        super(page, "/panel/settings");     
        this.removeAccountBtn = page.getByRole('button', { name: 'Remove my account' });
    }

    async clickRemoveAccountBtn () {
        await this.removeAccountBtn.click();
    }
}
