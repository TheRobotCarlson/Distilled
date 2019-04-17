/* tslint:disable no-unused-expression */
import { browser, ExpectedConditions as ec, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import { YeastSummaryComponentsPage, YeastSummaryDeleteDialog, YeastSummaryUpdatePage } from './yeast-summary.page-object';

const expect = chai.expect;

describe('YeastSummary e2e test', () => {
    let navBarPage: NavBarPage;
    let signInPage: SignInPage;
    let yeastSummaryUpdatePage: YeastSummaryUpdatePage;
    let yeastSummaryComponentsPage: YeastSummaryComponentsPage;
    let yeastSummaryDeleteDialog: YeastSummaryDeleteDialog;

    before(async () => {
        await browser.get('/');
        navBarPage = new NavBarPage();
        signInPage = await navBarPage.getSignInPage();
        await signInPage.autoSignInUsing('admin', 'admin');
        await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
    });

    it('should load YeastSummaries', async () => {
        await navBarPage.goToEntity('yeast-summary');
        yeastSummaryComponentsPage = new YeastSummaryComponentsPage();
        await browser.wait(ec.visibilityOf(yeastSummaryComponentsPage.title), 5000);
        expect(await yeastSummaryComponentsPage.getTitle()).to.eq('distilledApp.yeastSummary.home.title');
    });

    it('should load create YeastSummary page', async () => {
        await yeastSummaryComponentsPage.clickOnCreateButton();
        yeastSummaryUpdatePage = new YeastSummaryUpdatePage();
        expect(await yeastSummaryUpdatePage.getPageTitle()).to.eq('distilledApp.yeastSummary.home.createOrEditLabel');
        await yeastSummaryUpdatePage.cancel();
    });

    it('should create and save YeastSummaries', async () => {
        const nbButtonsBeforeCreate = await yeastSummaryComponentsPage.countDeleteButtons();

        await yeastSummaryComponentsPage.clickOnCreateButton();
        await promise.all([]);
        await yeastSummaryUpdatePage.save();
        expect(await yeastSummaryUpdatePage.getSaveButton().isPresent()).to.be.false;

        expect(await yeastSummaryComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1);
    });

    it('should delete last YeastSummary', async () => {
        const nbButtonsBeforeDelete = await yeastSummaryComponentsPage.countDeleteButtons();
        await yeastSummaryComponentsPage.clickOnLastDeleteButton();

        yeastSummaryDeleteDialog = new YeastSummaryDeleteDialog();
        expect(await yeastSummaryDeleteDialog.getDialogTitle()).to.eq('distilledApp.yeastSummary.delete.question');
        await yeastSummaryDeleteDialog.clickOnConfirmButton();

        expect(await yeastSummaryComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
    });

    after(async () => {
        await navBarPage.autoSignOut();
    });
});
