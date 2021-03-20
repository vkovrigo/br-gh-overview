import { Component, EventEmitter, Input, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormBuilder } from '@angular/forms';

const getDatePart = (date: Date) => date.toISOString().split('T')[0];

@Component({
  selector: 'app-commits-filter',
  templateUrl: './commits-filter.component.html',
  styleUrls: ['./commits-filter.component.css']
})
export class CommitsFilterComponent implements OnInit {
  @Input() sinceDate: Date;
  @Output() applied = new EventEmitter<{ sinceDate: Date }>();
  @Output() changed = new EventEmitter<void>();

  isFilterChanged = false;
  filterForm = this.fb.group({
    sinceDate: [],
  });
  maxDate = getDatePart(new Date());

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.filterForm.valueChanges.subscribe(_ => {
      this.isFilterChanged = true;

      this.changed.emit();
    });
  }

  ngOnChanges(changes: SimpleChanges) {
    this.filterForm.patchValue({
      sinceDate: changes.sinceDate.currentValue && changes.sinceDate.currentValue
    }, { emitEvent: false });
  }

  applyFilter() {
    const { sinceDate } = this.filterForm.value;
    this.applied.emit({
      sinceDate: new Date(sinceDate)
    });

    this.isFilterChanged = false;
  }

}
