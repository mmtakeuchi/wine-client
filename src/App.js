import React, { Component } from 'react'
import axios from 'axios'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoggedIn: false,
      user: {}
    };
  }

  componentDidMount() {
    this.loginStatus()
  }
  
  handleLogin = (data) => {
    this.setState({
      isLoggedIn: true,
      user: data.user
    })
  }

  handleLogout = () => {
    this.setState({
      isLoggedIn: false,
      user: {}
    })
  }

  loginStatus = () => {
    axios.get('http:localhost:3001/logged_in',
    {withCredentials: true})

    .then(resp => {
      if (resp.data.logged_in) {
        this.handleLogin(resp)
      } else {
        this.handleLogout()
      }
    })
    .catch(error => console.log('api errors:', error))
  }


  render() {
    return (
      <div>
        <BrowserRouter>
          <Switch>
            <Route exact path='/' component={}/>
            <Route exact path='/login' component={}/>
            <Route exact path='/signup' component={}/>
          </Switch>
        </BrowserRouter>
      </div>
    )
  }
}

export default App;
