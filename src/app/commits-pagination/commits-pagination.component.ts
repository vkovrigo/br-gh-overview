import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import {PageEvent} from '@angular/material/paginator';

@Component({
  selector: 'app-commits-pagination',
  templateUrl: './commits-pagination.component.html',
  styleUrls: ['./commits-pagination.component.css']
})
export class CommitsPaginationComponent implements OnInit {
  @Input() currentPage: number;
  @Input() totalPageCount: number;
  @Input() perPageCount: number;
  @Output() goPrev = new EventEmitter<void>()
  @Output() goNext = new EventEmitter<void>()

  constructor() { }

  ngOnInit(): void {
  }

  onPageSwitch({ previousPageIndex, pageIndex }: PageEvent): void {
    if (previousPageIndex === pageIndex) return;
    if (previousPageIndex > pageIndex) this.goPrev.emit();
    if (previousPageIndex < pageIndex) this.goNext.emit();
  }
}
