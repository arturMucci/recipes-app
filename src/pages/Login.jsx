import React, { useCallback, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import recipesAppLogo from '../images/recipesAppLogo.svg';
import tomatoLogo from '../images/tomatoLogo.svg';
import '../styles/Login.css';

function Login() {
  const history = useHistory();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [disableLoginButton, setDisableLoginButton] = useState(true);

  // https://www.w3schools.com/react/react_usecallback.asp How to use 'useCallback'.
  // https://stackoverflow.com/questions/46155/how-can-i-validate-an-email-address-in-javascript How to validate an email address in javascript with regex.

  const emailCheck = useCallback(() => {
    const validEmailRegex = /\S+@\S+\.\S+/;
    return (validEmailRegex.test(email));
  }, [email]);

  const passwordCheck = useCallback(() => {
    const MIN_PASSWORD_SIZE = 6;
    return (password.length > MIN_PASSWORD_SIZE);
  }, [password]);

  const formCheck = useCallback(() => {
    const checkResults = !(emailCheck() && passwordCheck());
    setDisableLoginButton(checkResults);
  }, [emailCheck, passwordCheck]);

  const handleInputChanges = ({ target }) => {
    const { name, value } = target;

    if (name === 'email') {
      setEmail(value);
    } else { // if (name === 'password') {
      setPassword(value);
    }

    formCheck();
  };

  useEffect(() => {
    formCheck();
  }, [email, password, formCheck]);

  const handleClickLoginButton = () => {
    const userEmail = JSON.stringify({ email }); // https://stackabuse.com/storing-to-localstorage-in-react/

    localStorage.setItem('user', userEmail);
    history.push('/meals');
  };

  return (
    <div className="login-container">
      <section className="login-header">
        <img
          className="recipes-app-logo"
          src={ recipesAppLogo }
          alt="logo Recipes App"
        />
        <img
          className="tomato-logo"
          src={ tomatoLogo }
          alt="tomato logo"
        />
      </section>
      <form className="form-login">
        <h1 className="login-title">Login</h1>
        <input
          type="email"
          data-testid="email-input"
          className="email-input"
          placeholder="E-mail"
          name="email"
          onChange={ handleInputChanges }
        />
        <input
          type="password"
          data-testid="password-input"
          className="password-input"
          placeholder="Password"
          name="password"
          onChange={ handleInputChanges }
        />
        <button
          type="button"
          data-testid="login-submit-btn"
          className="login-submit-btn"
          disabled={ disableLoginButton }
          onClick={ handleClickLoginButton }
        >
          Enter
        </button>
      </form>
    </div>
  );
}

export default Login;
