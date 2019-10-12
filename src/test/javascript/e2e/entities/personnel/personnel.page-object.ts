import { element, by, ElementFinder } from 'protractor';

export class PersonnelComponentsPage {
  createButton = element(by.id('jh-create-entity'));
  deleteButtons = element.all(by.css('jhi-personnel div table .btn-danger'));
  title = element.all(by.css('jhi-personnel div h2#page-heading span')).first();

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

export class PersonnelUpdatePage {
  pageTitle = element(by.id('jhi-personnel-heading'));
  saveButton = element(by.id('save-entity'));
  cancelButton = element(by.id('cancel-save'));
  matriculeInput = element(by.id('field_matricule'));
  nomInput = element(by.id('field_nom'));
  posteInput = element(by.id('field_poste'));
  dateNaissInput = element(by.id('field_dateNaiss'));
  sexeInput = element(by.id('field_sexe'));
  utilisateurSelect = element(by.id('field_utilisateur'));

  async getPageTitle() {
    return this.pageTitle.getAttribute('jhiTranslate');
  }

  async setMatriculeInput(matricule) {
    await this.matriculeInput.sendKeys(matricule);
  }

  async getMatriculeInput() {
    return await this.matriculeInput.getAttribute('value');
  }

  async setNomInput(nom) {
    await this.nomInput.sendKeys(nom);
  }

  async getNomInput() {
    return await this.nomInput.getAttribute('value');
  }

  async setPosteInput(poste) {
    await this.posteInput.sendKeys(poste);
  }

  async getPosteInput() {
    return await this.posteInput.getAttribute('value');
  }

  async setDateNaissInput(dateNaiss) {
    await this.dateNaissInput.sendKeys(dateNaiss);
  }

  async getDateNaissInput() {
    return await this.dateNaissInput.getAttribute('value');
  }

  async setSexeInput(sexe) {
    await this.sexeInput.sendKeys(sexe);
  }

  async getSexeInput() {
    return await this.sexeInput.getAttribute('value');
  }

  async utilisateurSelectLastOption(timeout?: number) {
    await this.utilisateurSelect
      .all(by.tagName('option'))
      .last()
      .click();
  }

  async utilisateurSelectOption(option) {
    await this.utilisateurSelect.sendKeys(option);
  }

  getUtilisateurSelect(): ElementFinder {
    return this.utilisateurSelect;
  }

  async getUtilisateurSelectedOption() {
    return await this.utilisateurSelect.element(by.css('option:checked')).getText();
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

export class PersonnelDeleteDialog {
  private dialogTitle = element(by.id('jhi-delete-personnel-heading'));
  private confirmButton = element(by.id('jhi-confirm-delete-personnel'));

  async getDialogTitle() {
    return this.dialogTitle.getAttribute('jhiTranslate');
  }

  async clickOnConfirmButton(timeout?: number) {
    await this.confirmButton.click();
  }
}
