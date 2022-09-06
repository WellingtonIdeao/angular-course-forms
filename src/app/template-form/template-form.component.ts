import { Component, OnInit } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { ConsultaCepService } from '../shared/services/consulta-cep.service';

@Component({
  selector: 'app-template-form',
  templateUrl: './template-form.component.html',
  styleUrls: ['./template-form.component.css']
})
export class TemplateFormComponent implements OnInit {

  usuario: any = {
    nome: null,
    email: null
  }

  constructor(
    private http: HttpClient,
    private cepService :ConsultaCepService
  ) { }

  ngOnInit(): void {
  }

  onSubmit(formulario: any){
    console.log(formulario);
    //console.log(this.usuario)
    // simulando uma httpRequest post via site: rest test test
    this.http.post('https://httpbin.org/post', JSON.stringify(formulario.value))
    .subscribe(
      dados => {
      console.log(dados);
      //formulario.form.reset();
      this.resetarTodoFormulario(formulario);
    });
  }

  verificaValidTouched(campo: any): boolean{
    return !campo.valid && campo.touched;
  }
  aplicaCSSErro(campo: any): any{
    return {
      'is-invalid': this.verificaValidTouched(campo)
    };
  }
  consultaCEP(cep: any, form: any): void {
     //Nova variável "cep" somente com dígitos.
    if (cep!= null && cep !==''){ 
        this.cepService.consultaCEP(cep).subscribe(dados => this.populaDadosForm(dados, form));   
    }
  }  

  populaDadosForm(dados: any, formulario: any ){
    /* formulario.setValue(
      {
        nome: form.value.nome,
        email: form.value.email,
        Endereço:{
          cep: dados.cep,
          numero: '',
          complemento: dados.complemento,
          rua: dados.logradouro,
          bairro: dados.bairro,
          cidade: dados.localidade,
          estado: dados.uf
        }
      }  
    );*/
    formulario.form.patchValue(
      {
        Endereço:{
          complemento: dados.complemento,
          rua: dados.logradouro,
          bairro: dados.bairro,
          cidade: dados.localidade,
          estado: dados.uf
        }
      }
    );
  }
  resetarDadosForm(formulario: any){
    formulario.form.patchValue(
    {
      Endereço:{
        complemento: null,
        rua: null,
        bairro: null,
        cidade: null,
        estado: null
      }
    });
  }
  resetarTodoFormulario(formulario: any): void {
    formulario.form.reset();
  }
}
