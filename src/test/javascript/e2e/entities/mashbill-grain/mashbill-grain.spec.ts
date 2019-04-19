/* tslint:disable no-unused-expression */
import { browser, ExpectedConditions as ec, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import { MashbillGrainComponentsPage, MashbillGrainDeleteDialog, MashbillGrainUpdatePage } from './mashbill-grain.page-object';

const expect = chai.expect;

describe('MashbillGrain e2e test', () => {
    let navBarPage: NavBarPage;
    let signInPage: SignInPage;
    let mashbillGrainUpdatePage: MashbillGrainUpdatePage;
    let mashbillGrainComponentsPage: MashbillGrainComponentsPage;
    let mashbillGrainDeleteDialog: MashbillGrainDeleteDialog;

    before(async () => {
        await browser.get('/');
        navBarPage = new NavBarPage();
        signInPage = await navBarPage.getSignInPage();
        await signInPage.autoSignInUsing('admin', 'admin');
        await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
    });

    it('should load MashbillGrains', async () => {
        await navBarPage.goToEntity('mashbill-grain');
        mashbillGrainComponentsPage = new MashbillGrainComponentsPage();
        await browser.wait(ec.visibilityOf(mashbillGrainComponentsPage.title), 5000);
        expect(await mashbillGrainComponentsPage.getTitle()).to.eq('Mashbill Grains');
    });

    it('should load create MashbillGrain page', async () => {
        await mashbillGrainComponentsPage.clickOnCreateButton();
        mashbillGrainUpdatePage = new MashbillGrainUpdatePage();
        expect(await mashbillGrainUpdatePage.getPageTitle()).to.eq('Create or edit a Mashbill Grain');
        await mashbillGrainUpdatePage.cancel();
    });

    it('should create and save MashbillGrains', async () => {
        const nbButtonsBeforeCreate = await mashbillGrainComponentsPage.countDeleteButtons();

        await mashbillGrainComponentsPage.clickOnCreateButton();
        await promise.all([mashbillGrainUpdatePage.setQuantityInput('5'), mashbillGrainUpdatePage.grainSelectLastOption()]);
        expect(await mashbillGrainUpdatePage.getQuantityInput()).to.eq('5');
        await mashbillGrainUpdatePage.save();
        expect(await mashbillGrainUpdatePage.getSaveButton().isPresent()).to.be.false;

        expect(await mashbillGrainComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1);
    });

    it('should delete last MashbillGrain', async () => {
        const nbButtonsBeforeDelete = await mashbillGrainComponentsPage.countDeleteButtons();
        await mashbillGrainComponentsPage.clickOnLastDeleteButton();

        mashbillGrainDeleteDialog = new MashbillGrainDeleteDialog();
        expect(await mashbillGrainDeleteDialog.getDialogTitle()).to.eq('Are you sure you want to delete this Mashbill Grain?');
        await mashbillGrainDeleteDialog.clickOnConfirmButton();

        expect(await mashbillGrainComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
    });

    after(async () => {
        await navBarPage.autoSignOut();
    });
});
