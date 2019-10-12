import { element, by, ElementFinder } from 'protractor';

export class EvaluationComponentsPage {
  createButton = element(by.id('jh-create-entity'));
  deleteButtons = element.all(by.css('jhi-evaluation div table .btn-danger'));
  title = element.all(by.css('jhi-evaluation div h2#page-heading span')).first();

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

export class EvaluationUpdatePage {
  pageTitle = element(by.id('jhi-evaluation-heading'));
  saveButton = element(by.id('save-entity'));
  cancelButton = element(by.id('cancel-save'));
  dateEvaluationInput = element(by.id('field_dateEvaluation'));
  noteInput = element(by.id('field_note'));
  objectifSelect = element(by.id('field_objectif'));
  sessionSelect = element(by.id('field_session'));
  personnelSelect = element(by.id('field_personnel'));

  async getPageTitle() {
    return this.pageTitle.getAttribute('jhiTranslate');
  }

  async setDateEvaluationInput(dateEvaluation) {
    await this.dateEvaluationInput.sendKeys(dateEvaluation);
  }

  async getDateEvaluationInput() {
    return await this.dateEvaluationInput.getAttribute('value');
  }

  async setNoteInput(note) {
    await this.noteInput.sendKeys(note);
  }

  async getNoteInput() {
    return await this.noteInput.getAttribute('value');
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

  async sessionSelectLastOption(timeout?: number) {
    await this.sessionSelect
      .all(by.tagName('option'))
      .last()
      .click();
  }

  async sessionSelectOption(option) {
    await this.sessionSelect.sendKeys(option);
  }

  getSessionSelect(): ElementFinder {
    return this.sessionSelect;
  }

  async getSessionSelectedOption() {
    return await this.sessionSelect.element(by.css('option:checked')).getText();
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

export class EvaluationDeleteDialog {
  private dialogTitle = element(by.id('jhi-delete-evaluation-heading'));
  private confirmButton = element(by.id('jhi-confirm-delete-evaluation'));

  async getDialogTitle() {
    return this.dialogTitle.getAttribute('jhiTranslate');
  }

  async clickOnConfirmButton(timeout?: number) {
    await this.confirmButton.click();
  }
}
