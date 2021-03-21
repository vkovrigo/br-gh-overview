import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { RepositoryService } from '../repository.service';
import { ActivatedRouteStub } from '../testing/activated-route-stub';
import { TestRepositoryService } from '../testing/test-repository.service';
import { CommitDetailsComponent } from './commit-details.component';

let activatedRoute: ActivatedRouteStub;

describe('CommitDetailsComponent', () => {
  let component: CommitDetailsComponent;
  let fixture: ComponentFixture<CommitDetailsComponent>;

  beforeEach(async () => {
    activatedRoute = new ActivatedRouteStub();

    await TestBed.configureTestingModule({
      declarations: [ CommitDetailsComponent ],
      providers: [
        { provide: RepositoryService, useClass: TestRepositoryService },
        { provide: ActivatedRoute, useValue: activatedRoute }
      ]
    })
    .compileComponents();
  });

  beforeEach(async () => {
    fixture = TestBed.createComponent(CommitDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    await fixture.whenStable();
    // 2nd change detection displays the async-fetched hero
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
