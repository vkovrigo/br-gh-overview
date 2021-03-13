import { Component, OnInit } from '@angular/core';
import { COMMITS } from '../mock-commits';

@Component({
  selector: 'app-commits',
  templateUrl: './commits.component.html',
  styleUrls: ['./commits.component.css']
})
export class CommitsComponent implements OnInit {

  commits = COMMITS;

  constructor() { }

  ngOnInit(): void {
  }

}
