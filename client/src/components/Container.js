import React, { useState } from 'react';

import NavBar from './NavBar';
import Footer from './Footer';
import Login from '../components/pages/Login'

const Container = () => {
  const [currentPage, setCurrentPage] = useState('Login');

  const renderPage = () => {
    if(currentPage === 'Login') {
      return <Login />;
    }
    if(currentPage === 'Post') {
      return <Post />;
    }
    if(currentPage === 'SignUp') {
      return <SignUp />;
    }
    if(currentPage === 'Home') {
      return <Home />;
    }
    if(currentPage === 'Profile') {
      return <Profile />;
    }

  }

  const handlePageChange = (page) => setCurrentPage(page);


  return (
    <div>
      {/* We are passing the currentPage from state and the function to update it */}
      <NavBar currentPage={currentPage} handlePageChange={handlePageChange} />
      {/* Here we are calling the renderPage method which will return a component  */}
      {renderPage()}
      <Footer />
    </div>
  )
}

export default Container