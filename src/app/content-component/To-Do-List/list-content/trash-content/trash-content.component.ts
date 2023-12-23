import { Component, OnInit } from '@angular/core';
import { ToDolists } from 'src/app/shared/models/list.model';
import { ListServiceService } from 'src/app/shared/services/list-service.service';
import { NotesService } from 'src/app/shared/services/notes.service';

@Component({
  selector: 'app-trash-content',
  templateUrl: './trash-content.component.html',
  styleUrls: ['./trash-content.component.css']
})
export class TrashContentComponent implements OnInit {
  dailyList: ToDolists[] = [];
  scheduledList: ToDolists[] = [];
  notes: any[] = [];
  constructor(private service: ListServiceService, private noteService: NotesService){}
  ngOnInit() {
    this.loadLists();
  }
  loadLists(){
    this.onFetchTrashList(true);
    this.onFetchTrashList(false);
    this.onFetchTrashNote();
  }
  onFetchTrashList(isDaily: boolean){
    this.service.getTrashListWithTasks(isDaily).subscribe((resp) => {
      if(isDaily)
        this.dailyList = resp;
      else
        this.scheduledList = resp;
    });
  }

  onRestore(ListId: bigint){
    this.service.restoreList(ListId).subscribe(resp => {
      //this.loadLists();
      this.dailyList = this.dailyList.filter(m => m.id != ListId);
      this.scheduledList = this.scheduledList.filter(m => m.id != ListId);
    });
  }
  onHardDelete(listId: bigint){
    this.service.hardDeleteList(listId).subscribe(() => {
      this.dailyList = this.dailyList.filter(m => m.id != listId);
      this.scheduledList = this.scheduledList.filter(m => m.id != listId);
    });
  }

  // ================== NOTE =============================
  onFetchTrashNote(){
    this.noteService.getAllNotesFromTrash().subscribe(resp => {
      this.notes = resp;
    })
  }

  onRestoreNote(noteId: bigint){
    this.noteService.restoreNote(noteId).subscribe(resp => {
      //this.loadLists();
      this.notes = this.notes.filter(m => m.id != noteId);
    });
  }
  onHardDeleteNote(noteId: bigint){
    this.noteService.permentDeleteNote(noteId).subscribe(() => {
      this.notes = this.notes.filter(m => m.id != noteId);
    });
  }
}
