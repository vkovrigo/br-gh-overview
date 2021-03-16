import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommitsPaginationComponent } from './commits-pagination.component';

describe('CommitsPaginationComponent', () => {
  let component: CommitsPaginationComponent;
  let fixture: ComponentFixture<CommitsPaginationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CommitsPaginationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CommitsPaginationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
