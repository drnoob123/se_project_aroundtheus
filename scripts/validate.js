function toggleErrorState(formElement, inputElement, { inputErrorClass, errorClass }, showError) {
  const errorMessageElement = formElement.querySelector(`#${inputElement.id}-error`);
  inputElement.classList.toggle(inputErrorClass, showError);
  errorMessageElement.textContent = showError ? inputElement.validationMessage : '';
  errorMessageElement.classList.toggle(errorClass, showError);
}

function checkInputValidity(formElement, inputElement, options) {
  toggleErrorState(formElement, inputElement, options, !inputElement.validity.valid);
}

function toggleButtonState(inputElements, submitButton, { inactiveButtonClass }) {
  const isFormInvalid = inputElements.some(inputElement => !inputElement.validity.valid);
  submitButton.classList.toggle(inactiveButtonClass, isFormInvalid);
  submitButton.disabled = isFormInvalid;
}

function setEventListeners(formElement, options) {
  const { inputSelector, submitButtonSelector } = options;
  const inputElements = [...formElement.querySelectorAll(inputSelector)];
  const submitButton = formElement.querySelector(submitButtonSelector);

  inputElements.forEach(inputElement => {
    inputElement.addEventListener('input', () => {
      checkInputValidity(formElement, inputElement, options);
      toggleButtonState(inputElements, submitButton, options);
    });
  });
}

function enableValidation(options) {
  const formElements = [...document.querySelectorAll(options.formSelector)];
  formElements.forEach(formElement => {
    formElement.addEventListener('submit', event => event.preventDefault());
    setEventListeners(formElement, options);
  });
}

const options = {
  formSelector: ".modal__form",
  inputSelector: ".modal__input",
  submitButtonSelector: ".modal__save_button",
  inactiveButtonClass: "modal__save_button_disabled",
  inputErrorClass: "modal__input_type_error",
  errorClass: "modal__error_visible"
};

enableValidation(options);
