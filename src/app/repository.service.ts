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
  private commitsUrl = `${this.baseUrl}/repos/facebook/react/commits?page=${this.currentPage}&per_page=2&page=2&since=2021-03-11T20:01:41Z`;

  httpOptions = {
    headers: new HttpHeaders({ 'Accept': 'application/vnd.github.v3+json' })
  };

  constructor(private http: HttpClient) { }

  getCommits(): Observable<CommitList> {
    return this.http.get<Commit[]>(this.commitsUrl, {observe: 'response'}).pipe(
      tap(resp => console.log(resp)),
      tap(resp => console.log(resp.headers.get('link'))),
      map<HttpResponse<Commit[]>, CommitList>(r => {
        return {
          commits: r.body,
          currentPage: 42,
          totalPageCount: 42
        }
      })
    );
  }
}
