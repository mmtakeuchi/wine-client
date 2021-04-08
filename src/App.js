import React, { Component } from "react";
import axios from "axios";
import { Switch, Route } from "react-router-dom";
import "./App.css";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import Login from "./components/Login";
import Signup from "./components/Signup";
import WineContainer from "./containers/WineContainer";
// import WineForm from "./components/WineForm";
// import VarietalList from "./components/VarietalList";
// import Varietal from "./components/Varietal";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoggedIn: false,
      user: {},
    };
  }

  componentDidMount() {
    this.loginStatus();
  }

  loginStatus = () => {
    axios
      .get("http://localhost:3001/logged_in", { withCredentials: true })
      .then((response) => {
        if (response.data.logged_in) {
          this.handleLogin(response.data);
        } else {
          this.handleLogout();
        }
      })
      .catch((error) => console.log("api errors:", error));
  };

  handleLogin = (data) => {
    this.setState({
      isLoggedIn: true,
      user: data.user,
    });
  };

  handleLogout = () => {
    this.setState({
      isLoggedIn: false,
      user: {},
    });
  };

  renderWineContainer = () => {
    if (this.state.isLoggedIn) {
      return <WineContainer />;
    }
  };

  render() {
    console.log(this.state);
    return (
      <div className="main">
        <Navbar
          handleLogout={this.handleLogout}
          isLoggedIn={this.state.isLoggedIn}
        />
        <WineContainer isLoggedIn={this.state.isLoggedIn} />
        <Switch>
          <Route
            exact
            path="/"
            render={(props) => (
              <Home
                {...props}
                handleLogout={this.handleLogout}
                isLoggedIn={this.state.isLoggedIn}
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
                isLoggedIn={this.state.isLoggedIn}
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
                isLoggedIn={this.state.isLoggedIn}
              />
            )}
          />
        </Switch>
      </div>
    );
  }
}
export default App;
