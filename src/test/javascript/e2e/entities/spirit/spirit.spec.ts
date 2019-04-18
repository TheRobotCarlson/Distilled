/* tslint:disable no-unused-expression */
import { browser, ExpectedConditions as ec, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import { SpiritComponentsPage, SpiritDeleteDialog, SpiritUpdatePage } from './spirit.page-object';

const expect = chai.expect;

describe('Spirit e2e test', () => {
    let navBarPage: NavBarPage;
    let signInPage: SignInPage;
    let spiritUpdatePage: SpiritUpdatePage;
    let spiritComponentsPage: SpiritComponentsPage;
    let spiritDeleteDialog: SpiritDeleteDialog;

    before(async () => {
        await browser.get('/');
        navBarPage = new NavBarPage();
        signInPage = await navBarPage.getSignInPage();
        await signInPage.autoSignInUsing('admin', 'admin');
        await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
    });

    it('should load Spirits', async () => {
        await navBarPage.goToEntity('spirit');
        spiritComponentsPage = new SpiritComponentsPage();
        await browser.wait(ec.visibilityOf(spiritComponentsPage.title), 5000);
        expect(await spiritComponentsPage.getTitle()).to.eq('Spirits');
    });

    it('should load create Spirit page', async () => {
        await spiritComponentsPage.clickOnCreateButton();
        spiritUpdatePage = new SpiritUpdatePage();
        expect(await spiritUpdatePage.getPageTitle()).to.eq('Create or edit a Spirit');
        await spiritUpdatePage.cancel();
    });

    it('should create and save Spirits', async () => {
        const nbButtonsBeforeCreate = await spiritComponentsPage.countDeleteButtons();

        await spiritComponentsPage.clickOnCreateButton();
        await promise.all([
            spiritUpdatePage.setCategoryInput('category'),
            spiritUpdatePage.setNameInput('name'),
            spiritUpdatePage.setCodeInput('code')
        ]);
        expect(await spiritUpdatePage.getCategoryInput()).to.eq('category');
        expect(await spiritUpdatePage.getNameInput()).to.eq('name');
        expect(await spiritUpdatePage.getCodeInput()).to.eq('code');
        await spiritUpdatePage.save();
        expect(await spiritUpdatePage.getSaveButton().isPresent()).to.be.false;

        expect(await spiritComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1);
    });

    it('should delete last Spirit', async () => {
        const nbButtonsBeforeDelete = await spiritComponentsPage.countDeleteButtons();
        await spiritComponentsPage.clickOnLastDeleteButton();

        spiritDeleteDialog = new SpiritDeleteDialog();
        expect(await spiritDeleteDialog.getDialogTitle()).to.eq('Are you sure you want to delete this Spirit?');
        await spiritDeleteDialog.clickOnConfirmButton();

        expect(await spiritComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
    });

    after(async () => {
        await navBarPage.autoSignOut();
    });
});
