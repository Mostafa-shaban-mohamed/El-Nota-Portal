import { Component, OnInit } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { LabelService } from '../../services/label.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  labels: any[] = [];
  labelName: string = '';
  constructor(public activeModal: NgbModal, private router: Router, private labelService: LabelService) { }
  
  ngOnInit() { }

  getAllLabels(){
    this.labelService.getAllLabels().subscribe(resp => {
      this.labels = resp;
    });
  }
  showLabels(content: any){
    this.getAllLabels();
    this.activeModal.open(content, {size: 'sm', centered: true});
  }

  deleteLabel(id: number){
    this.labelService.deleteLabel(id).subscribe(resp => {
      alert(resp.data);
      this.activeModal.dismissAll();
      this.router.navigateByUrl('/note-lists/notes');
    })
  }

  addLabel(){
    let body = {
      labelName: this.labelName
    }
    this.labelService.addLabel(body).subscribe(resp => {
      alert(resp.data);
      //reload label lists
      this.labelName = '';
      this.getAllLabels();
    });
  }
  close(){
    this.activeModal.dismissAll();
  }
}
