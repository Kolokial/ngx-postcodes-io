export interface BulkReverseGeocodeRequest {
  geolocations: {
    longitude: number
    latitude: number
    radius: number
    limit: number
  }[]
}
