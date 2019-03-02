import React from 'react'
import {
  Modal, ModalHeader, ModalBody, ModalFooter,
  Button
} from 'reactstrap'
import PropTypes from 'prop-types'
import Icon from '../../components/icon'
import { deleteProject } from '../../backend/user'
import { toast } from 'react-toastify'
import { withRouter } from 'react-router-dom'
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
    deleteProject({_id: project}, token)
      .then(() => {
        toast.success("Project deleted")
        history.push('/')
      })
  }

  render() {
    const { visible, onClose } = this.props
    return (
      <Modal
        isOpen={visible}
        toggle={onClose}
      >
        <ModalHeader>
          Confirm Project deletion
        </ModalHeader>
        <ModalBody>
          You are about to delete this project, all the related applications and bookmarks will be deleted. Are you sure?
        </ModalBody>
        <ModalFooter>
          <Button
            onClick={this.deleteProject.bind(this)}
            color="danger"
          >
            <Icon name="trash" /> Delete project
          </Button>
          <Button onClick={onClose}>
            <Icon name="remove" /> Cancel
          </Button>
        </ModalFooter>
      </Modal>
    )
  }
}

export default withRouter(ConfirmDeletePopup)
