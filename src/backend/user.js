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
export const authorizedPost = async (url, json, jwt) => {
  const response = await fetch(url, {
    method: 'post',
    headers: {
      'Authorization': `Bearer ${jwt}`

    },
    body: JSON.stringify(json)
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

export const getProjectById = async (id, token) => {
  return await authorizedGet(`${serverURL}/project/${id}`, token)
}
export const getApplications = async (token) => {
  return await authorizedGet(`${serverURL}/application`, token)
}

export const createProject = async (project, token) => {
  return await authorizedPostMultipartForm(`${serverURL}/project`, project, token)
}

export const modifyProject = async (project, token) => {
  const { _id: id} = project
  if(!id) return
  return await authorizedPostMultipartForm(`${serverURL}/project/${id}`, project, token)
}

export const closeProject = async (project, token) => {
  const { _id: id} = project
  if(!id) return
  return await authorizedPost(`${serverURL}/project/close/${id}`, null, token)
}

export const openProject = async (project, token) => {
  const { _id: id} = project
  if(!id) return
  return await authorizedPost(`${serverURL}/project/open/${id}`, null, token)
}

export const applyProject = async (project, token) => {
  const { _id: id} = project
  if(!id) return
  return await authorizedPost(`${serverURL}/project/apply/${id}`, null, token)
}

export const toggleBookmarkProject = async (project, token) => {
  const { _id: id} = project
  if(!id) return
  console.log(`${serverURL}/project/bookmark/${id}`)
  return await authorizedPost(`${serverURL}/project/bookmark/${id}`, null, token)
}

export const getProjectsOfUser = async (username, token) => {
  return await authorizedGet(`${serverURL}/user/${username}/projects`, token)
}

export const acceptApplication = async (appId, token) => {
  return await authorizedPost(`${serverURL}/application/${appId}/accept`, null, token)
}

export const rejectApplication = async (appId, token) => {
  return await authorizedPost(`${serverURL}/application/${appId}/reject`, null, token)
}

export const searchProject = async (searchParams, token) => {
  return await authorizedGet(`${serverURL}/project`, token, searchParams)
}

export const searchUser = async (searchParams, token) => {
  return await authorizedGet(`${serverURL}/user`, token, searchParams)
}
