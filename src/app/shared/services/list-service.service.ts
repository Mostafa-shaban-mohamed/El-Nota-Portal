import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environments';
import { Tasks, ToDolists } from '../models/list.model';


const apiUrl = environment.apiURL;

@Injectable({
  providedIn: 'root'
})
export class ListServiceService {

  constructor(private http: HttpClient) { }

  //lists methods
  getLists(isDaily: boolean): Observable<ToDolists[]> {
    return this.http.get<ToDolists[]>(apiUrl+'api/ToDoLists/get-all-toDoList-of-User?isDaily='+isDaily);
  }

  //get lists with tasks
  getListWithTasks(isDaily: boolean){
    return this.http.get<ToDolists[]>(apiUrl+'api/ToDoLists/get-all-toDoList-with-tasks?isDaily='+isDaily);
  }

  //get trash lists with tasks
  getTrashListWithTasks(isDaily: boolean){
    return this.http.get<ToDolists[]>(apiUrl+'api/ToDoLists/get-all-trash-toDoList-with-tasks?isDaily='+isDaily);
  }

  addList(body: any): Observable<any>{
    return this.http.post<any>(apiUrl+'api/ToDoLists/create-toDoList', body);
  }
  //soft delete
  deleteList(listId: bigint): Observable<any>{
    return this.http.delete<any>(apiUrl+'api/ToDoLists/delete-toDoList?id='+listId);
  }
  //soft delete
  hardDeleteList(listId: bigint): Observable<any>{
    return this.http.delete<any>(apiUrl+'api/ToDoLists/hard-delete-toDoList?id='+listId);
  }
  //update list
  updateList(listId: bigint, body: any): Observable<any>{
    return this.http.put<any>(apiUrl+'api/ToDoLists/update-toDoList?listId='+listId, body);
  }
  //restore list
  restoreList(listId: bigint): Observable<any>{
    return this.http.put<any>(apiUrl+'api/ToDoLists/restore-toDoList?id='+listId, {});
  }

  //================ tasks methods ==============================

  getTasksOfCertainList(id: bigint): Observable<Tasks[]> {
    return this.http.get<Tasks[]>(apiUrl+'api/Tasks/get-all-tasks-of-certain-list?ToDoListId='+id)
  }

  createNewTask(body: {toDoListId: bigint, taskName: string, isFinished: boolean, description: string}): Observable<any> {
    return this.http.post(apiUrl+'api/Tasks/create-task', body);
  }

  updateTask(body: any): Observable<any>{
    return this.http.put<any>(apiUrl+'api/Tasks/update-task', body);
  }

  deleteTask(id: bigint) : Observable<any>{
    return this.http.delete<any>(apiUrl+'api/Tasks/delete-task?id='+id);
  }
}
