import React, { Component } from "react";
import axios from "axios";
import { Switch, Route } from "react-router-dom";
import "./App.css";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import Login from "./components/Login";
import Signup from "./components/Signup";
import WineContainer from "./containers/WineContainer";
import VarietalContainer from "./containers/VarietalContainer";
import OriginContainer from "./containers/OriginContainer";
import { CssBaseline } from "@material-ui/core";
import Container from "@material-ui/core/Container";
import { loginStatus } from "./actions/userActions";
import { connect } from "react-redux";

class App extends Component {
  // constructor(props) {
  //   super(props);
  //   this.state = {
  //     isLoggedIn: false,
  //     user: {},
  //   };
  // }

  componentDidMount() {
    // this.loginStatus();
    this.props.loginStatus();
  }

  // loginStatus = () => {
  //   axios
  //     .get("http://localhost:3001/logged_in", { withCredentials: true })
  //     .then((response) => {
  //       if (response.data.logged_in) {
  //         this.handleLogin(response.data);
  //       } else {
  //         this.handleLogout();
  //       }
  //     })
  //     .catch((error) => console.log("api errors:", error));
  // };

  // handleLogin = (data) => {
  //   this.setState({
  //     isLoggedIn: true,
  //     user: data.user,
  //   });
  // };

  handleLogout = () => {
    this.setState({
      isLoggedIn: false,
      user: {},
    });
  };

  render() {
    console.log(this);

    return (
      <div className="main">
        <CssBaseline />
        <Navbar
          handleLogout={this.handleLogout}
          isLoggedIn={this.props.isLoggedIn}
        />
        <Container maxWidth="xl">
          <Switch>
            <Route
              path="/wines"
              render={(props) => (
                <WineContainer {...props} isLoggedIn={this.props.isLoggedIn} />
              )}
            />
            <Route
              path="/varietals"
              render={(props) => (
                <VarietalContainer
                  {...props}
                  isLoggedIn={this.props.isLoggedIn}
                />
              )}
            />
            <Route
              path="/origins"
              render={(props) => (
                <OriginContainer
                  {...props}
                  isLoggedIn={this.props.isLoggedIn}
                />
              )}
            />
            <Route
              exact
              path="/"
              render={(props) => (
                <Home
                  {...props}
                  handleLogout={this.handleLogout}
                  isLoggedIn={this.props.isLoggedIn}
                />
              )}
            />
            <Route
              exact
              path="/login"
              render={(props) => (
                <Login
                  {...props}
                  handleLogin={this.handleLogin}
                  isLoggedIn={this.props.isLoggedIn}
                />
              )}
            />
            <Route
              exact
              path="/signup"
              render={(props) => (
                <Signup
                  {...props}
                  handleLogin={this.handleLogin}
                  isLoggedIn={this.props.isLoggedIn}
                />
              )}
            />
          </Switch>
        </Container>
      </div>
    );
  }
}

const mapStateToProps = ({ current }) => ({
  user: current.user,
  isLoggedIn: current.isLoggedIn,
});

const mapDispatchToProps = (dispatch) => ({
  loginStatus: () => dispatch(loginStatus()),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
