import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommitDetailsComponent } from './commit-details/commit-details.component';
import { CommitsComponent } from './commits/commits.component';

const routes: Routes = [
  { path: '', redirectTo: '/commits', pathMatch: 'full' },
  { path: 'commits/:sha', component: CommitDetailsComponent},
  { path: 'commits', component: CommitsComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
