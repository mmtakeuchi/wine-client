import axios from "axios";
import React from "react";
import "./Navbar.css";
import { Link, useHistory } from "react-router-dom";

const Navbar = (props) => {
  const history = useHistory();
  const handleClick = () => {
    axios
      .post("http://localhost:3001/logout", { withCredentials: true })
      .then((resp) => {
        props.handleLogout();
        history.push("/");
      })
      .catch((error) => console.log(error));
  };

  return (
    <div className="nav">
      <Link to="/" className="home">
        Home
      </Link>

      {props.isLoggedIn ? (
        <>
          <Link to="/logout" onClick={handleClick}>
            Log Out
          </Link>
          <Link to="/wines">Wines</Link>
        </>
      ) : (
        <>
          <Link to="/login">Log In</Link>
          <Link to="/signup">Sign Up</Link>
        </>
      )}
    </div>
  );
};

export default Navbar;
