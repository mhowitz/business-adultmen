import React, { useState } from 'react';

import { validateEmail } from '../../utils/helpers';

const Login = () => {
  
  // const [formState, setFormState] = useState({ name: '', email: '', message: '' });

  // const [errorMessage, setErrorMessage] = useState('');
  // const { name, email, message } = formState;
  // const handleChange = (e) => {
  //   if (e.target.name === 'email') {
  //     const isValid = validateEmail(e.target.value);
  //     if(!isValid) {
  //       setErrorMessage('Your email is invalid.');
  //     } else {
  //       setErrorMessage('');
  //     }
  //   }
  // }

  return (
    <section className="d-flex justify-content-around m-5">
      <form id ="contact-form">
        <h1 data-testid='h1tag'>Log in</h1>
        <div className="p-2">
          <label htmlFor="email">Email address :</label>
          <input type="email" name="email" />
        </div>
        <div className="p-2">
          <label htmlFor="name">Password :</label>
          <input type="text" name="name"/>
        </div>

      </form>
      

    </section>
  )
}

export default Login