import { Component, ElementRef, Input, OnDestroy, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { ListServiceService } from '../../services/list-service.service';
import { ToDoListDto } from '../../models/list.model';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent implements OnInit{
  list: ToDoListDto = {
    endDate: "",
    startDate: "",
    isDaily: false,
    labelId: null
  }
  listId: bigint = BigInt(0);
  isCreate: boolean = true;
  constructor(public activeModal: NgbActiveModal, private listService: ListServiceService) { }
  ngOnInit() {}
     
  closeModal() {
    this.activeModal.close();
  }

  onSubmit(){
    if(this.isCreate)
      this.listService.addList(this.list).subscribe(resp => this.closeModal());
    else
      this.listService.updateList(this.listId, this.list).subscribe(resp => this.closeModal());
  }
}