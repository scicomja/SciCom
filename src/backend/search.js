import {
  authorizedGet
} from './user'
import {
  serverURL
} from '../constants'

export const searchUser = async (params, token, page = 1) => {
  return await authorizedGet(`${serverURL}/user/`, token,
    {
      ...params,
      page
    })
}

export const searchProject = async (params, token, page = 1) => {
  console.log('search with payload', params)
  return await authorizedGet(`${serverURL}/project/`, token,
    {
      ...params,
      page
    })
}
