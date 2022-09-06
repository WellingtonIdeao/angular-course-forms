import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { IEstado } from '../models/IEstado';



@Injectable({
  providedIn: 'root'
})
export class DropdownService {

  constructor(private http: HttpClient) { }

  getEstadosBr() {
    /*return this.http.get<IEstado[]>('assets/dados/estadobr.json').pipe(
      map (res => res));*/
    return this.http.get<IEstado[]>('assets/dados/estadobr.json');
  }
}
