const initialCards = [
  { name: "Yosemite Valley", link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/yosemite.jpg" },
  { name: "Lake Louise", link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/lake-louise.jpg" },
  { name: "Bald Mountains", link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/bald-mountains.jpg" },
  { name: "Latemar", link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/latemar.jpg" },
  { name: "Vanoise National Park", link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/vanoise.jpg" },
  { name: "Lago di Braies", link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/lago.jpg" }
];

const selectors = {
  cardList: ".cards__list",
  cardTemplate: "#card-template",
  profileEditButton: "#profile-edit-button",
  profileEditModal: "#profile-edit-modal",
  closeEditModalButton: "#profile-modal-close-button",
  addCardButton: ".profile__add-button",
  addCardModal: "#add-card-modal",
  closeAddCardModalButton: "#add-modal-close-button",
  imageModal: ".modal_type_preview",
  closeImageModalButton: "#image-modal-close-button",
  addCardForm: "form[name='modal-add-form']",
  profileName: ".profile__title",
  profileDescription: ".profile__subtitle",
  profileEditForm: "form[name='modal-edit-form']",
  cardNameInput: "#card-name-input",
  cardLinkInput: "#card-link-input",
  profileNameInput: "#form-input-title",
  profileDescriptionInput: "#form-input-description"
};

const elements = Object.fromEntries(
  Object.entries(selectors).map(([key, selector]) => [key, document.querySelector(selector)])
);

function togglePopup(modal, isOpen) {
  modal.classList.toggle("modal_opened", isOpen);
}

function createCardElement({ name, link }) {
  const cardElement = elements.cardTemplate.content.firstElementChild.cloneNode(true);
  cardElement.querySelector(".card__title").textContent = name;

  const cardImage = cardElement.querySelector(".card__image");
  cardImage.src = link;
  cardImage.alt = `${name} - Image of ${name}`;  // Provides descriptive alt text for accessibility

  const likeButton = cardElement.querySelector(".card__like-button");
  likeButton.addEventListener("click", () => {
    likeButton.classList.toggle("card__like-button_active");
  });

  const deleteButton = cardElement.querySelector(".card__delete-button");
  deleteButton.addEventListener("click", () => cardElement.remove());

  cardImage.addEventListener("click", () => {
    elements.imageModal.querySelector(".modal__image").src = link;
    elements.imageModal.querySelector(".modal__image").alt = `${name} - Full-size preview of ${name}`;
    elements.imageModal.querySelector(".modal__caption").textContent = name;
    togglePopup(elements.imageModal, true);
  });

  return cardElement;
}



function renderCards(cards) {
  cards.forEach(card => elements.cardList.append(createCardElement(card)));
}

function addNewCard(event) {
  event.preventDefault();
  const newCard = {
    name: elements.cardNameInput.value,
    link: elements.cardLinkInput.value,
  };

  elements.cardList.prepend(createCardElement(newCard));
  elements.addCardModal.querySelector("form").reset();
  togglePopup(elements.addCardModal, false);
}

function updateProfileInfo(event) {
  event.preventDefault();
  elements.profileName.textContent = elements.profileNameInput.value;
  elements.profileDescription.textContent = elements.profileDescriptionInput.value;
  togglePopup(elements.profileEditModal, false);
}

// Event listeners for modals and forms
elements.profileEditButton.addEventListener("click", () => {
  togglePopup(elements.profileEditModal, true);
  elements.profileNameInput.value = elements.profileName.textContent;
  elements.profileDescriptionInput.value = elements.profileDescription.textContent;
});
elements.closeEditModalButton.addEventListener("click", () => togglePopup(elements.profileEditModal, false));
elements.addCardButton.addEventListener("click", () => togglePopup(elements.addCardModal, true));
elements.closeAddCardModalButton.addEventListener("click", () => togglePopup(elements.addCardModal, false));
elements.closeImageModalButton.addEventListener("click", () => togglePopup(elements.imageModal, false));
elements.addCardForm.addEventListener("submit", addNewCard);
elements.profileEditForm.addEventListener("submit", updateProfileInfo);

document.addEventListener("DOMContentLoaded", () => renderCards(initialCards));
