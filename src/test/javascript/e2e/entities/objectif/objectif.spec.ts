// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { browser, ExpectedConditions as ec, protractor, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
import {
  ObjectifComponentsPage,
  /* ObjectifDeleteDialog,
   */ ObjectifUpdatePage
} from './objectif.page-object';

const expect = chai.expect;

describe('Objectif e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let objectifComponentsPage: ObjectifComponentsPage;
  let objectifUpdatePage: ObjectifUpdatePage;
  /* let objectifDeleteDialog: ObjectifDeleteDialog; */

  before(async () => {
    await browser.get('/');
    navBarPage = new NavBarPage();
    signInPage = await navBarPage.getSignInPage();
    await signInPage.autoSignInUsing('admin', 'admin');
    await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
  });

  it('should load Objectifs', async () => {
    await navBarPage.goToEntity('objectif');
    objectifComponentsPage = new ObjectifComponentsPage();
    await browser.wait(ec.visibilityOf(objectifComponentsPage.title), 5000);
    expect(await objectifComponentsPage.getTitle()).to.eq('cfcEvalManagerApp.objectif.home.title');
  });

  it('should load create Objectif page', async () => {
    await objectifComponentsPage.clickOnCreateButton();
    objectifUpdatePage = new ObjectifUpdatePage();
    expect(await objectifUpdatePage.getPageTitle()).to.eq('cfcEvalManagerApp.objectif.home.createOrEditLabel');
    await objectifUpdatePage.cancel();
  });

  /*  it('should create and save Objectifs', async () => {
        const nbButtonsBeforeCreate = await objectifComponentsPage.countDeleteButtons();

        await objectifComponentsPage.clickOnCreateButton();
        await promise.all([
            objectifUpdatePage.setLibelleInput('libelle'),
            objectifUpdatePage.setLivrableInput('livrable'),
            objectifUpdatePage.setIndicateurInput('indicateur'),
            objectifUpdatePage.setDateFinInput('01/01/2001' + protractor.Key.TAB + '02:30AM'),
            objectifUpdatePage.personnelSelectLastOption(),
        ]);
        expect(await objectifUpdatePage.getLibelleInput()).to.eq('libelle', 'Expected Libelle value to be equals to libelle');
        expect(await objectifUpdatePage.getLivrableInput()).to.eq('livrable', 'Expected Livrable value to be equals to livrable');
        expect(await objectifUpdatePage.getIndicateurInput()).to.eq('indicateur', 'Expected Indicateur value to be equals to indicateur');
        expect(await objectifUpdatePage.getDateFinInput()).to.contain('2001-01-01T02:30', 'Expected dateFin value to be equals to 2000-12-31');
        await objectifUpdatePage.save();
        expect(await objectifUpdatePage.getSaveButton().isPresent(), 'Expected save button disappear').to.be.false;

        expect(await objectifComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1, 'Expected one more entry in the table');
    }); */

  /*  it('should delete last Objectif', async () => {
        const nbButtonsBeforeDelete = await objectifComponentsPage.countDeleteButtons();
        await objectifComponentsPage.clickOnLastDeleteButton();

        objectifDeleteDialog = new ObjectifDeleteDialog();
        expect(await objectifDeleteDialog.getDialogTitle())
            .to.eq('cfcEvalManagerApp.objectif.delete.question');
        await objectifDeleteDialog.clickOnConfirmButton();

        expect(await objectifComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
    }); */

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
