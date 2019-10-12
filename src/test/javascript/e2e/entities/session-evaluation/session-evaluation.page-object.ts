import { element, by, ElementFinder } from 'protractor';

export class SessionEvaluationComponentsPage {
  createButton = element(by.id('jh-create-entity'));
  deleteButtons = element.all(by.css('jhi-session-evaluation div table .btn-danger'));
  title = element.all(by.css('jhi-session-evaluation div h2#page-heading span')).first();

  async clickOnCreateButton(timeout?: number) {
    await this.createButton.click();
  }

  async clickOnLastDeleteButton(timeout?: number) {
    await this.deleteButtons.last().click();
  }

  async countDeleteButtons() {
    return this.deleteButtons.count();
  }

  async getTitle() {
    return this.title.getAttribute('jhiTranslate');
  }
}

export class SessionEvaluationUpdatePage {
  pageTitle = element(by.id('jhi-session-evaluation-heading'));
  saveButton = element(by.id('save-entity'));
  cancelButton = element(by.id('cancel-save'));
  libelleInput = element(by.id('field_libelle'));
  dateDebutInput = element(by.id('field_dateDebut'));
  dateFinInput = element(by.id('field_dateFin'));
  activeInput = element(by.id('field_active'));

  async getPageTitle() {
    return this.pageTitle.getAttribute('jhiTranslate');
  }

  async setLibelleInput(libelle) {
    await this.libelleInput.sendKeys(libelle);
  }

  async getLibelleInput() {
    return await this.libelleInput.getAttribute('value');
  }

  async setDateDebutInput(dateDebut) {
    await this.dateDebutInput.sendKeys(dateDebut);
  }

  async getDateDebutInput() {
    return await this.dateDebutInput.getAttribute('value');
  }

  async setDateFinInput(dateFin) {
    await this.dateFinInput.sendKeys(dateFin);
  }

  async getDateFinInput() {
    return await this.dateFinInput.getAttribute('value');
  }

  getActiveInput(timeout?: number) {
    return this.activeInput;
  }

  async save(timeout?: number) {
    await this.saveButton.click();
  }

  async cancel(timeout?: number) {
    await this.cancelButton.click();
  }

  getSaveButton(): ElementFinder {
    return this.saveButton;
  }
}

export class SessionEvaluationDeleteDialog {
  private dialogTitle = element(by.id('jhi-delete-sessionEvaluation-heading'));
  private confirmButton = element(by.id('jhi-confirm-delete-sessionEvaluation'));

  async getDialogTitle() {
    return this.dialogTitle.getAttribute('jhiTranslate');
  }

  async clickOnConfirmButton(timeout?: number) {
    await this.confirmButton.click();
  }
}
