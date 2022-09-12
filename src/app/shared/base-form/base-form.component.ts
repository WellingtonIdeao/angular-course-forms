import { Component, OnInit } from '@angular/core';
import { FormGroup, FormArray } from '@angular/forms';

@Component({
  selector: 'app-base-form',
  template: '<div></div>'
})
export abstract class BaseFormComponent implements OnInit {

  formulario!: FormGroup;

  constructor() { }

  ngOnInit(): void {
  }

  abstract submit(): any;
  
  onSubmit(){
    if(this.formulario.valid){
      this.submit();
    }else {
      //console.log("formulario inválido.");
      this.verificaValidacoesForm(this.formulario);
    }
  }
  verificaValidacoesForm(formGroup: FormGroup | FormArray) {
    Object.keys(formGroup.controls).forEach(campo => {
      console.log(campo);
      const controle = formGroup.get(campo);
      controle?.markAsDirty();
      controle?.markAsTouched();
      if (controle instanceof FormGroup || controle instanceof FormArray) {
        this.verificaValidacoesForm(controle);
      }
    });
  }
  resetar(): void {
    this.formulario.reset();
  }

  verificaValidTouched(campo: string): any {
    //return this.formulario.controls[campo].invalid && this.formulario.controls[campo].touched;

    return (
      this.formulario.get(campo)?.invalid &&
      (this.formulario.get(campo)?.touched || this.formulario.get(campo)?.dirty)
    );
  }

  verificaRequired(campo: string): any {
    return (
      this.formulario.get(campo)?.hasError('required') &&
      (this.formulario.get(campo)?.touched || this.formulario.get(campo)?.dirty)
    );
  }

  verificaEmailiInvalid(): any {
    //let campoEmail = this.formulario.controls['email'];
    let campoEmail = this.formulario.get('email');
    if (campoEmail?.errors) {
      return campoEmail.errors['email'] && campoEmail.touched;
    }
  }
  aplicaCSSErro(campo: string): any {
    return {
      'is-invalid': this.verificaValidTouched(campo)
    };
  }

}
