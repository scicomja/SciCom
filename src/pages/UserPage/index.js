import React from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import Avatar from 'react-avatar'
import {
  getUser,
  getProject,
  getApplications,
  getProjectsOfUser,
  authorizedGetFile
} from '../../backend/user'
import { serverURL } from '../../constants'
import { authorizedRequestGet } from '../../utils/requests'
import { avatarURL } from '../../utils/requests'
import { getName } from '../../utils/user'
import ContentBox from '../../components/contentBox'
import {
  Button,
  Card,CardTitle, CardText
} from 'reactstrap'
import StatisticCell from './statisticCell'
import ProjectStatusBadge from '../../components/projectStatusBadge'
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
      isUserHimself: true,
      projects: []
    }
  }
  async componentDidMount() {
    const { user_id = this.props.user.username } = this.props.match.params
    this.setState({ isUserHimself: user_id == this.props.user.username})
      try {
        let user = await getUser(user_id,this.props.token)
        if(!user) {
          // no such user, return to home page
          this.props.history.push('/home')
          return
        }
        this.setState({
          user
        })
        let projects = await getProjectsOfUser(user.username, this.props.token)
        this.setState({
          user: {...this.state.user, projects}
        })
      } catch(err) {
        this.props.history.push('/home')
      }
  }
  // download CV given the username
  // authorized by the token of the current user
  downloadCV({username}) {
    const { token } = this.props
    authorizedGetFile(`${serverURL}/user/${username}/CV.pdf`, token)
  }

  headerBar(user) {
    const {avatar, CV, username} = user
    const name = getName(user)

    return (
      <div className="bg-secondary" style={style.coverPhoto}>
        <div style={style.avatarContainer}>
          <div style={style.avatarWrapper}>
            <Avatar
              size={avatarSize}
              round
              style={style.avatar}
              src={avatarURL({ username })}
              name={name}
            />
          </div>
          <div style={style.primaryInfo}>
            <div style={style.primaryInfoItem}>
              <h2 style={style.name}> {name}</h2>
                {this.state.isUserHimself && (
                  <div>
                    <Button
                      href="/editInfo"
                      style={style.editButton}
                      color="primary">
                       Edit Profile
                   </Button>
                  </div>
                )}
                {
                  CV && (
                    <div>
                      <Button
                        onClick={() => this.downloadCV(user)}
                        >
                        <IconComponent name="download" /> CV
                      </Button>
                    </div>
                  )
                }
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
      phone, email, website, linkedIn
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
                linkedIn && contactItem("linkedin", linkedIn)
              }
              {
                website && contactItem("globe", website)
              }

            </div>

          </CardText>
        </Card>
        {this.getStatisticComponents()}
      </div>
    )
  }
  getStatisticComponents() {
    const { user } = this.state
    if(!user) return null
    const { projects } = user
    if(!projects) return null
    const completedProjectCount =
      projects.filter(p => p.status == 'completed').length
    const activeProjectCount =
      projects.filter(p => p.status == 'active').length
    return (
        <Card
          style={style.statistics}
          body inverse color="primary">
          <CardTitle>
            <IconComponent name="line-chart" />
            {' '}
            Statistics
          </CardTitle>
          <CardText>
            <StatisticCell
              icon="refresh"
              name="Active"
              count={activeProjectCount}
            />
            <StatisticCell
              icon="check-circle"
              name="Completed"
              count={completedProjectCount}
            />
          </CardText>
        </Card>
    )
  }
  render() {
    const user = this.state.user || this.props.user
    if(!user) {
      // this.props.history.push('/')
      return null
    }
    return (
      <div style={style.container}>
        {this.headerBar(user)}

        {this.contact(user)}

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
    display: 'flex'
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
  statistics: {
    maxWidth: '20%',
    marginLeft: 16
  }
}

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(UserPage)
)
