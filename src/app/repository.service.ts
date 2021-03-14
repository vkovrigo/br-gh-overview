import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Commit, CommitList } from './commit';

@Injectable({
  providedIn: 'root'
})
export class RepositoryService {
  private baseUrl = `https://api.github.com`;
  private currentPage = 1;
  private repositoryOwner = 'facebook';
  private repositoryName = 'react';
  private commitsUrl = `${this.baseUrl}/repos/${this.repositoryOwner}/${this.repositoryName}/commits?page=${this.currentPage}&per_page=2&page=2&since=2021-03-11T20:01:41Z`;
  private commitUrl = `${this.baseUrl}/repos/${this.repositoryOwner}/${this.repositoryName}/commits`;

  private httpOptions = {
    headers: new HttpHeaders({ 'Accept': 'application/vnd.github.v3+json' })
  };

  constructor(private http: HttpClient) { }

  getCommits(): Observable<CommitList> {
    return this.http.get<Commit[]>(this.commitsUrl, {headers: this.httpOptions.headers, observe: 'response'}).pipe(
      tap(resp => console.log(resp)),
      tap(resp => console.log(resp.headers.get('link'))),
      map<HttpResponse<Commit[]>, CommitList>(r => {
        this.currentPage = 42;
        return {
          commits: r.body,
          currentPage: this.currentPage,
          totalPageCount: 42
        }
      })
    );
  }

  getCommit(sha: string): Observable<Commit> {
    return this.http.get<Commit>(`${this.commitUrl}/${sha}`).pipe(
      map(r => r)
    )
  }
}
