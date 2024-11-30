import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor({ popupSelector, handleFormSubmit, loadingButtonText }) {
    super({ popupSelector });
    this._popupForm = this._popupElement.querySelector(".modal__form");
    this._handleFormSubmit = handleFormSubmit;
    this._inputList = this._popupElement.querySelectorAll(".modal__input");
    this._submitButton = this._popupForm.querySelector(".modal__button");
  }

  _getInputValues() {
    this._newData = {};
    this._inputList.forEach((inputElement) => {
      this._newData[inputElement.name] = inputElement.value;
    });
    return this._newData;
  }

  setEventListener() {
    super.setEventListeners();
    this._popupForm.addEventListener("submit", (event) => {
      event.preventDefault();
      this._handleFormSubmit(this._getInputValues())
        .then(() => {
          // Reset form only after successful submission
          this._popupForm.reset();
          this.close();
        })
        .catch((error) => {
          console.error("Form submission error:", error);
        })
        .finally(() => {
          this.hideLoading();
        });
    });
  }

  close() {
    super.close(); // Only close without resetting inputs
  }


}
