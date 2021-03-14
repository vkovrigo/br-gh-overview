import { Component, OnInit } from '@angular/core';
import { Commit } from '../commit';
import { RepositoryService } from '../repository.service';

@Component({
  selector: 'app-commits',
  templateUrl: './commits.component.html',
  styleUrls: ['./commits.component.css']
})
export class CommitsComponent implements OnInit {

  commits: Commit[] = [];
  selectedCommit?: Commit;

  constructor(private repositoryService: RepositoryService) { }

  ngOnInit(): void {
    this.getCommits();
  }

  onSelect(commit: Commit): void {
    this.selectedCommit = commit;
  }

  getCommits(): void {
    this.repositoryService.getCommits().subscribe(commits => this.commits = commits.commits);
  }
}
