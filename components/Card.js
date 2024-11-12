class Card {
    constructor(name, link, cardSelector, handleImageClick) {
      this._name = name;
      this._link = link;
      this._cardSelector = cardSelector;
      this._handleImageClick = handleImageClick;
      this._element = this._getTemplate();
      this._setContent();
      this._addEventListeners();
    }
  
    _getTemplate() {
      return document.querySelector(this._cardSelector).content.firstElementChild.cloneNode(true);
    }
  
    _setContent() {
      const image = this._element.querySelector(".card__image");
      this._element.querySelector(".card__title").textContent = this._name;
      image.src = this._link;
      image.alt = `${this._name} - Image of ${this._name}`;
    }
  
    _addEventListeners() {
      this._element.querySelector(".card__like-button").addEventListener("click", () => 
        this._element.querySelector(".card__like-button").classList.toggle("card__like-button_active")
      );
      this._element.querySelector(".card__delete-button").addEventListener("click", () => this._element.remove());
      this._element.querySelector(".card__image").addEventListener("click", () => this._handleImageClick(this));
    }
  
    generateCard() {
      return this._element;
    }
  }
  
  export default Card;
  