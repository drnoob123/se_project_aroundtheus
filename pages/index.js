
// Initial card data
const initialCards = [
  { name: "Yosemite Valley", link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/yosemite.jpg" },
  { name: "Lake Louise", link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/lake-louise.jpg" },
  { name: "Bald Mountains", link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/bald-mountains.jpg" },
  { name: "Latemar", link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/latemar.jpg" },
  { name: "Vanoise National Park", link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/vanoise.jpg" },
  { name: "Lago di Braies", link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/lago.jpg" }
];

// Element references
const cardList = document.querySelector(".cards__list");
const cardTemplate = document.querySelector("#card-template").content.firstElementChild;
const profileEditButton = document.querySelector("#profile-edit-button");
const profileEditModal = document.querySelector("#profile-edit-modal");
const closeEditModalButton = document.querySelector("#profile-modal-close-button");
const addCardButton = document.querySelector(".profile__add-button");
const addCardModal = document.querySelector("#add-card-modal");
const closeAddCardModalButton = document.querySelector("#add-modal-close-button");
const imageModal = document.querySelector(".modal_type_preview");
const closeImageModalButton = document.querySelector("#image-modal-close-button");
const addCardForm = document.querySelector("form[name='modal-add-form']");
const profileName = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__subtitle");
const profileEditForm = document.querySelector("form[name='modal-edit-form']");
const cardNameInput = document.querySelector("#card-name-input");
const cardLinkInput = document.querySelector("#card-link-input");
const profileNameInput = document.querySelector("#form-input-title");
const profileDescriptionInput = document.querySelector("#form-input-description");
const modalImage = document.querySelector(".modal_type_preview .modal__image");
const modalCaption = document.querySelector(".modal_type_preview .modal__caption");

// Function to open or close a modal
function toggleModal(modal, isOpen) {
  modal.classList.toggle("modal_opened", isOpen);
  if (isOpen) {
    document.addEventListener("keydown", handleEscapeClose);
    modal.addEventListener("mousedown", handleClickOutsideClose);
  } else {
    document.removeEventListener("keydown", handleEscapeClose);
    modal.removeEventListener("mousedown", handleClickOutsideClose);
  }
}

function handleEscapeClose(event) {
  if (event.key === "Escape") {
    const openModal = document.querySelector(".modal_opened");
    if (openModal) toggleModal(openModal, false);
  }
}

function handleClickOutsideClose(event) {
  if (event.target.classList.contains("modal_opened")) {
    toggleModal(event.target, false);
  }
}

// Function to create a card element
function createCardElement({ name, link }) {
  const cardElement = cardTemplate.cloneNode(true);
  const cardTitle = cardElement.querySelector(".card__title");
  const cardImage = cardElement.querySelector(".card__image");
  const likeButton = cardElement.querySelector(".card__like-button");
  const deleteButton = cardElement.querySelector(".card__delete-button");

  cardTitle.textContent = name;
  cardImage.src = link;
  cardImage.alt = `${name} - Image of ${name}`;

  likeButton.addEventListener("click", () => likeButton.classList.toggle("card__like-button_active"));
  deleteButton.addEventListener("click", () => cardElement.remove());
  
  cardImage.addEventListener("click", () => {
    modalImage.src = link;
    modalImage.alt = `${name} - Full-size preview of ${name}`;
    modalCaption.textContent = name;
    toggleModal(imageModal, true);
  });

  return cardElement;
}

// Function to render all cards in the initial list
function renderCards(cards) {
  const cardElements = cards.map(createCardElement);
  cardList.append(...cardElements);
}

// Function to add a new card to the gallery
function addNewCard(event) {
  event.preventDefault();
  const newCard = {
    name: cardNameInput.value,
    link: cardLinkInput.value
  };
  addCardForm.reset();
  cardList.prepend(createCardElement(newCard));
  toggleModal(addCardModal, false);
}

// Function to update the profile information with inputted values
function updateProfileInfo(event) {
  event.preventDefault();
  profileName.textContent = profileNameInput.value;
  profileDescription.textContent = profileDescriptionInput.value;
  toggleModal(profileEditModal, false);
}

// Event listeners to handle opening and closing of modals and form submissions
profileEditButton.addEventListener("click", () => {
  toggleModal(profileEditModal, true);
  profileNameInput.value = profileName.textContent;
  profileDescriptionInput.value = profileDescription.textContent;
});
closeEditModalButton.addEventListener("click", () => toggleModal(profileEditModal, false));
addCardButton.addEventListener("click", () => toggleModal(addCardModal, true));
closeAddCardModalButton.addEventListener("click", () => toggleModal(addCardModal, false));
closeImageModalButton.addEventListener("click", () => toggleModal(imageModal, false));
addCardForm.addEventListener("submit", addNewCard);
profileEditForm.addEventListener("submit", updateProfileInfo);

// Render the initial cards when the document is fully loaded
document.addEventListener("DOMContentLoaded", () => renderCards(initialCards));
