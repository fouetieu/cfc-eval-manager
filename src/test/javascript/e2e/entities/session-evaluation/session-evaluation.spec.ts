// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { browser, ExpectedConditions as ec, protractor, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
import {
  SessionEvaluationComponentsPage,
  SessionEvaluationDeleteDialog,
  SessionEvaluationUpdatePage
} from './session-evaluation.page-object';

const expect = chai.expect;

describe('SessionEvaluation e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let sessionEvaluationComponentsPage: SessionEvaluationComponentsPage;
  let sessionEvaluationUpdatePage: SessionEvaluationUpdatePage;
  let sessionEvaluationDeleteDialog: SessionEvaluationDeleteDialog;

  before(async () => {
    await browser.get('/');
    navBarPage = new NavBarPage();
    signInPage = await navBarPage.getSignInPage();
    await signInPage.autoSignInUsing('admin', 'admin');
    await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
  });

  it('should load SessionEvaluations', async () => {
    await navBarPage.goToEntity('session-evaluation');
    sessionEvaluationComponentsPage = new SessionEvaluationComponentsPage();
    await browser.wait(ec.visibilityOf(sessionEvaluationComponentsPage.title), 5000);
    expect(await sessionEvaluationComponentsPage.getTitle()).to.eq('cfcEvalManagerApp.sessionEvaluation.home.title');
  });

  it('should load create SessionEvaluation page', async () => {
    await sessionEvaluationComponentsPage.clickOnCreateButton();
    sessionEvaluationUpdatePage = new SessionEvaluationUpdatePage();
    expect(await sessionEvaluationUpdatePage.getPageTitle()).to.eq('cfcEvalManagerApp.sessionEvaluation.home.createOrEditLabel');
    await sessionEvaluationUpdatePage.cancel();
  });

  it('should create and save SessionEvaluations', async () => {
    const nbButtonsBeforeCreate = await sessionEvaluationComponentsPage.countDeleteButtons();

    await sessionEvaluationComponentsPage.clickOnCreateButton();
    await promise.all([
      sessionEvaluationUpdatePage.setLibelleInput('libelle'),
      sessionEvaluationUpdatePage.setDateDebutInput('01/01/2001' + protractor.Key.TAB + '02:30AM'),
      sessionEvaluationUpdatePage.setDateFinInput('01/01/2001' + protractor.Key.TAB + '02:30AM')
    ]);
    expect(await sessionEvaluationUpdatePage.getLibelleInput()).to.eq('libelle', 'Expected Libelle value to be equals to libelle');
    expect(await sessionEvaluationUpdatePage.getDateDebutInput()).to.contain(
      '2001-01-01T02:30',
      'Expected dateDebut value to be equals to 2000-12-31'
    );
    expect(await sessionEvaluationUpdatePage.getDateFinInput()).to.contain(
      '2001-01-01T02:30',
      'Expected dateFin value to be equals to 2000-12-31'
    );
    const selectedActive = sessionEvaluationUpdatePage.getActiveInput();
    if (await selectedActive.isSelected()) {
      await sessionEvaluationUpdatePage.getActiveInput().click();
      expect(await sessionEvaluationUpdatePage.getActiveInput().isSelected(), 'Expected active not to be selected').to.be.false;
    } else {
      await sessionEvaluationUpdatePage.getActiveInput().click();
      expect(await sessionEvaluationUpdatePage.getActiveInput().isSelected(), 'Expected active to be selected').to.be.true;
    }
    await sessionEvaluationUpdatePage.save();
    expect(await sessionEvaluationUpdatePage.getSaveButton().isPresent(), 'Expected save button disappear').to.be.false;

    expect(await sessionEvaluationComponentsPage.countDeleteButtons()).to.eq(
      nbButtonsBeforeCreate + 1,
      'Expected one more entry in the table'
    );
  });

  it('should delete last SessionEvaluation', async () => {
    const nbButtonsBeforeDelete = await sessionEvaluationComponentsPage.countDeleteButtons();
    await sessionEvaluationComponentsPage.clickOnLastDeleteButton();

    sessionEvaluationDeleteDialog = new SessionEvaluationDeleteDialog();
    expect(await sessionEvaluationDeleteDialog.getDialogTitle()).to.eq('cfcEvalManagerApp.sessionEvaluation.delete.question');
    await sessionEvaluationDeleteDialog.clickOnConfirmButton();

    expect(await sessionEvaluationComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
