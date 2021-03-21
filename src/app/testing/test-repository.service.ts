import { Injectable } from '@angular/core';
import { defer, Observable } from 'rxjs';
import { Commit, CommitData, CommitsData } from '../types';
import { RepositoryService } from '../repository.service';
import { getTestCommits } from './test-commits';

@Injectable()
export class TestRepositoryService extends RepositoryService {

  commits = getTestCommits();
  testSinceDate = new Date('2021-03-18T12:00:00.000Z');

  constructor() {
    super(null);
  }

  getCommits(): Observable<CommitsData> {
    return defer(() => Promise.resolve<CommitsData>({
      commits: this.commits,
      currentPage: 1,
      perPageCount: 5,
      sinceDate: this.testSinceDate,
      totalPageCount: 2
    }));
  }

  getCommit(): Observable<CommitData> {
    return defer(() => Promise.resolve<CommitData>({ commit: this.commits[0] }));
  }
}
