import { Component, OnInit } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-template-form',
  templateUrl: './template-form.component.html',
  styleUrls: ['./template-form.component.css']
})
export class TemplateFormComponent implements OnInit {

  usuario: any = {
    nome: null,
    email: null,
    cep: null,
    numero: null,
    complemento: null,
    rua: null,
    bairro: null,
    cidade: null,
    estado: null
  }

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
  }

  onSubmit(form: any){
    console.log(form);
    console.log(this.usuario);
  }

  verificaValidTouched(campo: any): boolean{
    return !campo.valid && campo.touched;
  }
  aplicaCSSErro(campo: any): any{
    return {
      'is-invalid': this.verificaValidTouched(campo)
    };
  }
  consultaCEP(cep: any): void {
     //Nova variável "cep" somente com dígitos.
    var cep = cep.replace(/\D/g, '');

     //Verifica se campo cep possui valor informado.
     if (cep != "") {
      //Expressão regular para validar o CEP.
      var validacep = /^[0-9]{8}$/;
     
      //Valida o formato do CEP.
      if(validacep.test(cep)) {
        this.http.get(`https://viacep.com.br/ws/${cep}/json`)
        .pipe(map((dados: any) => dados))
        .subscribe(dados => console.log(dados));  
      }  
     
    }
  }

}
