import React, { Component } from 'react';
import './App.css';
import {
  Jumbotron, Button,
  Container, Row, Col,
} from 'reactstrap'
import Header from './Header'
import MainModal from './MainModal'

import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import SearchResultPage from './pages/SearchResultPage'
import LoginPage from './pages/LoginPage'
import AboutPage from './pages/AboutPage'
import HomePage from './pages/HomePage'
import SearchModal from './SearchModal'
import { Provider, connect } from 'react-redux'
import configureStore from './store'
import UserPage from './pages/UserPage'
import ProjectPage from './pages/ProjectPage'
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
      <Router history={history}>
      <div className="App">
        <Header
          user={this.props.auth.user}
          mode={this.props.mode}/>
        <MainModal />
        <SearchModal />
        <ToastContainer />
        <Switch>
          <Route path="/home" component={HomePage} />
          <Route path="/about" component={AboutPage} />
          <Route path="/user/:user_id?" component={UserPage} />
          <Route path="/project/:project_id" component={ProjectPage} />
          <Route path="/search" component={SearchResultPage} />
          <Route path="/" component={LoginPage} />
        </Switch>
      </div>
      </Router>
    )
  }
}
const mapStateToProps = state => state
const AppContainer = connect(mapStateToProps, null)(App)
export default Root
