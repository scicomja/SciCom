import React from "react"
import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from "reactstrap"
import PropTypes from "prop-types"
import Icon from "../../components/icon"
import { deleteProject } from "../../backend/user"
import { toast } from "react-toastify"
import { withRouter } from "react-router-dom"
import Locale from "../../locale"

class ConfirmDeletePopup extends React.Component {
	static propTypes = {
		visible: PropTypes.bool.isRequired,
		onClose: PropTypes.func.isRequired,
		token: PropTypes.string.isRequired,
		// this is the ID of the project...
		project: PropTypes.string.isRequired,
		history: PropTypes.object.isRequired
	}

	deleteProject() {
		const { history, project, token } = this.props
		deleteProject({ _id: project }, token).then(() => {
			toast.success(Locale.confirmDeletePopup.projectDeleted)
			history.push("/")
		})
	}

	render() {
		const { visible, onClose } = this.props
		return (
			<Modal isOpen={visible} toggle={onClose}>
				<ModalHeader>{Locale.confirmDeletePopup.title}</ModalHeader>
				<ModalBody>{Locale.confirmDeletePopup.description}</ModalBody>
				<ModalFooter>
					<Button onClick={this.deleteProject.bind(this)} color="danger">
						<Icon name="trash" /> {Locale.confirmDeletePopup.delete}
					</Button>
					<Button onClick={onClose}>
						<Icon name="remove" /> {Locale.confirmDeletePopup.cancel}
					</Button>
				</ModalFooter>
			</Modal>
		)
	}
}

export default withRouter(ConfirmDeletePopup)
