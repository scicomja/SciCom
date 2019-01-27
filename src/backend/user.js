import { serverURL } from '../constants'
import { constructGetQuery } from '../utils/requests'

export const authorizedPostMultipartForm = async (url, form, jwt) => {
  // prepare form data
  let formData = new FormData()
  Object.keys(form).forEach(field => formData.append(field, form[field]))

  const response = await fetch(url, {
    method: 'post',
    headers: {
      'Authorization': `Bearer ${jwt}`
    },
    body: formData
  })
  return await response.json()
}
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

export const getProject = async (token) => {
  return await authorizedGet(`${serverURL}/project`, token)
}

export const getApplications = async (token) => {
  return await authorizedGet(`${serverURL}/application`, token)
}

export const createProject = async (project, token) => {
  return await authorizedPostMultipartForm(`${serverURL}/project`, project, token)
}
