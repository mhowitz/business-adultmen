import React from "react";
import logo from "../assets/elements/flying-money.png";
import Auth from "../utils/auth";

const Navbar = ({ currentPage, handlePageChange }) => {
  return (
    <>
      <div className=" nav nav-tabs d-inline-flex justify-content-between w-100 align-items-center">
        <a
          href="#home"
          onClick={() => handlePageChange("Home")}
          // This is a conditional (ternary) operator that checks to see if the current page is "Home"
          // If it is, we set the current page to 'nav-link-active', otherwise we set it to 'nav-link'
          className={currentPage === "Home" ? "nav-link active" : "nav-link"}
        >
          <span>
            <img src={logo} alt="flying money" width="60" height="60" />
          </span>
        </a>

      <ul className="height-20 d-flex justify-content-end align-items-center">
        <li className="nav-item text-white"></li>

        {/* {!Auth.loggedIn ? (
        <> */}

        <li className="nav-item">
          <a
            href="#login"
            onClick={() => handlePageChange("Login")}
            // Check to see if the currentPage is `Login`, and if so we use the active link class from bootstrap. Otherwise, we set it to a normal nav-link
            className={currentPage === "Login" ? "nav-link active" : "nav-link"}
          >
            log in
          </a>
        </li>
        <li className="nav-item">
          <a
            href="#signup"
            onClick={() => handlePageChange("SignUp")}
            // Check to see if the currentPage is `SignUp`, and if so we use the active link class from bootstrap. Otherwise, we set it to a normal nav-link
            className={
              currentPage === "SignUp" ? "nav-link active" : "nav-link"
            }
          >
            sign up
          </a>
        </li>
        {/* </>
      ) : null} */}
        <li className="nav-item">
          <a
            href="#Profile"
            onClick={() => handlePageChange("Profile")}
            // Check to see if the currentPage is `Profile`, and if so we use the active link class from bootstrap. Otherwise, we set it to a normal nav-link
            className={
              currentPage === "Profile" ? "nav-link active" : "nav-link"
            }
          >
            my stuff
          </a>
        </li>
        <li className="nav-item">
          <a
            href="#Post"
            onClick={() => handlePageChange("Post")}
            // Check to see if the currentPage is `Post`, and if so we use the active link class from bootstrap. Otherwise, we set it to a normal nav-link
            className={currentPage === "Post" ? "nav-link active" : "nav-link"}
          >
            sell somethin'
          </a>
        </li>
      </ul>
      </div>
    </>
  );
};

{
  /* <Navbar>
 <Navbar.Brand href="/">MyBrand</Navbar.Brand>
<Navbar.Toggle />
<Navbar.Collapse>
//         <Nav className="justify-content-end" style={{ width: "100%" }}>
//             ...
//         </Nav>
//     </Navbar.Collapse>
// </Navbar>  */
}

export default Navbar;
