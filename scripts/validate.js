function showInputError(formElement, inputElement, {inputErrorClass, errorClass}){

const errorMessageElement = formElement.queryselector(`#${inputElement.id}-error`)
inputElement.classList.add(inputErrorClass);
errorMessageElement.textContent = inputElement.validationMessage;
errorMessageElement.classList.add(errorClass);
}
function hideInputError(formElement, inputElement, {inputErrorClass}){

  const errorMessageElement = formElement.queryselector(`#${inputElement.id}-error`)
  inputElement.classList.add(inputErrorClass);
  errorMessageElement.textContent = '';
  errorMessageElement.classList.add(errorClass);
  }
function checkInputValidity(formElement, inputElement, options){
  if(!inputElement.validity.valid){
    showInputError(formElement, inputElement, options);}
    else {
      hideInputError(formElement, inputElement, options);
    }
  }


function setEventListeners(formElement, options) {
  const { inputSelector } = options;
  const inputElements = [...formElement.querySelectorAll(inputSelector)];
  
  inputElements.forEach(inputElement => {
    inputElement.addEventListener('input', (event) => {
      console.log(inputElement.validationMessage);
    });
  });
}

function enableValidation(options) {
  const formElements = [...document.querySelectorAll(options.formSelector)];

  formElements.forEach((formElement) => {
    formElement.addEventListener('submit', (event) => {
      event.preventDefault();
    });
    
    setEventListeners(formElement, options);
  });

  // look for all inputs inside of form
  // loop through and confirm all inputs are valid
  // if input invalid
  // get validation message
  // add error class to message
  // display error message
  // disable button
  // if all inputs valid enable button
  // reset error messages
}

const options = {
  formSelector: ".modal__form",
  inputSelector: ".modal__input",
  submitButtonSelector: ".modal__button",
  inactiveButtonClass: "modal__button_disabled",
  inputErrorClass: "modal__input_type_error",
  errorClass: "modal__error_visible"
};

enableValidation(options);
