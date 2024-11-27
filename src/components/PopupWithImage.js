import Popup from './Popup.js';

export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector); // Call the parent class constructor to initialize _popup
    this._image = this._popup.querySelector('.modal__image'); // Query image element inside _popup
    this._caption = this._popup.querySelector('.modal__caption'); // Query caption element inside _popup
  }

  open({ name, link }) {
    this._image.src = link; // Set the image source
    this._image.alt = name; // Set the image alt text
    this._caption.textContent = name; // Set the caption text
    super.open(); // Call the parent class's open method
  }
}
