/* tslint:disable no-unused-expression */
import { browser, ExpectedConditions as ec, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import { MashbillYeastComponentsPage, MashbillYeastDeleteDialog, MashbillYeastUpdatePage } from './mashbill-yeast.page-object';

const expect = chai.expect;

describe('MashbillYeast e2e test', () => {
    let navBarPage: NavBarPage;
    let signInPage: SignInPage;
    let mashbillYeastUpdatePage: MashbillYeastUpdatePage;
    let mashbillYeastComponentsPage: MashbillYeastComponentsPage;
    let mashbillYeastDeleteDialog: MashbillYeastDeleteDialog;

    before(async () => {
        await browser.get('/');
        navBarPage = new NavBarPage();
        signInPage = await navBarPage.getSignInPage();
        await signInPage.autoSignInUsing('admin', 'admin');
        await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
    });

    it('should load MashbillYeasts', async () => {
        await navBarPage.goToEntity('mashbill-yeast');
        mashbillYeastComponentsPage = new MashbillYeastComponentsPage();
        await browser.wait(ec.visibilityOf(mashbillYeastComponentsPage.title), 5000);
        expect(await mashbillYeastComponentsPage.getTitle()).to.eq('Mashbill Yeasts');
    });

    it('should load create MashbillYeast page', async () => {
        await mashbillYeastComponentsPage.clickOnCreateButton();
        mashbillYeastUpdatePage = new MashbillYeastUpdatePage();
        expect(await mashbillYeastUpdatePage.getPageTitle()).to.eq('Create or edit a Mashbill Yeast');
        await mashbillYeastUpdatePage.cancel();
    });

    it('should create and save MashbillYeasts', async () => {
        const nbButtonsBeforeCreate = await mashbillYeastComponentsPage.countDeleteButtons();

        await mashbillYeastComponentsPage.clickOnCreateButton();
        await promise.all([mashbillYeastUpdatePage.setQuantityInput('5'), mashbillYeastUpdatePage.yeastSelectLastOption()]);
        expect(await mashbillYeastUpdatePage.getQuantityInput()).to.eq('5');
        await mashbillYeastUpdatePage.save();
        expect(await mashbillYeastUpdatePage.getSaveButton().isPresent()).to.be.false;

        expect(await mashbillYeastComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1);
    });

    it('should delete last MashbillYeast', async () => {
        const nbButtonsBeforeDelete = await mashbillYeastComponentsPage.countDeleteButtons();
        await mashbillYeastComponentsPage.clickOnLastDeleteButton();

        mashbillYeastDeleteDialog = new MashbillYeastDeleteDialog();
        expect(await mashbillYeastDeleteDialog.getDialogTitle()).to.eq('Are you sure you want to delete this Mashbill Yeast?');
        await mashbillYeastDeleteDialog.clickOnConfirmButton();

        expect(await mashbillYeastComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
    });

    after(async () => {
        await navBarPage.autoSignOut();
    });
});
