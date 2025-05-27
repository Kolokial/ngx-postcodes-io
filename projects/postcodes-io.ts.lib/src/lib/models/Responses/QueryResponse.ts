import { PostcodeResult } from '../PostcodeResult';

export interface QueryResponse {
  status: number;
  result: PostcodeResult[];
}
