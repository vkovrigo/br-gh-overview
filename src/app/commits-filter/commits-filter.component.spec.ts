import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule, FormsModule } from "@angular/forms";
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatButtonModule } from '@angular/material/button';
import { TestbedHarnessEnvironment } from '@angular/cdk/testing/testbed';
import { MatDatepickerInputHarness } from '@angular/material/datepicker/testing';
import { MatButtonHarness } from '@angular/material/button/testing';
import { HarnessLoader } from '@angular/cdk/testing';
import { CommitsFilterComponent } from './commits-filter.component';

describe('CommitsFilterComponent', () => {
  let component: CommitsFilterComponent;
  let fixture: ComponentFixture<CommitsFilterComponent>;
  let loader: HarnessLoader;
  let mockMaxDate = '2021-12-17';

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, FormsModule, MatDatepickerModule, MatNativeDateModule, MatButtonModule],
      declarations: [ CommitsFilterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    jasmine.clock().mockDate(new Date(mockMaxDate));
    fixture = TestBed.createComponent(CommitsFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    loader = TestbedHarnessEnvironment.loader(fixture);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load all datepicker input harnesses', async () => {
    const inputs = await loader.getAllHarnesses(MatDatepickerInputHarness);
    expect(inputs.length).toBe(1);
  });

  it('should get whether the input has an associated calendar', async () => {
    const input = await loader.getHarness(MatDatepickerInputHarness);
    expect(await input.hasCalendar()).toBeTrue();
  });

  it('should set the input value', async () => {
    const input = await loader.getHarness(MatDatepickerInputHarness);
    expect(await input.getValue()).toBeFalsy();

    await input.setValue('1/1/2020');
    expect(await input.getValue()).toBe('1/1/2020');
  });

  it('should get the maximum date of the input', async () => {
    const input = await loader.getHarness(MatDatepickerInputHarness);
    expect(await input.getMax()).toEqual(mockMaxDate);
  });

  it('should have the button disabled', async () => {
    const button = await loader.getHarness(MatButtonHarness.with({ text: 'Apply' }));
    expect(await button.isDisabled()).toBeTrue();
  });

  it('should enable button if date has been changed in calendar', async () => {
    const input = await loader.getHarness(MatDatepickerInputHarness);
    await input.setValue('2021-12-10');

    const button = await loader.getHarness(MatButtonHarness.with({ text: 'Apply' }));
    expect(await button.isDisabled()).toBeFalse();
  });

  it('should call changed event when value in calendar has been changed', async () => {
    component.changed.subscribe(arg => expect(arg).toBeUndefined());

    const input = await loader.getHarness(MatDatepickerInputHarness);
    await input.setValue('2021-12-10');
  });

  it('should call applied event when user click on apply button', async () => {
    const dateValue = '2021-12-10';
    component.applied.subscribe(({ sinceDate }) => {
      expect(sinceDate).toEqual(new Date(dateValue));

    });

    const input = await loader.getHarness(MatDatepickerInputHarness);
    const button = await loader.getHarness(MatButtonHarness.with({ text: 'Apply' }));
    await input.setValue(dateValue);
    await button.click();
  });
});
