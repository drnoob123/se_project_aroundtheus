class FormValidator {
    constructor(settings, formElement) {
      this._settings = settings;
      this._formElement = formElement;
      this._inputList = Array.from(this._formElement.querySelectorAll(this._settings.inputSelector));
      this._submitButton = this._formElement.querySelector(this._settings.submitButtonSelector);
    }
  
    // Public method to enable validation
    enableValidation() {
      this._setEventListeners();
    }
  
    // Public method to reset validation
    resetValidation() {
      this._inputList.forEach((inputElement) => {
        this._hideInputError(inputElement); // Hide all error messages
      });
      this._toggleButtonState(); // Reset the submit button state
    }
  
    // Private method to set up all necessary event listeners
    _setEventListeners() {
      this._toggleButtonState(); // Check button state initially
  
      this._inputList.forEach((inputElement) => {
        inputElement.addEventListener("input", () => {
          this._checkInputValidity(inputElement); // Check input validity on every input
          this._toggleButtonState(); // Update button state based on input validity
        });
      });
    }
  
    // Private method to check the validity of an input field
    _checkInputValidity(inputElement) {
      if (!inputElement.validity.valid) {
        this._showInputError(inputElement, inputElement.validationMessage);
      } else {
        this._hideInputError(inputElement);
      }
    }
  
    // Private method to show input error
    _showInputError(inputElement, errorMessage) {
      const errorElement = this._formElement.querySelector(`#${inputElement.id}-error`);
      inputElement.classList.add(this._settings.inputErrorClass);
      errorElement.textContent = errorMessage;
      errorElement.classList.add(this._settings.errorClass);
    }
  
    // Private method to hide input error
    _hideInputError(inputElement) {
      const errorElement = this._formElement.querySelector(`#${inputElement.id}-error`);
      inputElement.classList.remove(this._settings.inputErrorClass);
      errorElement.textContent = '';
      errorElement.classList.remove(this._settings.errorClass);
    }
  
    // Private method to toggle the submit button's state
    _toggleButtonState() {
      if (this._hasInvalidInput()) {
        this._disableButton();
      } else {
        this._enableButton();
      }
    }
  
    // Private method to disable the submit button
    _disableButton() {
      this._submitButton.classList.add(this._settings.inactiveButtonClass);
      this._submitButton.disabled = true;
    }
  
    // Private method to enable the submit button
    _enableButton() {
      this._submitButton.classList.remove(this._settings.inactiveButtonClass);
      this._submitButton.disabled = false;
    }
  
    // Private method to check if any input field is invalid
    _hasInvalidInput() {
      return this._inputList.some((inputElement) => !inputElement.validity.valid);
    }
  }
  
  export default FormValidator;
  