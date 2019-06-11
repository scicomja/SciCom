import React from 'react'
import {
  Row, Col, Button
} from 'reactstrap'
import PropTypes from 'prop-types'
import Avatar from '../../components/Avatar'
import Icon from '../../components/icon'
import { getName } from '../../utils/user'

export default class UserInfo extends React.Component {
  static propTypes = {
    onCreateProject: PropTypes.func.isRequired,
    onEditInfo: PropTypes.func.isRequired,
  }

  constructor(props) {
    super(props)

    const { isPolitician } = props.user
    this.fields = 'email,phone,state,city,PLZ'
    if(isPolitician) {
      this.fields += ",workingPhone,party,position,duty"
    } else {
      this.fields += ",university,semester"
    }

    this.fieldNameDict = {
      workingPhone: "Phone (Office)",
      position: "Political Position",
      duty: "Job Duty"
    }
  }
  infoDetailRow({ name, value }) {
    return (
      <div style={style.infoDetailContainer}>
        <div style={style.infoName}>
          {this.fieldNameDict[name] || name}:
        </div>
        <div style={style.infoDetail}>
          {value || '--'}
        </div>
      </div>
    )
  }
  getUserInfoFieldNames() {
    // const { isPolitician } = this.props.user
    // let fields = 'email,phone,state,city,PLZ'
    //
    // if(isPolitician) {
    //   fields += ",workingPhone,party,position,duty"
    // } else {
    //   fields += ",semester"
    // }
    return this.fields.split(',')
  }
  render() {
    const { user } = this.props
    // alert(JSON.stringify(user))
    return (
      <div style={style.container}>
        <Row>
            <Avatar
              size={96}
              user={user}
            />
          <Col style={style.nameColumn}>
            <Row>
              <div style={style.name}>
                {getName(user)}
              </div>
            </Row>
            <Row>
              <a style={style.editInfoLink} href="/editInfo">
                <Icon name="edit" />
                Profil bearbeiten
              </a>
            </Row>
          </Col>
          {
            user.isPolitician && (
              <Col style={style.createProjectContainer}>
                <Button
                  block
                  color="primary"
                  onClick={this.props.onCreateProject}
                >
                  Create Projects
                </Button>
              </Col>
            )
          }
        </Row>
        <Row>
          <div style={style.infoDetailMainContainer}>
            {
              this.getUserInfoFieldNames()
                .map(info => this.infoDetailRow({
                  name: info,
                  value: user[info]
                }))
            }
          </div>
        </Row>
      </div>
    )
  }
}

const style = {
  infoDetailMainContainer: {
    display: 'flex',
    flexWrap: 'wrap',
    width: '100%'
  },
  nameColumn: {
    paddingLeft: 32,

    display: 'flex',
    flexDirection: 'column',
    justifyContent: "space-between"
  },
  container: {
    padding: 16
  },
  name: {
    fontSize: 48,
  },
  createProjectContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center'
  },
  editInfoLink: {},
  infoDetailContainer: {
    width: '50%',
    display: 'flex',
    padding: 16,
    fontSize: 26,
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  infoName: {
    fontWeight: 'bold',
    textTransform: 'capitalize'
  },

  infoDetail: {
    textOverflow: 'ellipsis'
  }
}
