import {
  authorizedGet
} from './user'
import {
  serverURL
} from '../constants'
export const searchUser = async (params, token, page = 1) => {
  return await authorizedGet(`${serverURL}/users/`, token,
    {
      ...params,
      page
    })
}

export const searchProject = async (params, token, page = 1) => {
  return await authorizedGet(`${serverURL}/project/`, token,
    {
      ...params,
      page
    })
}
