import { HttpClient, HttpHeaders } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController
} from '@angular/common/http/testing';

import { RepositoryService } from './repository.service';
import { Commit, CommitList } from './commit';
import { getTestCommits } from './testing/test-commits';

describe('RepositoryService', () => {
  let httpClient: HttpClient;
  let httpTestingController: HttpTestingController;
  let repositoryService: RepositoryService;
  const mockNowDate = new Date('2021-03-20T19:42:42.420Z');

  beforeEach(() => {
    jasmine.clock().mockDate(mockNowDate);

    TestBed.configureTestingModule({
      // Import the HttpClient mocking services
      imports: [HttpClientTestingModule],
      // Provide the service-under-test
      providers: [RepositoryService]
    });

    // Inject the http, test controller, and service-under-test
    // as they will be referenced by each test.
    httpClient = TestBed.inject(HttpClient);
    httpTestingController = TestBed.inject(HttpTestingController);
    repositoryService = TestBed.inject(RepositoryService);
  });

  afterEach(() => {
    // After every test, assert that there are no more pending requests.
    httpTestingController.verify();
  });

  it('should be created', () => {
    expect(repositoryService).toBeTruthy();
  });

  describe('getCommits', () => {
    let expectedCommits: Commit[];
    let mockSinceDate: Date;
    const defaultPerPage = 5;

    const buildParams = ({ page, perPage, since }: { page: number; perPage: number; since: string }) =>
      `page=${page}&per_page=${perPage}&since=${since}`;

    beforeEach(() => {
      repositoryService = TestBed.inject(RepositoryService);
      expectedCommits = getTestCommits();
      mockSinceDate = new Date(mockNowDate.setMonth(mockNowDate.getMonth() - 1));
    });

    it('should return expected commits and all params equal to initial / default values', () => {
      repositoryService.getCommits().subscribe((commitsReq) => {
        const { commits, totalPageCount, perPageCount, currentPage, sinceDate } = commitsReq;
        expect(commits).toEqual(expectedCommits);
        expect(totalPageCount).toBe(1);
        expect(perPageCount).toBe(5);
        expect(currentPage).toBe(1);
        expect(sinceDate.toISOString()).toBe(new Date(mockSinceDate).toISOString());
      });

      const params = buildParams({ page: 1, perPage: defaultPerPage, since: mockSinceDate.toISOString()});
      const req = httpTestingController.expectOne(`${repositoryService.commitsUrl}?${params}`);
      expect(req.request.method).toEqual('GET');

      req.flush(expectedCommits);
    });

    it('should return expected commits and all params with changed current page to value from param', () => {
      const newCurrentPage = 42;

      repositoryService.getCommits({ page: newCurrentPage }).subscribe((commitsReq) => {
        const { commits, totalPageCount, perPageCount, currentPage, sinceDate } = commitsReq;
        expect(commits).toEqual(expectedCommits);
        expect(totalPageCount).toBe(newCurrentPage);
        expect(perPageCount).toBe(5);
        expect(currentPage).toBe(newCurrentPage);
        expect(sinceDate.toISOString()).toBe(new Date(mockSinceDate).toISOString());
      });

      const params = buildParams({ page: newCurrentPage, perPage: defaultPerPage, since: mockSinceDate.toISOString()});
      const req = httpTestingController.expectOne(`${repositoryService.commitsUrl}?${params}`);
      expect(req.request.method).toEqual('GET');

      req.flush(expectedCommits);
    });

    it('should return expected commits and all params with changed since date to value from param', () => {
      const sinceDate = new Date();

      repositoryService.getCommits({ sinceDate }).subscribe((commitsReq) => {
        const { commits, totalPageCount, perPageCount, currentPage, sinceDate } = commitsReq;
        expect(commits).toEqual(expectedCommits);
        expect(totalPageCount).toBe(1);
        expect(perPageCount).toBe(5);
        expect(currentPage).toBe(1);
        expect(sinceDate.toISOString()).toBe(sinceDate.toISOString());
      });

      const params = buildParams({ page: 1, perPage: defaultPerPage, since: sinceDate.toISOString()});
      const req = httpTestingController.expectOne(`${repositoryService.commitsUrl}?${params}`);
      expect(req.request.method).toEqual('GET');

      req.flush(expectedCommits);
    });

    describe('parse header on total page count', () => {
      it('should return total page count equal 1 if no link in header', () => {
        repositoryService.getCommits().subscribe((commitsReq) => {
          const { totalPageCount } = commitsReq;
          expect(totalPageCount).toBe(1);
        });

        const params = buildParams({ page: 1, perPage: defaultPerPage, since: mockSinceDate.toISOString()});
        const req = httpTestingController.expectOne(`${repositoryService.commitsUrl}?${params}`);
        expect(req.request.method).toEqual('GET');

        req.flush(expectedCommits);
      });

      it('should return total page count equal page number from param if no link in header', () => {
        const page = 42;

        repositoryService.getCommits({ page }).subscribe((commitsReq) => {
          const { totalPageCount } = commitsReq;
          expect(totalPageCount).toBe(page);
        });

        const params = buildParams({ page, perPage: defaultPerPage, since: mockSinceDate.toISOString()});
        const req = httpTestingController.expectOne(`${repositoryService.commitsUrl}?${params}`);
        expect(req.request.method).toEqual('GET');

        req.flush(expectedCommits);
      });

      it('should return total page count equal value in last rel if link exists in header', () => {
        const expectedTotalPageCount = 42;
        // eslint-disable-next-line max-len
        const testLinkInHeader = `<https://api.com/commits?page=2&per_page=5&since=2021-02-20T20%3A32%3A06.581Z>; rel="next", <https://api.com/commits?page=${expectedTotalPageCount}&per_page=5&since=2021-02-20T20%3A32%3A06.581Z>; rel="last"`;
        repositoryService.getCommits().subscribe((commitsReq) => {
          const { totalPageCount } = commitsReq;
          expect(totalPageCount).toBe(expectedTotalPageCount);
        });

        const params = buildParams({ page: 1, perPage: defaultPerPage, since: mockSinceDate.toISOString()});
        const req = httpTestingController.expectOne(`${repositoryService.commitsUrl}?${params}`);
        expect(req.request.method).toEqual('GET');

        const headers = new HttpHeaders({ link: testLinkInHeader });

        req.flush(expectedCommits, { headers });
      });

      it('should return total page count equal value in last rel if link exists in header', () => {
        const expectedTotalPageCount = 422;
        // eslint-disable-next-line max-len
        const testLinkInHeader = `<https://api.com/commits?page=3&per_page=5&since=2021-02-20T20%3A32%3A06.581Z>; rel="next", <https://api.com/commits?page=${expectedTotalPageCount}&per_page=5&since=2021-02-20T20%3A32%3A06.581Z>; rel="last", <https://api.com/commits?page=1&per_page=5&since=2021-02-20T20%3A32%3A06.581Z>; rel="first", <https://api.com/commits?page=1&per_page=5&since=2021-02-20T20%3A32%3A06.581Z>; rel="prev"`;

        repositoryService.getCommits().subscribe((commitsReq) => {
          const { totalPageCount } = commitsReq;
          expect(totalPageCount).toBe(expectedTotalPageCount);
        });

        const params = buildParams({ page: 1, perPage: defaultPerPage, since: mockSinceDate.toISOString()});
        const req = httpTestingController.expectOne(`${repositoryService.commitsUrl}?${params}`);
        expect(req.request.method).toEqual('GET');

        const headers = new HttpHeaders({ link: testLinkInHeader });

        req.flush(expectedCommits, { headers });
      });

      it('should return total page count equal to current page if link last is absent in header', () => {
        const testLinkInHeader = `<https://api.com/commits?page=2&per_page=5&since=2021-02-20T20%3A32%3A06.581Z>; rel="next"`;

        repositoryService.getCommits().subscribe((commitsReq) => {
          const { totalPageCount, currentPage } = commitsReq;
          expect(totalPageCount).toBe(currentPage);
        });

        const params = buildParams({ page: 1, perPage: defaultPerPage, since: mockSinceDate.toISOString()});
        const req = httpTestingController.expectOne(`${repositoryService.commitsUrl}?${params}`);
        expect(req.request.method).toEqual('GET');

        const headers = new HttpHeaders({ link: testLinkInHeader });

        req.flush(expectedCommits, { headers });
      });
    });
  });

  describe('getCommit', () => {
    let expectedCommit: Commit;

    beforeEach(() => {
      repositoryService = TestBed.inject(RepositoryService);
      expectedCommit = getTestCommits()[0];
    });

    it('should return commit by sha value', () => {
      const sha = 'foo';
      repositoryService.getCommit(sha).subscribe((commit) => {
        expect(commit).toEqual(expectedCommit);
      });

      const req = httpTestingController.expectOne(`${repositoryService.commitsUrl}/${sha}`);
      expect(req.request.method).toEqual('GET');

      req.flush(expectedCommit);
    });
  });
});
