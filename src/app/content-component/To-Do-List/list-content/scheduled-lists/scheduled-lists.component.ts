import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ModalComponent } from 'src/app/shared/components/modal/modal.component';
import { Tasks, ToDoListDto, ToDolists, priorityType } from 'src/app/shared/models/list.model';
import { ListServiceService } from 'src/app/shared/services/list-service.service';

@Component({
  selector: 'app-scheduled-lists',
  templateUrl: './scheduled-lists.component.html',
  styleUrls: ['./scheduled-lists.component.css']
})
export class ScheduledListsComponent implements OnInit {
  scheduleList: ToDolists[] = [];
  list: ToDoListDto = {
    startDate: null,
    endDate: null,
    isDaily: true,
    labelId: null,
  }
  constructor(private listService: ListServiceService, private modalService: NgbModal){}

  ngOnInit() {
    //this.onFetch();
    this.onFetchListWithTasks();
  }

  //get lists with tasks
  onFetchListWithTasks(){
    this.listService.getListWithTasks(false).subscribe(resp => { this.scheduleList = resp; });
  }

  onFetchTasks(listId: bigint){
    this.listService.getTasksOfCertainList(listId).subscribe(res => {
      this.scheduleList.filter(m => m.id == listId)[0].tasks = res;
    })
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
    }else{
      this.listService.createNewTask(newTask).subscribe(resp => {
        if(resp.errorMessage.length > 0){
          alert(resp.errorMessage[0]);
        }
        else{
          this.listService.getTasksOfCertainList(listId).subscribe(res => {
            this.onFetchListWithTasks();
          });
        }
      });
    }
  }

  //change status of task
  onChangeStatus(task: Tasks){
    task.isFinished = !task.isFinished;
    this.listService.updateTask(task).subscribe(resp => {});
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
      //   this.scheduleList.filter(m => m.id = listId)[0].tasks = res;
      // });
      if(resp.isSuccess){
        this.scheduleList.filter(m => m.id == listId)[0].tasks = this.scheduleList.filter(m => m.id == listId)[0].tasks?.filter(m => m.id != taskId);
      }
      else{
        alert(resp.data);
      }
    });
  }

  //delete To-Do List
  onDeleteList(listId: bigint){
    //this.listService.deleteList(listId).subscribe(resp => this.onFetchListWithTasks());
    this.listService.deleteList(listId).subscribe(resp => {
      if(resp.isSuccess == true){
        this.scheduleList = this.scheduleList.filter(m => m.id != listId);
      }
      else{
        alert(resp.data);
      }
    });
  }

  //add new List
  // onAdding(){
  //   this.listService.addList(this.list).subscribe(resp => this.onFetchListWithTasks());
  // }

  //modal test
  
  closeModal: any;
  openModal() {
    const modalRef = this.modalService.open(ModalComponent,
      {
        scrollable: true,
        backdrop: true,
      });
      modalRef.result.then((result:any) => {
        if(result != 'close'){
          this.onFetchListWithTasks();
        }
      }, 
      (reason:any) => {
      }
    );
  }

  openEditModal(list: ToDolists) {
    const modalRef = this.modalService.open(ModalComponent,
      {
        scrollable: true,
        backdrop: true,
      });
      modalRef.componentInstance.list.endDate = list.endDate;
      modalRef.componentInstance.list.startDate = list.startDate;
      modalRef.componentInstance.listId = list.id;
      modalRef.componentInstance.isCreate = false;

      modalRef.result.then((result: any) => {
        if(result != 'close'){
          this.onFetchListWithTasks();
        }
      }, 
      (reason:any) => {
      }
    );
  }
}
