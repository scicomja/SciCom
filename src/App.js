import React, { Component } from "react"
import "./App.scss"
import { Jumbotron, Button, Container, Row, Col } from "reactstrap"
import Header from "./Header"
import MainModal from "./MainModal"

import { ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"

import { BrowserRouter as Router, Route, Switch } from "react-router-dom"
import SearchResultPage from "./pages/SearchResultPage"
import LoginPage from "./pages/LoginPage"
import AboutPage from "./pages/AboutPage"
import HomePage from "./pages/HomePage"
import EditInfoPage from "./pages/EditInfoPage"

import ImpressumPage from "./pages/ImpressumPage"
import DatenSchutzPage from "./pages/Datenschutz"

import NewsPage from "./pages/NewsPage"

import SearchModal from "./SearchModal"
import { Provider, connect } from "react-redux"
import configureStore from "./store"
import UserPage from "./pages/UserPage"
import ProjectPage from "./pages/ProjectPage"
import { withRouter } from "react-router-dom"
import { createBrowserHistory } from "history"
import EditInfoGuard from "./EditInfoGuard"
import Favicon from "react-favicon"

import Footer from "./Footer"

import { PersistGate } from "redux-persist/integration/react"
const { store, persistor } = configureStore()

export const history = createBrowserHistory()
class Root extends Component {
	render() {
		return (
			<Provider store={store}>
				<PersistGate loading={null} persistor={persistor}>
					<AppContainer />
				</PersistGate>
			</Provider>
		)
	}
}
// connect this with the store
class App extends Component {
	render() {
		return (
			<Router history={history}>
				<div className="App">
					<Favicon url="./favicon.ico" />
					<Header user={this.props.auth.user} mode={this.props.mode} />
					<MainModal />
					<SearchModal />
					<ToastContainer />
					<div className="MainContent">
						<Switch>
							<Route exact path="/user" component={EditInfoGuard(HomePage)} />
							<Route path="/editInfo" component={EditInfoPage} />
							<Route path="/about" component={AboutPage} />
							<Route path="/impressum" component={ImpressumPage} />
							<Route path="/datenschutz" component={DatenSchutzPage} />
							<Route
								path="/user/:user_id"
								component={EditInfoGuard(HomePage)}
							/>
							<Route
								path="/project/:project_id"
								component={EditInfoGuard(ProjectPage)}
							/>
							<Route
								path="/search"
								component={EditInfoGuard(SearchResultPage)}
							/>
							<Route
								path="/latest"
								component={
									this.props.auth.token ? EditInfoGuard(NewsPage) : LoginPage
								}
							/>
							<Route path="/" component={LoginPage} />
						</Switch>
					</div>
					<Footer />
				</div>
			</Router>
		)
	}
}
const mapStateToProps = state => state
const AppContainer = connect(
	mapStateToProps,
	null
)(App)
export default Root
