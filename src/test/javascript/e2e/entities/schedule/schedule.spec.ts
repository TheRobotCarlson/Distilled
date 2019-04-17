/* tslint:disable no-unused-expression */
import { browser, ExpectedConditions as ec, protractor, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import { ScheduleComponentsPage, ScheduleDeleteDialog, ScheduleUpdatePage } from './schedule.page-object';

const expect = chai.expect;

describe('Schedule e2e test', () => {
    let navBarPage: NavBarPage;
    let signInPage: SignInPage;
    let scheduleUpdatePage: ScheduleUpdatePage;
    let scheduleComponentsPage: ScheduleComponentsPage;
    let scheduleDeleteDialog: ScheduleDeleteDialog;

    before(async () => {
        await browser.get('/');
        navBarPage = new NavBarPage();
        signInPage = await navBarPage.getSignInPage();
        await signInPage.autoSignInUsing('admin', 'admin');
        await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
    });

    it('should load Schedules', async () => {
        await navBarPage.goToEntity('schedule');
        scheduleComponentsPage = new ScheduleComponentsPage();
        await browser.wait(ec.visibilityOf(scheduleComponentsPage.title), 5000);
        expect(await scheduleComponentsPage.getTitle()).to.eq('distilledApp.schedule.home.title');
    });

    it('should load create Schedule page', async () => {
        await scheduleComponentsPage.clickOnCreateButton();
        scheduleUpdatePage = new ScheduleUpdatePage();
        expect(await scheduleUpdatePage.getPageTitle()).to.eq('distilledApp.schedule.home.createOrEditLabel');
        await scheduleUpdatePage.cancel();
    });

    it('should create and save Schedules', async () => {
        const nbButtonsBeforeCreate = await scheduleComponentsPage.countDeleteButtons();

        await scheduleComponentsPage.clickOnCreateButton();
        await promise.all([
            scheduleUpdatePage.setTargetDateInput('01/01/2001' + protractor.Key.TAB + '02:30AM'),
            scheduleUpdatePage.setOrderCodeInput('orderCode'),
            scheduleUpdatePage.setBarrelCountInput('5'),
            scheduleUpdatePage.setTargetProofInput('5'),
            scheduleUpdatePage.setNotesInput('notes'),
            scheduleUpdatePage.mashbillSelectLastOption(),
            scheduleUpdatePage.customerSelectLastOption(),
            scheduleUpdatePage.warehouseSelectLastOption()
        ]);
        expect(await scheduleUpdatePage.getTargetDateInput()).to.contain('2001-01-01T02:30');
        expect(await scheduleUpdatePage.getOrderCodeInput()).to.eq('orderCode');
        expect(await scheduleUpdatePage.getBarrelCountInput()).to.eq('5');
        expect(await scheduleUpdatePage.getTargetProofInput()).to.eq('5');
        expect(await scheduleUpdatePage.getNotesInput()).to.eq('notes');
        await scheduleUpdatePage.save();
        expect(await scheduleUpdatePage.getSaveButton().isPresent()).to.be.false;

        expect(await scheduleComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1);
    });

    it('should delete last Schedule', async () => {
        const nbButtonsBeforeDelete = await scheduleComponentsPage.countDeleteButtons();
        await scheduleComponentsPage.clickOnLastDeleteButton();

        scheduleDeleteDialog = new ScheduleDeleteDialog();
        expect(await scheduleDeleteDialog.getDialogTitle()).to.eq('distilledApp.schedule.delete.question');
        await scheduleDeleteDialog.clickOnConfirmButton();

        expect(await scheduleComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
    });

    after(async () => {
        await navBarPage.autoSignOut();
    });
});
