import { Component, OnInit } from '@angular/core';
import { Commit, CommitList } from '../commit';
import { RepositoryService } from '../repository.service';

@Component({
  selector: 'app-commits',
  templateUrl: './commits.component.html',
  styleUrls: ['./commits.component.css']
})
export class CommitsComponent implements OnInit {
  commits: Commit[] = [];
  currentPage: number;
  totalPageCount: number;
  timeRange;

  constructor(private repositoryService: RepositoryService) { }

  ngOnInit(): void {
    this.getCommits();
  }

  private responseHandler(commits: CommitList): void {
    this.commits = commits.commits;
    this.currentPage = commits.currentPage;
    this.totalPageCount = commits.totalPageCount;
    this.timeRange = commits.timeRange;
  }

  onFilterApply(timeRange: CommitList['timeRange']) {
    this.repositoryService.getCommits({ timeRange }).subscribe(commits => this.responseHandler(commits));
  }

  onFilterChange() {
    this.commits = [];
  }

  getCommits(): void {
    this.repositoryService.getCommits().subscribe(commits => this.responseHandler(commits));
  }

  getPrevCommits(): void {
    this.repositoryService.getCommits({ page: this.currentPage - 1 }).subscribe(commits => this.responseHandler(commits));
  }

  getNextCommits(): void {
    this.repositoryService.getCommits({ page: this.currentPage + 1 }).subscribe(commits => this.responseHandler(commits));
  }
}
