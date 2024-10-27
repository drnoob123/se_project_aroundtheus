const initialCards = [
  { name: "Yosemite Valley", link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/yosemite.jpg" },
  { name: "Lake Louise", link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/lake-louise.jpg" },
  { name: "Bald Mountains", link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/bald-mountains.jpg" },
  { name: "Latemar", link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/latemar.jpg" },
  { name: "Vanoise National Park", link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/vanoise.jpg" },
  { name: "Lago di Braies", link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/lago.jpg" }
];

// DOM Elements
const cardList = document.querySelector(".cards__list");
const cardTemplate = document.querySelector("#card-template").content.firstElementChild;
const profileEditButton = document.querySelector("#profile-edit-button");
const profileEditModal = document.querySelector("#profile-edit-modal");
const closeEditModalButton = document.querySelector("#profile-modal-close-button");
const addCardButton = document.querySelector(".profile__add-button");
const addCardModal = document.querySelector("#add-card-modal");
const closeAddCardModalButton = document.querySelector("#add-modal-close-button");
const imageModal = document.querySelector(".modal__type_preview");
const closeImageModalButton = document.querySelector("#image-modal-close-button");

// Functions to open and close modals
function openPopup(modal) {
  modal.classList.add("modal_opened");
}

function closePopup(modal) {
  modal.classList.remove("modal_opened");
}

// Card creation function
function getCardElement(cardData) {
  const cardElement = cardTemplate.cloneNode(true);
  const cardTitle = cardElement.querySelector(".card__title");
  const cardImage = cardElement.querySelector(".card__image");

  cardTitle.textContent = cardData.name;
  cardImage.src = cardData.link;
  cardImage.alt = cardData.name;

  // Like button functionality
  const likeButton = cardElement.querySelector(".card__like-button");
  likeButton.addEventListener("click", () => {
    likeButton.classList.toggle("card__like-button_active");
  });

  // Delete button functionality
  const deleteButton = cardElement.querySelector(".card__delete-button");
  deleteButton.addEventListener("click", () => {
    cardElement.remove();
  });

  // Open image in preview modal
  const modalImage = imageModal.querySelector(".modal__image");
  const modalCaption = imageModal.querySelector(".modal__caption");
  cardImage.addEventListener("click", () => {
    modalImage.src = cardData.link;
    modalImage.alt = cardData.name;
    modalCaption.textContent = cardData.name;
    openPopup(imageModal);
  });

  return cardElement;
}

// Function to render initial cards
function renderInitialCards() {
  initialCards.forEach((cardData) => {
    const cardElement = getCardElement(cardData);
    cardList.append(cardElement);  // Use `append` to render in order
  });
}

// Add new card functionality
function addNewCard(event) {
  event.preventDefault(); // Prevent the form from submitting
  const cardNameInput = document.querySelector("#card-name-input");
  const cardLinkInput = document.querySelector("#card-link-input");

  const newCardData = {
    name: cardNameInput.value,
    link: cardLinkInput.value,
  };

  // Create and render the new card
  const newCardElement = getCardElement(newCardData);
  cardList.prepend(newCardElement); // Prepend to add to the top of the list

  // Reset the form fields and close the modal
  cardNameInput.value = "";
  cardLinkInput.value = "";
  closePopup(addCardModal);
}

// Open and close modal event listeners
profileEditButton.addEventListener("click", () => openPopup(profileEditModal));
closeEditModalButton.addEventListener("click", () => closePopup(profileEditModal));
addCardButton.addEventListener("click", () => openPopup(addCardModal));
closeAddCardModalButton.addEventListener("click", () => closePopup(addCardModal));
closeImageModalButton.addEventListener("click", () => closePopup(imageModal));

// Event listener for adding a new card
const addCardForm = document.querySelector("form[name='modal-add-form']");
addCardForm.addEventListener("submit", addNewCard);

// Initialize cards on page load
document.addEventListener("DOMContentLoaded", renderInitialCards);
