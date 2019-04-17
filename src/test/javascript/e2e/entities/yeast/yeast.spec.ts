/* tslint:disable no-unused-expression */
import { browser, ExpectedConditions as ec, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import { YeastComponentsPage, YeastDeleteDialog, YeastUpdatePage } from './yeast.page-object';

const expect = chai.expect;

describe('Yeast e2e test', () => {
    let navBarPage: NavBarPage;
    let signInPage: SignInPage;
    let yeastUpdatePage: YeastUpdatePage;
    let yeastComponentsPage: YeastComponentsPage;
    let yeastDeleteDialog: YeastDeleteDialog;

    before(async () => {
        await browser.get('/');
        navBarPage = new NavBarPage();
        signInPage = await navBarPage.getSignInPage();
        await signInPage.autoSignInUsing('admin', 'admin');
        await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
    });

    it('should load Yeasts', async () => {
        await navBarPage.goToEntity('yeast');
        yeastComponentsPage = new YeastComponentsPage();
        await browser.wait(ec.visibilityOf(yeastComponentsPage.title), 5000);
        expect(await yeastComponentsPage.getTitle()).to.eq('distilledApp.yeast.home.title');
    });

    it('should load create Yeast page', async () => {
        await yeastComponentsPage.clickOnCreateButton();
        yeastUpdatePage = new YeastUpdatePage();
        expect(await yeastUpdatePage.getPageTitle()).to.eq('distilledApp.yeast.home.createOrEditLabel');
        await yeastUpdatePage.cancel();
    });

    it('should create and save Yeasts', async () => {
        const nbButtonsBeforeCreate = await yeastComponentsPage.countDeleteButtons();

        await yeastComponentsPage.clickOnCreateButton();
        await promise.all([
            yeastUpdatePage.setYeastNameInput('yeastName'),
            yeastUpdatePage.setYeastCodeInput('yeastCode'),
            yeastUpdatePage.setYeastPalletNumInput('5')
        ]);
        expect(await yeastUpdatePage.getYeastNameInput()).to.eq('yeastName');
        expect(await yeastUpdatePage.getYeastCodeInput()).to.eq('yeastCode');
        expect(await yeastUpdatePage.getYeastPalletNumInput()).to.eq('5');
        await yeastUpdatePage.save();
        expect(await yeastUpdatePage.getSaveButton().isPresent()).to.be.false;

        expect(await yeastComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1);
    });

    it('should delete last Yeast', async () => {
        const nbButtonsBeforeDelete = await yeastComponentsPage.countDeleteButtons();
        await yeastComponentsPage.clickOnLastDeleteButton();

        yeastDeleteDialog = new YeastDeleteDialog();
        expect(await yeastDeleteDialog.getDialogTitle()).to.eq('distilledApp.yeast.delete.question');
        await yeastDeleteDialog.clickOnConfirmButton();

        expect(await yeastComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
    });

    after(async () => {
        await navBarPage.autoSignOut();
    });
});
