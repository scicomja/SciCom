// component forcing the user to editinfo
import React from "react"
import { withRouter } from "react-router-dom"
import { connect } from "react-redux"

const EditInfoGuard = WrappedComponent => {
	class Guard extends React.Component {
		render() {
			const { children, user, history } = this.props

			if (!user) {
				history.push("/")
			}
			if (!user.firstName || !user.lastName) {
				history.push("/editInfo?block=true")
			}
			return <WrappedComponent {...this.props} />
		}
	}
	return connect(
		mapStateToProps,
		null
	)(Guard)
}

const mapStateToProps = state => ({
	...state.auth
})
export default EditInfoGuard
