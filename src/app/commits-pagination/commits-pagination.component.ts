import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-commits-pagination',
  templateUrl: './commits-pagination.component.html',
  styleUrls: ['./commits-pagination.component.css']
})
export class CommitsPaginationComponent implements OnInit {
  @Input() currentPage: number;
  @Input() totalPageCount: number;
  @Output() goPrev = new EventEmitter<void>()
  @Output() goNext = new EventEmitter<void>()

  constructor() { }

  ngOnInit(): void {
  }

  onPrevClick(): void {
    this.goPrev.emit();
  }

  onNextClick(): void {
    this.goNext.emit();
  }

}
