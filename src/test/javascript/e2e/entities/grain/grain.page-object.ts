import { element, by, ElementFinder } from 'protractor';

export class GrainComponentsPage {
    createButton = element(by.id('jh-create-entity'));
    deleteButtons = element.all(by.css('jhi-grain div table .btn-danger'));
    title = element.all(by.css('jhi-grain div h2#page-heading span')).first();

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

export class GrainUpdatePage {
    pageTitle = element(by.id('jhi-grain-heading'));
    saveButton = element(by.id('save-entity'));
    cancelButton = element(by.id('cancel-save'));
    grainNameInput = element(by.id('field_grainName'));
    grainBushelWeightInput = element(by.id('field_grainBushelWeight'));

    async getPageTitle() {
        return this.pageTitle.getAttribute('jhiTranslate');
    }

    async setGrainNameInput(grainName) {
        await this.grainNameInput.sendKeys(grainName);
    }

    async getGrainNameInput() {
        return this.grainNameInput.getAttribute('value');
    }

    async setGrainBushelWeightInput(grainBushelWeight) {
        await this.grainBushelWeightInput.sendKeys(grainBushelWeight);
    }

    async getGrainBushelWeightInput() {
        return this.grainBushelWeightInput.getAttribute('value');
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

export class GrainDeleteDialog {
    private dialogTitle = element(by.id('jhi-delete-grain-heading'));
    private confirmButton = element(by.id('jhi-confirm-delete-grain'));

    async getDialogTitle() {
        return this.dialogTitle.getAttribute('jhiTranslate');
    }

    async clickOnConfirmButton() {
        await this.confirmButton.click();
    }
}
