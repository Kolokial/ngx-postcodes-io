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
export class PostcodesIoTsLibService {
  private _apiUrl: string = 'https://api.postcodes.io'
  public get apiUrl(): string {
    return this._apiUrl
  }

  private readonly maxLimit: number = 10
  constructor(private _http: HttpClient) {}

  /**
   * This endpoint allows you to retrieve detailed information about a UK postcode.
   * A successful request returns HTTP status code 200 and a JSON object containing comprehensive postcode data.
   * If the postcode is not found, the API returns a 404 response.
   * For more details, see the {@link https://postcodes.io/docs/api/lookup-postcode|API Documentation}.
   * @param postcode The postcode to lookup
   * @return - {@link PostcodeResponse} wrapped in an {@link Observable}
   */
  public lookupPostcode(postcode: string): Observable<PostcodeResponse> {
    const url = `${this._apiUrl}/postcodes/${postcode}`
    console.debug(`Calling ${url}`)
    return this._http.get<PostcodeResponse>(url)
  }

  /**
   * Search for postcodes that match a given query string. Returns a list of matching postcodes with their associated data.
    The search performs prefix matching and returns results in sorted order (case insensitive).
    Returns a 200 response with either an empty array or up to 100 matching postcode entities.
   * @param postcode The postcode to query 
   * @param limit Limits number of postcodes matches to return. Defaults to 10. Needs to be less than 100.
   * @returns - {@link QueryResponse} wrapped in an {@link Observable}
   */
  public queryPostCode(
    postcode: string,
    limit?: number
  ): Observable<QueryResponse> {
    let requestUrl = `${this._apiUrl}/postcodes/?q=${postcode}`
    if (limit) {
      requestUrl += `&limit=${Number(limit)}`
    }
    return this._http.get<QueryResponse>(requestUrl)
  }

  /**
   * Get data for multiple postcodes in a single request.
    Returns matching postcode data for each valid postcode provided. If a postcode is not found, its result will be null.
    For more details, see the the {@link https://postcodes.io/docs/api/bulk-postcode-lookup|API Documentation}.
   * @param postcodes An array of Postcodes to look up.
   * @param filters An array of attributes to include in the result object.
   * @example <caption>Example of `filters`</caption>
   * ['postcode','longitude','latitude', ...]
   * @returns - {@link BulkLookupResponse} wrapped in an {@link Observable}
   */

  public bulkLookup(
    postcodes: string[],
    filters: BulkLookupFilter[] = []
  ): Observable<BulkLookupResponse> {
    const request: BulkLookupRequest = {
      postcodes: postcodes,
    }
    let requestUrl = `${this._apiUrl}/postcodes`

    if (filters.length > 0) {
      requestUrl += `?filter=${filters.join(',')}`
    }
    return this._http.post<BulkLookupResponse>(requestUrl, request, {
      headers: {
        'Content-Type': 'application/json',
      },
    })
  }
  /**
   * Gets a random postcode and all available data for that postcode from the database.
   * @param filterOutcode Filters random postcodes by outcode (e.g., "CM8", "SW1"). Returns null if an invalid outcode is provided.
   * @returns - {@link PostcodeResponse} wrapped in an {@link Observable}
   */
  public getRandomPostCodes(
    filterOutcode: string[] = []
  ): Observable<PostcodeResponse> {
    let requestUrl = `${this._apiUrl}/random/postcodes`
    if (filterOutcode.length > 0) {
      requestUrl += `?outcode=${filterOutcode.join(',')}`
    }

    return this._http.get<PostcodeResponse>(requestUrl)
  }

  /**
   * Convenient method to return an list of matching postcodes.
   * @param postcode Part of a postcode to lookup.
   * @param limit Limits number of postcodes matches to return. Defaults to 10. Needs to be less than 100.
   * @returns - {@link AutoCompleteResponse} wrapped in an {@link Observable}
   */
  public autoComplete(
    postcode: string,
    limit?: number
  ): Observable<AutoCompleteResponse> {
    let requestUrl = `${this.apiUrl}/postcodes/${encodeURI(
      postcode
    )}/autocomplete`
    if (limit) {
      requestUrl += `?limit=${Number(limit)}`
    }

    return this._http.get<AutoCompleteResponse>(requestUrl)
  }
  /**
 * Returns a list of postcodes nearest to the specified postcode, ordered by distance.
  All standard postcode fields are returned for each result, plus a distance attribute (in metres from the specified postcode); if the input postcode is not found, the API returns a 404 response code.
  For more details, see the {@link https://postcodes.io/docs/api/nearest-postcode|API documentation}.
 * @param postcode The postcode to query.
 * @param params Optional parameters. See {@link FindNearestPostcodeOptionalParameters}
 * @returns - {@link NearestResponse} wrapped in an {@link Observable}
 */
  public findNearestPostcode(
    postcode: string,
    params?: FindNearestPostcodeOptionalParameters
  ): Observable<NearestResponse> {
    let requestUrl = `${this._apiUrl}/postcodes/${encodeURI(postcode)}/nearest`

    requestUrl += !this.isEmpty(params)
      ? `?${this.buildQueryString(params)}`
      : ''

    return this._http.get<NearestResponse>(requestUrl)
  }
  /**
   * This endpoint returns the nearest postcodes for a given longitude and latitude coordinate pair.
   * Each postcode in the results includes a distance field that indicates the distance in meters from the specified coordinates to the postcode.
   * @param lat The latitude.
   * @param lon The longitude.
   * @param params Optional parameters. See {@link ReverseGeocodeOptionalParameters}
   * @returns - {@link PostcodeDistance} wrapped in an {@link Observable}
   */
  public reverseGeocodePostcode(
    lat: number,
    lon: number,
    params?: ReverseGeocodeOptionalParameters
  ): Observable<PostcodeDistance> {
    let requestUrl = `${this._apiUrl}/postcodes?lon=${lon}&lat=${lat}`

    requestUrl += !this.isEmpty(params)
      ? `&${this.buildQueryString(params)}`
      : ''

    return this._http.get<PostcodeDistance>(requestUrl)
  }
  /**
   * Translates multiple geographic coordinates (longitude/latitude) into postcodes in a single request. Returns the nearest postcodes for each set of coordinates provided.
   * @param request Object for multiple geocode requests. See {@link BulkReverseGeocodeRequest}
   * @param params Optional parameters. See {@link BulkReverseGeocodeOptionalParameters}
   * @returns - {@link BulkLookupResponse} wrapped in an {@link Observable}
   */
  public bulkReverseGeocodePostcode(
    request: BulkReverseGeocodeRequest,
    params?: BulkReverseGeocodeOptionalParameters
  ): Observable<BulkLookupResponse> {
    let requestUrl = `${this._apiUrl}/postcodes`
    let newParams

    if (!this.isEmpty(params)) {
      if (params?.filter) {
        const filter = params.filter.join(',')
        delete params['filter']
        newParams = { ...params, filter: filter }
      }
      requestUrl += `?${this.buildQueryString(newParams ?? params)}`
    }

    return this._http.post<BulkLookupResponse>(requestUrl, request)
  }

  private isEmpty(obj: any): boolean {
    for (const prop in obj) {
      if (Object.hasOwn(obj, prop)) {
        return false
      }
    }

    return true
  }

  private buildQueryString<T extends Object>(obj: T | undefined): string {
    if (!obj) {
      return ''
    }

    return new URLSearchParams(Object.entries(obj)).toString()
  }
}
