import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LabelNoteComponent } from './label-note/label-note.component';
import { LabelDailyListComponent } from './label-daily-list/label-daily-list.component';
import { LabelScheduledListComponent } from './label-scheduled-list/label-scheduled-list.component';

export const LabelRoutes: Routes = [
  { path: 'notes', component: LabelNoteComponent },
  { path: 'daily-list', component: LabelDailyListComponent },
  { path: 'scheduled-list', component: LabelScheduledListComponent },

  {path: '', redirectTo: 'daily-list', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forChild(LabelRoutes)],
  exports: [RouterModule]
})
export class LabelItemsRoutingModule { }
