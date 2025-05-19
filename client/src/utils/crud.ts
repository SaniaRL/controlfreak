import { UpdatePayload } from '../types/data/UpdatePayload'
import { API, BASE_URL } from '../constants/api'

export const apiEndpoint = (x: UpdatePayload): string => {
  const type = x.type
  const id = x.id
  const property = apiProperty(x)

  const segments = [ BASE_URL, API, type, id, property ].filter(Boolean)

  return segments.join('/')
}

export const apiValue = (x: UpdatePayload) => {
  return x.includePropertyInUrl 
    ? x.updates 
      ? Object.values(x.updates)[0] 
      : undefined
    : x.updates
}

export const apiProperty = (x: UpdatePayload) => {
  return x.includePropertyInUrl
    ? x.updates ? Object.keys(x.updates)[0] : undefined
    : undefined
}
