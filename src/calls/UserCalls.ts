import { type GetUserRequest, type UpdatePasswordOperationRequest, type UpdateUserRequest, type UserOut } from '@/api'
import { withAuthHeaderApplicationJson } from './ApiUtils'
import { userApi } from '@/api/apiConfig'


export async function getUserWithAuth(requestParameters: GetUserRequest): Promise<UserOut> {
  const initOverrides = withAuthHeaderApplicationJson({
    method: 'GET',
  })
  try {
    return await userApi.getUser(requestParameters, initOverrides)
  } catch (error) {
    throw new Error(`Error getting user ${error}`)
  }
}

export async function upsateUserWithAuth(requestParameters: UpdateUserRequest) {
  const initOverrides = withAuthHeaderApplicationJson({
    method: 'PUT',
  })
  try {
    return await userApi.updateUser(requestParameters, initOverrides)
  } catch (error) {
    throw new Error(`Error updating user ${error}`)
  }
}

export async function updatePassword(requestParameters: UpdatePasswordOperationRequest) {
  const initOverrides = withAuthHeaderApplicationJson({
    method: 'PUT',
  })
  try {
    return await userApi.updatePassword(requestParameters, initOverrides)
  } catch (error) {
    throw new Error(`Error updating user ${error}`)
  }
}
