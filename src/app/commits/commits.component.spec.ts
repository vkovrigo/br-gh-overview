import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RepositoryService } from '../repository.service';
import { TestRepositoryService } from '../testing/test-repository.service';

import { CommitsComponent } from './commits.component';

describe('CommitsComponent', () => {
  let component: CommitsComponent;
  let fixture: ComponentFixture<CommitsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CommitsComponent ],
      providers: [
        { provide: RepositoryService, useClass: TestRepositoryService }
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CommitsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
