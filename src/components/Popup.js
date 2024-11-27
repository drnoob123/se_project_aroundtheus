export default class Popup {
  constructor(popupSelector) {
    this._popup = document.querySelector(popupSelector); // Assign the DOM element to _popup
  }

  open() {
    this._popup.classList.add('modal_opened'); // Add the class to open the modal
  }

  close() {
    this._popup.classList.remove('modal_opened'); // Remove the class to close the modal
  }

  setEventListeners() {
    this._popup.querySelector('.modal__close-button').addEventListener('click', () => {
      this.close(); // Close the popup when the close button is clicked
    });
  }
}
