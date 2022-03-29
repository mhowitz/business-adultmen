import React from 'react'

const Navbar = ({ currentPage, handlePageChange }) => {
  return (
    <ul className="nav nav-tabs">
      <li className="nav-item">
        <a
          href="#home"
          onClick={() => handlePageChange('Home')}
          // This is a conditional (ternary) operator that checks to see if the current page is "Home"
          // If it is, we set the current page to 'nav-link-active', otherwise we set it to 'nav-link'
          className={currentPage === 'Home' ? 'nav-link active' : 'nav-link'}
        >
          Adult Busniess Men Logo
        </a>
      </li>
      <li className="nav-item">
        <a
          href="#login"
          onClick={() => handlePageChange('Login')}
          // Check to see if the currentPage is `Login`, and if so we use the active link class from bootstrap. Otherwise, we set it to a normal nav-link
          className={currentPage === 'Login' ? 'nav-link active' : 'nav-link'}
        >
          Log In
        </a>
      </li>
      <li className="nav-item">
        <a
          href="#signup"
          onClick={() => handlePageChange('SignUp')}
          // Check to see if the currentPage is `SignUp`, and if so we use the active link class from bootstrap. Otherwise, we set it to a normal nav-link
          className={currentPage === 'SignUp' ? 'nav-link active' : 'nav-link'}
        >
          Sign Up
        </a>
      </li>
      <li className="nav-item">
        <a
          href="#Profile"
          onClick={() => handlePageChange('Profile')}
          // Check to see if the currentPage is `Profile`, and if so we use the active link class from bootstrap. Otherwise, we set it to a normal nav-link
          className={currentPage === 'Profile' ? 'nav-link active' : 'nav-link'}
        >
          Profile
        </a>
      </li>
    </ul>
  )
}

export default Navbar