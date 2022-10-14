import React, { useRef, useState } from 'react';
import MessageService from '../../services/messageService';

function ContactForm() {
  const contactFormMessage = useRef();
  const [message, setMessage] = useState({
    firstName: '',
    lastName: '',
    email: '',
    message: '',
  });

  // states for form validation
  const [isSent, setIsSent] = useState(false);
  const [isFormValid, setIsFormValid] = useState(false);
  const [isApiFinished, setIsApiFinished] = useState(false);

  // states for message input fields
  const [isFirstName, setIsFirstName] = useState(true);
  const [isLastName, setIsLastName] = useState(true);
  const [isEmail, setIsEmail] = useState(true);
  const [isMessage, setIsMessage] = useState(true);

  // taking values from inputs fields
  const handleInputField = function (event) {
    const newMessage = message;
    newMessage[event.target.name] = event.target.value;
    setMessage(newMessage);
  };

  const onSubmitForm = function (event) {
    event.preventDefault();

    !message.firstName ? setIsFirstName(false) : setIsFirstName(true);
    !message.lastName ? setIsLastName(false) : setIsLastName(true);
    !message.email.includes('@') ? setIsEmail(false) : setIsEmail(true);
    !message.message ? setIsMessage(false) : setIsMessage(true);

    if (
      !message.firstName ||
      !message.lastName ||
      !message.email.includes('@') ||
      !message.message
    ) {
      setIsFormValid(false);
      return;
    }
    setIsFormValid(true);

    // send message
    MessageService.sendMessage(message)
      .then(response => {
        if (response.status === 200) {
          setIsSent(true);
        }
      })
      .catch(error => {
        console.log(error);
        setIsSent(false);
      })
      .finally(() => {
        setIsApiFinished(true);
        // setTimeout(function () {
        //   contactFormMessage.current.classList.add('d-none');
        // }, 3000);
      });
  };

  // clear all inputs fields
  // const clearInputs = function (e) {
  //   return (
  //     e.target[0].value = '',
  //     e.target[1].value = '',
  //     e.target[2].value = '',
  //     e.target[3].value = ''
  //   )
  // }

  const showMsg = function () {
    return isSent ? (
      <div>Message is successfully sent.</div>
    ) : (
      <div>Something went wrong, please try again.</div>
    );
  };

  return (
    <div className="container">
      <form onSubmit={event => onSubmitForm(event)}>
        <div className="mb-3">
          <label htmlFor="firstName" className="form-label">
            {isFirstName ? 'First Name' : 'First Name is required.'}
          </label>
          <input
            name="firstName"
            type="text"
            className="form-control"
            id="firstName"
            onInput={event => handleInputField(event)}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="lastName" className="form-label">
            {isLastName ? 'Last Name' : 'Last Name is required.'}
          </label>
          <input
            name="lastName"
            type="text"
            className="form-control"
            id="lastName"
            onInput={event => handleInputField(event)}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            {isEmail ? 'Email address' : 'Email address is required.'}
          </label>
          <input
            name="email"
            type="email"
            className="form-control"
            id="email"
            onInput={event => handleInputField(event)}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="message" className="form-label">
            {isMessage ? 'Message' : 'Message is required.'}
          </label>
          <textarea
            name="message"
            className="form-control"
            id="message"
            rows="5"
            onInput={event => handleInputField(event)}
          ></textarea>
        </div>
        <div className="mb-3">
          <input type="submit" value="Send" className="btn btn-warning" />
        </div>
        <div ref={contactFormMessage}>{isApiFinished ? showMsg() : null}</div>
      </form>
    </div>
  );
}

export default ContactForm;
