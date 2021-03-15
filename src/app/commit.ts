import { Endpoints } from "@octokit/types";

type ReposCommitListResponse = Endpoints["GET /repos/{owner}/{repo}/commits"]["response"];
export type Commit = ReposCommitListResponse['data'][number];
export type CommitList = {
  commits: Commit[];
  totalPageCount: number;
  currentPage: number;
  timeRange: { value: number; type: 'hour' | 'month' | 'year' };
};
