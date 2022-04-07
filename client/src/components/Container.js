import React, { useState } from 'react';

import NavBar from './NavBar';
import Footer from './Footer';
import Login from '../components/pages/Login';
import Profile from '../components/pages/Profile';
import SignUp from '../components/pages/SignUp';
import Home from '../components/pages/Home';
import Post from '../components/pages/Post';


const Container = () => {
  const [currentPage, setCurrentPage] = useState('Login');

  const renderPage = () => {
    if(currentPage === 'Login') {
      return <Login handlePageChange={handlePageChange}/>;
    }
    else if(currentPage === 'Profile') {
      return <Profile />;
    }
    else if(currentPage === 'SignUp') {
      return <SignUp handlePageChange={handlePageChange}/>;
    }
    else if(currentPage === 'Home') {
      return <Home />;
    }
    else if(currentPage === 'Post') {
      return <Post handlePageChange={handlePageChange}/>;
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