import React,{ useState} from 'react'

import { validateEmail } from '../../utils/helpers';

const SignUp = () => {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [userName, setUserName] = useState('');

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
    }).then(() => {
      console.log(login)
      console.log('new user posted')
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
    <section className="d-flex justify-content-around align-items-center p-5 height-100 mt-4">
      <form className="card p-5 mt-3"
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
          type="text" 
          name="name"/>

        <label className="p-2" htmlFor="name">User Name :</label>
        <input className="m-2" 
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
          type="text" 
          name="name"/>

        <button className="btn m-2">Sign Up</button>
      </form>
      

    </section>
  )
}

export default SignUp