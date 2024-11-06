import React from 'react';

const initialState = {
    isInfoToolTipOpen: false,
    status: ""
};

export const [currentState, setState] = React.useState(initialState);

export function showError() {
    setState({
        isInfoToolTipOpen: true,
        status: "fail"
    })
}

export function showSuccess() {
    setState({
        isInfoToolTipOpen: true,
        status: "success"
    })
}