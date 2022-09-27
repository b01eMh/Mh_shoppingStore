import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import AuthService from '../../services/authService';
import { useDispatch } from 'react-redux';
import { setUser } from '../../redux/userSlice';

function LoginForm() {
  const [userObj, setUserObj] = useState({
    username: '',
    password: '',
  });
  const [isFormValid, setIsFormValid] = useState(true);
  const navigate = useNavigate();
  const dispach = useDispatch();

  const onInputFieldChange = event => {
    let newUserObj = userObj;
    newUserObj[event.target.name] = event.target.value;
    setUserObj(newUserObj);
  };

  const onSubmitForm = event => {
    event.preventDefault();
    console.log('form submit -> ', userObj.username, userObj.password);
    if (!userObj.username || !userObj.password) {
      setIsFormValid(false);
      return;
    }
    setIsFormValid(true);

    // api call
    AuthService.login(userObj)
      .then(response => {
        if (
          response &&
          response.status === 200 &&
          response.data !== 'User not found.'
        ) {
          // console.log('API response ->', response);
          localStorage.setItem('user', JSON.stringify(response.data));
          dispach(setUser(response.data));
          navigate('/');
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
          name="username"
          onChange={event => {
            onInputFieldChange(event);
          }}
        />
        <label htmlFor="password">Password</label>
        <input
          id="password"
          type="password"
          name="password"
          onChange={event => onInputFieldChange(event)}
        />
        {!isFormValid ? <p>All fields are required.</p> : null}
        <input type="submit" value="login" />
        <br />
        <Link to="/register">sign up</Link>
      </form>
    </div>
  );
}

export default LoginForm;
