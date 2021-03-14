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

  constructor(private repositoryService: RepositoryService) { }

  ngOnInit(): void {
    this.getCommits();
  }

  getCommits(): void {
    this.repositoryService.getCommits().subscribe(commits => this.commits = commits.commits);
  }
}
