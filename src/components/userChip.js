import React from 'react'
import Avatar from 'react-avatar'
export default function({user}) {
  return (
    <div style={style.container}>
      <Avatar style={style.avatar} round size={16} name={user.username} />
      {user.username}
    </div>
  )
}

const style = {
  container: {
    display: 'flex',
    height: 16,
    alignItems: 'center'
  },
  avatar: {
    marginRight: 8
  }
}
