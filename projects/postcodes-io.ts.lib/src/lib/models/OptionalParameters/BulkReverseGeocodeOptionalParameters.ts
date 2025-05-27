import { BulkLookupFilter } from '../BulkLookupFilter';

export interface BulkReverseGeocodeOptionalParameters {
  limit?: number;
  radius?: number;
  widesearch?: boolean;
  filter?: BulkLookupFilter[];
}
