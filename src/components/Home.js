import React from "react";
import { Link } from "react-router-dom";
import Container from "@material-ui/core/Container";
import "./Home.css";

const Home = (props) => {
  return (
    <div className="home">
      <Container maxWidth="xl">
        <div>
          <Link to="/login">Log In</Link>
          <br></br>
          <Link to="/signup">Sign Up</Link>
        </div>
      </Container>
    </div>
  );
};
export default Home;
