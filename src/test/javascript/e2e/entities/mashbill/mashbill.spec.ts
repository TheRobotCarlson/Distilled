/* tslint:disable no-unused-expression */
import { browser, ExpectedConditions as ec, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import { MashbillComponentsPage, MashbillDeleteDialog, MashbillUpdatePage } from './mashbill.page-object';

const expect = chai.expect;

describe('Mashbill e2e test', () => {
    let navBarPage: NavBarPage;
    let signInPage: SignInPage;
    let mashbillUpdatePage: MashbillUpdatePage;
    let mashbillComponentsPage: MashbillComponentsPage;
    let mashbillDeleteDialog: MashbillDeleteDialog;

    before(async () => {
        await browser.get('/');
        navBarPage = new NavBarPage();
        signInPage = await navBarPage.getSignInPage();
        await signInPage.autoSignInUsing('admin', 'admin');
        await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
    });

    it('should load Mashbills', async () => {
        await navBarPage.goToEntity('mashbill');
        mashbillComponentsPage = new MashbillComponentsPage();
        await browser.wait(ec.visibilityOf(mashbillComponentsPage.title), 5000);
        expect(await mashbillComponentsPage.getTitle()).to.eq('Mashbills');
    });

    it('should load create Mashbill page', async () => {
        await mashbillComponentsPage.clickOnCreateButton();
        mashbillUpdatePage = new MashbillUpdatePage();
        expect(await mashbillUpdatePage.getPageTitle()).to.eq('Create or edit a Mashbill');
        await mashbillUpdatePage.cancel();
    });

    it('should create and save Mashbills', async () => {
        const nbButtonsBeforeCreate = await mashbillComponentsPage.countDeleteButtons();

        await mashbillComponentsPage.clickOnCreateButton();
        await promise.all([
            mashbillUpdatePage.setMashbillNameInput('mashbillName'),
            mashbillUpdatePage.setMashbillCodeInput('mashbillCode'),
            mashbillUpdatePage.setMashbillNotesInput('mashbillNotes'),
            mashbillUpdatePage.yeastSelectLastOption(),
            mashbillUpdatePage.spiritSelectLastOption(),
            // mashbillUpdatePage.grainCountSelectLastOption(),
            mashbillUpdatePage.customerSelectLastOption()
        ]);
        expect(await mashbillUpdatePage.getMashbillNameInput()).to.eq('mashbillName');
        expect(await mashbillUpdatePage.getMashbillCodeInput()).to.eq('mashbillCode');
        expect(await mashbillUpdatePage.getMashbillNotesInput()).to.eq('mashbillNotes');
        await mashbillUpdatePage.save();
        expect(await mashbillUpdatePage.getSaveButton().isPresent()).to.be.false;

        expect(await mashbillComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1);
    });

    it('should delete last Mashbill', async () => {
        const nbButtonsBeforeDelete = await mashbillComponentsPage.countDeleteButtons();
        await mashbillComponentsPage.clickOnLastDeleteButton();

        mashbillDeleteDialog = new MashbillDeleteDialog();
        expect(await mashbillDeleteDialog.getDialogTitle()).to.eq('Are you sure you want to delete this Mashbill?');
        await mashbillDeleteDialog.clickOnConfirmButton();

        expect(await mashbillComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
    });

    after(async () => {
        await navBarPage.autoSignOut();
    });
});
