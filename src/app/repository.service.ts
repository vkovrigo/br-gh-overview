import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { HttpClient, HttpHeaders, HttpParams, HttpResponse } from '@angular/common/http';
import { Commit, CommitList } from './commit';

const parseLinkHeader = (link?: string) => link?.split(', ').map(l => l.split('; ')).reduce((acc, [link, rel]) => ({
  ...acc,
  [rel.replace(/rel="(.*)"/, '$1')] : {
    url: link.replace(/<(.*)>/, '$1'),
    params: [...new URLSearchParams(new URL(link.replace(/<(.*)>/, '$1')).search).entries()].reduce((acc, [name, value]) => ({...acc, [name]:value}), {})
  }
}), {});

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
  private sinceDate: Date;

  private httpOptions = {
    headers: new HttpHeaders({
      'Accept': 'application/vnd.github.v3+json',
      'Authorization': 'token 31ccb07cfdbada499c74c5583f36d6bd5452632b'
    })
  };

  constructor(private http: HttpClient) {
    const todayDate = new Date();

    this.sinceDate = new Date(todayDate.setMonth(todayDate.getMonth() - 1));
  }

  getCommits(filter?: { page?: number, sinceDate?: Date }): Observable<CommitList> {
    const { page, sinceDate } = filter ?? {};
    this.currentPage = page ?? this.currentPage;

    this.sinceDate = sinceDate ?? this.sinceDate;

    const params = new HttpParams().appendAll({
      page: this.currentPage.toString(),
      per_page: this.perPage.toString(),
      since: this.sinceDate.toISOString()
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
          perPageCount: this.perPage,
          sinceDate: this.sinceDate,
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
