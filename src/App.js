import React, { Component } from 'react'
import axios from 'axios'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import Login from './components/Login'
import Signup from './components/Signup'
import Navbar from './components/Navbar'
import WineContainer from './containers/WineContainer'
import { connect } from 'react-redux'
import { getWines } from './actions/wineActions'

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

  loginStatus = () => {
    axios.get('http://localhost:3001/logged_in',
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

  render() {
    return (
      <div>
        <BrowserRouter>
          <Switch>
            <Route 
              exact path='/'
              render={props => (
                <Navbar {...props} handleLogout={this.handleLogout} loggedInStatus={this.state.isLoggedIn}/>
              )} 
            />
            <Route
              exact path='/login'
              render={props => (
                <Login {...props} handleLogin={this.handleLogin} loggedInStatus={this.state.isLoggedIn}/>
              )}
            />
            <Route
              exact path='/signup' 
              render={props => (
                <Signup {...props} handleLogin={this.handleLogin} loggedInStatus={this.state.isLoggedIn}/>
              )}  
            />
            <Route 
              exact path='/wines'
              render={props => (
                <WineContainer {...props} wines={this.props.wines.wines}/>
              )}
            />
          </Switch>
        </BrowserRouter>

      </div>
    )
  }
}

const mapStateFromProps = (state) => ({ 
  wines: state.wines,
})

const mapDispatchToProps = (dispatch) => ({
  getWines: () => dispatch(getWines()),
})

export default connect(mapStateFromProps, mapDispatchToProps)(App);
