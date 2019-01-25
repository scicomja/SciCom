import { select } from 'redux-saga/effects'

export const constructGetQuery = query => {
  const esc = encodeURIComponent
  return Object.keys(query)
   .map(k => `${esc(k)}=${esc(query[k])}`)
   .join('&')
}
export const postJSON = async (url, json) => {
  const response = await fetch(url, {
    method: "POST",
    headers: {
      'Accept': 'application/json',
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
