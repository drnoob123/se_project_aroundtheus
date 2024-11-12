// This array holds the initial card data for our gallery. Each item is an object containing:
// - "name": the name of the place.
// - "link": the URL to the image of that place.

const initialCards = [
  { name: "Yosemite Valley", link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/yosemite.jpg" },
  { name: "Lake Louise", link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/lake-louise.jpg" },
  { name: "Bald Mountains", link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/bald-mountains.jpg" },
  { name: "Latemar", link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/latemar.jpg" },
  { name: "Vanoise National Park", link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/vanoise.jpg" },
  { name: "Lago di Braies", link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/lago.jpg" }
];



// This object collects references to important elements in the HTML, so we can interact with them easily
const elements = {
  cardList: document.querySelector(".cards__list"), // The list where all card elements are displayed
  cardTemplate: document.querySelector("#card-template").content.firstElementChild, // Template used to create each card
  profileEditButton: document.querySelector("#profile-edit-button"), // Button to open the profile edit modal
  profileEditmodal: document.querySelector("#profile-edit-modal"), // Profile edit modal (pop-up)
  closeEditmodalButton: document.querySelector("#profile-modal-close-button"), // Button to close profile edit modal
  addCardButton: document.querySelector(".profile__add-button"), // Button to open the add card modal
  addCardmodal: document.querySelector("#add-card-modal"), // Modal for adding a new card
  closeAddCardmodalButton: document.querySelector("#add-modal-close-button"), // Button to close add card modal
  imagemodal: document.querySelector(".modal_type_preview"), // Modal for previewing an image
  closeImagemodalButton: document.querySelector("#image-modal-close-button"), // Button to close the image preview modal
  addCardForm: document.querySelector("form[name='modal-add-form']"), // Form for adding a new card
  profileName: document.querySelector(".profile__title"), // Profile name display
  profileDescription: document.querySelector(".profile__subtitle"), // Profile description display
  profileEditForm: document.querySelector("form[name='modal-edit-form']"), // Form for editing profile information
  cardNameInput: document.querySelector("#card-name-input"), // Input for card name in add card form
  cardLinkInput: document.querySelector("#card-link-input"), // Input for card link in add card form
  profileNameInput: document.querySelector("#form-input-title"), // Input for profile name in profile edit form
  profileDescriptionInput: document.querySelector("#form-input-description"), // Input for profile description in profile edit form
  modalImage: document.querySelector(".modal_type_preview .modal__image"), // Full-size image display in preview modal
  modalCaption: document.querySelector(".modal_type_preview .modal__caption") // Caption for image in preview modal
};

// Function to open or close a modal.
// - `modal`: The modal element to be opened or closed.
// - `isOpen`: A boolean value where true opens the modal and false closes it.
function toggleModal(modal, isOpen) {
  modal.classList.toggle("modal_opened", isOpen); // Toggle the 'modal_opened' class to show or hide the modal
  if (isOpen) {
    document.addEventListener("keydown", handleEscapeClose); // Listen for "Escape" key press
    modal.addEventListener("mousedown", handleClickOutsideClose); // Listen for clicks outside the modal
  } else {
    document.removeEventListener("keydown", handleEscapeClose); // Stop listening for "Escape" key press
    modal.removeEventListener("mousedown", handleClickOutsideClose); // Stop listening for outside clicks
  }
}

// Function to close the modal when "Escape" key is pressed.
function handleEscapeClose(event) {
  if (event.key === "Escape") { // Check if the pressed key is "Escape"
    const openModal = document.querySelector(".modal_opened"); // Find the currently open modal
    if (openModal) toggleModal(openModal, false); // Close the modal
  }
}

// Function to close the modal when clicking outside of it.
function handleClickOutsideClose(event) {
  if (event.target.classList.contains("modal_opened")) { // Check if click is outside the modal
    toggleModal(event.target, false); // Close the modal
  }
}

// Function to create a card element.
// - `name`: Name of the place for the card
// - `link`: URL to the image for the card
function createCardElement({ name, link }) {
  const cardElement = elements.cardTemplate.cloneNode(true); // Clone the card template
  const cardTitle = cardElement.querySelector(".card__title"); // Get the card title element
  const cardImage = cardElement.querySelector(".card__image"); // Get the card image element
  const likeButton = cardElement.querySelector(".card__like-button"); // Get the like button
  const deleteButton = cardElement.querySelector(".card__delete-button"); // Get the delete button

  cardTitle.textContent = name; // Set the title of the card
  cardImage.src = link; // Set the image source
  cardImage.alt = `${name} - Image of ${name}`; // Set the image alt text for accessibility

  likeButton.addEventListener("click", () => likeButton.classList.toggle("card__like-button_active")); // Toggle like button on click
  deleteButton.addEventListener("click", () => cardElement.remove()); // Remove the card on delete button click
  
  cardImage.addEventListener("click", () => { // Open image preview modal on image click
    elements.modalImage.src = link; // Set image preview source
    elements.modalImage.alt = `${name} - Full-size preview of ${name}`; // Set alt text for preview
    elements.modalCaption.textContent = name; // Set caption in preview
    toggleModal(elements.imagemodal, true); // Open the image preview modal
  });

  return cardElement; // Return the complete card element
}

// Function to render all cards in the initial list.
// - `cards`: Array of card data objects.
function renderCards(cards) {
  const cardElements = cards.map(createCardElement); // Create a card element for each item in `cards`
  elements.cardList.append(...cardElements); // Append all card elements to the card list in the DOM
}

// Function to add a new card to the gallery.
function addNewCard(event) {
  event.preventDefault(); // Prevent page reload on form submission
  const newCard = {
    name: elements.cardNameInput.value, // Get the name from the input field
    link: elements.cardLinkInput.value // Get the link from the input field
  };
  elements.addCardForm.reset(); // Clear the form inputs
  elements.cardList.prepend(createCardElement(newCard)); // Add the new card to the top of the list
  toggleModal(elements.addCardmodal, false); // Close the add card modal
}

// Function to update the profile information with inputted values.
function updateProfileInfo(event) {
  event.preventDefault(); // Prevent page reload on form submission
  elements.profileName.textContent = elements.profileNameInput.value; // Update the profile name
  elements.profileDescription.textContent = elements.profileDescriptionInput.value; // Update the profile description
  toggleModal(elements.profileEditmodal, false); // Close the profile edit modal
}

// Event listeners to handle opening and closing of modals and form submissions.
elements.profileEditButton.addEventListener("click", () => {
  toggleModal(elements.profileEditmodal, true); // Open profile edit modal
  elements.profileNameInput.value = elements.profileName.textContent; // Fill profile name input with current value
  elements.profileDescriptionInput.value = elements.profileDescription.textContent; // Fill profile description input with current value
});
elements.closeEditmodalButton.addEventListener("click", () => toggleModal(elements.profileEditmodal, false)); // Close profile edit modal
elements.addCardButton.addEventListener("click", () => toggleModal(elements.addCardmodal, true)); // Open add card modal
elements.closeAddCardmodalButton.addEventListener("click", () => toggleModal(elements.addCardmodal, false)); // Close add card modal
elements.closeImagemodalButton.addEventListener("click", () => toggleModal(elements.imagemodal, false)); // Close image preview modal
elements.addCardForm.addEventListener("submit", addNewCard); // Handle new card submission
elements.profileEditForm.addEventListener("submit", updateProfileInfo); // Handle profile information update

// Render the initial cards when the document is fully loaded.
document.addEventListener("DOMContentLoaded", () => renderCards(initialCards));

