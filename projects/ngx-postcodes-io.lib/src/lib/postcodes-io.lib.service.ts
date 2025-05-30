import { Injectable } from '@angular/core'
import { Observable } from 'rxjs'
import { HttpClient } from '@angular/common/http'
import { PostcodeResponse } from './models/Responses/PostcodeResponse'
import { QueryResponse } from './models/Responses/QueryResponse'
import { BulkLookupRequest } from './models/Requests/BulkLookupRequest'
import { BulkLookupResponse } from './models/Responses/BulkLookupResponse'
import { BulkLookupFilter } from './models/BulkLookupFilter'
import { AutoCompleteResponse } from './models/Responses/AutoCompleteResponse'
import { NearestResponse } from './models/Responses/NearestResponse'
import { FindNearestPostcodeOptionalParameters } from './models/OptionalParameters/FindNearestPostcodeOptionalParameters'
import { ReverseGeocodeOptionalParameters } from './models/OptionalParameters/ReverseGeocodeOptionalParameters'
import { PostcodeDistance } from './models/PostcodeDistance'
import { BulkReverseGeocodeRequest } from './models/Requests/BulkReverseGeocodeRequest'
import { BulkReverseGeocodeOptionalParameters } from './models/OptionalParameters/BulkReverseGeocodeOptionalParameters'

@Injectable({
  providedIn: 'root',
})
export class PostcodesIoTsLibService {}
