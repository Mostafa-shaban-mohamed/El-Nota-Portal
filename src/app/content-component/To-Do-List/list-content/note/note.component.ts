import { Component, OnInit } from '@angular/core';
import { NotesService } from 'src/app/shared/services/notes.service';

@Component({
  selector: 'app-note',
  templateUrl: './note.component.html',
  styleUrls: ['./note.component.css']
})
export class NoteComponent implements OnInit {

  notes: any[] = [];
  labelId: bigint | null = null;

  //alarm icons
  alarmOff: string = './assets/Icons/alarm-off.png';
  alarmOn: string = './assets/Icons/alarm-on.png';

  constructor(private service: NotesService){}
  ngOnInit() {
      this.getAllNotes();
  }

  getAllNotes(){
    this.service.getAllNotes().subscribe((resp: any) => {
      //console.log(resp);
      this.notes = resp;
    });
  }

  onAdding(){
    this.service.addNote(this.labelId).subscribe(resp => {
      //console.log(resp);
      this.getAllNotes();
    })
  }

  onDeleteNote(id: any){
    this.service.deleteNote(id).subscribe(resp => {
      //console.log(resp);
      if(resp.isSuccess == true){
        this.notes = this.notes.filter(m => m.id != id);
      }else{
        alert(resp.data);
      }
      //this.getAllNotes();
    })
  }

  writeNote(id: any, noteText: string){
    let body = {
      id: id,
      noteText: noteText
    }
    this.service.writeNote(body).subscribe(resp => {});
  }
}
