import { Component, Input, OnInit } from '@angular/core';
import { Commit } from '../commit';

@Component({
  selector: 'app-commit-details',
  templateUrl: './commit-details.component.html',
  styleUrls: ['./commit-details.component.css']
})
export class CommitDetailsComponent implements OnInit {
  @Input() commit?: Commit;

  constructor() { }

  ngOnInit(): void {
  }

}
