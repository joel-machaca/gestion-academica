import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { MatriculaModel } from '../models/MatriculaModel';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MatriculasService {

  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  private getAuthHeaders(): HttpHeaders {
    const token = localStorage.getItem('accessToken');
    return new HttpHeaders({
      Authorization: token ? `Bearer ${token}` : ''
    });
  }

  getMatriculas(): Observable<MatriculaModel[]> {
    return this.http.get<MatriculaModel[]>(
      `${this.apiUrl}/matriculas`,
      { headers: this.getAuthHeaders() }
    );
  }

  crearMatricula(matricula: MatriculaModel): Observable<MatriculaModel> {
    return this.http.post<MatriculaModel>(
      `${this.apiUrl}/matriculas`,
      matricula,
      { headers: this.getAuthHeaders() }
    );
  }

  eliminarMatricula(id: number): Observable<any> {
    return this.http.delete(
      `${this.apiUrl}/matriculas/${id}`,
      { headers: this.getAuthHeaders() }
    );
  }

}
