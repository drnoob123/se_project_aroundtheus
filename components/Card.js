export default class Card {
    constructor(name, link, cardSelector, handleImageClick) {
      this._name = name;
      this._link = link;
      this._cardSelector = cardSelector;
      this._handleImageClick = handleImageClick;
      this._element = this._getTemplate();
      this._setContent();
      this._addEventListeners();
    }  
}
  

  