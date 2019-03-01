import React from 'react'
import {
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button
} from 'reactstrap'
import PropTypes from 'prop-types'
import Icon from '../../components/icon'
import { deleteAccount } from '../../backend/user'
import { connect } from 'react-redux'
import { SET_TOKEN } from '../../actions/auth'

const mapStateToProps = state => state.auth
const mapDispatchToProps = dispatch => ({
  removeToken: dispatch({
    type: SET_TOKEN,
    token: null
  })
})
class DeletePopup extends React.Component {

  static propTypes = {
    visible: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    token: PropTypes.string.isRequired,
    removeToken: PropTypes.func.isRequired
  }

  deleteAccount() {
    const { token, removeToken } = this.props
    deleteAccount(this.props.token)
      .then(removeToken)
      .then(() => window.location.reload())
  }
  render() {
    const { visible , onClose} = this.props
    return (
      <Modal
        isOpen={visible}
        toggle={onClose}
      >
        <ModalHeader>
          Confirm Account deletion
        </ModalHeader>
        <ModalBody>
          You are about to delete your account. Are you sure?
        </ModalBody>
        <ModalFooter>
          <Button
            onClick={this.deleteAccount.bind(this)}
            color="danger">
            <Icon name="trash" /> Delete account
          </Button>
          <Button onClick={onClose}>
            <Icon name="remove" /> Cancel
          </Button>
        </ModalFooter>
      </Modal>

    )
  }
}


export default connect(mapStateToProps, null)(DeletePopup)
