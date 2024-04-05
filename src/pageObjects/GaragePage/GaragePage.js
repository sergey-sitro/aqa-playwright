import BasePage from "../BasePage.js";

export class GaragePage extends BasePage{
    
    _myProfileBtn
    
    constructor(page) {
        super(page, "/panel/garage");
        this.myProfileBtn = page.getByRole('button', { name: 'My profile' });
    }
}
