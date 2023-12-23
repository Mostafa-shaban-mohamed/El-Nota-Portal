import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthComponentComponent } from './content-component/auth-component/auth-component.component';
import { HomeComponent } from './content-component/home/home.component';
import { DisplayListsComponent } from './content-component/To-Do-List/display-lists/display-lists.component';
import { CustomerGuard } from './shared/guard/admin-guard.guard';
import { RegisterComponent } from './content-component/register/register.component';
import { TrashContentComponent } from './content-component/To-Do-List/list-content/trash-content/trash-content.component';
import { DailyListsComponent } from './content-component/To-Do-List/list-content/daily-lists/daily-lists.component';
import { ScheduledListsComponent } from './content-component/To-Do-List/list-content/scheduled-lists/scheduled-lists.component';
import { NoteComponent } from './content-component/To-Do-List/list-content/note/note.component';
import { LabelsComponent } from './content-component/labels/labels.component';
import { LabelRoutes } from './content-component/labels/label-items/label-items-routing.module'

const routes: Routes = [
  { path: 'Home', component: HomeComponent},
  { path: 'login', component: AuthComponentComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'note-lists', component: DisplayListsComponent, children: [
    {path: 'daily-list', component: DailyListsComponent, canActivate: [CustomerGuard]},
    {path: 'scheduled-list', component: ScheduledListsComponent, canActivate: [CustomerGuard]},
    {path: 'notes', component: NoteComponent, canActivate: [CustomerGuard]},
    {path: 'trash', component: TrashContentComponent, canActivate: [CustomerGuard]},
    {path: 'labels/:id', component: LabelsComponent, canActivate: [CustomerGuard], children: LabelRoutes},
    {path: '', redirectTo: 'daily-list', pathMatch: 'full'}
  ]},
  
  { path: '', redirectTo: 'Home', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
