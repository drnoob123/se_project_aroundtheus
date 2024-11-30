export default class Card {
  constructor(
    { name, link },
    userId,
    cardSelector,
    handleCardClick,
    handleDeleteClick,
    handleLikeClick
  ) {
    this._name = name;
    this._link = link;
    this._isLiked = false; // Initialize the like state
    this._cardSelector = cardSelector;
    this._handleCardClick = handleCardClick;
    this._handleDeleteClick = handleDeleteClick;
    this._handleLikeClick = handleLikeClick;
  }

  toggleLike() {
    this._isLiked = !this._isLiked; // Toggle the like state
    this._updateLikeState();
  }

  _updateLikeState() {
    if (this._isLiked) {
      this._likeButton.classList.add("card__like-button_active");
    } else {
      this._likeButton.classList.remove("card__like-button_active");
    }
  }

  _setEventListeners() {
    this._likeButton.addEventListener("click", () => this._handleLikeClick(this));

    this._deleteButton.addEventListener("click", () => {
      this._handleDeleteClick(this); // Pass the card instance to the delete handler
    });

    this._cardImage.addEventListener("click", () => {
      this._handleCardClick({ name: this._name, link: this._link });
    });
  }

  removeCard() {
    this._cardElement.remove(); // Remove the card's DOM element
    this._cardElement = null; // Clean up the reference
  }

  _getTemplate() {
    const cardElement = document
      .querySelector(this._cardSelector)
      .content.querySelector(".card")
      .cloneNode(true);
    return cardElement;
  }

  _initializeCardFields() {
    this._cardImage = this._cardElement.querySelector(".card__image");
    this._likeButton = this._cardElement.querySelector(".card__like-button");
    this._deleteButton = this._cardElement.querySelector(".card__delete-button");
    this._cardTitle = this._cardElement.querySelector(".card__title");
  }

  _fillCardTemplate() {
    this._cardImage.alt = `Photo of ${this._name}`;
    this._cardImage.src = this._link;
    this._cardTitle.textContent = this._name;
  }

  getView() {
    this._cardElement = this._getTemplate();
    this._initializeCardFields(); // Set up all card-related elements as class fields
    this._fillCardTemplate();
    this._setEventListeners();
    this._updateLikeState();
    return this._cardElement;
  }
}
