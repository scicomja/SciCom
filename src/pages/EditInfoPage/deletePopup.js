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
import { withRouter } from 'react-router-dom'
import { LOGOUT } from '../../actions/auth'

const mapStateToProps = state => state.auth
const mapDispatchToProps = dispatch => ({
  logout: () => dispatch({
    type: LOGOUT
  })
})
class DeletePopup extends React.Component {

  static propTypes = {
    visible: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    token: PropTypes.string.isRequired,
    logout: PropTypes.func.isRequired,
    history: PropTypes.object.isRequired
  }

  deleteAccount() {
    const { token, logout, history } = this.props
    deleteAccount(token)
      .then(logout())
      // .then(() => history.push('/'))
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
            href="/"
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


export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(DeletePopup)
)
