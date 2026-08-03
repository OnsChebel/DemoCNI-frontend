import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class InscriptionService {
  private apiUrl = 'http://localhost:8081/api/inscriptions';

  constructor(private http: HttpClient) {}

  getInscriptionsByParticipant(participantId: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/participant/${participantId}`);
  }

  inscrire(dto: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/inscrire`, dto);
  }

  annulerInscription(participantId: number, cycleId: number): Observable<any> {
    return this.http.put(`${this.apiUrl}/annuler?participantId=${participantId}&cycleId=${cycleId}`, {});
  }
}
