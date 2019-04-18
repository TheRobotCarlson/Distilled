/* tslint:disable no-unused-expression */
import { browser, ExpectedConditions as ec, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import { GrainForecastComponentsPage, GrainForecastDeleteDialog, GrainForecastUpdatePage } from './grain-forecast.page-object';

const expect = chai.expect;

describe('GrainForecast e2e test', () => {
    let navBarPage: NavBarPage;
    let signInPage: SignInPage;
    let grainForecastUpdatePage: GrainForecastUpdatePage;
    let grainForecastComponentsPage: GrainForecastComponentsPage;
    let grainForecastDeleteDialog: GrainForecastDeleteDialog;

    before(async () => {
        await browser.get('/');
        navBarPage = new NavBarPage();
        signInPage = await navBarPage.getSignInPage();
        await signInPage.autoSignInUsing('admin', 'admin');
        await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
    });

    it('should load GrainForecasts', async () => {
        await navBarPage.goToEntity('grain-forecast');
        grainForecastComponentsPage = new GrainForecastComponentsPage();
        await browser.wait(ec.visibilityOf(grainForecastComponentsPage.title), 5000);
        expect(await grainForecastComponentsPage.getTitle()).to.eq('Grain Forecasts');
    });

    it('should load create GrainForecast page', async () => {
        await grainForecastComponentsPage.clickOnCreateButton();
        grainForecastUpdatePage = new GrainForecastUpdatePage();
        expect(await grainForecastUpdatePage.getPageTitle()).to.eq('Create or edit a Grain Forecast');
        await grainForecastUpdatePage.cancel();
    });

    it('should create and save GrainForecasts', async () => {
        const nbButtonsBeforeCreate = await grainForecastComponentsPage.countDeleteButtons();

        await grainForecastComponentsPage.clickOnCreateButton();
        await promise.all([]);
        await grainForecastUpdatePage.save();
        expect(await grainForecastUpdatePage.getSaveButton().isPresent()).to.be.false;

        expect(await grainForecastComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1);
    });

    it('should delete last GrainForecast', async () => {
        const nbButtonsBeforeDelete = await grainForecastComponentsPage.countDeleteButtons();
        await grainForecastComponentsPage.clickOnLastDeleteButton();

        grainForecastDeleteDialog = new GrainForecastDeleteDialog();
        expect(await grainForecastDeleteDialog.getDialogTitle()).to.eq('Are you sure you want to delete this Grain Forecast?');
        await grainForecastDeleteDialog.clickOnConfirmButton();

        expect(await grainForecastComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
    });

    after(async () => {
        await navBarPage.autoSignOut();
    });
});
