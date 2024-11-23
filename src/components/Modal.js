export default class Modal {
    constructor(modalSelector) {
      this._modal = document.querySelector(modalSelector); // Select the modal element
      this._handleEscClose = this._handleEscClose.bind(this); // Bind the method to ensure proper `this` context
    }
  
    // Opens the modal and adds the ESC key event listener
    open() {
      this._modal.classList.add('modal_open'); // Add a class to make the modal visible
      document.addEventListener('keydown', this._handleEscClose); // Listen for ESC key press
    }
  
    // Closes the modal and removes the ESC key event listener
    close() {
      this._modal.classList.remove('modal_open'); // Remove the class to hide the modal
      document.removeEventListener('keydown', this._handleEscClose); // Remove the ESC key event listener
    }
  
    // Private method to handle ESC key press and close the modal
    _handleEscClose(event) {
      if (event.key === 'Escape') {
        this.close();
      }
    }
  
    // Adds event listeners for closing the modal
    setEventListeners() {
      // Close when clicking on the close icon
      this._modal.querySelector('.modal__close-button').addEventListener('click', () => {
        this.close();
      });
  
      // Close when clicking on the shaded area (modal overlay)
      this._modal.addEventListener('mousedown', (event) => {
        if (event.target === this._modal) {
          this.close();
        }
      });
    }
  }
  