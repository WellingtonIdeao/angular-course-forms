import { delay, map, tap } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class VerificaEmailService {

  constructor(private http: HttpClient) { }

  verficarEmail(email: string){
    return this.http.get('assets/dados/verificarEmail.json')
    .pipe(
      delay(2000),
      map((dados: any) => dados.emails),
      //map((dados: {emails?: any[]}) => dados.emails),
      //tap(console.log),
      map((dados: {email: string}[]) => dados.filter(v => v.email === email)),
      //tap(console.log),
      map((dados: any[])=> dados.length > 0),
      //tap(console.log)
    );
  }

}

