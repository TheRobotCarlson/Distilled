import { element, by, ElementFinder } from 'protractor';

export class ProductionSummaryComponentsPage {
    createButton = element(by.id('jh-create-entity'));
    deleteButtons = element.all(by.css('jhi-production-summary div table .btn-danger'));
    title = element.all(by.css('jhi-production-summary div h2#page-heading span')).first();

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

export class ProductionSummaryUpdatePage {
    pageTitle = element(by.id('jhi-production-summary-heading'));
    saveButton = element(by.id('save-entity'));
    cancelButton = element(by.id('cancel-save'));

    async getPageTitle() {
        return this.pageTitle.getText();
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

export class ProductionSummaryDeleteDialog {
    private dialogTitle = element(by.id('jhi-delete-productionSummary-heading'));
    private confirmButton = element(by.id('jhi-confirm-delete-productionSummary'));

    async getDialogTitle() {
        return this.dialogTitle.getText();
    }

    async clickOnConfirmButton() {
        await this.confirmButton.click();
    }
}
