import { Component, OnInit } from '@angular/core';
import { Tasks, ToDoListDto, ToDolists, priorityType } from 'src/app/shared/models/list.model';
import { DataService } from 'src/app/shared/services/data.service';
import { LabelService } from 'src/app/shared/services/label.service';
import { ListServiceService } from 'src/app/shared/services/list-service.service';

@Component({
  selector: 'app-label-daily-list',
  templateUrl: './label-daily-list.component.html',
  styleUrls: ['./label-daily-list.component.css']
})
export class LabelDailyListComponent implements OnInit {

  dailyList: ToDolists[] = [];
  isExpand: boolean = false; 
  isModalOpen: boolean = false; 
  list: ToDoListDto = {
    startDate: null,
    endDate: null,
    isDaily: true,
    labelId: null
  }

  constructor(private listService: ListServiceService, private labelService: LabelService, private dataService: DataService){}
  ngOnInit() {
    this.list.labelId = this.dataService.LabelId;
    this.onFetchListWithTasks();
  }

  onFetchTasks(listId: bigint){
    this.listService.getTasksOfCertainList(listId).subscribe(res => {
      this.dailyList.filter(m => m.id == listId)[0].tasks = res;
    })
  }

  //get lists with tasks
  onFetchListWithTasks(){
    this.labelService.getAllListByLabelId(true, this.dataService.LabelId).subscribe(resp => 
      { 
        this.dailyList = resp; 
        //console.log(resp);
      });
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
            this.onFetchListWithTasks();
          })
        }
      });
    }
  }

  //change status of task
  onChangeStatus(task: Tasks){
    task.isFinished = !task.isFinished;
    this.listService.updateTask(task).subscribe(resp => this.onFetchTasks(task.toDoListId));
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
