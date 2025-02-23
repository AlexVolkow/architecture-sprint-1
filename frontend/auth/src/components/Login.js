import React from 'react';

import '../styles/login/login.css';
import * as auth from "../utils/auth.js";
import * as authContext from "../contexts/AuthContext";
import * as tooltip from "../../../core/src/contexts/TooltipContext";

function Login({onLogin}) {
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');

    function handleSubmit(e) {
        e.preventDefault();

        auth
            .login(email, password)
            .then((res) => {
                authContext.login(email, res.token)
                onLogin()
            })
            .catch((err) => {
                tooltip.showError()
            });
    }

    return (
        <div className="auth-form">
            <form className="auth-form__form" onSubmit={handleSubmit}>
                <div className="auth-form__wrapper">
                    <h3 className="auth-form__title">Вход</h3>
                    <label className="auth-form__input">
                        <input type="text" name="name" id="email"
                               className="auth-form__textfield" placeholder="Email"
                               onChange={e => setEmail(e.target.value)} required/>
                    </label>
                    <label className="auth-form__input">
                        <input type="password" name="password" id="password"
                               className="auth-form__textfield" placeholder="Пароль"
                               onChange={e => setPassword(e.target.value)} required/>
                    </label>
                </div>
                <button className="auth-form__button" type="submit">Войти</button>
            </form>
        </div>
    )
}

export default Login;
