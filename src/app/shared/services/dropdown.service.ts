import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

import { IEstado } from '../models/IEstado';
import { ICidade } from '../models/ICidade';


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

  getCidades(idCidade: number | Observable<never>): Observable<ICidade[]>{
    /*return this.http.get<IEstado[]>('assets/dados/estadobr.json').pipe(
      map (res => res));*/
    return this.http.get<ICidade[]>('assets/dados/cidades.json')
    .pipe(
      map(cidades => cidades.filter(c => c.estado == idCidade))
    );
  }

  getCargos(){
    return [
      {nome: 'Dev', nivel: 'Junior', desc: 'Dev Jr'},
      {nome: 'Dev', nivel: 'Pleno', desc: 'Dev Pl'},
      {nome: 'Dev', nivel: 'Senior', desc: 'Dev Sr'}
    ]
  }

  getTecnologias(){
    return [
      {nome: 'java', desc: 'Java'},
      {nome: 'javascript', desc: 'JavaScript'},
      {nome: 'php', desc: 'PHP'},
      {nome: 'python', desc: 'Python'}
    ]
  }

  getNewsletter(){
    return [
      {valor: 's', desc: 'Sim'},
      {valor: 'n', desc: 'Não'}
    ]
  }
}
