import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  createUser: CreateUser = {
    DeviceToken: 'PC',
    email: '',
    password: '',
    userName: ''
  };

  confirmPassword: string = '';

  constructor(private authService: AuthService, private router: Router){}

  onSubmit(){
    console.log(this.createUser);
    this.authService.register(this.createUser).subscribe((resp) => {
      if(resp.errorMessage.length == 0) 
        this.router.navigate(['/login']);
      else
        alert(resp.errorMessage[0]);
    });
  }
}

export interface CreateUser {
  userName: string,
  password: string,
  email: string,
  DeviceToken: string
}