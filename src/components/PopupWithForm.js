import Popup from './Popup.js';

export default class PopupWithForm extends Popup {
  constructor(popupSelector, handleFormSubmit) {
    super(popupSelector); // Call the parent class constructor
    if (!this._popup) {
      throw new Error(`Popup element not found for selector: ${popupSelector}`);
    }
    this._handleFormSubmit = handleFormSubmit; // Function to handle form submission
    this._form = this._popup.querySelector("form"); // Reference to the form inside the popup
    if (!this._form) {
      throw new Error("Form element not found inside the popup");
    }
  }

  _getInputValues() {
    const inputs = Array.from(this._form.querySelectorAll("input")); // Collect all input fields
    const formValues = {};
    inputs.forEach(input => {
      formValues[input.name] = input.value; // Store each input's value in an object
    });
    return formValues;
  }

  setEventListeners() {
    super.setEventListeners(); // Call the parent class's event listener setup
    this._form.addEventListener("submit", (event) => {
      event.preventDefault();
      this._handleFormSubmit(this._getInputValues()); // Pass form values to the submit handler
      this.close(); // Close the popup after handling form submission
    });
  }

  close() {
    super.close(); // Call the parent class's close method
    this._form.reset(); // Reset the form fields
  }
}
