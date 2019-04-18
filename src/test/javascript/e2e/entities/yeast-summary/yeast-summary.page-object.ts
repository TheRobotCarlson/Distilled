import { element, by, ElementFinder } from 'protractor';

export class YeastSummaryComponentsPage {
    createButton = element(by.id('jh-create-entity'));
    deleteButtons = element.all(by.css('jhi-yeast-summary div table .btn-danger'));
    title = element.all(by.css('jhi-yeast-summary div h2#page-heading span')).first();

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

export class YeastSummaryUpdatePage {
    pageTitle = element(by.id('jhi-yeast-summary-heading'));
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

export class YeastSummaryDeleteDialog {
    private dialogTitle = element(by.id('jhi-delete-yeastSummary-heading'));
    private confirmButton = element(by.id('jhi-confirm-delete-yeastSummary'));

    async getDialogTitle() {
        return this.dialogTitle.getText();
    }

    async clickOnConfirmButton() {
        await this.confirmButton.click();
    }
}
