import { Component, OnInit } from '@angular/core';
import { Tasks, ToDoListDto, ToDolists } from 'src/app/shared/models/list.model';
import { ListServiceService } from 'src/app/shared/services/list-service.service';


@Component({
  selector: 'app-daily-lists',
  templateUrl: './daily-lists.component.html',
  styleUrls: ['./daily-lists.component.css']
})
export class DailyListsComponent implements OnInit {
  dailyList: ToDolists[] = [];
  isExpand: boolean = false; 
  isModalOpen: boolean = false; 
  list: ToDoListDto = {
    startDate: null,
    endDate: null,
    isDaily: true
  }

  constructor(private listService: ListServiceService){}
  ngOnInit() {
    //this.onFetch();
    this.onFetchListWithTasks();
  }

  //fetch list
  // onFetch(){
  //   this.listService.getLists(true).subscribe((resp) => {
  //     this.dailyList = resp;
  //   });
  // }

  onFetchTasks(listId: bigint){
    this.listService.getTasksOfCertainList(listId).subscribe(res => {
      this.dailyList.filter(m => m.id == listId)[0].tasks = res;
    })
  }

  //get lists with tasks
  onFetchListWithTasks(){
    this.listService.getListWithTasks(true).subscribe(resp => { this.dailyList = resp;});
  }

  //create new task for certain list
  onCreateNewTask(event: string, listId: bigint){
    var newTask = {
      toDoListId: listId,
      taskName: event,
      isFinished: false,
      description: ""
    }
    this.listService.createNewTask(newTask).subscribe(resp => {
      if(resp.errorMessage.length > 0){
        alert(resp.errorMessage[0]);
      }
      else{
        this.listService.getTasksOfCertainList(listId).subscribe(res => {
          this.onFetchListWithTasks
        })
      }
    });
  }

  //change status of task
  onChangeStatus(task: Tasks){
    task.isFinished = !task.isFinished;
    this.listService.updateTask(task).subscribe(resp => this.onFetchTasks(task.toDoListId));
  }
  //delete certain task
  onDeleteTask(taskId: bigint, listId: bigint){
    this.listService.deleteTask(taskId).subscribe(resp => {
      this.listService.getTasksOfCertainList(listId).subscribe(res => {
        this.dailyList.filter(m => m.id = listId)[0].tasks = res;
      });
    });
  }

  //delete To-Do List
  onDeleteList(listId: bigint){
    this.listService.deleteList(listId).subscribe(resp => this.onFetchListWithTasks());
  }

  //add new List
  onAdding(){
    this.listService.addList(this.list).subscribe(resp => this.onFetchListWithTasks());
  }
}