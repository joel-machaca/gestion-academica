import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { BehaviorSubject, Observable ,tap} from 'rxjs';
import { UsuarioModel } from '../models/UsuarioModel';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private currentUser = new BehaviorSubject<any>(
  JSON.parse(localStorage.getItem('currentUser') || 'null')
);
currentUser$ = this.currentUser.asObservable();

  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  login(email: string, password: string): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/login`, { email, password }).pipe(
      tap(res => {
        // guardar token y roleId
        localStorage.setItem('accessToken', res.accessToken);
        localStorage.setItem('roleId', res.user.roleId.toString());
        localStorage.setItem('currentUser', JSON.stringify(res.user));

        // actualizar BehaviorSubject
        this.currentUser.next(res.user);
      })
    );
  }

  register(usuario: UsuarioModel): Observable<any> {
    return this.http.post(`${this.apiUrl}/register`, usuario);
  }

  getUser() {
    return this.currentUser.value;
  }

  logout() {
  localStorage.removeItem('accessToken');
  localStorage.removeItem('roleId');
  localStorage.removeItem('currentUser');
  this.currentUser.next(null); // actualizar BehaviorSubject
}
}
