import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
  constructor({ popupSelector }) {
    super({ popupSelector });
    this._imageElement = this._popupElement.querySelector(".modal__preview-image");
    this._footerElement = this._popupElement.querySelector(".modal__preview-footer");
  }

  open({ link, name }) {
    this._footerElement.textContent = name;
    this._imageElement.src = link;
    this._imageElement.alt = name;
    super.open();
  }
}
