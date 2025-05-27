import { PostcodeResult } from './PostcodeResult';

export type BulkLookupFilter = Exclude<keyof PostcodeResult, 'codes'>;
