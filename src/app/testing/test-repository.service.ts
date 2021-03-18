import { Injectable } from '@angular/core';
import { defer, Observable } from 'rxjs';
import { Commit, CommitList } from '../commit';
import { RepositoryService } from '../repository.service';
import { getTestCommits } from './test-commits';

@Injectable()
export class TestRepositoryService extends RepositoryService {

  commits = getTestCommits();
  testSinceDate = new Date('2021-03-18T12:00:00.000Z');

  constructor() {
    super(null);
  }

  getCommits(): Observable<CommitList> {
    return defer(() => Promise.resolve<CommitList>({
      commits: this.commits,
      currentPage: 1,
      perPageCount: 5,
      sinceDate: this.testSinceDate,
      totalPageCount: 2
    }));
  }

  getCommit(): Observable<Commit> {
    return defer(() => Promise.resolve<Commit>(this.commits[0]));
  }
}
