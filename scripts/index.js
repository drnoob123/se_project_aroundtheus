//Initial cards 
const initialCardsData = [
  {
    title: "Yosemite Valley",
    imagePath: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/yosemite.jpg"
  },
  {
    title: "Lake Louise",
    imagePath: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/lake-louise.jpg"
  },
  {
    title: "Bald Mountains",
    imagePath: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/bald-mountains.jpg"
  },
  {
    title: "Latemar",
    imagePath: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/latemar.jpg"
  },
  {
    title: "Vanoise National Park",
    imagePath: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/vanoise.jpg"
  },
  {
    title: "Lago di Braies",
    imagePath: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/lago.jpg"
  }
];

document.addEventListener("DOMContentLoaded", function () {
  const editButton = document.querySelector(".profile__edit-button");
  const modal = document.querySelector(".modal");
  const closeButton = document.querySelector(".modal__close-button");
  const nameField = document.querySelector("#name");
  const descriptionField = document.querySelector("#description");
  const profileTitle = document.querySelector(".profile__title");
  const profileDescription = document.querySelector(".profile__description");

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

  // Submission handler
  const form = document.querySelector('.modal__form');
  form.addEventListener('submit', function (event) {
      event.preventDefault();

      // Update profile info with new values
      profileTitle.textContent = nameField.value;
      profileDescription.textContent = descriptionField.value;

      // Close modal
      modal.classList.remove('modal_open');
  });
});

// Get the container for cards
const cardsContainer = document.querySelector('.cards__list');

// Get the template element from the DOM
const cardTemplate = document.createElement('template');
cardTemplate.innerHTML = `
  <li class="card">
      <img src="" class="card__image" alt="" />
      <div class="card__description">
          <h2 class="card__info"></h2>
          <button class="card__like-button" type="button"></button>
      </div>
  </li>
`;

// Define getCardElement function
function getCardElement(data) {
  const cardClone = cardTemplate.content.cloneNode(true);
  const cardTitle = cardClone.querySelector('.card__info');
  const cardImage = cardClone.querySelector('.card__image');

  cardTitle.textContent = data.title;
  cardImage.src = data.imagePath;
  cardImage.alt = data.title;

  return cardClone;
}

// Iterate over the initialCardsData and add card elements to the page
initialCardsData.forEach(cardData => {
  const cardElement = getCardElement(cardData);
  cardsContainer.appendChild(cardElement);
});
