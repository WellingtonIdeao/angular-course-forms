import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ConsultaCepService {


  constructor(private http: HttpClient) { }

  consultaCEP(cep: string): Observable<Object> {
    console.log(cep);
  //Nova variável "cep" somente com dígitos.
    if (cep != null) {
      cep = cep.replace(/\D/g, '');

      //Verifica se campo cep possui valor informado.
      if (cep != "") {
        //Expressão regular para validar o CEP.
        var validacep = /^[0-9]{8}$/;

        //Valida o formato do CEP.
        if (validacep.test(cep)) {
          return this.http.get(`https://viacep.com.br/ws/${cep}/json`);
        }

      }
    }
    return of({});
  }
}
