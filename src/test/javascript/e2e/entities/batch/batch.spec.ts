/* tslint:disable no-unused-expression */
import { browser, ExpectedConditions as ec, protractor, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import { BatchComponentsPage, BatchDeleteDialog, BatchUpdatePage } from './batch.page-object';

const expect = chai.expect;

describe('Batch e2e test', () => {
    let navBarPage: NavBarPage;
    let signInPage: SignInPage;
    let batchUpdatePage: BatchUpdatePage;
    let batchComponentsPage: BatchComponentsPage;
    let batchDeleteDialog: BatchDeleteDialog;

    before(async () => {
        await browser.get('/');
        navBarPage = new NavBarPage();
        signInPage = await navBarPage.getSignInPage();
        await signInPage.autoSignInUsing('admin', 'admin');
        await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
    });

    it('should load Batches', async () => {
        await navBarPage.goToEntity('batch');
        batchComponentsPage = new BatchComponentsPage();
        await browser.wait(ec.visibilityOf(batchComponentsPage.title), 5000);
        expect(await batchComponentsPage.getTitle()).to.eq('Batches');
    });

    it('should load create Batch page', async () => {
        await batchComponentsPage.clickOnCreateButton();
        batchUpdatePage = new BatchUpdatePage();
        expect(await batchUpdatePage.getPageTitle()).to.eq('Create or edit a Batch');
        await batchUpdatePage.cancel();
    });

    it('should create and save Batches', async () => {
        const nbButtonsBeforeCreate = await batchComponentsPage.countDeleteButtons();

        await batchComponentsPage.clickOnCreateButton();
        await promise.all([
            batchUpdatePage.setProofInput('5'),
            batchUpdatePage.setDateInput('01/01/2001' + protractor.Key.TAB + '02:30AM'),
            batchUpdatePage.setOrderCodeInput('orderCode'),
            batchUpdatePage.scheduleSelectLastOption()
        ]);
        expect(await batchUpdatePage.getProofInput()).to.eq('5');
        expect(await batchUpdatePage.getDateInput()).to.contain('2001-01-01T02:30');
        expect(await batchUpdatePage.getOrderCodeInput()).to.eq('orderCode');
        await batchUpdatePage.save();
        expect(await batchUpdatePage.getSaveButton().isPresent()).to.be.false;

        expect(await batchComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1);
    });

    it('should delete last Batch', async () => {
        const nbButtonsBeforeDelete = await batchComponentsPage.countDeleteButtons();
        await batchComponentsPage.clickOnLastDeleteButton();

        batchDeleteDialog = new BatchDeleteDialog();
        expect(await batchDeleteDialog.getDialogTitle()).to.eq('Are you sure you want to delete this Batch?');
        await batchDeleteDialog.clickOnConfirmButton();

        expect(await batchComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
    });

    after(async () => {
        await navBarPage.autoSignOut();
    });
});
