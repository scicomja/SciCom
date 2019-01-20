import React, { Component } from 'react';
import './App.css';
import {
  Jumbotron, Button,
  Container, Row, Col,
} from 'reactstrap'
import Header from './Header'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import LoginPage from './pages/LoginPage'
import AboutPage from './pages/AboutPage'
import { Provider, connect } from 'react-redux'
import configureStore from './store'
import UserPage from './pages/UserPage'

const store = configureStore()
class Root extends Component {
  render() {
    return (
      <Provider store={store}>
        <AppContainer />
      </Provider>
    );
  }
}
// connect this with the store
class App extends Component {
  render() {
    return (
      <div className="App">
        <Header mode={this.props.mode}/>
        <Router>
          <Switch>
            <Route exact path="/" component={LoginPage} />
            <Route exact path="/about" component={AboutPage} />
            <Route path="/user/:email" component={UserPage} />
          </Switch>
      </Router>
      </div>
    )
  }
}
const mapStateToProps = state => state
const AppContainer = connect(mapStateToProps, null)(App)
export default Root;
