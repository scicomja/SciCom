import React from 'react'
import Avatar from 'react-avatar'
export default function({
  user,
  avatarSize,
  onClick,
  style: customStyle}) {
  return (
    <div onClick={onClick} style={{...style.container, ...customStyle}}>
      <Avatar style={style.avatar} round size={avatarSize || 16} name={user.username} />
      {user.username}
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
