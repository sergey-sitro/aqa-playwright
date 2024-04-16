import BasePage from "../BasePage.js";
import { AddCarPopup } from "./components/AddCarPopup.js";
import { EditCarPopup } from "./components/EditCarPopup.js";

export default class GaragePage extends BasePage{
    
    _myProfileBtn
    
    constructor(page) {
        super(page, "/panel/garage");
        this.myProfileBtn = page.getByRole('button', { name: 'My profile' });
        this.addCarButton = page.getByRole('button', { name: 'Add car' });
        this.carItem = page.locator('.car');
        this.editBtn = page.locator('.btn-edit');
    }

    async openAddCarPopup() {
        await this.addCarButton.click();
        return new AddCarPopup(this._page);
    }

    async openEditCarPopup() {
        await this.editBtn.click();
        return new EditCarPopup(this._page);
    }
}
