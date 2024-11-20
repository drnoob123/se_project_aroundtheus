import Modal from '../components/Modal.js';

export default class PopupWithImage extends Modal {
  constructor(modalSelector) {
    super(modalSelector); // Call the parent class constructor
    this._image = this._modal.querySelector('.modal__image'); // Select the image element inside the modal
    this._caption = this._modal.querySelector('.modal__caption'); // Select the caption element inside the modal
  }

  open({ name, link }) {
    this._image.src = link; // Set the image source
    this._image.alt = name; // Set the image alt text
    this._caption.textContent = name; // Set the caption text
    super.open(); // Call the parent class's open method
  }
}
