import React from "react"
import PropTypes from "prop-types"
import { Modal, ModalHeader, ModalFooter, ModalBody } from "reactstrap"

export default class ForgorPasswordPrompt extends React.Component {
	static propTypes = {
		isOpen: PropTypes.bool.isRequired,
		toggle: PropTypes.func.isRequired
	}
	render() {
		const { isOpen, toggle } = this.props
		return (
			<Modal isOpen={isOpen} toggle={toggle}>
				<ModalHeader>Reset your password </ModalHeader>
			</Modal>
		)
	}
}
