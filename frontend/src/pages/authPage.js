import React from 'react';
import AuthService from '../services/AuthService';

function AuthPage() {
  const [username, setUsername] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [isFormValid, setIsFormValid] = React.useState(true);

  const onUsernameChange = event => {
    console.log(event.target.value);
    setUsername(event.target.value);
  };

  const onPasswordChange = event => setPassword(event.target.value);

  const onSubmitForm = event => {
    event.preventDefault();
    console.log('form submit -> ', username, password);
    if (!username || !password) {
      setIsFormValid(false);
      return;
    }
    setIsFormValid(true);
    let body = { username: username, password: password };

    // api call
    AuthService.login(body)
      .then(response => {
        if (response && response.status === 200) {
          console.log('API response ->', response);
          // TODO: send user to some page
        }
      })
      .catch(error => {
        console.log('API error ->', error);
      });
  };

  return (
    <div className="auth-wrapper">
      <h1>Auth login wrapper</h1>
      <form onSubmit={event => onSubmitForm(event)}>
        <label htmlFor="username">User name</label>
        <input
          id="username"
          type="text"
          onChange={event => {
            onUsernameChange(event);
          }}
        />
        <label htmlFor="password">Password</label>
        <input
          id="password"
          type="password"
          onChange={event => onPasswordChange(event)}
        />
        {!isFormValid ? <p>All fields are required.</p> : null}
        <input type="submit" value="send data" />
      </form>
    </div>
  );
}
export default AuthPage;