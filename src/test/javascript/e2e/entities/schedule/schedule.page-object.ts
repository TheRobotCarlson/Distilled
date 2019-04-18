import { element, by, ElementFinder } from 'protractor';

export class ScheduleComponentsPage {
    createButton = element(by.id('jh-create-entity'));
    deleteButtons = element.all(by.css('jhi-schedule div table .btn-danger'));
    title = element.all(by.css('jhi-schedule div h2#page-heading span')).first();

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

export class ScheduleUpdatePage {
    pageTitle = element(by.id('jhi-schedule-heading'));
    saveButton = element(by.id('save-entity'));
    cancelButton = element(by.id('cancel-save'));
    targetDateInput = element(by.id('field_targetDate'));
    orderCodeInput = element(by.id('field_orderCode'));
    barrelCountInput = element(by.id('field_barrelCount'));
    targetProofInput = element(by.id('field_targetProof'));
    notesInput = element(by.id('field_notes'));
    mashbillSelect = element(by.id('field_mashbill'));
    customerSelect = element(by.id('field_customer'));
    warehouseSelect = element(by.id('field_warehouse'));

    async getPageTitle() {
        return this.pageTitle.getText();
    }

    async setTargetDateInput(targetDate) {
        await this.targetDateInput.sendKeys(targetDate);
    }

    async getTargetDateInput() {
        return this.targetDateInput.getAttribute('value');
    }

    async setOrderCodeInput(orderCode) {
        await this.orderCodeInput.sendKeys(orderCode);
    }

    async getOrderCodeInput() {
        return this.orderCodeInput.getAttribute('value');
    }

    async setBarrelCountInput(barrelCount) {
        await this.barrelCountInput.sendKeys(barrelCount);
    }

    async getBarrelCountInput() {
        return this.barrelCountInput.getAttribute('value');
    }

    async setTargetProofInput(targetProof) {
        await this.targetProofInput.sendKeys(targetProof);
    }

    async getTargetProofInput() {
        return this.targetProofInput.getAttribute('value');
    }

    async setNotesInput(notes) {
        await this.notesInput.sendKeys(notes);
    }

    async getNotesInput() {
        return this.notesInput.getAttribute('value');
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

export class ScheduleDeleteDialog {
    private dialogTitle = element(by.id('jhi-delete-schedule-heading'));
    private confirmButton = element(by.id('jhi-confirm-delete-schedule'));

    async getDialogTitle() {
        return this.dialogTitle.getText();
    }

    async clickOnConfirmButton() {
        await this.confirmButton.click();
    }
}
