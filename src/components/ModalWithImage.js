import { Modal } from "./Modal.js";

export class ModalWithImage extends Modal {
  constructor(modalSelector) {
    super(modalSelector);
    this._imageElement = this._modal.querySelector(".modal__image");
    this._captionElement = this._modal.querySelector(".modal__caption");
  }

  open({ link, name }) {
    this._imageElement.src = link;
    this._imageElement.alt = `${name} - Full-size preview of ${name}`;
    this._captionElement.textContent = name;
    super.open();
  }
}
