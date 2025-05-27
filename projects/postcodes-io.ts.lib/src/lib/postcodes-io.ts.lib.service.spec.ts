import { TestBed } from '@angular/core/testing';

import { PostcodesIoTsLibService } from './postcodes-io.ts.lib.service';
import { provideHttpClient } from '@angular/common/http';
import {
  HttpTestingController,
  provideHttpClientTesting,
} from '@angular/common/http/testing';
import { firstValueFrom } from 'rxjs';
import { BulkLookupFilter } from './models/BulkLookupFilter';

describe('PostcodesIoTsLibService', () => {
  let service: PostcodesIoTsLibService;
  let httpTesting: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideHttpClientTesting()],
    });
    service = TestBed.inject(PostcodesIoTsLibService);
    httpTesting = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should call the lookupPostcode url', () => {
    const postcode = 'IP4';

    firstValueFrom(service.lookupPostcode(postcode));
    const req = httpTesting.expectOne(
      `${service.apiUrl}/postcodes/${postcode}`
    );

    expect(req.request.method).toBe('GET');
    req.flush('sdfsd');

    httpTesting.verify();
  });

  it('should call the queryPostcode url and have a limit of 2', () => {
    const postcode = 'IP4';
    const limit = 2;

    firstValueFrom(service.queryPostCode(postcode, limit));
    const req = httpTesting.expectOne(
      `${service.apiUrl}/postcodes/?q=${postcode}&limit=${limit}`
    );

    expect(req.request.method).toBe('GET');
    req.flush({});

    httpTesting.verify();
  });

  it('should call the bulkLookup url', () => {
    const postcode = 'IP4';

    firstValueFrom(service.bulkLookup([postcode]));
    const req = httpTesting.expectOne(`${service.apiUrl}/postcodes`);

    expect(req.request.method).toBe('POST');
    req.flush({});

    httpTesting.verify();
  });

  it('should call the bulkLookup url with filters', () => {
    const postcode = 'IP4';
    const filters: BulkLookupFilter[] = ['postcode'];

    firstValueFrom(service.bulkLookup([postcode], filters));
    const req = httpTesting.expectOne(
      `${service.apiUrl}/postcodes?filter=${filters.join(',')}`
    );

    expect(req.request.method).toBe('POST');
    req.flush({});

    httpTesting.verify();
  });

  it('should call the getRandomPostcodes url', () => {
    firstValueFrom(service.getRandomPostCodes());
    const req = httpTesting.expectOne(`${service.apiUrl}/random/postcodes`);

    expect(req.request.method).toBe('GET');
    req.flush({});

    httpTesting.verify();
  });

  it('should call the getRandomPostcodes url with the filter', () => {
    const outcode = ['SW1'];
    firstValueFrom(service.getRandomPostCodes(outcode));
    const req = httpTesting.expectOne(
      `${service.apiUrl}/random/postcodes?outcode=${outcode.join(',')}`
    );

    expect(req.request.method).toBe('GET');
    req.flush({});

    httpTesting.verify();
  });

  it('should call the autoComplete url', () => {
    const postcode = 'SW1 1px';
    firstValueFrom(service.autoComplete(postcode));
    const req = httpTesting.expectOne(
      `${service.apiUrl}/postcodes/${encodeURI(postcode)}/autocomplete`
    );

    expect(req.request.method).toBe('GET');
    req.flush({});

    httpTesting.verify();
  });

  it('should call the findNearestPostcode url', () => {
    const postcode = 'SW1 1px';

    firstValueFrom(service.findNearestPostcode(postcode));
    const req = httpTesting.expectOne(
      `${service.apiUrl}/postcodes/${encodeURI(postcode)}/nearest`
    );

    expect(req.request.method).toBe('GET');
    req.flush({});

    httpTesting.verify();
  });

  it('should call the findNearestPostcode url with limit', () => {
    const postcode = 'SW1 1px';
    const params = {
      limit: 10,
    };
    firstValueFrom(service.findNearestPostcode(postcode, params));
    const req = httpTesting.expectOne(
      `${service.apiUrl}/postcodes/${encodeURI(postcode)}/nearest?limit=${
        params.limit
      }`
    );

    expect(req.request.method).toBe('GET');
    req.flush({});

    httpTesting.verify();
  });

  it('should call the findNearestPostcode url with radius', () => {
    const postcode = 'SW1 1px';
    const params = {
      radius: 100,
    };

    firstValueFrom(service.findNearestPostcode(postcode, params));
    const req = httpTesting.expectOne(
      `${service.apiUrl}/postcodes/${encodeURI(postcode)}/nearest?radius=${
        params.radius
      }`
    );

    expect(req.request.method).toBe('GET');
    req.flush({});

    httpTesting.verify();
  });

  it('should call the findNearestPostcode url with limit and radius', () => {
    const postcode = 'SW1 1px';
    const params = {
      limit: 1,
      radius: 100,
    };
    firstValueFrom(service.findNearestPostcode(postcode, params));
    const req = httpTesting.expectOne(
      `${service.apiUrl}/postcodes/${encodeURI(postcode)}/nearest?limit=${
        params.limit
      }&radius=${params.radius}`
    );

    expect(req.request.method).toBe('GET');
    req.flush({});

    httpTesting.verify();
  });

  it('should call the reverseGeocodePostcode url', () => {
    const lat = 1;
    const lon = 1;
    firstValueFrom(service.reverseGeocodePostcode(lat, lon));
    const req = httpTesting.expectOne(
      `${service.apiUrl}/postcodes?lon=${lon}&lat=${lon}`
    );

    expect(req.request.method).toBe('GET');
    req.flush({});

    httpTesting.verify();
  });

  it('should call the reverseGeocodePostcode url with limit', () => {
    const lat = 1;
    const lon = 1;
    const params = {
      limit: 1,
    };
    firstValueFrom(service.reverseGeocodePostcode(lat, lon, params));
    const req = httpTesting.expectOne(
      `${service.apiUrl}/postcodes?lon=${lon}&lat=${lon}&limit=${params.limit}`
    );

    expect(req.request.method).toBe('GET');
    req.flush({});

    httpTesting.verify();
  });

  it('should call the reverseGeocodePostcode url with radius', () => {
    const lat = 1;
    const lon = 1;
    const params = {
      radius: 1,
    };
    firstValueFrom(service.reverseGeocodePostcode(lat, lon, params));
    const req = httpTesting.expectOne(
      `${service.apiUrl}/postcodes?lon=${lon}&lat=${lon}&radius=${params.radius}`
    );

    expect(req.request.method).toBe('GET');
    req.flush({});

    httpTesting.verify();
  });

  it('should call the reverseGeocodePostcode url with widesearch', () => {
    const lat = 1;
    const lon = 1;
    const params = {
      widesearch: false,
    };
    firstValueFrom(service.reverseGeocodePostcode(lat, lon, params));
    const req = httpTesting.expectOne(
      `${service.apiUrl}/postcodes?lon=${lon}&lat=${lon}&widesearch=${params.widesearch}`
    );

    expect(req.request.method).toBe('GET');
    req.flush({});

    httpTesting.verify();
  });

  it('should call the reverseGeocodePostcode url with limit and widesearch', () => {
    const lat = 1;
    const lon = 1;
    const params = {
      limit: 1,
      widesearch: false,
    };
    firstValueFrom(service.reverseGeocodePostcode(lat, lon, params));
    const req = httpTesting.expectOne(
      `${service.apiUrl}/postcodes?lon=${lon}&lat=${lon}&limit=${params.limit}&widesearch=${params.widesearch}`
    );

    expect(req.request.method).toBe('GET');
    req.flush({});

    httpTesting.verify();
  });

  it('should call the reverseGeocodePostcode url with limit, widesearch and radius', () => {
    const lat = 1;
    const lon = 1;
    const params = {
      limit: 1,
      widesearch: false,
      radius: 100,
    };
    firstValueFrom(service.reverseGeocodePostcode(lat, lon, params));
    const req = httpTesting.expectOne(
      `${service.apiUrl}/postcodes?lon=${lon}&lat=${lon}&limit=${params.limit}&widesearch=${params.widesearch}&radius=${params.radius}`
    );

    expect(req.request.method).toBe('GET');
    req.flush({});

    httpTesting.verify();
  });
});
