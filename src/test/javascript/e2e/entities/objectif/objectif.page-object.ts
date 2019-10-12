import { element, by, ElementFinder } from 'protractor';

export class ObjectifComponentsPage {
  createButton = element(by.id('jh-create-entity'));
  deleteButtons = element.all(by.css('jhi-objectif div table .btn-danger'));
  title = element.all(by.css('jhi-objectif div h2#page-heading span')).first();

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

export class ObjectifUpdatePage {
  pageTitle = element(by.id('jhi-objectif-heading'));
  saveButton = element(by.id('save-entity'));
  cancelButton = element(by.id('cancel-save'));
  libelleInput = element(by.id('field_libelle'));
  livrableInput = element(by.id('field_livrable'));
  indicateurInput = element(by.id('field_indicateur'));
  dateFinInput = element(by.id('field_dateFin'));
  personnelSelect = element(by.id('field_personnel'));

  async getPageTitle() {
    return this.pageTitle.getAttribute('jhiTranslate');
  }

  async setLibelleInput(libelle) {
    await this.libelleInput.sendKeys(libelle);
  }

  async getLibelleInput() {
    return await this.libelleInput.getAttribute('value');
  }

  async setLivrableInput(livrable) {
    await this.livrableInput.sendKeys(livrable);
  }

  async getLivrableInput() {
    return await this.livrableInput.getAttribute('value');
  }

  async setIndicateurInput(indicateur) {
    await this.indicateurInput.sendKeys(indicateur);
  }

  async getIndicateurInput() {
    return await this.indicateurInput.getAttribute('value');
  }

  async setDateFinInput(dateFin) {
    await this.dateFinInput.sendKeys(dateFin);
  }

  async getDateFinInput() {
    return await this.dateFinInput.getAttribute('value');
  }

  async personnelSelectLastOption(timeout?: number) {
    await this.personnelSelect
      .all(by.tagName('option'))
      .last()
      .click();
  }

  async personnelSelectOption(option) {
    await this.personnelSelect.sendKeys(option);
  }

  getPersonnelSelect(): ElementFinder {
    return this.personnelSelect;
  }

  async getPersonnelSelectedOption() {
    return await this.personnelSelect.element(by.css('option:checked')).getText();
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

export class ObjectifDeleteDialog {
  private dialogTitle = element(by.id('jhi-delete-objectif-heading'));
  private confirmButton = element(by.id('jhi-confirm-delete-objectif'));

  async getDialogTitle() {
    return this.dialogTitle.getAttribute('jhiTranslate');
  }

  async clickOnConfirmButton(timeout?: number) {
    await this.confirmButton.click();
  }
}
