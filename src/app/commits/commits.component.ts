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
    this.getCommits({ timeRange });
  }

  onFilterChange() {
    this.commits = [];
  }

  getCommits(filter?: { page?: number, timeRange?: CommitList['timeRange'] }): void {
    this.repositoryService.getCommits(filter).subscribe(commits => this.responseHandler(commits));
  }

  goToPrevPage(): void {
    this.getCommits({ page: this.currentPage - 1 });
  }

  goToNextPage(): void {
    this.getCommits({ page: this.currentPage + 1 });
  }
}
