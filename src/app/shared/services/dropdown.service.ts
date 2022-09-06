import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { IEstado } from '../models/IEstado';
import { Observable } from 'rxjs';



@Injectable({
  providedIn: 'root'
})
export class DropdownService {


  constructor(private http: HttpClient) {}

  getEstadosBr(): Observable<IEstado[]> {
    /*return this.http.get<IEstado[]>('assets/dados/estadobr.json').pipe(
      map (res => res));*/
    return this.http.get<IEstado[]>('assets/dados/estadobr.json');
  }
}
