import { element, by, ElementFinder } from 'protractor';

export class GrainForecastComponentsPage {
    createButton = element(by.id('jh-create-entity'));
    deleteButtons = element.all(by.css('jhi-grain-forecast div table .btn-danger'));
    title = element.all(by.css('jhi-grain-forecast div h2#page-heading span')).first();

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

export class GrainForecastUpdatePage {
    pageTitle = element(by.id('jhi-grain-forecast-heading'));
    saveButton = element(by.id('save-entity'));
    cancelButton = element(by.id('cancel-save'));

    async getPageTitle() {
        return this.pageTitle.getAttribute('jhiTranslate');
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

export class GrainForecastDeleteDialog {
    private dialogTitle = element(by.id('jhi-delete-grainForecast-heading'));
    private confirmButton = element(by.id('jhi-confirm-delete-grainForecast'));

    async getDialogTitle() {
        return this.dialogTitle.getAttribute('jhiTranslate');
    }

    async clickOnConfirmButton() {
        await this.confirmButton.click();
    }
}
