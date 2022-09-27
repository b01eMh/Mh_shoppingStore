import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import AuthService from '../../services/authService';

function RegisterForm() {
  const [userObj, setUserObj] = useState({
    username: '',
    password: '',
    email: '',
    firstName: '',
    lastName: '',
    address: '',
    city: '',
  });
  const [isFormValid, setIsFormValid] = useState(true);
  const [isApiFinish, setIsApiFinish] = useState(false);
  const [isApiError, setIsApiError] = useState(false);

  const handleInputFieldChange = e => {
    let newUserObj = userObj;

    newUserObj[e.target.name] = e.target.value;

    setUserObj(newUserObj);
  };

  const onSubmitForm = e => {
    e.preventDefault();
    if (
      !userObj.username ||
      !userObj.password ||
      !userObj.email ||
      !userObj.email.includes('@')
    ) {
      console.log('invalid form ->', userObj.email);
      setIsFormValid(false);
      return;
    }
    setIsFormValid(true);
    // api call
    AuthService.register(userObj)
      .then(res => {
        if (res.status === 200) {
          setIsApiFinish(true);
          setIsApiError(false);
        }
      })
      .catch(err => {
        console.log(err);
        if (err) setIsApiError(true);
      });
  };

  return (
    <div className="auth-wrapper">
      <h1>Auth register wrapper</h1>
      <form onSubmit={onSubmitForm}>
        <label htmlFor="username">User name</label>
        <input
          id="username"
          type="text"
          name="username"
          onChange={e => handleInputFieldChange(e)}
        />
        <label htmlFor="password">Password</label>
        <input
          id="password"
          type="text"
          name="password"
          onChange={e => handleInputFieldChange(e)}
        />
        <label htmlFor="email">E-mail</label>
        <input
          id="email"
          type="text"
          name="email"
          onChange={e => handleInputFieldChange(e)}
        />
        <label htmlFor="firstName">First name</label>
        <input
          id="firstName"
          type="text"
          name="firstName"
          onChange={e => handleInputFieldChange(e)}
        />
        <label htmlFor="lastName">Last name</label>
        <input
          id="lastName"
          type="text"
          name="lastName"
          onChange={e => handleInputFieldChange(e)}
        />
        <label htmlFor="address">Address</label>
        <input
          id="address"
          type="text"
          name="address"
          onChange={e => handleInputFieldChange(e)}
        />
        <label htmlFor="city">City</label>
        <input
          id="city"
          type="text"
          name="city"
          onChange={e => handleInputFieldChange(e)}
        />
        <input type="submit" value="Register" /> <br />
        <Link to="/login">sign in</Link>
      </form>
      {!isFormValid ? <p>Invalid Form</p> : null}

      {isApiFinish ? <p>Successfully registered.</p> : null}

      {isApiError ? <p>Error please try later.</p> : null}
    </div>
  );
}

export default RegisterForm;
