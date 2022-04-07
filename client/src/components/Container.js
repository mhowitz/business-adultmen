import React, { useState, useContext } from 'react';
import { UserContext } from "../contexts"

import NavBar from './NavBar';
import Footer from './Footer';
import Login from '../components/pages/Login';
import Profile from '../components/pages/Profile';
import SignUp from '../components/pages/SignUp';
import Home from '../components/pages/Home';
import Post from '../components/pages/Post';


const Container = () => {
  const [currentPage, setCurrentPage] = useState('Login');
  const [userState, dispatch] = useContext(UserContext);

  const redirectLoggedOut = () => {
    return <SignUp handlePageChange={handlePageChange}/>;
  }


  const renderPage = () => {
    if(currentPage === 'Login') {
      return <Login handlePageChange={handlePageChange}/>;
    }
    else if(currentPage === 'Profile') {
      if(!userState.loggedIn) {
        return <SignUp handlePageChange={handlePageChange}/>;
      }
      return <Profile />;
    }
    else if(currentPage === 'SignUp') {
      return <SignUp handlePageChange={handlePageChange}/>;
    }
    else if(currentPage === 'Home') {
      return <Home />;
    }
    else if(currentPage === 'Post') {
      if(!userState.loggedIn) {
        return <SignUp handlePageChange={handlePageChange}/>;
      }
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