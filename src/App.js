import React, { Component } from "react";
import { Switch, Route } from "react-router-dom";
import "./App.css";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import Login from "./components/Login";
import Signup from "./components/Signup";
import WineContainer from "./containers/WineContainer";
import VarietalList from "./components/VarietalList";
import Varietal from "./components/Varietal";
import OriginList from "./components/OriginList";
import Origin from "./components/Origin";
import { CssBaseline } from "@material-ui/core";
import Container from "@material-ui/core/Container";
import { loginStatus } from "./actions/userActions";
import { connect } from "react-redux";

class App extends Component {
  componentDidMount() {
    this.props.loginStatus();
  }

  handleLogout = () => {
    this.setState({
      isLoggedIn: false,
      user: {},
    });
  };

  render() {
    return (
      <div className="main">
        <CssBaseline />
        <Navbar isLoggedIn={this.props.isLoggedIn} />

        <Container maxWidth="xl" className="contain">
          <Switch>
            <Route
              path="/wines"
              render={(props) => (
                <WineContainer
                  {...props}
                  isLoggedIn={this.props.isLoggedIn}
                  user={this.props.user}
                />
              )}
            />
            <Route
              path="/varietals/:id"
              render={(props) => <Varietal {...props} user={this.props.user} />}
            />
            <Route
              exact
              path="/varietals"
              render={(props) => (
                <VarietalList {...props} isLoggedIn={this.props.isLoggedIn} />
              )}
            />
            <Route
              path="/origins/:id"
              render={(props) => <Origin {...props} user={this.props.user} />}
            />
            <Route
              exact
              path="/origins"
              render={(props) => (
                <OriginList {...props} isLoggedIn={this.props.isLoggedIn} />
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
