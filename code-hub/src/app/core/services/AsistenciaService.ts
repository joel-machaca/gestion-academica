import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AsistenciaModel } from '../models/AsistenciaModel';

@Injectable({
  providedIn: 'root'
})
export class AsistenciaService {

  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  getAsistencias(): Observable<AsistenciaModel[]> {
    return this.http.get<AsistenciaModel[]>(`${this.apiUrl}/asistencias`);
  }

  getAsistenciasPorCurso(cursoId: number): Observable<AsistenciaModel[]> {
    return this.http.get<AsistenciaModel[]>(`${this.apiUrl}/asistencias?cursoId=${cursoId}`);
  }

  registrarAsistencia(asistencia: AsistenciaModel): Observable<AsistenciaModel> {
    return this.http.post<AsistenciaModel>(`${this.apiUrl}/asistencias`, asistencia);
  }

}
