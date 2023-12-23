import { Component } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ModalComponent } from 'src/app/shared/components/modal/modal.component';
import { Tasks, ToDoListDto, ToDolists } from 'src/app/shared/models/list.model';
import { DataService } from 'src/app/shared/services/data.service';
import { LabelService } from 'src/app/shared/services/label.service';
import { ListServiceService } from 'src/app/shared/services/list-service.service';

@Component({
  selector: 'app-label-scheduled-list',
  templateUrl: './label-scheduled-list.component.html',
  styleUrls: ['./label-scheduled-list.component.css']
})
export class LabelScheduledListComponent {

  scheduleList: ToDolists[] = [];
  list: ToDoListDto = {
    startDate: null,
    endDate: null,
    isDaily: true,
    labelId: null
  }
  constructor(
    private listService: ListServiceService, 
    private modalService: NgbModal, 
    private dataService: DataService,
    private labelService: LabelService
    ){}

  ngOnInit() {
    this.list.labelId = this.dataService.LabelId;
    this.onFetchListWithTasks();
  }

  //get lists with tasks
  onFetchListWithTasks(){
    this.labelService.getAllListByLabelId(false, this.dataService.LabelId).subscribe(resp => { this.scheduleList = resp; });
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

  //change status of task
  onChangeStatus(task: Tasks){
    task.isFinished = !task.isFinished;
    this.listService.updateTask(task).subscribe(resp => this.onFetchTasks(task.toDoListId));
  }
  
  //delete certain task
  onDeleteTask(taskId: bigint, listId: bigint){
    this.listService.deleteTask(taskId).subscribe(resp => {
      this.listService.getTasksOfCertainList(listId).subscribe(res => {
        this.scheduleList.filter(m => m.id = listId)[0].tasks = res;
      });
    });
  }

  //delete To-Do List
  onDeleteList(listId: bigint){
    this.listService.deleteList(listId).subscribe(resp => this.onFetchListWithTasks());
  }
  //modal test
  
  closeModal: any;
  openModal() {
    const modalRef = this.modalService.open(ModalComponent,
      {
        scrollable: true,
        backdrop: true,
      });
      modalRef.componentInstance.list.labelId = this.list.labelId;
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
      modalRef.componentInstance.list.labelId = this.list.labelId;

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
