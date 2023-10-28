import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { AuthComponentComponent } from './auth-component/auth-component.component';
import { HomeComponent } from './home/home.component';
import { DisplayListsComponent } from './To-Do-List/display-lists/display-lists.component';
import { RegisterComponent } from './register/register.component';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { TrashContentComponent } from './To-Do-List/list-content/trash-content/trash-content.component';
import { DailyListsComponent } from './To-Do-List/list-content/daily-lists/daily-lists.component';
import { ScheduledListsComponent } from './To-Do-List/list-content/scheduled-lists/scheduled-lists.component';
import { ModalComponent } from '../shared/components/modal/modal.component';



@NgModule({
    declarations: [
        AuthComponentComponent,
        HomeComponent,
        DisplayListsComponent,
        RegisterComponent,
        TrashContentComponent,
        DailyListsComponent,
        ScheduledListsComponent
    ],
    imports: [
        CommonModule,
        BrowserModule,
        FormsModule,
        RouterModule,
        SharedModule
    ],
})
export class ContentComponentModule { }
