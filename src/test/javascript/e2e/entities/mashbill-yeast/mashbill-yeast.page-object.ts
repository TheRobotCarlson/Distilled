import { element, by, ElementFinder } from 'protractor';

export class MashbillYeastComponentsPage {
    createButton = element(by.id('jh-create-entity'));
    deleteButtons = element.all(by.css('jhi-mashbill-yeast div table .btn-danger'));
    title = element.all(by.css('jhi-mashbill-yeast div h2#page-heading span')).first();

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

export class MashbillYeastUpdatePage {
    pageTitle = element(by.id('jhi-mashbill-yeast-heading'));
    saveButton = element(by.id('save-entity'));
    cancelButton = element(by.id('cancel-save'));
    quantityInput = element(by.id('field_quantity'));
    yeastSelect = element(by.id('field_yeast'));

    async getPageTitle() {
        return this.pageTitle.getText();
    }

    async setQuantityInput(quantity) {
        await this.quantityInput.sendKeys(quantity);
    }

    async getQuantityInput() {
        return this.quantityInput.getAttribute('value');
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

export class MashbillYeastDeleteDialog {
    private dialogTitle = element(by.id('jhi-delete-mashbillYeast-heading'));
    private confirmButton = element(by.id('jhi-confirm-delete-mashbillYeast'));

    async getDialogTitle() {
        return this.dialogTitle.getText();
    }

    async clickOnConfirmButton() {
        await this.confirmButton.click();
    }
}
