import { element, by, ElementFinder } from 'protractor';

export class MashbillComponentsPage {
    createButton = element(by.id('jh-create-entity'));
    deleteButtons = element.all(by.css('jhi-mashbill div table .btn-danger'));
    title = element.all(by.css('jhi-mashbill div h2#page-heading span')).first();

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

export class MashbillUpdatePage {
    pageTitle = element(by.id('jhi-mashbill-heading'));
    saveButton = element(by.id('save-entity'));
    cancelButton = element(by.id('cancel-save'));
    mashbillNameInput = element(by.id('field_mashbillName'));
    mashbillCodeInput = element(by.id('field_mashbillCode'));
    mashbillNotesInput = element(by.id('field_mashbillNotes'));
    yeastSelect = element(by.id('field_yeast'));
    spiritSelect = element(by.id('field_spirit'));
    customerSelect = element(by.id('field_customer'));

    async getPageTitle() {
        return this.pageTitle.getText();
    }

    async setMashbillNameInput(mashbillName) {
        await this.mashbillNameInput.sendKeys(mashbillName);
    }

    async getMashbillNameInput() {
        return this.mashbillNameInput.getAttribute('value');
    }

    async setMashbillCodeInput(mashbillCode) {
        await this.mashbillCodeInput.sendKeys(mashbillCode);
    }

    async getMashbillCodeInput() {
        return this.mashbillCodeInput.getAttribute('value');
    }

    async setMashbillNotesInput(mashbillNotes) {
        await this.mashbillNotesInput.sendKeys(mashbillNotes);
    }

    async getMashbillNotesInput() {
        return this.mashbillNotesInput.getAttribute('value');
    }

    async yeastSelectLastOption() {
        await this.yeastSelect
            .all(by.tagName('option'))
            .last()
            .click();
    }

    async yeastSelectOption(option) {
        await this.yeastSelect.sendKeys(option);
    }

    getYeastSelect(): ElementFinder {
        return this.yeastSelect;
    }

    async getYeastSelectedOption() {
        return this.yeastSelect.element(by.css('option:checked')).getText();
    }

    async spiritSelectLastOption() {
        await this.spiritSelect
            .all(by.tagName('option'))
            .last()
            .click();
    }

    async spiritSelectOption(option) {
        await this.spiritSelect.sendKeys(option);
    }

    getSpiritSelect(): ElementFinder {
        return this.spiritSelect;
    }

    async getSpiritSelectedOption() {
        return this.spiritSelect.element(by.css('option:checked')).getText();
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

export class MashbillDeleteDialog {
    private dialogTitle = element(by.id('jhi-delete-mashbill-heading'));
    private confirmButton = element(by.id('jhi-confirm-delete-mashbill'));

    async getDialogTitle() {
        return this.dialogTitle.getText();
    }

    async clickOnConfirmButton() {
        await this.confirmButton.click();
    }
}
