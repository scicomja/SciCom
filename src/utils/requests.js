import { select } from 'redux-saga/effects'
import { serverURL } from '../constants'
export const constructGetQuery = query => {
  const esc = encodeURIComponent
  return Object.keys(query)
   .map(k => `${esc(k)}=${esc(query[k])}`)
   .join('&')
}
export const postJSON = async (url, json, token = null) => {
  const response = await fetch(url, {
    method: "POST",
    headers: {
      'Accept': 'application/json',
      "Authorization": `Bearer ${token}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(json)
  })
  return await response.json()
}

export function* authorizedRequestGet(url, params = {}) {
  const jwt = yield select(state => state.auth.token)
  if(Object.keys(params).length > 0) {
    url = `${url}?${constructGetQuery(params)}`
  }
  const response = yield fetch(url, {
    headers: {
      'Authorization': `Bearer ${jwt}`
    }
  })
  return yield response.json()
}

export const avatarURL = ({username}) => {
  const url = `${serverURL}/user/${username}/avatar`
  console.log(`avatar url:`, url)
  return url
}
export const cvURL = ({username}) => `${serverURL}/user/${username}/CV.pdf`
