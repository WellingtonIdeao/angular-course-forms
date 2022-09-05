import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-data-form',
  templateUrl: './data-form.component.html',
  styleUrls: ['./data-form.component.css']
})
export class DataFormComponent implements OnInit {

  formulario!: FormGroup;

  constructor(private formBuilder: FormBuilder, private http: HttpClient ) { }

  ngOnInit(): void {
    /*this.formulario = new FormGroup({
      nome: new FormControl(null),
      email: new FormControl(null),
      endereco: new FormGroup({
        cep: new FormControl(null)
      })
    });*/ 

    this.formulario = this.formBuilder.group({
      nome: [null, Validators.required],
      email: [null, [ Validators.required, Validators.email]],
      endereco: this.formBuilder.group({
        cep: [null, Validators.required],
        numero: [null, Validators.required],
        complemento: [null],
        rua: [null, Validators.required],
        bairro: [null, Validators.required],
        cidade: [null, Validators.required],
        estado: [null, Validators.required]
      })
    });

    //[Validators.required, Validators.minLength(3), Validators.maxLength(20)]
  }

  onSubmit(): void {
    //console.log(this.formulario);
    if(this.formulario.valid){ 
      this.http.post('https://httpbin.org/post', JSON.stringify(this.formulario.value))
      .pipe(res => res)
      .subscribe(
        dados => {
        console.log(dados);
        //this.formulario.reset();
        this.resetar();
        },
        (error: any) => alert('erro')
      );
    } else {
      //console.log("formulario inválido.");
      this.verificaValidacoesForm(this.formulario);
    }   
  }

  verificaValidacoesForm(formGroup: FormGroup){
    Object.keys(formGroup.controls).forEach(campo=>{
      console.log(campo);
      const controle = formGroup.get(campo);
      controle?.markAsDirty();
      if( controle instanceof FormGroup){
        this.verificaValidacoesForm(controle);
      }
    });
  }


  resetar(): void {
    this.formulario.reset();
  }

  verificaValidTouched(campo: string): any{
    //return this.formulario.controls[campo].invalid && this.formulario.controls[campo].touched;
     return this.formulario.get(campo)?.invalid && (this.formulario.get(campo)?.touched || this.formulario.get(campo)?.dirty);
  }

  verificaEmailiInvalid(): any{
    //let campoEmail = this.formulario.controls['email'];
    let campoEmail = this.formulario.get('email');
    if (campoEmail?.errors){
      return campoEmail.errors['email'] && campoEmail.touched;
    }
  }
  aplicaCSSErro(campo: string): any{
    return {
      'is-invalid': this.verificaValidTouched(campo)
    };
  }
  consultaCEP(): void {
    //let cep = this.formulario.controls['endereco'].value['cep'];

    let cep = this.formulario.get('endereco.cep')?.value;
    //Nova variável "cep" somente com dígitos.
   if (cep!= null){
    cep = cep.replace(/\D/g, '');

    //Verifica se campo cep possui valor informado.
     if (cep != "") {
       //Expressão regular para validar o CEP.
       var validacep = /^[0-9]{8}$/;
    
       //Valida o formato do CEP.
       if(validacep.test(cep)) {
         this.resetarDadosForm();

         this.http.get(`https://viacep.com.br/ws/${cep}/json`)
         .pipe(map((dados: any) => dados))
         .subscribe(dados => this.populaDadosForm(dados));  
         
       }  
    
     }
   }  
 }
  resetarDadosForm(){
    this.formulario.patchValue(
    {
      endereco:{
        complemento: null,
        rua: null,
        bairro: null,
        cidade: null,
        estado: null
      }
    });
  }
  populaDadosForm(dados: any){
    /*this.formulario.setValue(
      {
        nome: "",
        email: "",
        endereco:{
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

    this.formulario.patchValue(
      {
        endereco:{
          complemento: dados.complemento,
          rua: dados.logradouro,
          bairro: dados.bairro,
          cidade: dados.localidade,
          estado: dados.uf
        }
      }
    );
    //this.formulario.get('nome')?.setValue('guga');
  }

}
