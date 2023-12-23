import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  private IsLogged: boolean = false;
  private userName: string | undefined =
   (localStorage.getItem('userName') != undefined) ? localStorage.getItem('userName')?.toString() : '';
  constructor() { }

  update(status: boolean){
    this.IsLogged = status;
  }

  updateUserName(name: string){
    this.userName = name;
  }

  get authStatus(){
    return this.IsLogged;
  }

  get UserName(){
    return this.userName;
  }

  // ============================ labels ===============================
  private labelId: number = 0;

  updateLabelId(newValue: number){
    this.labelId = newValue;
  }

  get LabelId(){
    return this.labelId;
  }
}
