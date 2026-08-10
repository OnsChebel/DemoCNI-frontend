import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ChatbotService {
  private apiUrl = 'http://localhost:8081/api/chat';

  constructor(private http: HttpClient) {}

  poserQuestion(question: string): Observable<{ response: string }> {
    return this.http.post<{ response: string }>(this.apiUrl, { question });
  }
}
