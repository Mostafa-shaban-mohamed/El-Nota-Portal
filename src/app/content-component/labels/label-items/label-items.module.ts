import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LabelItemsRoutingModule } from './label-items-routing.module';
import { LabelDailyListComponent } from './label-daily-list/label-daily-list.component';
import { LabelScheduledListComponent } from './label-scheduled-list/label-scheduled-list.component';
import { LabelNoteComponent } from './label-note/label-note.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';


@NgModule({
  declarations: [
    LabelDailyListComponent,
    LabelScheduledListComponent,
    LabelNoteComponent
  ],
  imports: [
    CommonModule,
    LabelItemsRoutingModule,
    SharedModule,
    FormsModule,
        BrowserModule,
        RouterModule,
        NgbModule
  ]
})
export class LabelItemsModule { }
