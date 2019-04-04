import React from 'react'
// import Avatar from 'react-avatar'
import Avatar from './Avatar'
import { avatarURL } from '../utils/requests'
import { getName } from '../utils/user'
export default function({
  user,
  avatarSize,
  onClick,
  style: customStyle}) {
  if(!user) return null
  const { username, avatar } = user
  console.log(`avatar`, avatar, `username`, username)
  return (
    <div onClick={onClick} style={{...style.container, ...customStyle}}>
      <Avatar user={user} size={avatarSize}/>
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
