import React from 'react';
import PopupWithForm from './PopupWithForm';
import api from "../utils/api";
import * as cardsContext from "../contexts/CardsContext";

function AddPlacePopup({ isOpen, onAddPlace, onClose }) {
  const [name, setName] = React.useState('');
  const [link, setLink] = React.useState('');

  function handleAddPlaceSubmit(newCard) {
    api
        .addCard(newCard)
        .then((newCardFull) => {
          cardsContext. setCards([newCardFull, ...cards]);

        })
        .catch((err) => console.log(err));
  }

  function handleNameChange(e) {
    setName(e.target.value);
  }

  function handleLinkChange(e) {
    setLink(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();

    onAddPlace({
      name,
      link
    });
  }

  return (
    <PopupWithForm
      isOpen={isOpen} onSubmit={handleSubmit} onClose={onClose} title="Новое место" name="new-card"
    >
      <label className="popup__label">
        <input type="text" name="name" id="place-name"
               className="popup__input popup__input_type_card-name" placeholder="Название"
               required minLength="1" maxLength="30" value={name} onChange={handleNameChange} />
        <span className="popup__error" id="place-name-error"></span>
      </label>
      <label className="popup__label">
        <input type="url" name="link" id="place-link"
               className="popup__input popup__input_type_url" placeholder="Ссылка на картинку"
               required value={link} onChange={handleLinkChange} />
        <span className="popup__error" id="place-link-error"></span>
      </label>
    </PopupWithForm>
  );
}

export default AddPlacePopup;
