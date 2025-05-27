import { PostcodeResult } from '../PostcodeResult'

export interface BulkLookupResponse {
  status: number
  result: { query: string; result: PostcodeResult }[]
}
