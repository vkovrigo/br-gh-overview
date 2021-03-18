import { TestBed } from '@angular/core/testing';
import {TestbedHarnessEnvironment} from '@angular/cdk/testing/testbed';
import {MatToolbarHarness} from '@angular/material/toolbar/testing';
import {HarnessLoader} from '@angular/cdk/testing';
import {MatToolbarModule} from '@angular/material/toolbar';
import { AppComponent } from './app.component';

describe('AppComponent', () => {
  let loader: HarnessLoader;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MatToolbarModule],
      declarations: [
        AppComponent
      ],
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have as title 'Github Repository Overview'`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app.title).toEqual('Github Repository Overview');
  });

  it('should render title', async () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    loader = TestbedHarnessEnvironment.loader(fixture);
    const toolbar = await loader.getHarness(MatToolbarHarness.with({text: 'Github Repository Overview'}))
    expect(toolbar).toBeDefined();
  });
});
