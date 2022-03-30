import React from 'react'

import { validateEmail } from '../../utils/helpers';


const SignUp = () => {
  return (
    <section className="d-flex justify-content-around align-items-center p-5 bg-primary height-100">
      <form className="card p-5" id ="contact-form red">
        <h1 className= "text-center pb-4" data-testid='h1tag'>Sign Up</h1>
        
        <label className="p-2" htmlFor="email">Email address :</label>
        <input className="m-2" type="email" name="email" />

        <label className="p-2" htmlFor="name">Password :</label>
        <input className="m-2" type="text" name="name"/>

        <button className="btn btn-primary m-2">Sign Up</button>
      </form>
      

    </section>
  )
}

export default SignUp