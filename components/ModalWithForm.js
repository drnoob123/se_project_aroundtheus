import Modal from '../components/Modal.js';

export default class PopupWithForm extends Modal {
  constructor(modalSelector, handleFormSubmit) {
    super(modalSelector); // Call the parent class constructor
    this._handleFormSubmit = handleFormSubmit; // Callback for form submission
    this._form = this._modal.querySelector('.modal__form'); // Select the form element
    this._inputList = Array.from(this._form.querySelectorAll('.modal__input')); // Collect all input elements
  }

  // Private method to collect input values and return as an object
  _getInputValues() {
    const formValues = {};
    this._inputList.forEach((input) => {
      formValues[input.name] = input.value; // Use input's name as the key
    });
    return formValues;
  }

  // Public method to override setEventListeners
  setEventListeners() {
    super.setEventListeners(); // Call the parent class's method
    this._form.addEventListener('submit', (event) => {
      event.preventDefault(); // Prevent default form submission behavior
      const inputData = this._getInputValues(); // Get the form input values
      this._handleFormSubmit(inputData); // Call the provided callback with the input data
      this.close(); // Close the modal after submission
    });
  }

  // Overrides the close method to also reset the form
  close() {
    super.close(); // Call the parent class's close method
    this._form.reset(); // Reset the form inputs
  }
}
