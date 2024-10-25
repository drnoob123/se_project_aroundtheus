const initialCards = [
  { name: "Yosemite Valley", link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/yosemite.jpg" },
  { name: "Lake Louise", link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/lake-louise.jpg" },
  { name: "Bald Mountains", link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/bald-mountains.jpg" },
  { name: "Latemar", link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/latemar.jpg" },
  { name: "Vanoise National Park", link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/vanoise.jpg" },
  { name: "Lago di Braies", link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/lago.jpg" }
];

const profileEditButton = document.querySelector("#profile-edit-button");
const profileEditModal = document.querySelector("#profile-edit-modal");
const closeEditModalButton = document.querySelector("#profile-modal-close-button");
const profileTitle = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");
const modalFormInputTitle = document.querySelector("#form-input-title");
const modalFormInputDescription = document.querySelector("#form-input-description");
const profileEditForm = profileEditModal.querySelector(".modal__form");
const addCardButton = document.querySelector(".profile__add-button");
const addCardModal = document.querySelector("#add-card-modal");
const closeAddCardModalButton = addCardModal.querySelector("#add-modal-close-button");
const cardList = document.querySelector(".cards__list");
const cardTemplate = document.querySelector("#card-template").content.firstElementChild;
const addCardForm = addCardModal.querySelector("#add-card-form");

function openPopup(modal) {
  modal.classList.add("modal_opened");
}

function closePopup(modal) {
  modal.classList.remove("modal_opened");
}

function getCardElement(cardData) {
  const cardElement = cardTemplate.cloneNode(true);
  const cardTitle = cardElement.querySelector(".card__title");
  const cardImage = cardElement.querySelector(".card__image");
  cardTitle.textContent = cardData.name;
  cardImage.src = cardData.link;
  cardImage.alt = cardData.name;
  const likeButton = cardElement.querySelector(".card__like-button");
  likeButton.addEventListener("click", () => {
    likeButton.classList.toggle("card__like-button_active");
    console.log("clik");
  });
  const deleteButton = cardElement.querySelector(".card__delete-button");
  deleteButton.addEventListener("click", () => {
    cardElement.remove();
  });
  const imageModal = document.querySelector(".modal__preview");
  const modalImage = imageModal.querySelector(".modal__image-preview");
  const modalTitle = document.querySelector(".modal__image-title");
  cardImage.addEventListener("click", () => {
    modalImage.src = cardData.link;
    modalImage.alt = cardData.name;
    modalTitle.textContent = cardData.name;
    openPopup(imageModal);
  });
  return cardElement;
}

const closeImageModalButton = document.querySelector("#image-modal-close-button");
closeImageModalButton.addEventListener("click", () => closePopup(document.querySelector(".modal__preview")));

function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  profileTitle.textContent = modalFormInputTitle.value;
  profileDescription.textContent = modalFormInputDescription.value;
  closePopup(profileEditModal);
}

function handleAddCardFormSubmit(evt) {
  evt.preventDefault();
  const cardName = addCardForm.querySelector("#card-name-input").value;
  const cardLink = addCardForm.querySelector("#card-link-input").value;
  const newCard = getCardElement({ name: cardName, link: cardLink });
  cardList.prepend(newCard);
  closePopup(addCardModal);
  addCardForm.reset();
}

profileEditButton.addEventListener("click", () => openPopup(profileEditModal));
modalFormInputTitle.value = profileTitle.textContent;
modalFormInputDescription.value = profileDescription.textContent;
closeEditModalButton.addEventListener("click", () => closePopup(profileEditModal));
profileEditForm.addEventListener("submit", handleProfileFormSubmit);
addCardButton.addEventListener("click", () => openPopup(addCardModal));
closeAddCardModalButton.addEventListener("click", () => closePopup(addCardModal));
addCardForm.addEventListener("submit", handleAddCardFormSubmit);

initialCards.forEach((cardData) => {
  const cardElement = getCardElement(cardData);
  cardList.prepend(cardElement);
});
