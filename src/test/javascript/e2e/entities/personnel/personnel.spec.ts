// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { browser, ExpectedConditions as ec, protractor, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { PersonnelComponentsPage, PersonnelDeleteDialog, PersonnelUpdatePage } from './personnel.page-object';

const expect = chai.expect;

describe('Personnel e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let personnelComponentsPage: PersonnelComponentsPage;
  let personnelUpdatePage: PersonnelUpdatePage;
  let personnelDeleteDialog: PersonnelDeleteDialog;

  before(async () => {
    await browser.get('/');
    navBarPage = new NavBarPage();
    signInPage = await navBarPage.getSignInPage();
    await signInPage.autoSignInUsing('admin', 'admin');
    await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
  });

  it('should load Personnels', async () => {
    await navBarPage.goToEntity('personnel');
    personnelComponentsPage = new PersonnelComponentsPage();
    await browser.wait(ec.visibilityOf(personnelComponentsPage.title), 5000);
    expect(await personnelComponentsPage.getTitle()).to.eq('cfcEvalManagerApp.personnel.home.title');
  });

  it('should load create Personnel page', async () => {
    await personnelComponentsPage.clickOnCreateButton();
    personnelUpdatePage = new PersonnelUpdatePage();
    expect(await personnelUpdatePage.getPageTitle()).to.eq('cfcEvalManagerApp.personnel.home.createOrEditLabel');
    await personnelUpdatePage.cancel();
  });

  it('should create and save Personnels', async () => {
    const nbButtonsBeforeCreate = await personnelComponentsPage.countDeleteButtons();

    await personnelComponentsPage.clickOnCreateButton();
    await promise.all([
      personnelUpdatePage.setMatriculeInput('matricule'),
      personnelUpdatePage.setNomInput('nom'),
      personnelUpdatePage.setPosteInput('poste'),
      personnelUpdatePage.setDateNaissInput('01/01/2001' + protractor.Key.TAB + '02:30AM'),
      personnelUpdatePage.setSexeInput('sexe'),
      personnelUpdatePage.utilisateurSelectLastOption()
    ]);
    expect(await personnelUpdatePage.getMatriculeInput()).to.eq('matricule', 'Expected Matricule value to be equals to matricule');
    expect(await personnelUpdatePage.getNomInput()).to.eq('nom', 'Expected Nom value to be equals to nom');
    expect(await personnelUpdatePage.getPosteInput()).to.eq('poste', 'Expected Poste value to be equals to poste');
    expect(await personnelUpdatePage.getDateNaissInput()).to.contain(
      '2001-01-01T02:30',
      'Expected dateNaiss value to be equals to 2000-12-31'
    );
    expect(await personnelUpdatePage.getSexeInput()).to.eq('sexe', 'Expected Sexe value to be equals to sexe');
    await personnelUpdatePage.save();
    expect(await personnelUpdatePage.getSaveButton().isPresent(), 'Expected save button disappear').to.be.false;

    expect(await personnelComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1, 'Expected one more entry in the table');
  });

  it('should delete last Personnel', async () => {
    const nbButtonsBeforeDelete = await personnelComponentsPage.countDeleteButtons();
    await personnelComponentsPage.clickOnLastDeleteButton();

    personnelDeleteDialog = new PersonnelDeleteDialog();
    expect(await personnelDeleteDialog.getDialogTitle()).to.eq('cfcEvalManagerApp.personnel.delete.question');
    await personnelDeleteDialog.clickOnConfirmButton();

    expect(await personnelComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
