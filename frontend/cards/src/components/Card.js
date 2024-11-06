import React from 'react';
import * as cardsContext from "../contexts/CardsContext";
import api from "../utils/api.js";

function Card({ card, onCardClick, onCardLike, onCardDelete }) {
  // Запрос к API за информацией о пользователе и массиве карточек выполняется единожды, при монтировании.
  React.useEffect(() => {
    api
        .getCardList()
        .then((cardData) => {
          cardsContext.setCards(cardData);
        })
        .catch((err) => console.log(err));
  }, []);

  function handleCardClick(card) {
    cardsContext.setSelectedCard(card);
    onCardLike()
  }

  function handleCardLike(card) {
    const isLiked = card.likes.some((i) => i._id === currentUser._id);
    api
        .changeLikeCardStatus(card._id, !isLiked)
        .then((newCard) => {
          cardsContext.setCards((cards) =>
              cards.map((c) => (c._id === card._id ? newCard : c))
          );
          onCardClick(card)
        })
        .catch((err) => console.log(err));
  }

  function handleCardDelete(card) {
    api
        .removeCard(card._id)
        .then(() => {
          cardsContext.setCards((cards) => cards.filter((c) => c._id !== card._id));
          onCardDelete(card)
        })
        .catch((err) => console.log(err));
  }

  const cardStyle = { backgroundImage: `url(${card.link})` };

  function handleClick() {
    onCardClick(card);
  }

  function handleLikeClick() {
    handleCardLike(card);
  }

  function handleDeleteClick() {
    handleCardDelete(card);
  }

  const currentUser = React.useContext(CurrentUserContext);

  const isLiked = card.likes.some(i => i._id === currentUser._id);
  const cardLikeButtonClassName = `card__like-button ${isLiked && 'card__like-button_is-active'}`;

  const isOwn = card.owner._id === currentUser._id;
  const cardDeleteButtonClassName = (
    `card__delete-button ${isOwn ? 'card__delete-button_visible' : 'card__delete-button_hidden'}`
  );

  return (
    <li className="places__item card">
      <div className="card__image" style={cardStyle} onClick={handleCardClick}>
      </div>
      <button type="button" className={cardDeleteButtonClassName} onClick={handleDeleteClick}></button>
      <div className="card__description">
        <h2 className="card__title">
          {card.name}
        </h2>
        <div className="card__likes">
          <button type="button" className={cardLikeButtonClassName} onClick={handleLikeClick}></button>
          <p className="card__like-count">{card.likes.length}</p>
        </div>
      </div>
    </li>
  );
}

export default Card;
