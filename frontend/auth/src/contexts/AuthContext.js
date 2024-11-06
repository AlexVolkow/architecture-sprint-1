import React from 'react';

const initialState = {
    isLoggedIn: false,
    email: null
};

export const [currentState, setState] = React.useState(initialState);

export function login(email, jwt) {
    setState({
        isLoggedIn: true,
        email: email
    })
    localStorage.setItem('jwt', jwt)
}

export function logout() {
    localStorage.removeItem("jwt");
    setState({
        isLoggedIn: false,
        email: null
    })
}