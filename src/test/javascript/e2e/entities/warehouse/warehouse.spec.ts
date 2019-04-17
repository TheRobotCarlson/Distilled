/* tslint:disable no-unused-expression */
import { browser, ExpectedConditions as ec, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import { WarehouseComponentsPage, WarehouseDeleteDialog, WarehouseUpdatePage } from './warehouse.page-object';

const expect = chai.expect;

describe('Warehouse e2e test', () => {
    let navBarPage: NavBarPage;
    let signInPage: SignInPage;
    let warehouseUpdatePage: WarehouseUpdatePage;
    let warehouseComponentsPage: WarehouseComponentsPage;
    let warehouseDeleteDialog: WarehouseDeleteDialog;

    before(async () => {
        await browser.get('/');
        navBarPage = new NavBarPage();
        signInPage = await navBarPage.getSignInPage();
        await signInPage.autoSignInUsing('admin', 'admin');
        await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
    });

    it('should load Warehouses', async () => {
        await navBarPage.goToEntity('warehouse');
        warehouseComponentsPage = new WarehouseComponentsPage();
        await browser.wait(ec.visibilityOf(warehouseComponentsPage.title), 5000);
        expect(await warehouseComponentsPage.getTitle()).to.eq('distilledApp.warehouse.home.title');
    });

    it('should load create Warehouse page', async () => {
        await warehouseComponentsPage.clickOnCreateButton();
        warehouseUpdatePage = new WarehouseUpdatePage();
        expect(await warehouseUpdatePage.getPageTitle()).to.eq('distilledApp.warehouse.home.createOrEditLabel');
        await warehouseUpdatePage.cancel();
    });

    it('should create and save Warehouses', async () => {
        const nbButtonsBeforeCreate = await warehouseComponentsPage.countDeleteButtons();

        await warehouseComponentsPage.clickOnCreateButton();
        await promise.all([
            warehouseUpdatePage.setWarehouseCodeInput('warehouseCode'),
            warehouseUpdatePage.setOwnerInput('owner'),
            warehouseUpdatePage.setCapacityInput('5')
        ]);
        expect(await warehouseUpdatePage.getWarehouseCodeInput()).to.eq('warehouseCode');
        expect(await warehouseUpdatePage.getOwnerInput()).to.eq('owner');
        expect(await warehouseUpdatePage.getCapacityInput()).to.eq('5');
        await warehouseUpdatePage.save();
        expect(await warehouseUpdatePage.getSaveButton().isPresent()).to.be.false;

        expect(await warehouseComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1);
    });

    it('should delete last Warehouse', async () => {
        const nbButtonsBeforeDelete = await warehouseComponentsPage.countDeleteButtons();
        await warehouseComponentsPage.clickOnLastDeleteButton();

        warehouseDeleteDialog = new WarehouseDeleteDialog();
        expect(await warehouseDeleteDialog.getDialogTitle()).to.eq('distilledApp.warehouse.delete.question');
        await warehouseDeleteDialog.clickOnConfirmButton();

        expect(await warehouseComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
    });

    after(async () => {
        await navBarPage.autoSignOut();
    });
});
