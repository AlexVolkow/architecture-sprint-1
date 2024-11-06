import React from 'react';

// Объект контекста CurrentUserContext экспортируется из отдельного файла директории contexts
export const CurrentUserContext = React.createContext();

export const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] =
    React.useState(false);


export const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] =
    React.useState(false);

// В корневом компоненте App создана стейт-переменная currentUser. Она используется в качестве значения для провайдера контекста.
export const [currentUser, setCurrentUser] = React.useState({});
