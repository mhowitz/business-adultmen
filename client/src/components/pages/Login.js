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
    <section className="d-flex justify-content-around align-items-center p-5 bg-primary height-100">
      <form className="card p-5" id ="contact-form red">
        <h1 className= "text-center pb-4" data-testid='h1tag'>Log in</h1>
        
        <label className="p-2" htmlFor="email">Email address :</label>
        <input className="m-2" type="email" name="email" />

        <label className="p-2" htmlFor="name">Password :</label>
        <input className="m-2" type="text" name="name"/>

        <button className="btn btn-primary m-2">Login</button>

        <button className="btn btn-warning m-2"> sign up here</button>
      </form>
      

    </section>
  )
}

export default Login