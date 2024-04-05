import { SettingsPage } from "../SettingsPage/SettingsPage.js";
import BaseComponent from "../../../components/BaseComponent.js";

export class NavBar extends BaseComponent {
    _settingsBtn
    
    constructor(page) {
        super(page, page.locator('nav'));
        this.settingsBtn = page.getByRole('link', { name: 'Settings' });
    }

    async clickSettingsBtn () {
        await this.settingsBtn.click();
        return new SettingsPage(this._page);
    }
}
