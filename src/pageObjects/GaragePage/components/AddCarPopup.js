import BaseComponent from "../../../components/BaseComponent.js";


export class AddCarPopup extends BaseComponent {
    _brandDrowdownSelector = '#addCarBrand';
    _modelDropdownSelector = '#addCarModel';
    _mileageInputSelector = '#addCarMileage';

    constructor(page) {
        super(page, page.locator('app-add-car-modal'));
        
        this.brandDropdown =  this.container.locator(this._brandDrowdownSelector);
        this.modelDropdown =  this.container.locator(this._modelDropdownSelector);
        this.mileageInput = this.container.locator(this._mileageInputSelector);
        

        this.cancelButton = this.container.locator('.btn-secondary');
        this.addButton = this.container.locator('.btn-primary');
    }
}