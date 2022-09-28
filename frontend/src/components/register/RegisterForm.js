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
    <div className="auth-wrapper d-flex justify-content-center mt-4">
      {/* <h1>Auth register wrapper</h1>
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

      {isApiError ? <p>Error please try later.</p> : null} */}
      <div className="card" style={{ width: 20 + 'rem' }}>
        <div className="card-body">
          <h5 className="card-title">Register page</h5>
          <form onSubmit={event => onSubmitForm(event)}>
            <div className="mb-3">
              <label htmlFor="username" className="form-label">
                Username
              </label>
              <input
                type="text"
                className="form-control"
                name="username"
                id="username"
                onChange={event => handleInputFieldChange(event)}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="email" className="form-label">
                Email
              </label>
              <input
                type="text"
                className="form-control"
                name="email"
                id="email"
                onChange={event => handleInputFieldChange(event)}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="firstName" className="form-label">
                First name
              </label>
              <input
                type="text"
                className="form-control"
                name="firstName"
                id="firstName"
                onChange={event => handleInputFieldChange(event)}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="lastName" className="form-label">
                Last name
              </label>
              <input
                type="text"
                className="form-control"
                name="lastName"
                id="lastName"
                onChange={event => handleInputFieldChange(event)}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="address" className="form-label">
                Address
              </label>
              <input
                type="text"
                className="form-control"
                name="address"
                id="address"
                onChange={event => handleInputFieldChange(event)}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="city" className="form-label">
                City
              </label>
              <input
                type="text"
                className="form-control"
                name="city"
                id="city"
                onChange={event => handleInputFieldChange(event)}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="password" className="form-label">
                Password
              </label>
              <input
                type="password"
                className="form-control"
                name="password"
                id="password"
                onChange={event => handleInputFieldChange(event)}
              />
            </div>
            <div className="d-flex align-items-center">
              <input type="submit" className="btn btn-primary" value="submit" />
              <Link to="/login">
                <div className="mx-3">or you have account.</div>
              </Link>
            </div>
          </form>
          {!isFormValid ? <p>Invalid Form</p> : null}

          {isApiFinish ? <p>Successfully registered.</p> : null}

          {isApiError ? <p>Error please try later.</p> : null}
        </div>
      </div>
    </div>
  );
}

export default RegisterForm;
