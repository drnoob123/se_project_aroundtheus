// Initial card data
export const initialCards = [
  { name: "Yosemite Valley", link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/yosemite.jpg" },
  { name: "Lake Louise", link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/lake-louise.jpg" },
  { name: "Bald Mountains", link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/bald-mountains.jpg" },
  { name: "Latemar", link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/latemar.jpg" },
  { name: "Vanoise National Park", link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/vanoise.jpg" },
  { name: "Lago di Braies", link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/lago.jpg" },
];

// Validation configuration for forms
export const validationConfig = {
  formSelector: '.form',
  inputSelector: '.form__input',
  submitButtonSelector: '.form__submit',
  inactiveButtonClass: 'form__submit_disabled',
  inputErrorClass: 'form__input_type_error',
  errorClass: 'form__error_visible',
};

// Selector for the card list container
export const cardListSelector = '.cards__list';

// Profile edit button reference
export const profileEditButton = document.querySelector('#profile-edit-button');

// Add card button reference
export const addCardButton = document.querySelector('#add-card-button');

// Input fields for profile edit form
export const profileTitleInput = document.querySelector('#profile-title-input'); // Input for profile title
export const profileDescriptionInput = document.querySelector('#profile-description-input'); // Input for profile description

// Modal containers
export const editModalSelector = '.modal_type_edit';
export const addCardModalSelector = '.modal_type_add';
export const previewModalSelector = '.modal_type_preview';
