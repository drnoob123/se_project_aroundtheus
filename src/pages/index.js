import '../pages/index.css';
import FormValidator from '../components/FormValidator.js';
import Card from '../components/Card.js';
import PopupWithForm from '../components/PopupWithForm.js';
import PopupWithImage from '../components/PopupWithImage.js';
import UserInfo from '../components/UserInfo.js';
import Section from '../components/Section.js';
import { 
  initialCards, 
  validationConfig, 
  cardListSelector, 
  profileEditButton, 
  addCardButton 
} from '../utils/constants.js';

// User Information
const userInfo = new UserInfo({
  nameSelector: '.profile__title',
  descriptionSelector: '.profile__subtitle',
});

// Image Modal Popup
const imagePopup = new PopupWithImage('.modal_type_preview');
imagePopup.setEventListeners();

// Function to create a new card
function createCard(data) {
  const card = new Card(data, '#card-template', () => {
    imagePopup.open(data.link, data.name);
  });
  return card.generateCard();
}

// Card Section
const cardSection = new Section(
  {
    items: initialCards,
    renderer: (cardData) => {
      const cardElement = createCard(cardData);
      cardSection.addItem(cardElement);
    },
  },
  cardListSelector
);
cardSection.renderItems();

// Add Card Popup
const addCardPopup = new PopupWithForm('.modal_type_add', (formData) => {
  const cardElement = createCard(formData);
  cardSection.addItem(cardElement);
  addCardPopup.close();
});
addCardPopup.setEventListeners();

// Profile Edit Popup
const profileEditPopup = new PopupWithForm('.modal_type_edit', (formData) => {
  userInfo.setUserInfo(formData);
  profileEditPopup.close();
});
profileEditPopup.setEventListeners();

// Form Validation
const formValidators = {};
const enableValidation = (config) => {
  const formElements = Array.from(document.querySelectorAll(config.formSelector));
  formElements.forEach((formElement) => {
    const validator = new FormValidator(config, formElement);
    formValidators[formElement.name] = validator;
    validator.enableValidation();
  });
};
enableValidation(validationConfig);

// Event Listeners for Buttons
profileEditButton.addEventListener('click', () => {
  profileEditPopup.setInputValues(userInfo.getUserInfo());
  formValidators['edit-profile'].resetValidation();
  profileEditPopup.open();
});

addCardButton.addEventListener('click', () => {
  formValidators['add-card'].resetValidation();
  addCardPopup.open();
});
