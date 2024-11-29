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
    this._renderLikes();
  }

  _renderLikes() {
    const likeButton = this._cardElement.querySelector(".card__like-button");
    if (this._isLiked) {
      likeButton.classList.add("card__like-button_active");
    } else {
      likeButton.classList.remove("card__like-button_active");
    }
  }

  _setEventListeners() {
    const likeButton = this._cardElement.querySelector(".card__like-button");
    likeButton.addEventListener("click", () => this._handleLikeClick(this));

    const deleteButton = this._cardElement.querySelector(".card__delete-button");
    deleteButton.addEventListener("click", () => {
      this._handleDeleteClick(this);
    });

    const cardImage = this._cardElement.querySelector(".card__image");
    cardImage.addEventListener("click", () => {
      this._handleCardClick({ name: this._name, link: this._link });
    });
  }

  _getTemplate() {
    const cardElement = document
      .querySelector(this._cardSelector)
      .content.querySelector(".card")
      .cloneNode(true);
    return cardElement;
  }

  _fillCardTemplate() {
    const cardImage = this._cardElement.querySelector(".card__image");
    cardImage.alt = `Photo of ${this._name}`;
    cardImage.src = this._link;
    this._cardElement.querySelector(".card__title").textContent = this._name;
  }

  getView() {
    this._cardElement = this._getTemplate();
    this._fillCardTemplate();
    this._setEventListeners();
    this._renderLikes();
    return this._cardElement;
  }
}
