import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommitsFilterComponent } from './commits-filter.component';

describe('CommitsFilterComponent', () => {
  let component: CommitsFilterComponent;
  let fixture: ComponentFixture<CommitsFilterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CommitsFilterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CommitsFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
