import { element, by, ElementFinder } from 'protractor';

export class MashbillGrainComponentsPage {
    createButton = element(by.id('jh-create-entity'));
    deleteButtons = element.all(by.css('jhi-mashbill-grain div table .btn-danger'));
    title = element.all(by.css('jhi-mashbill-grain div h2#page-heading span')).first();

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

export class MashbillGrainUpdatePage {
    pageTitle = element(by.id('jhi-mashbill-grain-heading'));
    saveButton = element(by.id('save-entity'));
    cancelButton = element(by.id('cancel-save'));
    quantityInput = element(by.id('field_quantity'));
    grainSelect = element(by.id('field_grain'));
    mashbillSelect = element(by.id('field_mashbill'));

    async getPageTitle() {
        return this.pageTitle.getAttribute('jhiTranslate');
    }

    async setQuantityInput(quantity) {
        await this.quantityInput.sendKeys(quantity);
    }

    async getQuantityInput() {
        return this.quantityInput.getAttribute('value');
    }

    async grainSelectLastOption() {
        await this.grainSelect
            .all(by.tagName('option'))
            .last()
            .click();
    }

    async grainSelectOption(option) {
        await this.grainSelect.sendKeys(option);
    }

    getGrainSelect(): ElementFinder {
        return this.grainSelect;
    }

    async getGrainSelectedOption() {
        return this.grainSelect.element(by.css('option:checked')).getText();
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

export class MashbillGrainDeleteDialog {
    private dialogTitle = element(by.id('jhi-delete-mashbillGrain-heading'));
    private confirmButton = element(by.id('jhi-confirm-delete-mashbillGrain'));

    async getDialogTitle() {
        return this.dialogTitle.getAttribute('jhiTranslate');
    }

    async clickOnConfirmButton() {
        await this.confirmButton.click();
    }
}
