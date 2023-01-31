import React, { useCallback, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';

function Login() {
  const history = useHistory();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [disableLoginButton, setDisableLoginButton] = useState(true);

  const emailCheck = useCallback(() => { // https://www.w3schools.com/react/react_usecallback.asp
    const validEmailRegex = /\S+@\S+\.\S+/;
    return (validEmailRegex.test(email)); // https://stackoverflow.com/questions/46155/how-can-i-validate-an-email-address-in-javascript
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
    <div>
      <fieldset>
        <legend>Login</legend>
        <input
          type="email"
          data-testid="email-input"
          placeholder="E-mail"
          name="email"
          onChange={ handleInputChanges }
        />
        <input
          type="password"
          data-testid="password-input"
          placeholder="Password"
          name="password"
          onChange={ handleInputChanges }
        />
        <button
          type="button"
          data-testid="login-submit-btn"
          disabled={ disableLoginButton }
          onClick={ handleClickLoginButton }
        >
          Enter
        </button>
      </fieldset>
    </div>
  );
}

export default Login;
