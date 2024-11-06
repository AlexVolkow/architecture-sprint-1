import React from 'react';
import { Route, Redirect } from "react-router-dom";
import * as authContext from "../contexts/AuthContext";
import * as auth from "../utils/auth.js";

const ProtectedRoute = (singIn= "./signin", { component: Component, ...props  }) => {
  const currAuthState = authContext.currentState

  React.useEffect(() => {
    const token = localStorage.getItem("jwt");
    if (token) {
      auth
          .checkToken(token)
          .then((res) => {
            authContext.setState({
              isLoggedIn: true,
              email: res.data.email
            })
            history.push("/");
          })
          .catch((err) => {
            localStorage.removeItem("jwt");
            console.log(err);
          });
    }
  }, [history]);

  return (
    <Route exact>
      {
        () => currAuthState.isLoggedIn ? <Component {...props} /> : <Redirect to=singIn />
      }
    </Route>
)}

export default ProtectedRoute;