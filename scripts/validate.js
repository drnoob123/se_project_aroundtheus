// Function to toggle the display of error messages for an input element and apply error styling.
// - `formElement`: The form containing the input.
// - `inputElement`: The specific input field being validated.
// - `{ inputErrorClass, errorClass }`: Object containing CSS classes used for styling errors:
//   - `inputErrorClass`: CSS class to style the input field itself when there is an error.
//   - `errorClass`: CSS class to style the error message when visible.
// - `showError`: A boolean value that determines whether to show or hide the error.
function toggleErrorState(formElement, inputElement, { inputErrorClass, errorClass }, showError) {
  // Find the element displaying the error message, using the input's ID with "-error" suffix
  const errorMessageElement = formElement.querySelector(`#${inputElement.id}-error`);
  
  // If the error message element exists, toggle its content and visibility based on showError
  if (errorMessageElement) {
    // If showError is true, display the validation message; if false, clear the message
    errorMessageElement.textContent = showError ? inputElement.validationMessage : '';
    // Add or remove the errorClass to show or hide the error message
    errorMessageElement.classList.toggle(errorClass, showError);
  } else {
    // Display a warning in the console if no error message element is found for the input
    console.warn(`Error element not found for input: ${inputElement.id}`);
  }
  
  // Toggle the input error styling based on showError:
  // Adds inputErrorClass if showError is true, otherwise removes it
  inputElement.classList.toggle(inputErrorClass, showError);
}

// Function to check the validity of a single input field within a form.
// - `formElement`: The form containing the input element.
// - `inputElement`: The input element being validated.
// - `options`: Object containing the CSS classes for styling errors.
function checkInputValidity(formElement, inputElement, options) {
  // Use toggleErrorState to show error styling if the input is invalid
  toggleErrorState(formElement, inputElement, options, !inputElement.validity.valid);
}

// Function to toggle the state of the submit button based on the form's validity.
// - `inputElements`: Array of all input fields in the form.
// - `submitButton`: The form's submit button element.
// - `{ inactiveButtonClass }`: Object containing the CSS class to style the disabled button.
function toggleButtonState(inputElements, submitButton, { inactiveButtonClass }) {
  // Check if any input in the form is invalid by using `some` to find any invalid input
  const isFormInvalid = inputElements.some(inputElement => !inputElement.validity.valid);
  // Toggle the inactive button style based on the form validity
  submitButton.classList.toggle(inactiveButtonClass, isFormInvalid);
  // Enable or disable the button based on form validity
  submitButton.disabled = isFormInvalid;
}

// Function to set up event listeners for inputs within a form, so they can be validated on each change.
// - `formElement`: The form element to set up listeners on.
// - `options`: Object containing configuration settings for validation.
function setEventListeners(formElement, options) {
  const { inputSelector, submitButtonSelector } = options;
  // Select all input elements and the submit button in the form
  const inputElements = [...formElement.querySelectorAll(inputSelector)];
  const submitButton = formElement.querySelector(submitButtonSelector);

  // If submit button is not found, show a warning and stop further execution
  if (!submitButton) {
    console.warn(`Submit button not found for selector: ${submitButtonSelector}`);
    return;
  }

  // Add input event listeners to each input field to validate and update button state on every change
  inputElements.forEach(inputElement => {
    inputElement.addEventListener('input', () => {
      checkInputValidity(formElement, inputElement, options); // Validate the input
      toggleButtonState(inputElements, submitButton, options); // Update the button state
    });
  });
}

// Function to enable validation for multiple forms on the page, using specified options.
// - `options`: Configuration object for selectors and error styling classes.
function enableValidation(options) {
  // Select all forms based on the formSelector provided in options
  const formElements = [...document.querySelectorAll(options.formSelector)];
  formElements.forEach(formElement => {
    // Prevent form submission for validation testing
    formElement.addEventListener('submit', event => event.preventDefault());
    // Set up input listeners for validation in the form
    setEventListeners(formElement, options);
  });
}

// When the document has loaded, start validation by calling enableValidation with `options`
document.addEventListener('DOMContentLoaded', () => {
  enableValidation(options);
});

// Object containing configuration options for validation, like selectors and error styles
const options = {
  formSelector: ".modal__form", // CSS selector for each form element to validate
  inputSelector: ".modal__input", // CSS selector for each input element to validate
  submitButtonSelector: ".modal__save-button", // CSS selector for the submit button
  inactiveButtonClass: "modal__save-button_disabled", // CSS class for a disabled submit button
  inputErrorClass: "modal__input_type_error", // CSS class for input fields with validation errors
  errorClass: "modal__error_visible" // CSS class for visible error messages
};

// Start form validation using the configured `options`
enableValidation(options);
