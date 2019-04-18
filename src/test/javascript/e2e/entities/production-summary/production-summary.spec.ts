/* tslint:disable no-unused-expression */
import { browser, ExpectedConditions as ec, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import {
    ProductionSummaryComponentsPage,
    ProductionSummaryDeleteDialog,
    ProductionSummaryUpdatePage
} from './production-summary.page-object';

const expect = chai.expect;

describe('ProductionSummary e2e test', () => {
    let navBarPage: NavBarPage;
    let signInPage: SignInPage;
    let productionSummaryUpdatePage: ProductionSummaryUpdatePage;
    let productionSummaryComponentsPage: ProductionSummaryComponentsPage;
    let productionSummaryDeleteDialog: ProductionSummaryDeleteDialog;

    before(async () => {
        await browser.get('/');
        navBarPage = new NavBarPage();
        signInPage = await navBarPage.getSignInPage();
        await signInPage.autoSignInUsing('admin', 'admin');
        await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
    });

    it('should load ProductionSummaries', async () => {
        await navBarPage.goToEntity('production-summary');
        productionSummaryComponentsPage = new ProductionSummaryComponentsPage();
        await browser.wait(ec.visibilityOf(productionSummaryComponentsPage.title), 5000);
        expect(await productionSummaryComponentsPage.getTitle()).to.eq('Production Summaries');
    });

    it('should load create ProductionSummary page', async () => {
        await productionSummaryComponentsPage.clickOnCreateButton();
        productionSummaryUpdatePage = new ProductionSummaryUpdatePage();
        expect(await productionSummaryUpdatePage.getPageTitle()).to.eq('Create or edit a Production Summary');
        await productionSummaryUpdatePage.cancel();
    });

    it('should create and save ProductionSummaries', async () => {
        const nbButtonsBeforeCreate = await productionSummaryComponentsPage.countDeleteButtons();

        await productionSummaryComponentsPage.clickOnCreateButton();
        await promise.all([]);
        await productionSummaryUpdatePage.save();
        expect(await productionSummaryUpdatePage.getSaveButton().isPresent()).to.be.false;

        expect(await productionSummaryComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1);
    });

    it('should delete last ProductionSummary', async () => {
        const nbButtonsBeforeDelete = await productionSummaryComponentsPage.countDeleteButtons();
        await productionSummaryComponentsPage.clickOnLastDeleteButton();

        productionSummaryDeleteDialog = new ProductionSummaryDeleteDialog();
        expect(await productionSummaryDeleteDialog.getDialogTitle()).to.eq('Are you sure you want to delete this Production Summary?');
        await productionSummaryDeleteDialog.clickOnConfirmButton();

        expect(await productionSummaryComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
    });

    after(async () => {
        await navBarPage.autoSignOut();
    });
});
