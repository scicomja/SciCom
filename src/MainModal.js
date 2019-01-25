import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import {
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter
} from 'reactstrap'
import * as ModalActions from './actions/modal'
class MainModal extends React.Component {
  getHeader() {
    return "modal header"
  }
  render() {
    return (
      <Modal
        isOpen={!!this.props.mode}
        toggle={this.props.close}>
        <ModalHeader toggle={this.props.close}>
          {this.getHeader()}
        </ModalHeader>
      </Modal>
    )
  }
}

const mapStateToProps = state => ({
  ...state.modal
})
const mapDispatchToProps = dispatch => ({
  close: () => dispatch({
    type: ModalActions.SET_MODAL_TYPE,
    mode: null
  })
})
export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(MainModal)
)
