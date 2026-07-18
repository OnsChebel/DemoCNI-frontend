import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';
import { CycleModel} from '../models/cycle.model';

@Injectable({
  providedIn: 'root',
})
export class CycleService {

  private baseUrl = 'http://localhost:8081/api/cycles';

  constructor(private http: HttpClient) {}

  getCycles(): Observable<CycleModel[]> {
    return this.http.get<CycleModel[]>(this.baseUrl);
  }

  getCycleById(id: number): Observable<CycleModel> {
    return this.http.get<CycleModel>(`${this.baseUrl}/${id}`);
  }

  createCycle(cycle: CycleModel): Observable<CycleModel>{
    return this.http.post<CycleModel>(`${this.baseUrl}/new-cycle`, cycle);
  }

  updateCycle(id: number, cycle: CycleModel): Observable<CycleModel> {
    return this.http.put<CycleModel>(`${this.baseUrl}/update-cycle/${id}`, cycle);
  }

  deleteCycle(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/delete-cycle/${id}`);
  }

}
