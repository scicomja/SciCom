import React from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import Avatar from 'react-avatar'
import {
  getUser,
  getProject,
  getApplications,
  getProjectsOfUser,
} from '../../backend/user'
import { authorizedRequestGet } from '../../utils/requests'
import ContentBox from '../../components/contentBox'
import {
  Button,
  Card,CardTitle, CardText
} from 'reactstrap'
import ProjectStatusBadge from '../../components/projectStatusBadge'
import FrontPage from './frontPage'
import { Icon } from '../../constants'
import IconComponent from '../../components/icon'
import * as ModalActions from '../../actions/modal'
/*
  User profile page
  display info of the particular user
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
    this.state = {
      user: null,
      isUserHimself: true
    }
  }
  async componentDidMount() {
    const { user_id } = this.props.match.params
    const { isPolitician } = this.props.user
    if(user_id && user_id != this.props.user.username) {
      this.setState({ isUserHimself: false})
      try {
        let user = await getUser(user_id,this.props.token)
        if(!user) {
          this.props.history.push('/')
          return
        }
        this.setState({
          user
        })
        // if you are looking at a politician, give the list of projects as well
        if (user.isPolitician) {
          let projects = await getProjectsOfUser(user.username, this.props.token)
          this.setState({
            user: {...this.state.user, projects}
          })
        }
        // TODO: this
        // if(!isPolitician && user.isPolitician) {
        //   let projects = await getProject()
        // }
      } catch(err) {
        this.props.history.push('/')
      }
    } else {
      // it's the user himself
      const { isPolitician } = this.props.user
      if(isPolitician) {
        let projects = await getProject(this.props.token)
        console.log('projects',projects)
        this.setState({
          user: {
            ...this.props.user, projects
          }
        })
      } else {
        // bookmark is already there, go for applications
        let applications = await getApplications(this.props.token)
        this.setState({
          user: {
            ...this.props.user, applications
          }
        })
      }
    }

  }
  getName(user) {
    const { firstName, lastName, username } = user
    if(!firstName && !lastName) return username
    if(firstName && lastName) return `${firstName} ${lastName}`
    return firstName?firstName:lastName
  }

  headerBar(user) {
    const {avatar} = user
    const name = this.getName(user)
    let avatarConfig
    if(avatar) avatarConfig = {'src': avatar}
    else avatarConfig = {'name': name}

    return (
      <div className="bg-secondary" style={style.coverPhoto}>
        <div style={style.avatarContainer}>
          <div style={style.avatarWrapper}>
            <Avatar
              size={avatarSize}
              round
              style={style.avatar}
              {...avatarConfig}
            />
          </div>
          <div style={style.primaryInfo}>
            <div style={style.primaryInfoItem}>
              <h2 style={style.name}> {name}</h2>
                {this.state.isUserHimself && (
                  <div>
                    <Button
                      style={style.editButton}
                      color="primary">
                       Edit Profile
                   </Button>
                  </div>
                )}
            </div>
            <div style={style.primaryInfoItem}>
              <h5 style={style.title}>{user.title}</h5>
            </div>
          </div>
        </div>

      </div>
    )
  }

  contact(user) {
    const {
      phone, email, website, linkedin
    } = user
    const contactItem = (iconName, content) => (
      <div style={style.contactItem}>
        <IconComponent style={style.contactIcon}
          name={iconName} />
        {content}
      </div>
    )
    return (
      <div style={style.contact}>
        <Card body>
          <CardTitle>
            <IconComponent
              style={style.contactIcon}
              name="address-book"
            />
          <b>Contact information</b>
          </CardTitle>
          <CardText>
            <div style={style.contactContainer}>
              {
                email && contactItem(Icon["email"], email)
              }
              {
                phone && contactItem(Icon["phone"], phone)
              }
              {
                linkedin && contactItem(Icon["linkedin"], linkedin)
              }
              {
                website && contactItem(Icon["website"], website)
              }

            </div>

          </CardText>
        </Card>
      </div>
    )
  }
  render() {
    const user = this.state.user || this.props.user
    if(!user) {
      this.props.history.push('/')
      return null
    }
    return (
      <div style={style.container}>
        {this.headerBar(user)}
        {this.contact(user)}
        <FrontPage user={user}
          isUserHimself={user.username === this.props.user.username}
        />
      </div>
    )
  }
}

const mapStateToProps = state => ({
  user: state.auth.user,
  token: state.auth.token
})

const mapDispatchToProps = dispatch => ({

})

const coverPhotoHeight = 120
const avatarSize = 96
const style = {
  coverPhoto: {
    height: coverPhotoHeight,
    marginBottom: avatarSize / 2 + 16,
    paddingTop: coverPhotoHeight - avatarSize / 2,
  },
  avatarContainer: {
    height: avatarSize,
    marginLeft: 30,
    display: 'flex'
  },
  avatarWrapper: {
    width: avatarSize,
    // flex: `0 0 ${avatarSize}px`,
  },
  primaryInfo: {
    // flex: 1,
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    paddingLeft: 16
  },
  primaryInfoItem: {
    flex: 1,
    display: 'flex',
    flexDirection: 'row'
  },
  name: {
    color: 'white',
    paddingRight: 16
  },
  editButton: {
  },
  title: {
    color: 'gray',
    left: 150
  },
  contact: {
    margin: 32,
    marginTop: avatarSize / 2,
  },
  contactItem: {
    // flex: '0 0 50vw',
    width: '50%',
  },
  contactContainer: {
    display: 'flex',
    flexWrap: 'wrap',
    alignItems: 'space-between'
  },
  contactIcon: {
    margin: 8
  },

}

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(UserPage)
)
