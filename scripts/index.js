document.addEventListener("DOMContentLoaded", () => {
  // Data for initial cards
  const initialCards = [
    { name: "Yosemite Valley", link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/yosemite.jpg" },
    { name: "Lake Louise", link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/lake-louise.jpg" },
    { name: "Bald Mountains", link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/bald-mountains.jpg" },
    { name: "Latemar", link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/latemar.jpg" },
    { name: "Vanoise National Park", link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/vanoise.jpg" },
    { name: "Lago di Braies", link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/lago.jpg" }
  ];

  // DOM Elements
  const cardsList = document.getElementById("cardsList");
  const cardTemplate = document.getElementById("card-template");

  // Universal openPopup function
  function openPopup(popup) {
    popup.classList.add("modal_open");
  }

  // Universal closePopup function
  function closePopup(popup) {
    popup.classList.remove("modal_open");
  }

  // Profile Edit Modal Variables
  const profileEditModal = document.getElementById("edit-modal");
  const profileEditButton = document.querySelector(".profile__edit-button");
  const profileEditCloseButton = profileEditModal.querySelector(".modal__close-button");
  const profileForm = document.querySelector(".modal__form");
  const profileNameInput = document.querySelector("#name");
  const profileDescriptionInput = document.querySelector("#description");
  const profileTitle = document.querySelector(".profile__title");
  const profileDescription = document.querySelector(".profile__description");

  // Add Card Modal Variables
  const cardAddModal = document.getElementById("add-modal");
  const cardAddButton = document.querySelector(".profile__add-button");
  const cardAddCloseButton = cardAddModal.querySelector(".modal__close-button");
  const cardForm = document.getElementById("add-card-form");
  const cardTitleInput = cardForm.querySelector(".modal__input_type_title");
  const cardUrlInput = cardForm.querySelector(".modal__input_type_url");

  // Image Preview Modal Variables
  const imagePreviewModal = document.getElementById("image-modal");
  const imagePreviewImage = document.getElementById("modal-image");
  const imagePreviewCloseButton = document.getElementById("image-modal-close");

  // Open Profile Edit Modal
  const openProfileEditModal = () => {
    profileNameInput.value = profileTitle.textContent.trim();
    profileDescriptionInput.value = profileDescription.textContent.trim();
    openPopup(profileEditModal);
  };

  // Close Profile Edit Modal
  const closeProfileEditModal = () => closePopup(profileEditModal);

  // Open Card Add Modal
  const openCardAddModal = () => openPopup(cardAddModal);

  // Close Card Add Modal
  const closeCardAddModal = () => closePopup(cardAddModal);

  // Open Image Preview Modal
  const openImagePreviewModal = (imageSrc, imageAlt) => {
    imagePreviewImage.src = imageSrc;
    imagePreviewImage.alt = imageAlt;
    openPopup(imagePreviewModal);
  };

  // Close Image Preview Modal
  const closeImagePreviewModal = () => closePopup(imagePreviewModal);

  // Generate card element
  const getCardElement = (data) => {
    const cardClone = document.importNode(cardTemplate.content, true);
    const cardImage = cardClone.querySelector(".card__image");
    const cardTitle = cardClone.querySelector(".card__info");
    const deleteButton = cardClone.querySelector(".card__delete-button");
    const likeButton = cardClone.querySelector(".card__like-button");

    cardImage.src = data.link;
    cardImage.alt = data.name;
    cardTitle.textContent = data.name;

    cardImage.addEventListener("click", () => openImagePreviewModal(data.link, data.name));
    deleteButton.addEventListener("click", () => deleteButton.closest(".card").remove());

    // Toggle like button
    likeButton.addEventListener("click", () => {
      likeButton.classList.toggle("liked");
      likeButton.src = likeButton.classList.contains("liked")
        ? "../images/card-images/like-button-after.svg"
        : "../images/Vector.svg";
    });

    return cardClone;
  };

  // Render initial cards
  initialCards.forEach((cardData) => {
    const cardElement = getCardElement(cardData);
    cardsList.prepend(cardElement);
  });

  // Event Listeners for Profile Edit Modal
  profileEditButton.addEventListener("click", openProfileEditModal);
  profileEditCloseButton.addEventListener("click", closeProfileEditModal);
  profileForm.addEventListener("submit", (event) => {
    event.preventDefault();
    profileTitle.textContent = profileNameInput.value;
    profileDescription.textContent = profileDescriptionInput.value;
    closeProfileEditModal();
  });

  // Event Listeners for Card Add Modal
  cardAddButton.addEventListener("click", openCardAddModal);
  cardAddCloseButton.addEventListener("click", closeCardAddModal);
  cardForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const title = cardTitleInput.value.trim();
    const url = cardUrlInput.value.trim();

    if (title && url) {
      const newCard = { name: title, link: url };
      const cardElement = getCardElement(newCard);
      cardsList.prepend(cardElement);
      cardTitleInput.value = "";
      cardUrlInput.value = "";
      closeCardAddModal();
    } else {
      alert("Please fill out both the title and URL fields.");
    }
  });

  // Event Listeners for Image Preview Modal
  imagePreviewCloseButton.addEventListener("click", closeImagePreviewModal);
  imagePreviewModal.addEventListener("click", (event) => {
    if (event.target === imagePreviewModal) {
      closeImagePreviewModal();
    }
  });
});
