import React,{ useState} from 'react'

import { validateEmail } from '../../utils/helpers';

const SignUp = () => {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const login = { email, password };

    // need to check with seeded data that this works.
    fetch('https://webhook.site/f4f4b450-4382-419d-95fe-1ea326e49280', {
      method: 'post',
      mode: 'no-cors',
      headers: {
        'Accept': 'application/json',
        'Content-type': 'application/json',
      },
      body: JSON.stringify(login)
    }).then(() => {
      console.log('new item posted')
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
    <section className="d-flex justify-content-around align-items-center p-5 bg-primary height-100">
      <form className="card p-5"
        onSubmit={handleSubmit}>
        <h1 className= "text-center pb-4" data-testid='h1tag'>Sign Up</h1>
        
        <label className="p-2" htmlFor="email">Email address :</label>
        <input className="m-2"
          value={email} 
          onChange={setEmail}
          onBlur={(e) => handleChange(e.target.value)}
          type="email" 
          name="email" />

        <label className="p-2" htmlFor="name">Password :</label>
        <input className="m-2" 
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          type="text" 
          name="name"/>

        <button className="btn btn-primary m-2">Sign Up</button>
      </form>
      

    </section>
  )
}

export default SignUp