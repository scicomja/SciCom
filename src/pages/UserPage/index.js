import React from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import Avatar from 'react-avatar'
/*
  User profile page
  display info of the particular user
  TODO: get the identity of the user!
*/
class UserPage extends React.Component {
  /*
    Header bar consist of...
      - Cover photo (background color)
      - Avatar
      - Name on top of it
      - Title of the politician / PHD
      - contact methods

  */
  constructor(props) {
    super(props)
  }
  getName() {
    const { firstName, lastName, username } = this.props.user
    if(!firstName && !lastName) return username
    if(firstName && lastName) return `${firstName} ${lastName}`
    return firstName?firstName:lastName
  }
  headerBar() {
    const {avatar} = this.props.user
    let avatarConfig
    if(avatar) avatarConfig = {'src': avatar}
    else avatarConfig = {'name': this.getName()}

    return (
      <div className="bg-secondary" style={style.coverPhoto}>
        <Avatar round style={style.avatar} {...avatarConfig} />
        <h2 style={style.name}> {this.getName()} </h2>
        <h5 style={style.title}> {this.props.user.title} </h5>
      </div>
    )
  }
  render() {
    if(!this.props.user) {
      this.props.history.push('/')
      return null
    }
    return (
      <div style={style.container}>
        {this.headerBar()}
      </div>
    )
  }
}

const mapStateToProps = state => ({
  user: state.auth.user
})
const coverPhotoHeight = 200
const style = {
  coverPhoto: {
    height: coverPhotoHeight
  },
  name: {
    color: 'white',
    position: 'absolute',
    top: coverPhotoHeight,
    left: 150
  },
  title: {
    color: 'gray',
    position: 'absolute',
    top: 1.3 * coverPhotoHeight,
    left: 150
  },
  avatar: {
    position: 'absolute',
    top: coverPhotoHeight,
    left: 30
  }
}
export default withRouter(
  connect(mapStateToProps, null)(UserPage)
)
