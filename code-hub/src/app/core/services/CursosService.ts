import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, switchMap } from 'rxjs';
import { CursoModel } from '../models/CursoModel';
import { MatriculaModel } from '../models/MatriculaModel';

@Injectable({
  providedIn: 'root'
})
export class CursosService {

  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  private getAuthHeaders(): HttpHeaders {
    const token = localStorage.getItem('accessToken'); 
    return new HttpHeaders({
      Authorization: token ? `Bearer ${token}` : ''
    });
  }

  // Listar todos los cursos
  getCursos(): Observable<CursoModel[]> {
    return this.http.get<CursoModel[]>(`${this.apiUrl}/cursos`, { headers: this.getAuthHeaders() });
  }

  // Obtener un curso por ID
  getCurso(id: number): Observable<CursoModel> {
    return this.http.get<CursoModel>(`${this.apiUrl}/cursos/${id}`, { headers: this.getAuthHeaders() });
  }

  // Crear un curso
  crearCurso(curso: CursoModel): Observable<CursoModel> {
    return this.http.post<CursoModel>(
      `${this.apiUrl}/cursos`,
      curso,
      { headers: this.getAuthHeaders() }
    );
  }

  // Actualizar un curso
  actualizarCurso(id: number, curso: CursoModel): Observable<CursoModel> {
    return this.http.put<CursoModel>(
      `${this.apiUrl}/cursos/${id}`,
      curso,
      { headers: this.getAuthHeaders() }
    );
  }

  // Eliminar un curso
  eliminarCurso(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/cursos/${id}`, { headers: this.getAuthHeaders() });
  }

  // Obtener cursos por profesor usando query param
  getCursosPorProfesor(profesorId: number): Observable<CursoModel[]> {
    return this.http.get<CursoModel[]>(
      `${this.apiUrl}/cursos?profesorId=${profesorId}`,
      { headers: this.getAuthHeaders() }
    );
  }

  // MatriculasService.ts
getCursosPorEstudiante(usuarioId: number): Observable<CursoModel[]> {
  return this.http.get<MatriculaModel[]>(`${this.apiUrl}/matriculas?usuarioId=${usuarioId}`)
    .pipe(
      switchMap(matriculas => {
        const cursosIds = matriculas.map(m => m.cursoId);
        return this.http.get<CursoModel[]>(`${this.apiUrl}/cursos?id=${cursosIds.join('&id=')}`);
      })
    );
}
}
