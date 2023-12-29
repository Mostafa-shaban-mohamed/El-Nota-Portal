import { Component, OnInit } from '@angular/core';
import { Tasks, ToDoListDto, ToDolists, priorityType } from 'src/app/shared/models/list.model';
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
    isDaily: true,
    labelId: null
  }

  constructor(private listService: ListServiceService){}
  ngOnInit() {
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
    if(!event){
      alert('The Field is Empty');
    }
    else{
      this.listService.createNewTask(newTask).subscribe(resp => {
        if(resp.errorMessage.length > 0){
          alert(resp.errorMessage[0]);
        }
        else{
          this.listService.getTasksOfCertainList(listId).subscribe(res => {
            this.onFetchListWithTasks()
          })
        }
      });
    }
  }

  //change status of task
  onChangeStatus(task: Tasks){
    task.isFinished = !task.isFinished;
    this.listService.updateTask(task).subscribe(resp => /*this.onFetchTasks(task.toDoListId)*/{});
  }
  // change Priority of task
  onChangePriority(task: Tasks){
    if(task.priority == null){
      task.priority = priorityType.Normal;
    }else if(task.priority == priorityType.Normal){
      task.priority = priorityType.High;
    }else if(task.priority == priorityType.High){
      task.priority = priorityType.Highest;
    }else if(task.priority == priorityType.Highest){
      task.priority = priorityType.Lowest;
    }else if(task.priority == priorityType.Lowest){
      task.priority = priorityType.Normal;
    }
    this.listService.updateTask(task).subscribe(resp => /*this.onFetchTasks(task.toDoListId)*/{});
  }
  //diplay priority
  StorePriorityTypeString(type: priorityType): string {
    return priorityType[type];
  }
  //delete certain task
  onDeleteTask(taskId: bigint, listId: bigint){
    this.listService.deleteTask(taskId).subscribe(resp => {
      // this.listService.getTasksOfCertainList(listId).subscribe(res => {
      //   this.dailyList.filter(m => m.id = listId)[0].tasks = res;
      // });
      if(resp.isSuccess){
        this.dailyList.filter(m => m.id == listId)[0].tasks = this.dailyList.filter(m => m.id == listId)[0].tasks?.filter(m => m.id != taskId);
      }
      else{
        alert(resp.data);
      }
    });
  }

  //delete To-Do List
  onDeleteList(listId: bigint){
    this.listService.deleteList(listId).subscribe(resp => {
      if(resp.isSuccess == true){
        this.dailyList = this.dailyList.filter(m => m.id != listId);
      }
      else{
        alert(resp.data);
      }
    });
  }

  //add new List
  onAdding(){
    this.listService.addList(this.list).subscribe(resp => this.onFetchListWithTasks());
  }
}