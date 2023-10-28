import { Component, OnInit } from '@angular/core';
import { ToDolists } from 'src/app/shared/models/list.model';
import { ListServiceService } from 'src/app/shared/services/list-service.service';

@Component({
  selector: 'app-trash-content',
  templateUrl: './trash-content.component.html',
  styleUrls: ['./trash-content.component.css']
})
export class TrashContentComponent implements OnInit {
  dailyList: ToDolists[] = [];
  scheduledList: ToDolists[] = [];
  constructor(private service: ListServiceService){}
  ngOnInit() {
    this.loadLists();
  }
  loadLists(){
    this.onFetchTrashList(true);
    this.onFetchTrashList(false);
  }
  onFetchTrashList(isDaily: boolean){
    this.service.getTrashListWithTasks(isDaily).subscribe((resp) => {
      if(isDaily)
        this.dailyList = resp;
      else
        this.scheduledList = resp;
    });
  }
  onRestore(ListId: bigint){
    this.service.restoreList(ListId).subscribe(resp => {
      this.loadLists();
    });
  }
  onHardDelete(listId: bigint){
    this.service.hardDeleteList(listId).subscribe(() => this.loadLists());
  }
}
