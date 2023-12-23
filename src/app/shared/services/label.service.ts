import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environments';
import { ToDolists } from '../models/list.model';

const apiUrl = environment.apiURL + 'api/Labels';
const apiUrlNotes = environment.apiURL + 'api/Notes';
const apiUrlList = environment.apiURL + 'api/ToDoLists';

@Injectable({
  providedIn: 'root'
})
export class LabelService {

  constructor(private http: HttpClient) { }

  getAllLabels(): Observable<any> {
    return this.http.get<any>(apiUrl);
  }

  addLabel(body: any): Observable<any>{
    return this.http.post(apiUrl, body);
  }

  deleteLabel(id: number): Observable<any>{
    return this.http.delete(apiUrl+'?id='+id);
  }

  getLabelInfoByLabelId(id: number): Observable<any>{
    return this.http.get<any>(apiUrl+'/getllabel-by-id?id='+id);
  }

  // get items by label Id
  getAllNotesByLabelId(id: number): Observable<any> {
    return this.http.get<any>(apiUrlNotes+'/get-all-notes-by-label-id?labelId='+id);
  }

  getAllListByLabelId(isDaily: boolean, id: number): Observable<any>{
    return this.http.get<ToDolists[]>(apiUrlList+'/get-all-toDoList-with-tasks-by-label-id?isDaily='+isDaily+'&labelId='+id);
  }
}
