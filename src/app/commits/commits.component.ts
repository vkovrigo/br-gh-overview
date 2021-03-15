import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
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
  timeRangeForm = this.fb.group({
    timeRangeValue: [],
    timeRangeType: [],
  });

  constructor(private repositoryService: RepositoryService, private fb: FormBuilder) { }

  ngOnInit(): void {
    this.getCommits();

    this.timeRangeForm.valueChanges.subscribe(() => {
      this.commits = [];
    });
  }

  private responseHandler(commits: CommitList): void {
    this.commits = commits.commits;
    this.currentPage = commits.currentPage;
    this.totalPageCount = commits.totalPageCount;
    this.timeRangeForm.patchValue({
      timeRangeValue: commits.timeRange.value,
      timeRangeType: commits.timeRange.type
    }, { emitEvent: false });
  }

  applyTimeRange(): void {
    const value = this.timeRangeForm.get('timeRangeValue').value;
    const type = this.timeRangeForm.get('timeRangeType').value;
    const timeRange: CommitList['timeRange'] = {
      value: !value || value < 0 ? 1 : value,
      type: type ?? 'month'
    };

    this.repositoryService.getCommits({ timeRange }).subscribe(commits => this.responseHandler(commits));
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
