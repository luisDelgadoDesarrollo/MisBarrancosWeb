import type { SimpleUser } from '@/api'

export interface MessageCardInfo {
  messageId?: number
  placeId?: number
  message?: string
  date?: Date
  flow?: number
  temperature?: number
  user?: SimpleUser
}
