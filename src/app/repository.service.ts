import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams, HttpResponse } from '@angular/common/http';
import { Commit, CommitData, CommitsData } from './types';
import { parseLinkHeader } from './parse-link-header';

@Injectable({
  providedIn: 'root'
})
export class RepositoryService {
  baseUrl = `https://api.github.com`;
  currentPage = 1;
  perPage = 5;
  repositoryOwner = 'facebook';
  repositoryName = 'react';
  commitsUrl = `${this.baseUrl}/repos/${this.repositoryOwner}/${this.repositoryName}/commits`;
  sinceDate: Date;

  constructor(private http: HttpClient) {
    const todayDate = new Date();

    this.sinceDate = new Date(todayDate.setMonth(todayDate.getMonth() - 1));
  }

  getCommits(filter?: { page?: number; sinceDate?: Date }): Observable<CommitsData> {
    const { page, sinceDate } = filter ?? {};
    this.currentPage = page ?? this.currentPage;

    this.sinceDate = sinceDate ?? this.sinceDate;

    const params = new HttpParams().appendAll({
      page: this.currentPage.toString(),
      // eslint-disable-next-line @typescript-eslint/naming-convention
      per_page: this.perPage.toString(),
      since: this.sinceDate.toISOString()
    });

    return this.http.get<Commit[]>(this.commitsUrl, {
      params,
      headers: this.getHttpHeaders(),
      observe: 'response'
    }).pipe(
      map<HttpResponse<Commit[]>, CommitsData>(r => {
        const linkHeader = r.headers.get('link');
        const { last } = parseLinkHeader(linkHeader);
        const lastPage = Number(last?.params?.page);

        return {
          commits: r.body,
          currentPage: this.currentPage,
          totalPageCount: Number.isNaN(lastPage) ? this.currentPage : lastPage,
          perPageCount: this.perPage,
          sinceDate: this.sinceDate,
        };
      }),
      catchError(this.handleError<CommitsData>('getCommits'))
    );
  }

  getCommit(sha: string): Observable<CommitData> {
    return this.http.get<Commit>(`${this.commitsUrl}/${sha}`, { headers: this.getHttpHeaders() }).pipe(
      map(r => ({ commit: r})),
      catchError(this.handleError<CommitData>(`getCommit/${sha}`))
    );
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: HttpErrorResponse): Observable<T> => {
      console.error(operation, error);

      const message = `server returned code ${error.status} with message "${error.error?.message ?? '<no message>'}"`;

      return throwError({ ...result, errorMessage: message } as T);
    };
  }

  private getHttpHeaders(): HttpHeaders {
    //@ts-expect-error
    const token = window.GH_TOKEN as string;
    return new HttpHeaders({
      // eslint-disable-next-line @typescript-eslint/naming-convention
      Accept: 'application/vnd.github.v3+json',
      // eslint-disable-next-line @typescript-eslint/naming-convention
      ...(token ? { Authorization: `token ${token}` } : {})
    });
  }
};
