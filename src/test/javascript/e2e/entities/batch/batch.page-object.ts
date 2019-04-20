import { element, by, ElementFinder } from 'protractor';

export class BatchComponentsPage {
    createButton = element(by.id('jh-create-entity'));
    deleteButtons = element.all(by.css('jhi-batch div table .btn-danger'));
    title = element.all(by.css('jhi-batch div h2#page-heading span')).first();

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

export class BatchUpdatePage {
    pageTitle = element(by.id('jhi-batch-heading'));
    saveButton = element(by.id('save-entity'));
    cancelButton = element(by.id('cancel-save'));
    proofInput = element(by.id('field_proof'));
    dateInput = element(by.id('field_date'));
    orderCodeInput = element(by.id('field_orderCode'));
    warehouseSelect = element(by.id('field_warehouse'));
    scheduleSelect = element(by.id('field_schedule'));

    async getPageTitle() {
        return this.pageTitle.getText();
    }

    async setProofInput(proof) {
        await this.proofInput.sendKeys(proof);
    }

    async getProofInput() {
        return this.proofInput.getAttribute('value');
    }

    async setDateInput(date) {
        await this.dateInput.sendKeys(date);
    }

    async getDateInput() {
        return this.dateInput.getAttribute('value');
    }

    async setOrderCodeInput(orderCode) {
        await this.orderCodeInput.sendKeys(orderCode);
    }

    async getOrderCodeInput() {
        return this.orderCodeInput.getAttribute('value');
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

    async scheduleSelectLastOption() {
        await this.scheduleSelect
            .all(by.tagName('option'))
            .last()
            .click();
    }

    async scheduleSelectOption(option) {
        await this.scheduleSelect.sendKeys(option);
    }

    getScheduleSelect(): ElementFinder {
        return this.scheduleSelect;
    }

    async getScheduleSelectedOption() {
        return this.scheduleSelect.element(by.css('option:checked')).getText();
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

export class BatchDeleteDialog {
    private dialogTitle = element(by.id('jhi-delete-batch-heading'));
    private confirmButton = element(by.id('jhi-confirm-delete-batch'));

    async getDialogTitle() {
        return this.dialogTitle.getText();
    }

    async clickOnConfirmButton() {
        await this.confirmButton.click();
    }
}
