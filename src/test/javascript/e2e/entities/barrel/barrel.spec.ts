/* tslint:disable no-unused-expression */
import { browser, ExpectedConditions as ec, protractor, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import { BarrelComponentsPage, BarrelDeleteDialog, BarrelUpdatePage } from './barrel.page-object';

const expect = chai.expect;

describe('Barrel e2e test', () => {
    let navBarPage: NavBarPage;
    let signInPage: SignInPage;
    let barrelUpdatePage: BarrelUpdatePage;
    let barrelComponentsPage: BarrelComponentsPage;
    let barrelDeleteDialog: BarrelDeleteDialog;

    before(async () => {
        await browser.get('/');
        navBarPage = new NavBarPage();
        signInPage = await navBarPage.getSignInPage();
        await signInPage.autoSignInUsing('admin', 'admin');
        await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
    });

    it('should load Barrels', async () => {
        await navBarPage.goToEntity('barrel');
        barrelComponentsPage = new BarrelComponentsPage();
        await browser.wait(ec.visibilityOf(barrelComponentsPage.title), 5000);
        expect(await barrelComponentsPage.getTitle()).to.eq('distilledApp.barrel.home.title');
    });

    it('should load create Barrel page', async () => {
        await barrelComponentsPage.clickOnCreateButton();
        barrelUpdatePage = new BarrelUpdatePage();
        expect(await barrelUpdatePage.getPageTitle()).to.eq('distilledApp.barrel.home.createOrEditLabel');
        await barrelUpdatePage.cancel();
    });

    it('should create and save Barrels', async () => {
        const nbButtonsBeforeCreate = await barrelComponentsPage.countDeleteButtons();

        await barrelComponentsPage.clickOnCreateButton();
        await promise.all([
            barrelUpdatePage.setProofInput('5'),
            barrelUpdatePage.setBarreledDateInput('01/01/2001' + protractor.Key.TAB + '02:30AM'),
            barrelUpdatePage.setOrderCodeInput('orderCode'),
            barrelUpdatePage.warehouseSelectLastOption(),
            barrelUpdatePage.mashbillSelectLastOption(),
            barrelUpdatePage.orderSelectLastOption(),
            barrelUpdatePage.customerSelectLastOption(),
            barrelUpdatePage.batchSelectLastOption()
        ]);
        expect(await barrelUpdatePage.getProofInput()).to.eq('5');
        expect(await barrelUpdatePage.getBarreledDateInput()).to.contain('2001-01-01T02:30');
        expect(await barrelUpdatePage.getOrderCodeInput()).to.eq('orderCode');
        await barrelUpdatePage.save();
        expect(await barrelUpdatePage.getSaveButton().isPresent()).to.be.false;

        expect(await barrelComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1);
    });

    it('should delete last Barrel', async () => {
        const nbButtonsBeforeDelete = await barrelComponentsPage.countDeleteButtons();
        await barrelComponentsPage.clickOnLastDeleteButton();

        barrelDeleteDialog = new BarrelDeleteDialog();
        expect(await barrelDeleteDialog.getDialogTitle()).to.eq('distilledApp.barrel.delete.question');
        await barrelDeleteDialog.clickOnConfirmButton();

        expect(await barrelComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
    });

    after(async () => {
        await navBarPage.autoSignOut();
    });
});
