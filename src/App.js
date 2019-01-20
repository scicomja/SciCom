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
import { withRouter } from 'react-router-dom'
import { createBrowserHistory } from 'history'

import { PersistGate } from 'redux-persist/integration/react'
const {store, persistor} = configureStore()

export const history = createBrowserHistory()
class Root extends Component {
  render() {
    return (
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <AppContainer />
        </PersistGate>
      </Provider>
    );
  }
}
// connect this with the store
class App extends Component {
  render() {
    return (
      <div className="App">
        <Header
          user={this.props.auth.user}
          mode={this.props.mode}/>
        <Router history={history}>
          <Switch>
            <Route path="/about" component={AboutPage} />
            <Route path="/user" component={UserPage} />
            <Route path="/" component={LoginPage} />
          </Switch>
      </Router>
      </div>
    )
  }
}
const mapStateToProps = state => state
const AppContainer = connect(mapStateToProps, null)(App)
export default Root
