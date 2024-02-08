document.addEventListener("DOMContentLoaded", function () {
  const initialCards = [
      {
          name: "Yosemite Valley",
          link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/yosemite.jpg"
      },
      {
          name: "Lake Louise",
          link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/lake-louise.jpg"
      },
      {
          name: "Bald Mountains",
          link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/bald-mountains.jpg"
      },
      {
          name: "Latemar",
          link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/latemar.jpg"
      },
      {
          name: "Vanoise National Park",
          link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/vanoise.jpg"
      },
      {
          name: "Lago di Braies",
          link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/lago.jpg"
      }
  ];

  const cardsList = document.getElementById('cardsList');
  const cardTemplate = document.getElementById('card-template');

  function getCardElement(data) {
      const cardClone = document.importNode(cardTemplate.content, true);
      const cardImage = cardClone.querySelector('.card__image');
      const cardTitle = cardClone.querySelector('.card__info');

      cardImage.src = data.link;
      cardImage.alt = data.name;
      cardTitle.textContent = data.name;

      return cardClone;
  }

  initialCards.forEach(cardData => {
      const cardElement = getCardElement(cardData);
      cardsList.appendChild(cardElement);
  });

  const editButton = document.querySelector(".profile__edit-button");
  const modal = document.querySelector(".modal");
  const closeButton = document.querySelector(".modal__close-button");
  const nameField = document.querySelector("#name");
  const descriptionField = document.querySelector("#description");
  const profileTitle = document.querySelector(".profile__title");
  const profileDescription = document.querySelector(".profile__description");
  const form = document.querySelector('.modal__form');

  // Open modal on "Edit" button click
  editButton.addEventListener("click", function () {
      modal.classList.add("modal_open");

      // Populate fields with current values
      nameField.value = profileTitle.textContent.trim();
      descriptionField.value = profileDescription.textContent.trim();
  });

  // Close modal on close button click
  closeButton.addEventListener("click", function () {
      modal.classList.remove("modal_open");
  });

  // Close modal when clicking outside of it
  modal.addEventListener("click", function (event) {
      if (event.target === modal) {
          modal.classList.remove("modal_open");
      }
  });

  // Submission handler
  form.addEventListener('submit', function (event) {
      event.preventDefault();

      // Update profile info with new values
      profileTitle.textContent = nameField.value;
      profileDescription.textContent = descriptionField.value;

      // Close modal
      modal.classList.remove('modal_open');
  });
});
