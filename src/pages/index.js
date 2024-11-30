import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import Section from "../components/Section.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import UserInfo from "../components/UserInfo.js";
import "../pages/index.css";
import {
  initialCards,
  profileEditButton,
  profileAddButton,
  modalTitleInput,
  modalDescriptionInput,
  profileEditForm,
  addCardForm,
  formValidationConfig,
} from "../utils/constants.js";

// =============================================================================
// User Info
// =============================================================================

const userInfo = new UserInfo({
  nameSelector: ".profile__title",
  professionSelector: ".profile__description",
  avatarSelector: ".profile__image",
});

// =============================================================================
// Card Section
// =============================================================================

const cardList = new Section(
  {
    items: initialCards,
    renderer: ({ name, link }) => {
      const newCard = createCard({ name, link });
      cardList.addItem(newCard);
    },
  },
  ".cards__list"
);

cardList.renderItems();

// =============================================================================
// Handle Clicks
// =============================================================================

function handleCardClick(data) {
  previewImagePopup.open(data);
}

function handleDeleteClick(cardInstance) {
  cardInstance.removeCard();
}

function handleLikeClick(cardInstance) {
  cardInstance.toggleLike();
}

function createCard({ name, link }) {
  const cardElement = new Card(
    { name, link },
    null, // no user ID required in this context
    "#card-template",
    handleCardClick,
    handleDeleteClick,
    handleLikeClick
  );
  return cardElement.getView();
}

// =============================================================================
// Preview Popup
// =============================================================================

const previewImagePopup = new PopupWithImage({
  popupSelector: "#preview-modal",
});
previewImagePopup.setEventListeners();

// =============================================================================
// Profile Popup
// =============================================================================

function handleProfileEditSubmit({ name, about }) {
  userInfo.setUserInfo(name, about);
  profilePopup.close();
}

const profilePopup = new PopupWithForm({
  popupSelector: "#profile-edit-modal",
  handleFormSubmit: (inputValues) => {
    userInfo.setUserInfo(inputValues);
    profilePopup.close();
  }
});

profilePopup.setEventListener();

profileEditButton.addEventListener("click", () => {
  const userData = userInfo.getUserInfo();
  modalTitleInput.value = userData.name;
  modalDescriptionInput.value = userData.about;
  editFormValidator.resetValidation(); // Clear validation errors before opening
  profilePopup.open();
});

// =============================================================================
// Validation
// =============================================================================

const addFormValidator = new FormValidator(formValidationConfig, addCardForm);
addFormValidator.enableValidation();

const editFormValidator = new FormValidator(
  formValidationConfig,
  profileEditForm
);
editFormValidator.enableValidation();

// =============================================================================
// Add Card Popup
// =============================================================================

const addCardPopup = new PopupWithForm({
  popupSelector: "#add-card-modal",
  handleFormSubmit: (inputValues) => {
    const newCard = createCard(inputValues);
    cardList.prependItem(newCard);
    addCardPopup.close();
  },
  loadingButtonText: "Saving...",
});

addCardPopup.setEventListener();

profileAddButton.addEventListener("click", () => {
  addFormValidator.resetValidation(); // Clear validation errors before opening
  addCardPopup.open();
});
