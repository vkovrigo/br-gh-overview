import { Endpoints } from '@octokit/types';

type ReposCommitListResponse = Endpoints['GET /repos/{owner}/{repo}/commits']['response'];
export type Commit = ReposCommitListResponse['data'][number];
// export type CommitList = {
//   commits: Commit[];
//   totalPageCount: number;
//   currentPage: number;
//   perPageCount: number;
//   sinceDate: Date;
//   errorMessage?: string;
// };
export type CommitsData = {
  commits: Commit[];
  totalPageCount: number;
  currentPage: number;
  perPageCount: number;
  sinceDate: Date;
  errorMessage?: string;
};

export type CommitData = {
  commit: Commit;
  errorMessage?: string;
};
