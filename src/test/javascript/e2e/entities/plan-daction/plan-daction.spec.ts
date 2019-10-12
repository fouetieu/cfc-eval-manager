// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { browser, ExpectedConditions as ec, protractor, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
import {
  PlanDactionComponentsPage,
  /* PlanDactionDeleteDialog,
   */ PlanDactionUpdatePage
} from './plan-daction.page-object';

const expect = chai.expect;

describe('PlanDaction e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let planDactionComponentsPage: PlanDactionComponentsPage;
  let planDactionUpdatePage: PlanDactionUpdatePage;
  /* let planDactionDeleteDialog: PlanDactionDeleteDialog; */

  before(async () => {
    await browser.get('/');
    navBarPage = new NavBarPage();
    signInPage = await navBarPage.getSignInPage();
    await signInPage.autoSignInUsing('admin', 'admin');
    await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
  });

  it('should load PlanDactions', async () => {
    await navBarPage.goToEntity('plan-daction');
    planDactionComponentsPage = new PlanDactionComponentsPage();
    await browser.wait(ec.visibilityOf(planDactionComponentsPage.title), 5000);
    expect(await planDactionComponentsPage.getTitle()).to.eq('cfcEvalManagerApp.planDaction.home.title');
  });

  it('should load create PlanDaction page', async () => {
    await planDactionComponentsPage.clickOnCreateButton();
    planDactionUpdatePage = new PlanDactionUpdatePage();
    expect(await planDactionUpdatePage.getPageTitle()).to.eq('cfcEvalManagerApp.planDaction.home.createOrEditLabel');
    await planDactionUpdatePage.cancel();
  });

  /*  it('should create and save PlanDactions', async () => {
        const nbButtonsBeforeCreate = await planDactionComponentsPage.countDeleteButtons();

        await planDactionComponentsPage.clickOnCreateButton();
        await promise.all([
            planDactionUpdatePage.setTacheInput('tache'),
            planDactionUpdatePage.setDescriptionInput('description'),
            planDactionUpdatePage.setDateDebutInput('01/01/2001' + protractor.Key.TAB + '02:30AM'),
            planDactionUpdatePage.setDateFInInput('01/01/2001' + protractor.Key.TAB + '02:30AM'),
            planDactionUpdatePage.objectifSelectLastOption(),
            planDactionUpdatePage.personnelSelectLastOption(),
        ]);
        expect(await planDactionUpdatePage.getTacheInput()).to.eq('tache', 'Expected Tache value to be equals to tache');
        expect(await planDactionUpdatePage.getDescriptionInput()).to.eq('description', 'Expected Description value to be equals to description');
        expect(await planDactionUpdatePage.getDateDebutInput()).to.contain('2001-01-01T02:30', 'Expected dateDebut value to be equals to 2000-12-31');
        expect(await planDactionUpdatePage.getDateFInInput()).to.contain('2001-01-01T02:30', 'Expected dateFIn value to be equals to 2000-12-31');
        await planDactionUpdatePage.save();
        expect(await planDactionUpdatePage.getSaveButton().isPresent(), 'Expected save button disappear').to.be.false;

        expect(await planDactionComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1, 'Expected one more entry in the table');
    }); */

  /*  it('should delete last PlanDaction', async () => {
        const nbButtonsBeforeDelete = await planDactionComponentsPage.countDeleteButtons();
        await planDactionComponentsPage.clickOnLastDeleteButton();

        planDactionDeleteDialog = new PlanDactionDeleteDialog();
        expect(await planDactionDeleteDialog.getDialogTitle())
            .to.eq('cfcEvalManagerApp.planDaction.delete.question');
        await planDactionDeleteDialog.clickOnConfirmButton();

        expect(await planDactionComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
    }); */

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
