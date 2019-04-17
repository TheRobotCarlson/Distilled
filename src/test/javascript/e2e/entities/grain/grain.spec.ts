/* tslint:disable no-unused-expression */
import { browser, ExpectedConditions as ec, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import { GrainComponentsPage, GrainDeleteDialog, GrainUpdatePage } from './grain.page-object';

const expect = chai.expect;

describe('Grain e2e test', () => {
    let navBarPage: NavBarPage;
    let signInPage: SignInPage;
    let grainUpdatePage: GrainUpdatePage;
    let grainComponentsPage: GrainComponentsPage;
    let grainDeleteDialog: GrainDeleteDialog;

    before(async () => {
        await browser.get('/');
        navBarPage = new NavBarPage();
        signInPage = await navBarPage.getSignInPage();
        await signInPage.autoSignInUsing('admin', 'admin');
        await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
    });

    it('should load Grains', async () => {
        await navBarPage.goToEntity('grain');
        grainComponentsPage = new GrainComponentsPage();
        await browser.wait(ec.visibilityOf(grainComponentsPage.title), 5000);
        expect(await grainComponentsPage.getTitle()).to.eq('distilledApp.grain.home.title');
    });

    it('should load create Grain page', async () => {
        await grainComponentsPage.clickOnCreateButton();
        grainUpdatePage = new GrainUpdatePage();
        expect(await grainUpdatePage.getPageTitle()).to.eq('distilledApp.grain.home.createOrEditLabel');
        await grainUpdatePage.cancel();
    });

    it('should create and save Grains', async () => {
        const nbButtonsBeforeCreate = await grainComponentsPage.countDeleteButtons();

        await grainComponentsPage.clickOnCreateButton();
        await promise.all([grainUpdatePage.setGrainNameInput('grainName'), grainUpdatePage.setGrainBushelWeightInput('5')]);
        expect(await grainUpdatePage.getGrainNameInput()).to.eq('grainName');
        expect(await grainUpdatePage.getGrainBushelWeightInput()).to.eq('5');
        await grainUpdatePage.save();
        expect(await grainUpdatePage.getSaveButton().isPresent()).to.be.false;

        expect(await grainComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1);
    });

    it('should delete last Grain', async () => {
        const nbButtonsBeforeDelete = await grainComponentsPage.countDeleteButtons();
        await grainComponentsPage.clickOnLastDeleteButton();

        grainDeleteDialog = new GrainDeleteDialog();
        expect(await grainDeleteDialog.getDialogTitle()).to.eq('distilledApp.grain.delete.question');
        await grainDeleteDialog.clickOnConfirmButton();

        expect(await grainComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
    });

    after(async () => {
        await navBarPage.autoSignOut();
    });
});
