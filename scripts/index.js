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
  const imageModal = document.getElementById("image-modal");
  const modalImage = document.getElementById("modal-image");
  const imageModalClose = document.getElementById("image-modal-close");
  const editButton = document.querySelector(".profile__edit-button");
  const editModal = document.getElementById("edit-modal");
  const editCloseButton = editModal.querySelector(".modal__close-button");
  const nameField = document.querySelector("#name");
  const descriptionField = document.querySelector("#description");
  const profileTitle = document.querySelector(".profile__title");
  const profileDescription = document.querySelector(".profile__description");
  const form = document.querySelector(".modal__form");
  const addButton = document.querySelector(".profile__add-button");
  const addModal = document.getElementById("add-modal");
  const addCloseButton = addModal.querySelector(".modal__close-button");
  const addCardForm = document.getElementById("add-card-form");
  const titleInput = addCardForm.querySelector(".modal__input_type_title");
  const urlInput = addCardForm.querySelector(".modal__input_type_url");

  // Open image modal
  const openImageModal = (imageSrc, imageAlt) => {
    modalImage.src = imageSrc;
    modalImage.alt = imageAlt;
    imageModal.classList.add("modal_open");
  };

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

    cardImage.addEventListener("click", () => openImageModal(data.link, data.name));
    deleteButton.addEventListener("click", () => deleteButton.closest(".card").remove());

    // Update like button to toggle image source
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

  // Event Listeners
  imageModalClose.addEventListener("click", () => imageModal.classList.remove("modal_open"));
  imageModal.addEventListener("click", (event) => {
    if (event.target === imageModal) {
      imageModal.classList.remove("modal_open");
    }
  });

  editButton.addEventListener("click", () => {
    editModal.classList.add("modal_open");
    nameField.value = profileTitle.textContent.trim();
    descriptionField.value = profileDescription.textContent.trim();
  });

  editCloseButton.addEventListener("click", () => editModal.classList.remove("modal_open"));
  editModal.addEventListener("click", (event) => {
    if (event.target === editModal) {
      editModal.classList.remove("modal_open");
    }
  });

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    profileTitle.textContent = nameField.value;
    profileDescription.textContent = descriptionField.value;
    editModal.classList.remove("modal_open");
  });

  addButton.addEventListener("click", () => addModal.classList.add("modal_open"));
  addCloseButton.addEventListener("click", () => addModal.classList.remove("modal_open"));
  addModal.addEventListener("click", (event) => {
    if (event.target === addModal) {
      addModal.classList.remove("modal_open");
    }
  });

  addCardForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const title = titleInput.value.trim();
    const url = urlInput.value.trim();

    if (title && url) {
      const newCard = { name: title, link: url };
      const cardElement = getCardElement(newCard);
      cardsList.prepend(cardElement);
      titleInput.value = "";
      urlInput.value = "";
      addModal.classList.remove("modal_open");
    } else {
      alert("Please fill out both the title and URL fields.");
    }
  });
});
