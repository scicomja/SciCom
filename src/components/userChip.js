import React from 'react'
// import Avatar from 'react-avatar'
import Avatar from '@material-ui/core/Avatar'
import { avatarURL } from '../utils/requests'
import { getName } from '../utils/user'
export default function({
  user,
  avatarSize,
  onClick,
  style: customStyle}) {
  const { username, avatar } = user
  console.log(`avatar`, avatar, `username`, username)
  return (
    <div onClick={onClick} style={{...style.container, ...customStyle}}>
      <Avatar style={style.avatar} round size={avatarSize || 16}
        src={avatarURL({username})}
        alt={!avatar && getName(user)} />
      {getName(user)}
    </div>
  )
}

const style = {
  container: {
    display: 'flex',
    height: 16,
    alignItems: 'center',
    cursor: "pointer"
  },
  avatar: {
    marginRight: 8
  }
}
