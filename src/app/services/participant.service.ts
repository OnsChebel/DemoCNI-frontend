import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ParticipantModel } from '../models/participant.model';

@Injectable({
  providedIn: 'root'
})
export class ParticipantService {

  private baseUrl = 'http://localhost:8081/api/participants';

  constructor(private http: HttpClient) { }

  getParticipants(): Observable<ParticipantModel[]> {
    return this.http.get<ParticipantModel[]>(this.baseUrl);
  }

  getParticipantById(id: number): Observable<ParticipantModel> {
    return this.http.get<ParticipantModel>(`${this.baseUrl}/${id}`);
  }

  createParticipant(participant: ParticipantModel): Observable<ParticipantModel> {
    return this.http.post<ParticipantModel>(`${this.baseUrl}/new-participant`, participant);
  }

  updateParticipant(id: number, participant: ParticipantModel): Observable<ParticipantModel> {
    return this.http.put<ParticipantModel>(`${this.baseUrl}/update-participant/${id}`, participant);
  }

  deleteParticipant(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/delete-participant/${id}`);
  }
}
