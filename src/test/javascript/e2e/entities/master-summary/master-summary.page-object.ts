import { element, by, ElementFinder } from 'protractor';

export class MasterSummaryComponentsPage {
    createButton = element(by.id('jh-create-entity'));
    deleteButtons = element.all(by.css('jhi-master-summary div table .btn-danger'));
    title = element.all(by.css('jhi-master-summary div h2#page-heading span')).first();

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

export class MasterSummaryUpdatePage {
    pageTitle = element(by.id('jhi-master-summary-heading'));
    saveButton = element(by.id('save-entity'));
    cancelButton = element(by.id('cancel-save'));
    proofGallonsInput = element(by.id('field_proofGallons'));
    actualBarrelCountInput = element(by.id('field_actualBarrelCount'));

    async getPageTitle() {
        return this.pageTitle.getText();
    }

    async setProofGallonsInput(proofGallons) {
        await this.proofGallonsInput.sendKeys(proofGallons);
    }

    async getProofGallonsInput() {
        return this.proofGallonsInput.getAttribute('value');
    }

    async setActualBarrelCountInput(actualBarrelCount) {
        await this.actualBarrelCountInput.sendKeys(actualBarrelCount);
    }

    async getActualBarrelCountInput() {
        return this.actualBarrelCountInput.getAttribute('value');
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

export class MasterSummaryDeleteDialog {
    private dialogTitle = element(by.id('jhi-delete-masterSummary-heading'));
    private confirmButton = element(by.id('jhi-confirm-delete-masterSummary'));

    async getDialogTitle() {
        return this.dialogTitle.getText();
    }

    async clickOnConfirmButton() {
        await this.confirmButton.click();
    }
}
