import { element, by, ElementFinder } from 'protractor';

export class CustomerComponentsPage {
    createButton = element(by.id('jh-create-entity'));
    deleteButtons = element.all(by.css('jhi-customer div table .btn-danger'));
    title = element.all(by.css('jhi-customer div h2#page-heading span')).first();

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

export class CustomerUpdatePage {
    pageTitle = element(by.id('jhi-customer-heading'));
    saveButton = element(by.id('save-entity'));
    cancelButton = element(by.id('cancel-save'));
    customerNameInput = element(by.id('field_customerName'));
    customerCodeInput = element(by.id('field_customerCode'));

    async getPageTitle() {
        return this.pageTitle.getText();
    }

    async setCustomerNameInput(customerName) {
        await this.customerNameInput.sendKeys(customerName);
    }

    async getCustomerNameInput() {
        return this.customerNameInput.getAttribute('value');
    }

    async setCustomerCodeInput(customerCode) {
        await this.customerCodeInput.sendKeys(customerCode);
    }

    async getCustomerCodeInput() {
        return this.customerCodeInput.getAttribute('value');
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

export class CustomerDeleteDialog {
    private dialogTitle = element(by.id('jhi-delete-customer-heading'));
    private confirmButton = element(by.id('jhi-confirm-delete-customer'));

    async getDialogTitle() {
        return this.dialogTitle.getText();
    }

    async clickOnConfirmButton() {
        await this.confirmButton.click();
    }
}
