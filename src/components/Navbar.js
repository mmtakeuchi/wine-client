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
      <nav>
        <ul>
          <li>
            <Link to="/" className="home">
              Home
            </Link>
          </li>

          {props.isLoggedIn ? (
            <>
              <li>
                <Link to="/wines">Wines</Link>
              </li>
              <li>
                <Link to="/logout" onClick={handleClick}>
                  Log Out
                </Link>
              </li>
            </>
          ) : (
            <>
              <li>
                <Link to="/login">Log In</Link>
              </li>
              <li>
                <Link to="/signup">Sign Up</Link>
              </li>
            </>
          )}
        </ul>
      </nav>
    </div>
  );
};

export default Navbar;
