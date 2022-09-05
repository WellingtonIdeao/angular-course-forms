import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

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
    console.log(this.formulario);
    
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
  }

  resetar(): void {
    this.formulario.reset();
  }

  verificaValidTouched(campo: string): any{
    //return this.formulario.controls[campo].invalid && this.formulario.controls[campo].touched;
     return this.formulario.get(campo)?.invalid && this.formulario.get(campo)?.touched;
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
}
