import Card from "../components/Card.js";
import FormValidator from "../components/formValidator.js";

const initialCards = [
  { name: "Yosemite Valley", link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/yosemite.jpg" },
  { name: "Lake Louise", link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/lake-louise.jpg" },
  { name: "Bald Mountains", link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/bald-mountains.jpg" },
  { name: "Latemar", link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/latemar.jpg" },
  { name: "Vanoise National Park", link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/vanoise.jpg" },
  { name: "Lago di Braies", link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/lago.jpg" }
];

const settings = {
  inputSelector: ".modal__input",
  submitButtonSelector: ".modal__save-button",
  inactiveButtonClass: "modal__save-button_disabled",
  inputErrorClass: "modal__input_type_error",
  errorClass: "modal__error_visible"
};

document.addEventListener("DOMContentLoaded", () => {
  const cardList = document.querySelector(".cards__list");
  const profileEditButton = document.querySelector("#profile-edit-button");
  const profileEditModal = document.querySelector("#profile-edit-modal");
  const closeEditModalButton = document.querySelector("#profile-modal-close-button");
  const addCardButton = document.querySelector(".profile__add-button");
  const addCardModal = document.querySelector("#add-card-modal");
  const closeAddCardModalButton = document.querySelector("#add-modal-close-button");
  const imageModal = document.querySelector(".modal_type_preview");
  const closeImageModalButton = document.querySelector("#image-modal-close-button");
  const addCardForm = document.querySelector("form[name='modal-add-form']");
  const profileEditForm = document.querySelector("form[name='modal-edit-form']");
  const cardNameInput = document.querySelector("#card-name-input");
  const cardLinkInput = document.querySelector("#card-link-input");
  const profileName = document.querySelector(".profile__title");
  const profileDescription = document.querySelector(".profile__subtitle");
  const profileNameInput = document.querySelector("#form-input-title");
  const profileDescriptionInput = document.querySelector("#form-input-description");
  const modalImage = document.querySelector(".modal_type_preview .modal__image");
  const modalCaption = document.querySelector(".modal_type_preview .modal__caption");

  const addCardFormValidator = new FormValidator(settings, addCardForm);
  const profileEditFormValidator = new FormValidator(settings, profileEditForm);
  addCardFormValidator.enableValidation();
  profileEditFormValidator.enableValidation();

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

  function handleImageClick(name, link) {
    modalImage.src = link;
    modalImage.alt = `${name} - Full-size preview of ${name}`;
    modalCaption.textContent = name;
    toggleModal(imageModal, true);
  }

  function createCard(data) {
    const card = new Card(data, "#card-template", handleImageClick);
    return card.getView();
  }

  function renderCards(cards) {
    cards.forEach(cardData => {
      const cardElement = createCard(cardData);
      cardList.append(cardElement);
    });
  }

  function addNewCard(event) {
    event.preventDefault();
    const newCard = { name: cardNameInput.value, link: cardLinkInput.value };
    const cardElement = createCard(newCard);
    cardList.prepend(cardElement);
    addCardForm.reset();
    toggleModal(addCardModal, false);
    addCardFormValidator._toggleButtonState();
  }

  function updateProfileInfo(event) {
    event.preventDefault();
    profileName.textContent = profileNameInput.value;
    profileDescription.textContent = profileDescriptionInput.value;
    toggleModal(profileEditModal, false);
  }

  profileEditButton.addEventListener("click", () => {
    toggleModal(profileEditModal, true);
    profileNameInput.value = profileName.textContent;
    profileDescriptionInput.value = profileDescription.textContent;
    profileEditFormValidator._toggleButtonState();
  });
  closeEditModalButton.addEventListener("click", () => toggleModal(profileEditModal, false));
  addCardButton.addEventListener("click", () => {
    toggleModal(addCardModal, true);
    addCardFormValidator._toggleButtonState();
  });
  closeAddCardModalButton.addEventListener("click", () => toggleModal(addCardModal, false));
  closeImageModalButton.addEventListener("click", () => toggleModal(imageModal, false));
  addCardForm.addEventListener("submit", addNewCard);
  profileEditForm.addEventListener("submit", updateProfileInfo);

  renderCards(initialCards);
});
