/* eslint-disable @typescript-eslint/naming-convention */
import { parseLinkHeader } from './parse-link-header';

describe('parse-link-header', () => {
  it('should find all rel and all page param', () => {
    // eslint-disable-next-line max-len
    const testLink = `<https://api.com/commits?page=3&per_page=5&since=2021-02-20T20%3A32%3A06.581Z>; rel="next", <https://api.com/commits?page=42&per_page=5&since=2021-02-20T20%3A32%3A06.581Z>; rel="last", <https://api.com/commits?page=1&per_page=5&since=2021-02-20T20%3A32%3A06.581Z>; rel="first", <https://api.com/commits?page=1&per_page=5&since=2021-02-20T20%3A32%3A06.581Z>; rel="prev"`;

    expect(parseLinkHeader(testLink)).toEqual({
      first: {
        url: 'https://api.com/commits?page=1&per_page=5&since=2021-02-20T20%3A32%3A06.581Z',
        params: { page: '1', per_page: '5', since: '2021-02-20T20:32:06.581Z' }
      },
      last: {
        url: 'https://api.com/commits?page=42&per_page=5&since=2021-02-20T20%3A32%3A06.581Z',
        params: { page: '42', per_page: '5', since: '2021-02-20T20:32:06.581Z' }
      },
      next: {
        url: 'https://api.com/commits?page=3&per_page=5&since=2021-02-20T20%3A32%3A06.581Z',
        params: { page: '3', per_page: '5', since: '2021-02-20T20:32:06.581Z' }
      },
      prev: {
        url: 'https://api.com/commits?page=1&per_page=5&since=2021-02-20T20%3A32%3A06.581Z',
        params: { page: '1', per_page: '5', since: '2021-02-20T20:32:06.581Z' }
      }
    });
  });

  it('should parse only two exist rel', () => {
    // eslint-disable-next-line max-len
    const testLink = `<https://api.com/commits?page=3&per_page=5&since=2021-02-20T20%3A32%3A06.581Z>; rel="next", <https://api.com/commits?page=1&per_page=5&since=2021-02-20T20%3A32%3A06.581Z>; rel="first"`;

    expect(parseLinkHeader(testLink)).toEqual({
      first: {
        url: 'https://api.com/commits?page=1&per_page=5&since=2021-02-20T20%3A32%3A06.581Z',
        params: { page: '1', per_page: '5', since: '2021-02-20T20:32:06.581Z' }
      },
      next: {
        url: 'https://api.com/commits?page=3&per_page=5&since=2021-02-20T20%3A32%3A06.581Z',
        params: { page: '3', per_page: '5', since: '2021-02-20T20:32:06.581Z' }
      }
    });
  });

  it('should return empty object if link undefined', () => {
    expect(parseLinkHeader()).toEqual({});
  });

  it('should return empty object if link empty string', () => {
    expect(parseLinkHeader()).toEqual({});
  });
});
