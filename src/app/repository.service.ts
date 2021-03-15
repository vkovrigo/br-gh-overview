import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { HttpClient, HttpHeaders, HttpParams, HttpResponse } from '@angular/common/http';
import { Commit, CommitList } from './commit';

const parseLinkHeader = (link?: string) => link?.split(', ').map(l => l.split('; ')).reduce((acc, [link, rel]) => ({
  ...acc,
  [rel.replace(/rel="(.*)"/, '$1')] : {
    url: link.replace(/<(.*)>/, '$1'),
    params: [...new URLSearchParams(new URL(link.replace(/<(.*)>/, '$1')).search).entries()].reduce((acc, [name, value]) => ({...acc, [name]:value}), {})
  }
}), {});

const generateTimestamp = (timeRange: CommitList['timeRange']) => {
  const now = new Date();

  switch (timeRange.type) {
    case 'hour':
      now.setHours(now.getHours() - timeRange.value);
      break;
    case 'month':
      now.setMonth(now.getMonth() - timeRange.value);
      break;
    case 'year':
      now.setFullYear(now.getFullYear() - timeRange.value);
      break;
  }

  return now.toISOString();
}

@Injectable({
  providedIn: 'root'
})
export class RepositoryService {
  private baseUrl = `https://api.github.com`;
  private currentPage = 1;
  private perPage = 5;
  private repositoryOwner = 'facebook';
  private repositoryName = 'react';
  private commitsUrl = `${this.baseUrl}/repos/${this.repositoryOwner}/${this.repositoryName}/commits`;
  private sinceTimestamp: string
  private currentTimeRange: CommitList['timeRange'] = { value: 2, type: 'month' };

  private httpOptions = {
    headers: new HttpHeaders({
      'Accept': 'application/vnd.github.v3+json',
      'Authorization': 'token 31ccb07cfdbada499c74c5583f36d6bd5452632b'
    })
  };

  constructor(private http: HttpClient) { }

  getCommits(filter?: {page?: number, timeRange?: CommitList['timeRange']}): Observable<CommitList> {
    const { page, timeRange } = filter ?? {};
    this.currentPage = page ?? this.currentPage;

    this.currentTimeRange = timeRange ?? this.currentTimeRange;

    if (!this.sinceTimestamp || timeRange) {
      this.sinceTimestamp = generateTimestamp(this.currentTimeRange);
    }

    const params = new HttpParams().appendAll({
      page: this.currentPage.toString(),
      per_page: this.perPage.toString(),
      since: this.sinceTimestamp
    });

    return this.http.get<Commit[]>(this.commitsUrl, {
      params,
      headers: this.httpOptions.headers,
      observe: 'response'
    }).pipe(
      map<HttpResponse<Commit[]>, CommitList>(r => {
        const linkHeader = r.headers.get('link');
        //@ts-expect-error
        const { last } = parseLinkHeader(linkHeader) ?? {};
        const lastPage = Number(last?.params?.page);

        return {
          commits: r.body,
          currentPage: this.currentPage,
          totalPageCount: Number.isNaN(lastPage) ? this.currentPage : lastPage,
          timeRange: this.currentTimeRange,
        }
      })
    );
  }

  getCommit(sha: string): Observable<Commit> {
    return this.http.get<Commit>(`${this.commitsUrl}/${sha}`).pipe(
      map(r => r)
    )
  }

}
