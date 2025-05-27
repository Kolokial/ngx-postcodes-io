import { PostcodeDistance } from '../PostcodeDistance'

export interface BulkReverseGeocodeResponse {
  status: number
  result: {
    query: {
      longitude: number
      latitude: number
    }
    result: PostcodeDistance[]
  }[]
}
