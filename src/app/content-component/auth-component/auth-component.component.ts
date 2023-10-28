import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbAlert } from '@ng-bootstrap/ng-bootstrap';
import { AuthService } from 'src/app/shared/services/auth.service';
import { DataService } from 'src/app/shared/services/data.service';

@Component({
  selector: 'app-auth-component',
  templateUrl: './auth-component.component.html',
  styleUrls: ['./auth-component.component.css']
})
export class AuthComponentComponent {
  loginBody = {
    email: '',
    password: ''
  }

  errorMessage: string = '';

  constructor(private service: AuthService, public dataService: DataService, private router: Router){}

  login(){
    this.service.login(this.loginBody).subscribe((resp) => {
      if(resp.errorMessage.length > 0){
        this.errorMessage = resp.errorMessage[0];
      }
      else{
        localStorage.setItem('accessToken', resp.data.accessToken);
        localStorage.setItem('userRole', resp.data.role);
        localStorage.setItem('userName', resp.data.userName);
        this.dataService.updateUserName(resp.data.userName);
        this.dataService.update(true);
        //redirect to Lists Page
        this.router.navigate(['/Home']);
      }
    });
  }
}
