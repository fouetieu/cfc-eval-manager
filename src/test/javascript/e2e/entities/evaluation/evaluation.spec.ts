// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { browser, ExpectedConditions as ec, protractor, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
import {
  EvaluationComponentsPage,
  /* EvaluationDeleteDialog,
   */ EvaluationUpdatePage
} from './evaluation.page-object';

const expect = chai.expect;

describe('Evaluation e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let evaluationComponentsPage: EvaluationComponentsPage;
  let evaluationUpdatePage: EvaluationUpdatePage;
  /* let evaluationDeleteDialog: EvaluationDeleteDialog; */

  before(async () => {
    await browser.get('/');
    navBarPage = new NavBarPage();
    signInPage = await navBarPage.getSignInPage();
    await signInPage.autoSignInUsing('admin', 'admin');
    await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
  });

  it('should load Evaluations', async () => {
    await navBarPage.goToEntity('evaluation');
    evaluationComponentsPage = new EvaluationComponentsPage();
    await browser.wait(ec.visibilityOf(evaluationComponentsPage.title), 5000);
    expect(await evaluationComponentsPage.getTitle()).to.eq('cfcEvalManagerApp.evaluation.home.title');
  });

  it('should load create Evaluation page', async () => {
    await evaluationComponentsPage.clickOnCreateButton();
    evaluationUpdatePage = new EvaluationUpdatePage();
    expect(await evaluationUpdatePage.getPageTitle()).to.eq('cfcEvalManagerApp.evaluation.home.createOrEditLabel');
    await evaluationUpdatePage.cancel();
  });

  /*  it('should create and save Evaluations', async () => {
        const nbButtonsBeforeCreate = await evaluationComponentsPage.countDeleteButtons();

        await evaluationComponentsPage.clickOnCreateButton();
        await promise.all([
            evaluationUpdatePage.setDateEvaluationInput('01/01/2001' + protractor.Key.TAB + '02:30AM'),
            evaluationUpdatePage.setNoteInput('5'),
            evaluationUpdatePage.objectifSelectLastOption(),
            evaluationUpdatePage.sessionSelectLastOption(),
            evaluationUpdatePage.personnelSelectLastOption(),
        ]);
        expect(await evaluationUpdatePage.getDateEvaluationInput()).to.contain('2001-01-01T02:30', 'Expected dateEvaluation value to be equals to 2000-12-31');
        expect(await evaluationUpdatePage.getNoteInput()).to.eq('5', 'Expected note value to be equals to 5');
        await evaluationUpdatePage.save();
        expect(await evaluationUpdatePage.getSaveButton().isPresent(), 'Expected save button disappear').to.be.false;

        expect(await evaluationComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1, 'Expected one more entry in the table');
    }); */

  /*  it('should delete last Evaluation', async () => {
        const nbButtonsBeforeDelete = await evaluationComponentsPage.countDeleteButtons();
        await evaluationComponentsPage.clickOnLastDeleteButton();

        evaluationDeleteDialog = new EvaluationDeleteDialog();
        expect(await evaluationDeleteDialog.getDialogTitle())
            .to.eq('cfcEvalManagerApp.evaluation.delete.question');
        await evaluationDeleteDialog.clickOnConfirmButton();

        expect(await evaluationComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
    }); */

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
