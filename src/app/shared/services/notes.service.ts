import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environments';

const apiUrl = environment.apiURL + 'api/Notes/';
@Injectable({
  providedIn: 'root'
})
export class NotesService {

  constructor(private http: HttpClient) { }

  getAllNotes(): Observable<any> {
    return this.http.get<any>(apiUrl + 'get-all-notes');
  }

  getAllNotesFromTrash(): Observable<any> {
    return this.http.get<any>(apiUrl + 'get-all-notes-from-trash');
  }

  addNote(labelId: bigint | null) : Observable<any>{
    return this.http.post<any>(apiUrl+'create-note' 
    + (labelId != null ? '?labelId=' + labelId : ''), {});
  }

  deleteNote(id: any): Observable<any> {
    return this.http.put(apiUrl+'soft-delete-note?id='+id, {});
  }

  writeNote(body: any): Observable<any>{
    return this.http.post<any>(apiUrl+'write-note', body);
  }

  permentDeleteNote(id: any): Observable<any> {
    return this.http.delete(apiUrl+'delete-note?id='+id);
  }

  restoreNote(id: any): Observable<any> {
    return this.http.put(apiUrl+'restore-note?id='+id, {});
  }
}
