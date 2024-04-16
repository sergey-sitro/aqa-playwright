import BaseComponent from "../../../components/BaseComponent.js";
import { RemoveCarPopup } from "./RemoveCarPopup.js";


export class EditCarPopup extends BaseComponent {

    constructor(page) {
        super(page, page.locator('app-edit-car-modal'));

        this.removeCarBtn = this.container.getByRole('button', { name: 'Remove car' });
        this.confirmRemoveCarBtn = this.container.getByRole('button', { name: 'Remove' });
    }

    async clickRemoveCarBtn() {
        await this.removeCarBtn.click();
        return new RemoveCarPopup(this._page);
    }

}
