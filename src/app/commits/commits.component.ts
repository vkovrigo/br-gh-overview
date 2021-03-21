import { Component, OnInit } from '@angular/core';
import { Commit, CommitsData } from '../types';
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
  perPageCount: number;
  sinceDate: Date;
  repositoryName: string;
  repositoryOwner: string;
  errorMessage: string;

  constructor(private repositoryService: RepositoryService) {
    this.repositoryName = repositoryService.repositoryName;
    this.repositoryOwner = repositoryService.repositoryOwner;
  }

  ngOnInit(): void {
    this.getCommits();
  }

  onFilterApply({ sinceDate }) {
    this.getCommits({ page: 1, sinceDate });
  }

  onFilterChange() {
    this.commits = [];
  }

  getCommits(filter?: { page?: number; sinceDate?: Date }): void {
    this.repositoryService.getCommits(filter).subscribe (commits => this.responseHandler(commits), (errorData) => {
      this.errorMessage = errorData.errorMessage;
    });
  }

  goToPrevPage(): void {
    this.getCommits({ page: this.currentPage - 1 });
  }

  goToNextPage(): void {
    this.getCommits({ page: this.currentPage + 1 });
  }

  private responseHandler(commits: CommitsData): void {
    this.commits = commits.commits;
    this.currentPage = commits.currentPage;
    this.totalPageCount = commits.totalPageCount;
    this.perPageCount = commits.perPageCount;
    this.sinceDate = commits.sinceDate;
  }
}
