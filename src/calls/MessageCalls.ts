import {
  type MessageOut,
  type PostMessageRequest,
  type UpdateMessageRequest,
} from '@/api'
import { withAuthHeaderApplicationJson } from './ApiUtils'
import { messageApi } from '@/api/apiConfig'


export async function postMessage(requestParameters: PostMessageRequest): Promise<MessageOut> {
  const initOverrides = withAuthHeaderApplicationJson({
    method: 'POST',
  })
  try {
    return await messageApi.postMessage(requestParameters, initOverrides)
  } catch (error) {
    throw new Error(`Error uploading image: ${error}`)
  }
}

export async function updateMessage(requestParameters: UpdateMessageRequest): Promise<MessageOut> {
  const initOverrides = withAuthHeaderApplicationJson({
    method: 'PUT',
  })
  try {
    return await messageApi.updateMessage(requestParameters, initOverrides)
  } catch (error) {
    throw new Error(`Error uploading image: ${error}`)
  }
}
