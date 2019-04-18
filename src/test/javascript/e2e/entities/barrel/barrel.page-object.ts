import { element, by, ElementFinder } from 'protractor';

export class BarrelComponentsPage {
    createButton = element(by.id('jh-create-entity'));
    deleteButtons = element.all(by.css('jhi-barrel div table .btn-danger'));
    title = element.all(by.css('jhi-barrel div h2#page-heading span')).first();

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
        return this.title.getText();
    }
}

export class BarrelUpdatePage {
    pageTitle = element(by.id('jhi-barrel-heading'));
    saveButton = element(by.id('save-entity'));
    cancelButton = element(by.id('cancel-save'));
    barreledDateInput = element(by.id('field_barreledDate'));
    warehouseSelect = element(by.id('field_warehouse'));
    mashbillSelect = element(by.id('field_mashbill'));
    orderSelect = element(by.id('field_order'));
    customerSelect = element(by.id('field_customer'));
    batchSelect = element(by.id('field_batch'));

    async getPageTitle() {
        return this.pageTitle.getText();
    }

    async setBarreledDateInput(barreledDate) {
        await this.barreledDateInput.sendKeys(barreledDate);
    }

    async getBarreledDateInput() {
        return this.barreledDateInput.getAttribute('value');
    }

    async warehouseSelectLastOption() {
        await this.warehouseSelect
            .all(by.tagName('option'))
            .last()
            .click();
    }

    async warehouseSelectOption(option) {
        await this.warehouseSelect.sendKeys(option);
    }

    getWarehouseSelect(): ElementFinder {
        return this.warehouseSelect;
    }

    async getWarehouseSelectedOption() {
        return this.warehouseSelect.element(by.css('option:checked')).getText();
    }

    async mashbillSelectLastOption() {
        await this.mashbillSelect
            .all(by.tagName('option'))
            .last()
            .click();
    }

    async mashbillSelectOption(option) {
        await this.mashbillSelect.sendKeys(option);
    }

    getMashbillSelect(): ElementFinder {
        return this.mashbillSelect;
    }

    async getMashbillSelectedOption() {
        return this.mashbillSelect.element(by.css('option:checked')).getText();
    }

    async orderSelectLastOption() {
        await this.orderSelect
            .all(by.tagName('option'))
            .last()
            .click();
    }

    async orderSelectOption(option) {
        await this.orderSelect.sendKeys(option);
    }

    getOrderSelect(): ElementFinder {
        return this.orderSelect;
    }

    async getOrderSelectedOption() {
        return this.orderSelect.element(by.css('option:checked')).getText();
    }

    async customerSelectLastOption() {
        await this.customerSelect
            .all(by.tagName('option'))
            .last()
            .click();
    }

    async customerSelectOption(option) {
        await this.customerSelect.sendKeys(option);
    }

    getCustomerSelect(): ElementFinder {
        return this.customerSelect;
    }

    async getCustomerSelectedOption() {
        return this.customerSelect.element(by.css('option:checked')).getText();
    }

    async batchSelectLastOption() {
        await this.batchSelect
            .all(by.tagName('option'))
            .last()
            .click();
    }

    async batchSelectOption(option) {
        await this.batchSelect.sendKeys(option);
    }

    getBatchSelect(): ElementFinder {
        return this.batchSelect;
    }

    async getBatchSelectedOption() {
        return this.batchSelect.element(by.css('option:checked')).getText();
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

export class BarrelDeleteDialog {
    private dialogTitle = element(by.id('jhi-delete-barrel-heading'));
    private confirmButton = element(by.id('jhi-confirm-delete-barrel'));

    async getDialogTitle() {
        return this.dialogTitle.getText();
    }

    async clickOnConfirmButton() {
        await this.confirmButton.click();
    }
}
