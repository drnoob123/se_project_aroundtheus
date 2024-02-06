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

  document.addEventListener("DOMContentLoaded", function () {
    const editButton = document.querySelector(".profile__edit-button");
    const modal = document.querySelector(".modal");
    const closeButton = document.querySelector(".modal__close-button");

    // Open modal on "Edit" button click
    editButton.addEventListener("click", function () {
      modal.classList.add("modal_open");
    });

    // Close modal on close button click
    closeButton.addEventListener("click", function () {
      modal.classList.remove("modal_open");
    });
  });

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
  
    // Cards data
    const cardsData = [
      { title: "Yosemite Valley", imagePath: "./images/yosemite-valley.png" },
      { title: "Lake Louise", imagePath: "./images/lake-louise.png" },
      { title: "Bald Mountains", imagePath: "./images/bald-mountains.png" },
      { title: "Latemar", imagePath: "./images/latemar.png" },
      { title: "Vanoise National Park", imagePath: "./images/vanoise-national-park.png" },
      { title: "Lago di Braies", imagePath: "./images/lago-di-braies.png" }
    ];
  
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
  
    // Iterate over the array and add card elements to the page
    const cardsContainer = document.querySelector('.cards__list');
    cardsData.forEach(cardData => {
      const cardElement = getCardElement(cardData);
      cardsContainer.appendChild(cardElement);
    });
  });
  

  

  