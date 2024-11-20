export default class UserInfo {
    constructor({ nameSelector, jobSelector }) {
      this._nameElement = document.querySelector(nameSelector); // Profile name element
      this._jobElement = document.querySelector(jobSelector); // Profile job element
    }
  
    // Public method to get the current user info from the page
    getUserInfo() {
      return {
        name: this._nameElement.textContent, // Get the profile's name
        job: this._jobElement.textContent, // Get the profile's job
      };
    }
  
    // Public method to set new user info on the page
    setUserInfo({ name, job }) {
      this._nameElement.textContent = name; // Set the new profile name
      this._jobElement.textContent = job;   // Set the new profile job
    }
  }
  