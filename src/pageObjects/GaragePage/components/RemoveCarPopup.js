import BaseComponent from "../../../components/BaseComponent.js";


export class RemoveCarPopup extends BaseComponent {

    constructor(page) {
        super(page, page.locator('app-remove-car-modal'));

        this.confirmRemoveCarBtn = this.container.getByRole('button', { name: 'Remove' });
    }

    async clickConfirmRemoveCarBtn() {
        await this.confirmRemoveCarBtn.click();
    }

}
