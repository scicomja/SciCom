import { serverURL } from '../constants'
import { constructGetQuery } from '../utils/requests'

export const authorizedGet = async (url, jwt, params = {}) => {
  if(Object.keys(params).length > 0) {
    url = `${url}?${constructGetQuery(params)}`
  }
  const response = await fetch(url, {
    headers: {
      'Authorization': `Bearer ${jwt}`
    }
  })
  if (response.status !== 200) {
    return null
  }
  return await response.json()
}

export const getUser = async (username, token) => {
  return await authorizedGet(`${serverURL}/user/${username}`, token)
}
