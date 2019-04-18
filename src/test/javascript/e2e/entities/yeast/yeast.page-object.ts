import { element, by, ElementFinder } from 'protractor';

export class YeastComponentsPage {
    createButton = element(by.id('jh-create-entity'));
    deleteButtons = element.all(by.css('jhi-yeast div table .btn-danger'));
    title = element.all(by.css('jhi-yeast div h2#page-heading span')).first();

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

export class YeastUpdatePage {
    pageTitle = element(by.id('jhi-yeast-heading'));
    saveButton = element(by.id('save-entity'));
    cancelButton = element(by.id('cancel-save'));
    yeastNameInput = element(by.id('field_yeastName'));
    yeastCodeInput = element(by.id('field_yeastCode'));
    yeastPalletNumInput = element(by.id('field_yeastPalletNum'));

    async getPageTitle() {
        return this.pageTitle.getText();
    }

    async setYeastNameInput(yeastName) {
        await this.yeastNameInput.sendKeys(yeastName);
    }

    async getYeastNameInput() {
        return this.yeastNameInput.getAttribute('value');
    }

    async setYeastCodeInput(yeastCode) {
        await this.yeastCodeInput.sendKeys(yeastCode);
    }

    async getYeastCodeInput() {
        return this.yeastCodeInput.getAttribute('value');
    }

    async setYeastPalletNumInput(yeastPalletNum) {
        await this.yeastPalletNumInput.sendKeys(yeastPalletNum);
    }

    async getYeastPalletNumInput() {
        return this.yeastPalletNumInput.getAttribute('value');
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

export class YeastDeleteDialog {
    private dialogTitle = element(by.id('jhi-delete-yeast-heading'));
    private confirmButton = element(by.id('jhi-confirm-delete-yeast'));

    async getDialogTitle() {
        return this.dialogTitle.getText();
    }

    async clickOnConfirmButton() {
        await this.confirmButton.click();
    }
}
