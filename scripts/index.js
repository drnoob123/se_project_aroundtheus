document.addEventListener("DOMContentLoaded", function () {
  const initialCards = [
    {
      name: "Yosemite Valley",
      link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/yosemite.jpg",
    },
    {
      name: "Lake Louise",
      link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/lake-louise.jpg",
    },
    {
      name: "Bald Mountains",
      link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/bald-mountains.jpg",
    },
    {
      name: "Latemar",
      link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/latemar.jpg",
    },
    {
      name: "Vanoise National Park",
      link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/vanoise.jpg",
    },
    {
      name: "Lago di Braies",
      link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/lago.jpg",
    },
  ];

  const cardsList = document.getElementById("cardsList");
  const cardTemplate = document.getElementById("card-template");

  // Image modal logic
  const imageModal = document.getElementById("image-modal");
  const modalImage = document.getElementById("modal-image");
  const imageModalClose = document.getElementById("image-modal-close");

  // Function to open the image modal
  function openImageModal(imageSrc, imageAlt) {
    modalImage.src = imageSrc;
    modalImage.alt = imageAlt;
    imageModal.classList.add("modal_open");
  }

  // Close image modal when clicking on the close button
  imageModalClose.addEventListener("click", function () {
    imageModal.classList.remove("modal_open");
  });

  // Close modal when clicking outside of the image
  imageModal.addEventListener("click", function (event) {
    if (event.target === imageModal) {
      imageModal.classList.remove("modal_open");
    }
  });

  // Function to generate card element from data
  function getCardElement(data) {
    const cardClone = document.importNode(cardTemplate.content, true);
    const cardImage = cardClone.querySelector(".card__image");
    const cardTitle = cardClone.querySelector(".card__info");
    const deleteButton = cardClone.querySelector(".card__delete-button");
    const likeButton = cardClone.querySelector(".card__like-button");

    cardImage.src = data.link;
    cardImage.alt = data.name;
    cardTitle.textContent = data.name;

    // Add event listener to open image modal on image click
    cardImage.addEventListener("click", function () {
      openImageModal(data.link, data.name);
    });

    // Add event listener for the delete button
    deleteButton.addEventListener("click", function () {
      deleteButton.closest(".card").remove();
    });

    // Add event listener for the like button
    likeButton.addEventListener("click", function () {
      likeButton.classList.toggle("liked");
    });

    return cardClone;
  }

  // Render initial cards
  initialCards.forEach((cardData) => {
    const cardElement = getCardElement(cardData);
    cardsList.prepend(cardElement);
  });

  const editButton = document.querySelector(".profile__edit-button");
  const editModal = document.getElementById("edit-modal");
  const editCloseButton = editModal.querySelector(".modal__close-button");
  const nameField = document.querySelector("#name");
  const descriptionField = document.querySelector("#description");
  const profileTitle = document.querySelector(".profile__title");
  const profileDescription = document.querySelector(".profile__description");
  const form = document.querySelector(".modal__form");

  // Open modal on "Edit" button click
  editButton.addEventListener("click", function () {
    editModal.classList.add("modal_open");

    // Populate fields with current values
    nameField.value = profileTitle.textContent.trim();
    descriptionField.value = profileDescription.textContent.trim();
  });

  // Close modal on close button click
  editCloseButton.addEventListener("click", function () {
    editModal.classList.remove("modal_open");
  });

  // Close modal when clicking outside of it
  editModal.addEventListener("click", function (event) {
    if (event.target === editModal) {
      editModal.classList.remove("modal_open");
    }
  });

  // Submission handler for profile editing form
  form.addEventListener("submit", function (event) {
    event.preventDefault();

    // Update profile info with new values
    profileTitle.textContent = nameField.value;
    profileDescription.textContent = descriptionField.value;

    // Close modal
    editModal.classList.remove("modal_open");
  });

  // Handle the Add button click to open the "add-modal"
  const addButton = document.querySelector(".profile__add-button");
  const addModal = document.getElementById("add-modal");
  const addCloseButton = addModal.querySelector(".modal__close-button");
  const addCardForm = document.getElementById("add-card-form");
  const titleInput = addCardForm.querySelector(".modal__input_type_title");
  const urlInput = addCardForm.querySelector(".modal__input_type_url");

  // Open add-modal on "Add" button click
  addButton.addEventListener("click", function () {
    addModal.classList.add("modal_open");
  });

  // Close add-modal on close button click
  addCloseButton.addEventListener("click", function () {
    addModal.classList.remove("modal_open");
  });

  // Close add-modal when clicking outside of it
  addModal.addEventListener("click", function (event) {
    if (event.target === addModal) {
      addModal.classList.remove("modal_open");
    }
  });

  // Handle form submission for adding new card
  addCardForm.addEventListener("submit", function (event) {
    event.preventDefault();

    const title = titleInput.value.trim();
    const url = urlInput.value.trim();

    if (title && url) {
      // Create new card object
      const newCard = {
        name: title,
        link: url,
      };

      // Add the new card to the page
      const cardElement = getCardElement(newCard);
      cardsList.prepend(cardElement);

      // Reset form fields
      titleInput.value = "";
      urlInput.value = "";

      // Close add-modal
      addModal.classList.remove("modal_open");
    } else {
      alert("Please fill out both the title and URL fields.");
    }
  });

});
