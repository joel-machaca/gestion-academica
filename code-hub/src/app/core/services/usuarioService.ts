import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { UsuarioModel } from '../models/UsuarioModel';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

    private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  private getAuthHeaders(): HttpHeaders {
    const token = localStorage.getItem('accessToken');
    return new HttpHeaders({
      Authorization: token ? `Bearer ${token}` : ''
    });
  }

  // Listar todos los usuarios
  getUsuarios(): Observable<UsuarioModel[]> {
    return this.http.get<UsuarioModel[]>(`${this.apiUrl}/users`, { headers: this.getAuthHeaders() });
  }

  // Obtener un usuario por ID
  getUsuario(id: number): Observable<UsuarioModel> {
    return this.http.get<UsuarioModel>(`${this.apiUrl}/users/${id}`, { headers: this.getAuthHeaders() });
  }

  // Actualizar un usuario
  actualizarUsuario(id: number, usuario:Partial<UsuarioModel>): Observable<UsuarioModel> {
    return this.http.put<UsuarioModel>(`${this.apiUrl}/users/${id}`, usuario, { headers: this.getAuthHeaders() });
  }
  // Actualizar parcialmente un usuario (PATCH)
patchUsuario(id: number, cambios: Partial<UsuarioModel>): Observable<UsuarioModel> {
  return this.http.patch<UsuarioModel>(
    `${this.apiUrl}/users/${id}`,
    cambios,
    { headers: this.getAuthHeaders() }
  );
}


  // Crear un nuevo usuario
  register(usuario: UsuarioModel): Observable<UsuarioModel> {
    return this.http.post<UsuarioModel>(`${this.apiUrl}/users`, usuario, { headers: this.getAuthHeaders() });
  }

  // Eliminar un usuario
  eliminarUsuario(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/users/${id}`, { headers: this.getAuthHeaders() });
  }

}
