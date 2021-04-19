import React from "react";
import { Link } from "react-router-dom";
import "./Home.css";
import Button from "@material-ui/core/Button";

const Home = (props) => {
  return (
    <div className="home">
      <div className="con">
        <h1 className="title">Wine Journal</h1>
        <div className="intro">
          <p>Record tasting notes about all the wine you drink.</p>
          <Button variant="contained">
            <Link to="/login" className="links">
              Log In
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
};
export default Home;
