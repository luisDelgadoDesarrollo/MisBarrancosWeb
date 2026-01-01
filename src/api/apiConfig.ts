import { Configuration } from './runtime'
import { AdApi, CanyonApi, ImageApi, MessageApi, ReviewApi, UserApi } from './apis'

const apiConfig = new Configuration({
  basePath: import.meta.env.VITE_API_BASE_URL
})

export const adApi = new AdApi(apiConfig)
export const canyonApi = new CanyonApi(apiConfig)
export const imageApi = new ImageApi(apiConfig)
export const messageApi = new MessageApi(apiConfig)
export const reviewApi = new ReviewApi(apiConfig)
export const userApi = new UserApi(apiConfig)
