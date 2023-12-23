import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DataService } from 'src/app/shared/services/data.service';
import { LabelService } from 'src/app/shared/services/label.service';

@Component({
  selector: 'app-labels',
  templateUrl: './labels.component.html',
  styleUrls: ['./labels.component.css']
})
export class LabelsComponent implements OnInit {

  labelName: string = '';
  labelId: number = 0;

  constructor(
    private router: Router, 
    private activatedRoute: ActivatedRoute, 
    private labelService: LabelService, 
    private dataService: DataService
    ){
    this.activatedRoute.params.subscribe(params => {
      this.labelId = params['id'];
      dataService.updateLabelId(this.labelId);
      this.getLabelById();
    });
  }
  ngOnInit() {
    
  }
  getLabelById(){
    this.labelService.getLabelInfoByLabelId(this.labelId).subscribe(resp => {
      this.labelName = resp.data.labelName;
    })
  }
}
