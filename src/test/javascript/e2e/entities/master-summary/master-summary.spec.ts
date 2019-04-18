/* tslint:disable no-unused-expression */
import { browser, ExpectedConditions as ec, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import { MasterSummaryComponentsPage, MasterSummaryDeleteDialog, MasterSummaryUpdatePage } from './master-summary.page-object';

const expect = chai.expect;

describe('MasterSummary e2e test', () => {
    let navBarPage: NavBarPage;
    let signInPage: SignInPage;
    let masterSummaryUpdatePage: MasterSummaryUpdatePage;
    let masterSummaryComponentsPage: MasterSummaryComponentsPage;
    let masterSummaryDeleteDialog: MasterSummaryDeleteDialog;

    before(async () => {
        await browser.get('/');
        navBarPage = new NavBarPage();
        signInPage = await navBarPage.getSignInPage();
        await signInPage.autoSignInUsing('admin', 'admin');
        await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
    });

    it('should load MasterSummaries', async () => {
        await navBarPage.goToEntity('master-summary');
        masterSummaryComponentsPage = new MasterSummaryComponentsPage();
        await browser.wait(ec.visibilityOf(masterSummaryComponentsPage.title), 5000);
        expect(await masterSummaryComponentsPage.getTitle()).to.eq('Master Summaries');
    });

    it('should load create MasterSummary page', async () => {
        await masterSummaryComponentsPage.clickOnCreateButton();
        masterSummaryUpdatePage = new MasterSummaryUpdatePage();
        expect(await masterSummaryUpdatePage.getPageTitle()).to.eq('Create or edit a Master Summary');
        await masterSummaryUpdatePage.cancel();
    });

    it('should create and save MasterSummaries', async () => {
        const nbButtonsBeforeCreate = await masterSummaryComponentsPage.countDeleteButtons();

        await masterSummaryComponentsPage.clickOnCreateButton();
        await promise.all([masterSummaryUpdatePage.setProofGallonsInput('5'), masterSummaryUpdatePage.setActualBarrelCountInput('5')]);
        expect(await masterSummaryUpdatePage.getProofGallonsInput()).to.eq('5');
        expect(await masterSummaryUpdatePage.getActualBarrelCountInput()).to.eq('5');
        await masterSummaryUpdatePage.save();
        expect(await masterSummaryUpdatePage.getSaveButton().isPresent()).to.be.false;

        expect(await masterSummaryComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1);
    });

    it('should delete last MasterSummary', async () => {
        const nbButtonsBeforeDelete = await masterSummaryComponentsPage.countDeleteButtons();
        await masterSummaryComponentsPage.clickOnLastDeleteButton();

        masterSummaryDeleteDialog = new MasterSummaryDeleteDialog();
        expect(await masterSummaryDeleteDialog.getDialogTitle()).to.eq('Are you sure you want to delete this Master Summary?');
        await masterSummaryDeleteDialog.clickOnConfirmButton();

        expect(await masterSummaryComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
    });

    after(async () => {
        await navBarPage.autoSignOut();
    });
});
