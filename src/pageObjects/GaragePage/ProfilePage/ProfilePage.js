import BasePage from "../../BasePage";

export class ProfilePage extends BasePage{
    
    _userName
    
    constructor(page) {
        super(page, "/panel/profile");
        this.userName = page.locator('.profile_name');
    }

    async getUserName() {
        return await this.userName.textContent();
    }
}
