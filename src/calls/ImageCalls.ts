import { type ImagesImageDirGetRequest, type PostImageRequest } from '@/api'
import { withAuthHeaderMultiPartFormData } from './ApiUtils'
import { imageApi } from '@/api/apiConfig'


export async function getImage(requestParameters: ImagesImageDirGetRequest): Promise<Blob> {
  const initOverrides = withAuthHeaderMultiPartFormData({
    method: 'GET',
  })

  requestParameters.image = requestParameters.image + '.jpg'

  try {
    return imageApi.imagesImageDirGet(requestParameters, initOverrides)
  } catch (error) {
    throw new Error(`Error getting image ${error}`)
  }
}

export async function postImage(requestParameters: PostImageRequest): Promise<void> {
  const initOverrides = withAuthHeaderMultiPartFormData({
    method: 'POST',
  })
  try {
    await imageApi.postImage(requestParameters, initOverrides)
  } catch (error) {
    throw new Error(`Error uploading image: ${error}`)
  }
}
