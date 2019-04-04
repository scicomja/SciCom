import React from 'react'
import Avatar from '@material-ui/core/Avatar'
import { withRouter } from 'react-router-dom'
import {
  avatarURL
} from '../utils/requests'

import {
  defaultIconPath
} from '../constants'

/*
  An avatar component for an individual user
*/
function AvatarComponent({
  size = 32,
  history,
  onClick,
  user,
  src,
  style: customStyle,
  ...props
}) {
  const { username, avatar } = user
  return (
    <Avatar
      style={{...customStyle, width: size, height: size}}
      onClick={onClick || (() => history.push(`/user/${username}`))}
      src={
        src || (avatar?avatarURL({username}):defaultIconPath)
      }
      {...props}
    />
  )
}

export default withRouter(AvatarComponent)
