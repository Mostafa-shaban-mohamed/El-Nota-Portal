import { Component, OnInit, Output } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { DataService } from '../../services/data.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  userName: string | undefined = "";

  constructor(private authService: AuthService, private router: Router, public dataService: DataService){}

  ngOnInit() {
    if(localStorage.getItem('accessToken') != undefined){
      this.userName = localStorage.getItem('userName')?.toString();
      this.dataService.update(true);
    }
  }

  signout(){
    this.authService.signOut().subscribe(resp => { 
      console.log(resp.successMessage);
      localStorage.removeItem('accessToken');
      localStorage.removeItem("userName");
      localStorage.removeItem('role');
      this.dataService.update(false);
      //navigate to ....
      this.router.navigate(['/Home']);
    });
  }
}

