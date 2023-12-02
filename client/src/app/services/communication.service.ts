import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, Subject} from "rxjs";
//import { catchError } from "rxjs/operators";
import { Medecin } from "../interface/medecin";
import { Service } from "../interface/service";

@Injectable()
export class CommunicationService {
  private readonly BASE_URL: string = "http://localhost:3000/database";
  private _listeners: Subject<any> = new Subject<any>();

  constructor(private readonly http: HttpClient) {}

  listen(): Observable<any> {
    return this._listeners.asObservable();
  }

  filter(filterBy: string): void {
    this._listeners.next(filterBy);
  }

  // Example methods for making HTTP requests

  getAllMedecins(): Observable<Medecin[]> {
    return this.http.get<Medecin[]>(`${this.BASE_URL}/medecins`);
  }
  getMedecinById(id: number): Observable<Medecin> {
    return this.http.get<Medecin>(`${this.BASE_URL}/medecins/${id}`);
  }

  getMedecinsSpecilities(): Observable<any[]> {
    return this.http.get<any[]>(`${this.BASE_URL}/medecins/specialites`);
  }

  getServices(): Observable<Service[]> {
    return this.http.get<Service[]>(`${this.BASE_URL}/medecins/services`);
  }

  updateMedecin(id: number, data: Medecin): Observable<any> {
    return this.http.put<Medecin>(`${this.BASE_URL}/medecins/update/${id}`, data);
  }

  deleteMedecin(id: number): Observable<Medecin> {
    return this.http.delete<any>(`${this.BASE_URL}/medecins/delete/${id}`);
  }

  addMedecin(data: Medecin): Observable<any> {
    return this.http.post<Medecin>(`${this.BASE_URL}/medecins/insert`, data);
  }

  // // Error handling method (you can expand this based on your needs)
  // private handleError<T>(operation = "operation", result?: T) {
  //   return (error: any): Observable<T> => {
  //     console.error(error);
  //     return of(result as T);
  //   };
  // }
}
