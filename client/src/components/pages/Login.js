import React, { useState } from 'react';
import SignUp from './SignUp';
import Auth from '../../utils/auth';

import { validateEmail } from '../../utils/helpers';
import auth from '../../utils/auth';
// import { useNavigate } from "react-router-dom";


const Login = ({handlePageChange}) => {
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const login = { email, password };
    // need to check with seeded data that this works.


   const response = await fetch('/api/users/login', {
      method: 'post',
      mode: 'no-cors',
      headers: {
        'Accept': 'application/json',
        'Content-type': 'application/json',
        // 'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(login)

    })
    const data = await response.json();
    console.log(data)
    if(data.user) {
      alert('login successful')
    } else {
      alert('please check your username and password ')
    }

    Auth.login(data.username)

//     }).then((res, err) => {
//       if(res){
//       console.log('new login created')
//       console.log('res',res);}
//       // not giving us token in res because outside of user in response (insomnia)
      
//       // render home or profile page
//       else {
//         // if login fails
//         console.log(err);
//       }
//     });
//   };
  }
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
    <section className="d-flex justify-content-around align-items-center p-5 height-100">
      <form className="card p-5" id="logInForm" onSubmit ={handleSubmit}>
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
          type="text" 
          name="name"/>

        <button className="btn m-2">
        login</button>
        
        <button className="btn m-2" onClick={()=> handlePageChange("SignUp")}>
          Sign up here</button>
      </form>
    </section>
  )
}

export default Login