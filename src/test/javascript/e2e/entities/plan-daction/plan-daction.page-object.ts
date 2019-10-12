import { element, by, ElementFinder } from 'protractor';

export class PlanDactionComponentsPage {
  createButton = element(by.id('jh-create-entity'));
  deleteButtons = element.all(by.css('jhi-plan-daction div table .btn-danger'));
  title = element.all(by.css('jhi-plan-daction div h2#page-heading span')).first();

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

export class PlanDactionUpdatePage {
  pageTitle = element(by.id('jhi-plan-daction-heading'));
  saveButton = element(by.id('save-entity'));
  cancelButton = element(by.id('cancel-save'));
  tacheInput = element(by.id('field_tache'));
  descriptionInput = element(by.id('field_description'));
  dateDebutInput = element(by.id('field_dateDebut'));
  dateFInInput = element(by.id('field_dateFIn'));
  objectifSelect = element(by.id('field_objectif'));
  personnelSelect = element(by.id('field_personnel'));

  async getPageTitle() {
    return this.pageTitle.getAttribute('jhiTranslate');
  }

  async setTacheInput(tache) {
    await this.tacheInput.sendKeys(tache);
  }

  async getTacheInput() {
    return await this.tacheInput.getAttribute('value');
  }

  async setDescriptionInput(description) {
    await this.descriptionInput.sendKeys(description);
  }

  async getDescriptionInput() {
    return await this.descriptionInput.getAttribute('value');
  }

  async setDateDebutInput(dateDebut) {
    await this.dateDebutInput.sendKeys(dateDebut);
  }

  async getDateDebutInput() {
    return await this.dateDebutInput.getAttribute('value');
  }

  async setDateFInInput(dateFIn) {
    await this.dateFInInput.sendKeys(dateFIn);
  }

  async getDateFInInput() {
    return await this.dateFInInput.getAttribute('value');
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

export class PlanDactionDeleteDialog {
  private dialogTitle = element(by.id('jhi-delete-planDaction-heading'));
  private confirmButton = element(by.id('jhi-confirm-delete-planDaction'));

  async getDialogTitle() {
    return this.dialogTitle.getAttribute('jhiTranslate');
  }

  async clickOnConfirmButton(timeout?: number) {
    await this.confirmButton.click();
  }
}
