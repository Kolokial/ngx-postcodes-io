import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { PostcodeResponse } from './models/Responses/PostcodeResponse';
import { QueryResponse } from './models/Responses/QueryResponse';
import { BulkLookupRequest } from './models/Requests/BulkLookupRequest';
import { BulkLookupResponse } from './models/Responses/BulkLookupResponse';
import { BulkLookupFilter } from './models/BulkLookupFilter';
import { AutoCompleteResponse } from './models/Responses/AutoCompleteResponse';
import { NearestResponse } from './models/Responses/NearestResponse';
import { FindNearestPostcodeOptionalParameters } from './models/OptionalParameters/FindNearestPostcodeOptionalParameters';
import { ReverseGeocodeOptionalParameters } from './models/OptionalParameters/ReverseGeocodeOptionalParameters';
import { PostcodeDistance } from './models/PostcodeDistance';
import { BulkReverseGeocodeRequest } from './models/Requests/BulkReverseGeocodeRequest';
import { BulkReverseGeocodeOptionalParameters } from './models/OptionalParameters/BulkReverseGeocodeOptionalParameters';

@Injectable({
  providedIn: 'root',
})
export class PostcodesIoTsLibService {
  private _apiUrl: string = 'https://api.postcodes.io';
  public get apiUrl(): string {
    return this._apiUrl;
  }

  private readonly maxLimit: number = 10;
  constructor(private _http: HttpClient) {}

  public lookupPostcode(postcode: string): Observable<PostcodeResponse> {
    const url = `${this._apiUrl}/postcodes/${postcode}`;
    console.debug(`Calling ${url}`);
    return this._http.get<PostcodeResponse>(url);
  }

  public queryPostCode(
    postcode: string,
    limit?: number
  ): Observable<QueryResponse> {
    let requestUrl = `${this._apiUrl}/postcodes/?q=${postcode}`;
    if (limit) {
      requestUrl += `&limit=${Number(limit)}`;
    }
    return this._http.get<QueryResponse>(requestUrl);
  }

  public bulkLookup(
    postcodes: string[],
    filters: BulkLookupFilter[] = []
  ): Observable<BulkLookupResponse> {
    const request: BulkLookupRequest = {
      postcodes: postcodes,
    };
    let requestUrl = `${this._apiUrl}/postcodes`;

    if (filters.length > 0) {
      requestUrl += `?filter=${filters.join(',')}`;
    }
    return this._http.post<BulkLookupResponse>(requestUrl, request, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }

  public getRandomPostCodes(
    filterOutcode: string[] = []
  ): Observable<PostcodeResponse> {
    let requestUrl = `${this._apiUrl}/random/postcodes`;
    if (filterOutcode.length > 0) {
      requestUrl += `?outcode=${filterOutcode.join(',')}`;
    }

    return this._http.get<PostcodeResponse>(requestUrl);
  }

  public autoComplete(
    postcode: string,
    limit?: number
  ): Observable<AutoCompleteResponse> {
    let requestUrl = `${this.apiUrl}/postcodes/${encodeURI(
      postcode
    )}/autocomplete`;
    if (limit) {
      requestUrl += `?limit=${Number(limit)}`;
    }

    return this._http.get<AutoCompleteResponse>(requestUrl);
  }

  public findNearestPostcode(
    postcode: string,
    params?: FindNearestPostcodeOptionalParameters
  ): Observable<NearestResponse> {
    let requestUrl = `${this._apiUrl}/postcodes/${encodeURI(postcode)}/nearest`;

    requestUrl += !this.isEmpty(params)
      ? `?${this.buildQueryString(params)}`
      : '';

    return this._http.get<NearestResponse>(requestUrl);
  }

  public reverseGeocodePostcode(
    lat: number,
    lon: number,
    params?: ReverseGeocodeOptionalParameters
  ): Observable<PostcodeDistance> {
    let requestUrl = `${this._apiUrl}/postcodes?lon=${lon}&lat=${lat}`;

    requestUrl += !this.isEmpty(params)
      ? `&${this.buildQueryString(params)}`
      : '';

    return this._http.get<PostcodeDistance>(requestUrl);
  }

  public bulkReverseGeocodePostcode(
    request: BulkReverseGeocodeRequest,
    params?: BulkReverseGeocodeOptionalParameters
  ): Observable<BulkLookupResponse> {
    let requestUrl = `${this._apiUrl}/postcodes`;
    let newParams;

    if (!this.isEmpty(params)) {
      if (params?.filter) {
        const filter = params.filter.join(',');
        delete params['filter'];
        newParams = { ...params, filter: filter };
      }
      requestUrl += `?${this.buildQueryString(newParams ?? params)}`;
    }

    return this._http.post<BulkLookupResponse>(requestUrl, request);
  }

  private isEmpty(obj: any): boolean {
    for (const prop in obj) {
      if (Object.hasOwn(obj, prop)) {
        return false;
      }
    }

    return true;
  }

  private buildQueryString<T extends Object>(obj: T | undefined): string {
    if (!obj) {
      return '';
    }

    return new URLSearchParams(Object.entries(obj)).toString();
  }
}
