import React, { useState, useContext } from 'react';
import SignUp from './SignUp';
import Auth from '../../utils/auth';
import { UserContext } from "../../contexts"
import jwt_decode from "jwt-decode"


import { validateEmail } from '../../utils/helpers';
import auth from '../../utils/auth';
// import { useNavigate } from "react-router-dom";


const Login = ({handlePageChange}) => {
  
  const [ userState, dispatch ] = useContext(UserContext);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

   const response = await fetch('/api/users/login', {
      method: 'POST',
      // mode: 'no-cors',
      headers: {
        'Accept': 'application/json',
        'Content-type': 'application/json',
        // 'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(
        {email,password}
      )

    })

    const data = await response.json();

    if(data.user) {
      const decoded = jwt_decode(data.user);
      dispatch({
        type: "login",
        username: decoded.data.username,
        _id: decoded.data._id
      })
      handlePageChange('Home');
    } else {
      setErrorMessage('log in failed')
    }
  };

  const handleChange = (e) => {
    if (e.target.name === 'email') {
      const isValid = validateEmail(e.target.value);
      if(!isValid) {
        setErrorMessage('Your email is invalid.');
      } else {
        setErrorMessage('');
      }
    }
  }
 
  return (
    <section className="diagonal-bar d-flex justify-content-around align-items-center p-5 vh-100">
      <form className=" card-border card p-5 d-flex" id="logInForm" onSubmit ={handleSubmit}>
        <h1 className= "text-center pb-4" data-testid='h1tag'>Log in</h1>
        
        <label className="p-2" htmlFor="email">Email address :</label>
        <input className="m-2" 
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          onBlur ={handleChange}
          type="email" 
          name="email" />

        <label className="p-2" htmlFor="name">Password :</label>
        <input className="m-2" 
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          onBlur ={handleChange}
          type="password" 
          name="name"/>


        <button className="btn m-2">
        login</button>
        
        <button className="btn m-2" onClick={()=> handlePageChange("SignUp")}>
          Sign up here</button>
        <p>{errorMessage}</p>

     
      </form>
    </section>
  )
}

export default Login