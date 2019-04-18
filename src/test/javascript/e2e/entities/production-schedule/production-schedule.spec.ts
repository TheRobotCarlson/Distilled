/* tslint:disable no-unused-expression */
import { browser, ExpectedConditions as ec, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import {
    ProductionScheduleComponentsPage,
    ProductionScheduleDeleteDialog,
    ProductionScheduleUpdatePage
} from './production-schedule.page-object';

const expect = chai.expect;

describe('ProductionSchedule e2e test', () => {
    let navBarPage: NavBarPage;
    let signInPage: SignInPage;
    let productionScheduleUpdatePage: ProductionScheduleUpdatePage;
    let productionScheduleComponentsPage: ProductionScheduleComponentsPage;
    let productionScheduleDeleteDialog: ProductionScheduleDeleteDialog;

    before(async () => {
        await browser.get('/');
        navBarPage = new NavBarPage();
        signInPage = await navBarPage.getSignInPage();
        await signInPage.autoSignInUsing('admin', 'admin');
        await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
    });

    it('should load ProductionSchedules', async () => {
        await navBarPage.goToEntity('production-schedule');
        productionScheduleComponentsPage = new ProductionScheduleComponentsPage();
        await browser.wait(ec.visibilityOf(productionScheduleComponentsPage.title), 5000);
        expect(await productionScheduleComponentsPage.getTitle()).to.eq('Production Schedules');
    });

    it('should load create ProductionSchedule page', async () => {
        await productionScheduleComponentsPage.clickOnCreateButton();
        productionScheduleUpdatePage = new ProductionScheduleUpdatePage();
        expect(await productionScheduleUpdatePage.getPageTitle()).to.eq('Create or edit a Production Schedule');
        await productionScheduleUpdatePage.cancel();
    });

    it('should create and save ProductionSchedules', async () => {
        const nbButtonsBeforeCreate = await productionScheduleComponentsPage.countDeleteButtons();

        await productionScheduleComponentsPage.clickOnCreateButton();
        await promise.all([
            productionScheduleUpdatePage.setProofGallonsInput('5'),
            productionScheduleUpdatePage.setActualBarrelCountInput('5')
        ]);
        expect(await productionScheduleUpdatePage.getProofGallonsInput()).to.eq('5');
        expect(await productionScheduleUpdatePage.getActualBarrelCountInput()).to.eq('5');
        await productionScheduleUpdatePage.save();
        expect(await productionScheduleUpdatePage.getSaveButton().isPresent()).to.be.false;

        expect(await productionScheduleComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1);
    });

    it('should delete last ProductionSchedule', async () => {
        const nbButtonsBeforeDelete = await productionScheduleComponentsPage.countDeleteButtons();
        await productionScheduleComponentsPage.clickOnLastDeleteButton();

        productionScheduleDeleteDialog = new ProductionScheduleDeleteDialog();
        expect(await productionScheduleDeleteDialog.getDialogTitle()).to.eq('Are you sure you want to delete this Production Schedule?');
        await productionScheduleDeleteDialog.clickOnConfirmButton();

        expect(await productionScheduleComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
    });

    after(async () => {
        await navBarPage.autoSignOut();
    });
});
