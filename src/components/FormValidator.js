export default class FormValidator {
  constructor(settings, formElement) {
    this._settings = settings;
    this._formElement = formElement;
    if (!this._formElement) {
      throw new Error("Form element not found. Check the form selector.");
    }
    this._inputList = Array.from(this._formElement.querySelectorAll(this._settings.inputSelector));
    this._submitButton = this._formElement.querySelector(this._settings.submitButtonSelector);
  }

  _setEventListeners() {
    this._inputList.forEach(inputElement => {
      inputElement.addEventListener('input', () => {
        this._checkInputValidity(inputElement);
        this.toggleButtonState();
      });
    });
  }

  _checkInputValidity(inputElement) {
    const errorElement = this._formElement.querySelector(`#${inputElement.id}-error`);
    if (!inputElement.validity.valid) {
      errorElement.textContent = inputElement.validationMessage;
      inputElement.classList.add(this._settings.inputErrorClass);
      errorElement.classList.add(this._settings.errorClass);
    } else {
      errorElement.textContent = '';
      inputElement.classList.remove(this._settings.inputErrorClass);
      errorElement.classList.remove(this._settings.errorClass);
    }
  }

  toggleButtonState() {
    const isFormInvalid = this._inputList.some(inputElement => !inputElement.validity.valid);
    this._submitButton.disabled = isFormInvalid;
    this._submitButton.classList.toggle(this._settings.inactiveButtonClass, isFormInvalid);
  }

  enableValidation() {
    this._formElement.addEventListener('submit', event => event.preventDefault());
    this._setEventListeners();
    this.toggleButtonState();
  }
}
