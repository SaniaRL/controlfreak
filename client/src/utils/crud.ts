import { UpdatePayload } from '../types/data/UpdatePayload'
import { API, BASE_URL } from '../constants/api'

export const apiEndpoint = (updates: UpdatePayload): string => {

  const type = updates.type
  const id = updates.id
  const method = updates.CRUD
  const property = apiProperty(updates)

  const segments = [ BASE_URL, API, type, method, id, property ].filter(Boolean)

  return segments.join('/')
}

export const apiValue = (updates: UpdatePayload) => {
  return updates.includePropertyInUrl 
    ? updates.updates 
      ? Object.values(updates.updates)[0] 
      : undefined
    : updates.updates
}

export const apiProperty = (updates: UpdatePayload) => {
  return updates.includePropertyInUrl
    ? updates.updates ? Object.keys(updates.updates)[0] : undefined
    : undefined
}
