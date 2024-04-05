import BaseComponent from "../../../../components/BaseComponent";

export class RemoveUserPopup extends BaseComponent {

    _confirmRemoveAccountBtn
    
    constructor(page) {
        super(page, page.locator('.modal-content'));
        this.confirmRemoveAccountBtn = page.getByRole('button', { name: 'Remove' });
    }

    async clickConfirmRemoveAccountBtn () {
        await this.confirmRemoveAccountBtn.click();
    }
}
