import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {FormateurModel} from '../models/formateur.model';

@Injectable({
  providedIn: 'root',
})
export class FormateurService {
  private baseUrl = 'http://localhost:8081/api/formateurs';

  constructor(private http: HttpClient) {}

  getFormateurs(): Observable<FormateurModel[]> {
    return this.http.get<FormateurModel[]>(this.baseUrl);
  }

  getFormateurById(id: number): Observable<FormateurModel> {
    return this.http.get<FormateurModel>(`${this.baseUrl}/${id}`);
  }

  createFormateur(formateur: FormateurModel): Observable<FormateurModel> {
    return this.http.post<FormateurModel>(`${this.baseUrl}/new-formateur`, formateur);
  }

  updateFormateur(id: number, formateur: FormateurModel): Observable<FormateurModel> {
    return this.http.put<FormateurModel>(`${this.baseUrl}/update-formateur/${id}`, formateur);
  }

  deleteFormateur(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/delete-formateur/${id}`);
  }

}
