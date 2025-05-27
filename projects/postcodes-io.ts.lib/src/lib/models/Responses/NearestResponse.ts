import { PostcodeDistance } from '../PostcodeDistance';

export interface NearestResponse {
  status: number;
  result: PostcodeDistance[];
}
