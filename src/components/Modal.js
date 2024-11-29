export class Modal {
  constructor(modalSelector) {
    this._modal = document.querySelector(modalSelector);
    this._handleEscClose = this._handleEscClose.bind(this);
  }

  open() {
    this._modal.classList.add("modal_opened");
    document.addEventListener("keydown", this._handleEscClose);
  }

  close() {
    this._modal.classList.remove("modal_opened");
    document.removeEventListener("keydown", this._handleEscClose);
  }

  _handleEscClose(event) {
    if (event.key === "Escape") {
      this.close();
    }
  }

  setEventListeners() {
    this._modal.addEventListener("mousedown", (event) => {
      if (event.target.classList.contains("modal_opened") || event.target.classList.contains("modal__close")) {
        this.close();
      }
    });
  }
}
