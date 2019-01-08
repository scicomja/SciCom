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
import { Provider } from 'react-redux'
import configureStore from './store'
const store = configureStore()
class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <div className="App">
          <Header />
          <Router>
            <Switch>
              <Route exact path="/" component={LoginPage} />
              <Route exact path="/about" component={AboutPage} />
            </Switch>
        </Router>
        </div>
      </Provider>
    );
  }
}

export default App;
