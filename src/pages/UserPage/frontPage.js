import React from 'react'
import CenterNotice from '../../components/centerNotice'
import {
  TabContent, TabPane, Nav, NavItem, NavLink,
  Card, Button, CardTitle, CardText, Row, Col
} from 'reactstrap'
import ProjectCard from '../../components/projectCard'
import UserChip from '../../components/userChip'

import classnames from 'classnames'

export default class FrontPage extends React.Component {
  constructor(props) {
    super(props)
    // for studnets only
    this.state = {
      activeTab: "bookmark"
    }

  }
  // politicians' components
  noProjectCreated() {
    return (
      <CenterNotice
        title="No projects created"
      />
    )
  }
  projectList(projects) {
    return (
      <div style={style.content}>
        <h3 style={style.contentHeader}>
          <b> Projects </b>
        </h3>
        {projects.map(p => (
          <ProjectCard
            project={p}
            key={p._id}
            isOwner={true} />
        ))}
      </div>
    )
  }

  // studnets' components
  bookmarkTab(bookmarks) {
    if(!bookmarks || !bookmarks.length) {
      return (
        <CenterNotice title="No bookmarks found" />
      )
    }
    return (
      <div style={style.content}>
        <h3 style={style.contentHeader}>
          <b> Bookmarks </b>
        </h3>
        {bookmarks.map(p => (
          <ProjectCard
            project={p}
            key={p._id}
            isOwner={false} />
        ))}
      </div>
    )
  }
  applicationTab(applications) {
    if(!applications || !applications.length) {
      return (
        <CenterNotice title="No applications found" />
      )
    }
    return (
      <CenterNotice title="To be done" />
    )
  }
  navTab(name) {
    return (
      <NavItem>
        <NavLink
          className={classnames({ active: this.state.activeTab === name })}
          onClick={() => this.setState({activeTab: name}) }
        >
          {name.toUpperCase()}
        </NavLink>
      </NavItem>
    )
  }
  render() {
    const {
      isPolitician,
      bookmarks,
      applications,
      projects
    } = this.props.user

    if(isPolitician) {
      if(!projects || !projects.length) {
        return this.noProjectCreated()
      } else {
        return this.projectList(projects)
      }
    }
    // students' front page
    if(!this.props.isUserHimself)
    return (
      <div style={style.container}>
        <Nav tabs>
          {this.navTab("bookmark")}
          {this.navTab("application")}
        </Nav>
        <TabContent activeTab={this.state.activeTab}>
          <TabPane tabId="bookmark">
            {this.bookmarkTab(bookmarks)}
          </TabPane>
          <TabPane tabId="application">
            {this.applicationTab(applications)}
          </TabPane>
        </TabContent>
      </div>
    )
    else {
      return null
    }
  }
}
const style = {
  container: {
    padding: 16
  },
  contentHeader: {
    width: '100%'
  },
  content: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    flexWrap: 'wrap',
    margin: 16
  }
}
