import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CreateUser } from 'src/app/content-component/register/register.component';
import { environment } from 'src/environments/environments';

const apiUrl = environment.apiURL;

@Injectable({
  providedIn: 'root',
})

export class AuthService {
  
  constructor(private http: HttpClient) { }

  login(body: { email: string, password: string }): Observable<any> {
    return this.http.post<any>(apiUrl+'Users/login', body);
  }

  register(body: CreateUser): Observable<any> {
    return this.http.post<any>(apiUrl+'Users/register', body);
  }

  signOut(): Observable<any>{
    return this.http.get<any>(apiUrl+"Users/logout");
  }
}
