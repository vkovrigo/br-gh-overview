import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { Commit } from '../types';
import { RepositoryService } from '../repository.service';

@Component({
  selector: 'app-commit-details',
  templateUrl: './commit-details.component.html',
  styleUrls: ['./commit-details.component.css']
})
export class CommitDetailsComponent implements OnInit {
  @Input() commit?: Commit;

  errorMessage: string;

  constructor(
    private route: ActivatedRoute,
    private repositoryService: RepositoryService,
    private location: Location
  ) { }

  ngOnInit(): void {
    this.getCommit();
  }

  getCommit(): void {
    this.route.paramMap.subscribe(paramMap => {
      const sha = paramMap.get('sha');
      this.repositoryService.getCommit(sha).subscribe(
        commit => this.commit = commit.commit,
        error => this.errorMessage = error.errorMessage
      );
    });
  }

  goBack(): void {
    this.location.back();
  }

}
