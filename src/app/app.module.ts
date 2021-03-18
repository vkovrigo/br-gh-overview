import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';

import { MaterialModule } from './material.module';

import { AppComponent } from './app.component';
import { CommitsComponent } from './commits/commits.component';
import { CommitDetailsComponent } from './commit-details/commit-details.component';
import { AppRoutingModule } from './app-routing.module';
import { CommitsFilterComponent } from './commits-filter/commits-filter.component';
import { CommitsPaginationComponent } from './commits-pagination/commits-pagination.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [
    AppComponent,
    CommitsComponent,
    CommitDetailsComponent,
    CommitsFilterComponent,
    CommitsPaginationComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MaterialModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
