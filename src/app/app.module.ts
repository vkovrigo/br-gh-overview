import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { CommitsComponent } from './commits/commits.component';
import { CommitDetailsComponent } from './commit-details/commit-details.component';

@NgModule({
  declarations: [
    AppComponent,
    CommitsComponent,
    CommitDetailsComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
