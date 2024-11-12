class Card {
    constructor(name, link , cardSelector, handleImageClick) {
      this._name = name;
      this._link = link;
      this._cardSelector = cardSelector;
      this._handleImageClick = handleImageClick;
    }
  
    // Private method to get the card template
    _getTemplate() {
      const cardElement = document
        .querySelector(this._cardSelector)
        .content
        .firstElementChild
        .cloneNode(true);
  
      return cardElement;
    }
  
    // Public method to create and return a fully functional card element
    generateCard() {
      this._element = this._getTemplate();
      this._cardImage = this._element.querySelector(".card__image");
      this._cardTitle = this._element.querySelector(".card__title");
      this._likeButton = this._element.querySelector(".card__like-button");
      this._deleteButton = this._element.querySelector(".card__delete-button");
  
      this._cardTitle.textContent = this._name;
      this._cardImage.src = this._link;
      this._cardImage.alt = `${this._name} - Image of ${this._name}`;
  
      this._setEventListeners();
  
      return this._element;
    }
  
    // Private method to add event listeners
    _setEventListeners() {
      this._likeButton.addEventListener("click", () => this._toggleLike());
      this._deleteButton.addEventListener("click", () => this._handleDelete());
      this._cardImage.addEventListener("click", () => this._handleImageClick(this));
    }
  
    // Private method to toggle the like button state
    _toggleLike() {
      this._likeButton.classList.toggle("card__like-button_active");
    }
  
    // Private method to handle the card deletion
    _handleDelete() {
      this._element.remove();
    }
  }
  
  export default Card;
  