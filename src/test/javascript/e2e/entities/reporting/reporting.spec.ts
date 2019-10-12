// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { browser, ExpectedConditions as ec, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
import {
  ReportingComponentsPage,
  /* ReportingDeleteDialog,
   */ ReportingUpdatePage
} from './reporting.page-object';
import * as path from 'path';

const expect = chai.expect;

describe('Reporting e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let reportingComponentsPage: ReportingComponentsPage;
  let reportingUpdatePage: ReportingUpdatePage;
  /* let reportingDeleteDialog: ReportingDeleteDialog; */
  const fileNameToUpload = 'logo-jhipster.png';
  const fileToUpload = '../../../../../../src/main/webapp/content/images/' + fileNameToUpload;
  const absolutePath = path.resolve(__dirname, fileToUpload);

  before(async () => {
    await browser.get('/');
    navBarPage = new NavBarPage();
    signInPage = await navBarPage.getSignInPage();
    await signInPage.autoSignInUsing('admin', 'admin');
    await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
  });

  it('should load Reportings', async () => {
    await navBarPage.goToEntity('reporting');
    reportingComponentsPage = new ReportingComponentsPage();
    await browser.wait(ec.visibilityOf(reportingComponentsPage.title), 5000);
    expect(await reportingComponentsPage.getTitle()).to.eq('cfcEvalManagerApp.reporting.home.title');
  });

  it('should load create Reporting page', async () => {
    await reportingComponentsPage.clickOnCreateButton();
    reportingUpdatePage = new ReportingUpdatePage();
    expect(await reportingUpdatePage.getPageTitle()).to.eq('cfcEvalManagerApp.reporting.home.createOrEditLabel');
    await reportingUpdatePage.cancel();
  });

  /*  it('should create and save Reportings', async () => {
        const nbButtonsBeforeCreate = await reportingComponentsPage.countDeleteButtons();

        await reportingComponentsPage.clickOnCreateButton();
        await promise.all([
            reportingUpdatePage.setLibelleInput('libelle'),
            reportingUpdatePage.setDescriptionInput('description'),
            reportingUpdatePage.setDocumentInput(absolutePath),
            reportingUpdatePage.objectifSelectLastOption(),
            reportingUpdatePage.personnelSelectLastOption(),
        ]);
        expect(await reportingUpdatePage.getLibelleInput()).to.eq('libelle', 'Expected Libelle value to be equals to libelle');
        expect(await reportingUpdatePage.getDescriptionInput()).to.eq('description', 'Expected Description value to be equals to description');
        expect(await reportingUpdatePage.getDocumentInput()).to.endsWith(fileNameToUpload, 'Expected Document value to be end with ' + fileNameToUpload);
        await reportingUpdatePage.save();
        expect(await reportingUpdatePage.getSaveButton().isPresent(), 'Expected save button disappear').to.be.false;

        expect(await reportingComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1, 'Expected one more entry in the table');
    }); */

  /*  it('should delete last Reporting', async () => {
        const nbButtonsBeforeDelete = await reportingComponentsPage.countDeleteButtons();
        await reportingComponentsPage.clickOnLastDeleteButton();

        reportingDeleteDialog = new ReportingDeleteDialog();
        expect(await reportingDeleteDialog.getDialogTitle())
            .to.eq('cfcEvalManagerApp.reporting.delete.question');
        await reportingDeleteDialog.clickOnConfirmButton();

        expect(await reportingComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
    }); */

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
