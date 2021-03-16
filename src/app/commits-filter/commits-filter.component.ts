import { Component, EventEmitter, Input, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { CommitList } from '../commit';

@Component({
  selector: 'app-commits-filter',
  templateUrl: './commits-filter.component.html',
  styleUrls: ['./commits-filter.component.css']
})
export class CommitsFilterComponent implements OnInit {
  @Input() timeRange;
  @Output() applied = new EventEmitter<CommitList['timeRange']>();
  @Output() changed = new EventEmitter<void>();

  isFilterChanged = false;
  filterForm = this.fb.group({
    timeRangeValue: [],
    timeRangeType: [],
  });

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.filterForm.valueChanges.subscribe(_ => {
      this.isFilterChanged = true;

      this.changed.emit();
    });
  }

  ngOnChanges(changes: SimpleChanges) {
    this.filterForm.patchValue({
      timeRangeValue: changes.timeRange.currentValue?.value,
      timeRangeType: changes.timeRange.currentValue?.type
    }, { emitEvent: false });
  }

  applyFilter() {
    const { timeRangeValue, timeRangeType } = this.filterForm.value;
    this.applied.emit({
      value: timeRangeValue,
      type: timeRangeType
    });

    this.isFilterChanged = false;
  }

}
