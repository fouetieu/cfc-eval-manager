import { element, by, ElementFinder } from 'protractor';

export class ReportingComponentsPage {
  createButton = element(by.id('jh-create-entity'));
  deleteButtons = element.all(by.css('jhi-reporting div table .btn-danger'));
  title = element.all(by.css('jhi-reporting div h2#page-heading span')).first();

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

export class ReportingUpdatePage {
  pageTitle = element(by.id('jhi-reporting-heading'));
  saveButton = element(by.id('save-entity'));
  cancelButton = element(by.id('cancel-save'));
  libelleInput = element(by.id('field_libelle'));
  descriptionInput = element(by.id('field_description'));
  documentInput = element(by.id('file_document'));
  objectifSelect = element(by.id('field_objectif'));
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

  async setDescriptionInput(description) {
    await this.descriptionInput.sendKeys(description);
  }

  async getDescriptionInput() {
    return await this.descriptionInput.getAttribute('value');
  }

  async setDocumentInput(document) {
    await this.documentInput.sendKeys(document);
  }

  async getDocumentInput() {
    return await this.documentInput.getAttribute('value');
  }

  async objectifSelectLastOption(timeout?: number) {
    await this.objectifSelect
      .all(by.tagName('option'))
      .last()
      .click();
  }

  async objectifSelectOption(option) {
    await this.objectifSelect.sendKeys(option);
  }

  getObjectifSelect(): ElementFinder {
    return this.objectifSelect;
  }

  async getObjectifSelectedOption() {
    return await this.objectifSelect.element(by.css('option:checked')).getText();
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

export class ReportingDeleteDialog {
  private dialogTitle = element(by.id('jhi-delete-reporting-heading'));
  private confirmButton = element(by.id('jhi-confirm-delete-reporting'));

  async getDialogTitle() {
    return this.dialogTitle.getAttribute('jhiTranslate');
  }

  async clickOnConfirmButton(timeout?: number) {
    await this.confirmButton.click();
  }
}
