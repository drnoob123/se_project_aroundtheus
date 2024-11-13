export default class Card {
  constructor({ name, link }, cardSelector, handleImageClick) {
    this._name = name;
    this._link = link;
    this._cardSelector = cardSelector;
    this._handleImageClick = handleImageClick; // Store the image click handler
  }

  // Method to get the template and clone it to create a new card element
  _getTemplate() {
    const cardElement = document
      .querySelector(this._cardSelector)
      .content
      .querySelector(".card")
      .cloneNode(true);

    return cardElement;
  }

  // Method to set up event listeners for like, delete, and image click
  _setEventListeners() {
    // Like button event listener
    this._likeButton.addEventListener('click', () => this._toggleLikeButton());

    // Delete button event listener
    this._deleteButton.addEventListener('click', () => this._handleDeleteButton());

    // Image click event listener to open the image preview
    this._cardImage.addEventListener('click', () => {
      this._handleImageClick(this._name, this._link);
    });
  }

  // Toggle the like button's active state
  _toggleLikeButton() {
    this._likeButton.classList.toggle('card__like-button_is-active');
  }

  // Remove the card from the DOM
  _handleDeleteButton() {
    this._cardElement.remove();
    this._cardElement = null; // Remove reference to the element
  }

  // Public method to generate a fully functional card element
  getView() {
    // Use the template to get a new card element
    this._cardElement = this._getTemplate();

    // Set the card title and image attributes
    this._cardImage = this._cardElement.querySelector(".card__image");
    this._cardTitle = this._cardElement.querySelector(".card__title");
    this._likeButton = this._cardElement.querySelector(".card__like-button");
    this._deleteButton = this._cardElement.querySelector(".card__delete-button");

    this._cardTitle.textContent = this._name;
    this._cardImage.src = this._link;
    this._cardImage.alt = `${this._name} - Image`;

    // Add event listeners for the card
    this._setEventListeners();

    return this._cardElement;
  }
}
