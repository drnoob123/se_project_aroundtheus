function toggleErrorState(formElement, inputElement, { inputErrorClass, errorClass }, showError) {
  const errorMessageElement = formElement.querySelector(`#${inputElement.id}-error`);
  
  if (errorMessageElement) {
    // Toggle error message visibility and content
    errorMessageElement.textContent = showError ? inputElement.validationMessage : '';
    errorMessageElement.classList.toggle(errorClass, showError);
  } else {
    console.warn(`Error element not found for input: ${inputElement.id}`);
  }
  
  // Toggle input error class
  inputElement.classList.toggle(inputErrorClass, showError);
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

  if (!submitButton) {
    console.warn(`Submit button not found for selector: ${submitButtonSelector}`);
    return;
  }

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

document.addEventListener('DOMContentLoaded', () => {
  enableValidation(options);
});

// Updated options to ensure selectors are correct
const options = {
  formSelector: ".modal__form",
  inputSelector: ".modal__input",
  submitButtonSelector: ".modal__save-button", // Fixed class selector
  inactiveButtonClass: "modal__save-button_disabled", // Ensure this is correct in CSS
  inputErrorClass: "modal__input_type_error",
  errorClass: "modal__error_visible"
};

enableValidation(options);
