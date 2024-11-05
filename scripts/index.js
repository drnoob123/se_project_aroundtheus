const initialCards = [
  { name: "Yosemite Valley", link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/yosemite.jpg" },
  { name: "Lake Louise", link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/lake-louise.jpg" },
  { name: "Bald Mountains", link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/bald-mountains.jpg" },
  { name: "Latemar", link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/latemar.jpg" },
  { name: "Vanoise National Park", link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/vanoise.jpg" },
  { name: "Lago di Braies", link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/lago.jpg" }
];

const elements = {
  cardList: document.querySelector(".cards__list"),
  cardTemplate: document.querySelector("#card-template").content.firstElementChild,
  profileEditButton: document.querySelector("#profile-edit-button"),
  profileEditmodal: document.querySelector("#profile-edit-modal"),
  closeEditmodalButton: document.querySelector("#profile-modal-close-button"),
  addCardButton: document.querySelector(".profile__add-button"),
  addCardmodal: document.querySelector("#add-card-modal"),
  closeAddCardmodalButton: document.querySelector("#add-modal-close-button"),
  imagemodal: document.querySelector(".modal_type_preview"),
  closeImagemodalButton: document.querySelector("#image-modal-close-button"),
  addCardForm: document.querySelector("form[name='modal-add-form']"),
  profileName: document.querySelector(".profile__title"),
  profileDescription: document.querySelector(".profile__subtitle"),
  profileEditForm: document.querySelector("form[name='modal-edit-form']"),
  cardNameInput: document.querySelector("#card-name-input"),
  cardLinkInput: document.querySelector("#card-link-input"),
  profileNameInput: document.querySelector("#form-input-title"),
  profileDescriptionInput: document.querySelector("#form-input-description"),
  modalImage: document.querySelector(".modal_type_preview .modal__image"),
  modalCaption: document.querySelector(".modal_type_preview .modal__caption")
};

function togglemodal(modal, isOpen) {
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
    if (openModal) togglemodal(openModal, false);
  }
}

function handleClickOutsideClose(event) {
  if (event.target.classList.contains("modal_opened")) {
    togglemodal(event.target, false);
  }
}

function createCardElement({ name, link }) {
  const cardElement = elements.cardTemplate.cloneNode(true);
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
    elements.modalImage.src = link;
    elements.modalImage.alt = `${name} - Full-size preview of ${name}`;
    elements.modalCaption.textContent = name;
    togglemodal(elements.imagemodal, true);
  });

  return cardElement;
}

function renderCards(cards) {
  const cardElements = cards.map(createCardElement);
  elements.cardList.append(...cardElements);
}

function addNewCard(event) {
  event.preventDefault();
  const newCard = {
    name: elements.cardNameInput.value,
    link: elements.cardLinkInput.value
  };
  elements.addCardForm.reset();
  elements.cardList.prepend(createCardElement(newCard));
  togglemodal(elements.addCardmodal, false);
}

function updateProfileInfo(event) {
  event.preventDefault();
  elements.profileName.textContent = elements.profileNameInput.value;
  elements.profileDescription.textContent = elements.profileDescriptionInput.value;
  togglemodal(elements.profileEditmodal, false);
}

// Event listeners for modals and forms
elements.profileEditButton.addEventListener("click", () => {
  togglemodal(elements.profileEditmodal, true);
  elements.profileNameInput.value = elements.profileName.textContent;
  elements.profileDescriptionInput.value = elements.profileDescription.textContent;
});
elements.closeEditmodalButton.addEventListener("click", () => togglemodal(elements.profileEditmodal, false));
elements.addCardButton.addEventListener("click", () => togglemodal(elements.addCardmodal, true));
elements.closeAddCardmodalButton.addEventListener("click", () => togglemodal(elements.addCardmodal, false));
elements.closeImagemodalButton.addEventListener("click", () => togglemodal(elements.imagemodal, false));
elements.addCardForm.addEventListener("submit", addNewCard);
elements.profileEditForm.addEventListener("submit", updateProfileInfo);

document.addEventListener("DOMContentLoaded", () => renderCards(initialCards));
