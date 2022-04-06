import React,{ useState, useContext} from 'react'
import auth from '../../utils/auth';
import Auth from '../../utils/auth';
import { UserContext } from "../../contexts"
import jwt_decode from "jwt-decode"

import { validateEmail } from '../../utils/helpers';

const SignUp = ({handlePageChange}) => {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [userName, setUserName] = useState('');
  const [ userState, dispatch ] = useContext(UserContext);

  const handleSubmit = (e) => {
    e.preventDefault();
    const login = { 
      email: email,
      password: password,
      username: userName 
    };

    // need to check with seeded data that this works.
    fetch('/api/users', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-type': 'application/json',
      },
      body: JSON.stringify(login)
    }).then(res => res.json())
    .then((data) => {
      console.log(data)
      // Auth.login(data.username)
      const decoded = jwt_decode(data.user);
      dispatch({
        type: "login",
        username: decoded.data.username,
        _id: decoded.data._id
      })
      console.log("userstate", userState)
      console.log('new user posted');
      handlePageChange('Home');
    });
  };

  const handleChange = (e) => {
    if (e.target.name === 'price') {
      // checking for a string doesn't work blaahhhh
      if(e.target.value < 0 || e.target.value === String) {
        console.log('please enter a valid price');
      } else {
        console.log('price is acceptable');
      }
    } else if (e.target.name === 'Description') {
      console.log('all good')

    } else if (e.target.name === 'image') {
      console.log('all good')
    }
  };

  return (
    <section className="diagonal-bar d-flex justify-content-around align-items-center p-5 height-100 mt-4">
      <form className="card p-5 mt-3 card-border"
        onSubmit={handleSubmit}>
        <h1 className= "text-center pb-4" data-testid='h1tag'>Sign Up</h1>
        
        <label className="p-2" htmlFor="email">Email address :</label>
        <input className="m-2"
          value={email} 
          onChange={(e) => setEmail(e.target.value)}
          
          type="email" 
          name="email" />

        <label className="p-2" htmlFor="name">Password :</label>
        <input className="m-2" 
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          type="password" 
          name="password"/>

        <label className="p-2" htmlFor="name">User Name :</label>
        <input className="m-2" 
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
          type="text" 
          name="username"/>

        <button className="btn m-2">Sign Up</button>
      </form>

    </section>
  )
}

export default SignUp