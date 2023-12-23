import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DataService } from 'src/app/shared/services/data.service';
import { LabelService } from 'src/app/shared/services/label.service';
import { NotesService } from 'src/app/shared/services/notes.service';

@Component({
  selector: 'app-label-note',
  templateUrl: './label-note.component.html',
  styleUrls: ['./label-note.component.css']
})
export class LabelNoteComponent implements OnInit {

  // label id
  Id: bigint | null = null;

  notes: any[] = [];
  constructor(
    private router: Router, 
    private activatedRoute: ActivatedRoute, 
    private labelDataService: DataService, 
    private labelService: LabelService,
    private noteService: NotesService
    ){
    this.Id = BigInt(this.labelDataService.LabelId);
  }
  ngOnInit(): void {
    this.getNotesByLabelId();
  }

  getNotesByLabelId(){
    this.labelService.getAllNotesByLabelId(this.labelDataService.LabelId).subscribe(resp => {
      this.notes = resp;
    })
  }

  onAdding(){
    this.noteService.addNote(this.Id).subscribe(resp => {
      console.log(resp);
      this.getNotesByLabelId();
    })
  }

  onDeleteNote(id: any){
    this.noteService.deleteNote(id).subscribe(resp => {
      console.log(resp);
      this.getNotesByLabelId();
    })
  }

  writeNote(id: any, noteText: string){
    let body = {
      id: id,
      noteText: noteText
    }
    this.noteService.writeNote(body).subscribe(resp => {});
  }
}
