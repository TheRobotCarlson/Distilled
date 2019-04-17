import { element, by, ElementFinder } from 'protractor';

export class WarehouseComponentsPage {
    createButton = element(by.id('jh-create-entity'));
    deleteButtons = element.all(by.css('jhi-warehouse div table .btn-danger'));
    title = element.all(by.css('jhi-warehouse div h2#page-heading span')).first();

    async clickOnCreateButton() {
        await this.createButton.click();
    }

    async clickOnLastDeleteButton() {
        await this.deleteButtons.last().click();
    }

    async countDeleteButtons() {
        return this.deleteButtons.count();
    }

    async getTitle() {
        return this.title.getAttribute('jhiTranslate');
    }
}

export class WarehouseUpdatePage {
    pageTitle = element(by.id('jhi-warehouse-heading'));
    saveButton = element(by.id('save-entity'));
    cancelButton = element(by.id('cancel-save'));
    warehouseCodeInput = element(by.id('field_warehouseCode'));
    ownerInput = element(by.id('field_owner'));
    capacityInput = element(by.id('field_capacity'));

    async getPageTitle() {
        return this.pageTitle.getAttribute('jhiTranslate');
    }

    async setWarehouseCodeInput(warehouseCode) {
        await this.warehouseCodeInput.sendKeys(warehouseCode);
    }

    async getWarehouseCodeInput() {
        return this.warehouseCodeInput.getAttribute('value');
    }

    async setOwnerInput(owner) {
        await this.ownerInput.sendKeys(owner);
    }

    async getOwnerInput() {
        return this.ownerInput.getAttribute('value');
    }

    async setCapacityInput(capacity) {
        await this.capacityInput.sendKeys(capacity);
    }

    async getCapacityInput() {
        return this.capacityInput.getAttribute('value');
    }

    async save() {
        await this.saveButton.click();
    }

    async cancel() {
        await this.cancelButton.click();
    }

    getSaveButton(): ElementFinder {
        return this.saveButton;
    }
}

export class WarehouseDeleteDialog {
    private dialogTitle = element(by.id('jhi-delete-warehouse-heading'));
    private confirmButton = element(by.id('jhi-confirm-delete-warehouse'));

    async getDialogTitle() {
        return this.dialogTitle.getAttribute('jhiTranslate');
    }

    async clickOnConfirmButton() {
        await this.confirmButton.click();
    }
}
