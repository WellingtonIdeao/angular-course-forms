
import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

import { IEstado } from '../shared/models/IEstado';
import { DropdownService } from './../shared/services/dropdown.service';
import { ConsultaCepService } from '../shared/services/consulta-cep.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-data-form',
  templateUrl: './data-form.component.html',
  styleUrls: ['./data-form.component.css']
})
export class DataFormComponent implements OnInit {

  formulario!: FormGroup;
  //estados!: IEstado[];
  estados!: Observable<IEstado[]>
  cargos!: any[];
  tecnologias!: any[];
  newsletterOp!: any[];

  frameworks = ['Angular', 'React', 'Vue', 'Sencha'];

  constructor(
    private formBuilder: FormBuilder,
    private http: HttpClient,
    private dropDownService: DropdownService,
    private cepService :ConsultaCepService
  ) { }

  ngOnInit(): void {

    this.estados = this.dropDownService.getEstadosBr();
    this.cargos = this.dropDownService.getCargos();
    this.tecnologias = this.dropDownService.getTecnologias();
    this.newsletterOp = this.dropDownService.getNewsletter();
    /*this.dropDownService.getEstadosBr()
      .subscribe(
        (dados: IEstado[]) => { this.estados = dados; console.log(dados)});
    */    
    /*this.formulario = new FormGroup({
      nome: new FormControl(null),
      email: new FormControl(null),
      endereco: new FormGroup({
        cep: new FormControl(null)
      })
    });*/

    this.formulario = this.formBuilder.group({
      nome: [null, Validators.required],
      email: [null, [Validators.required, Validators.email]],
      endereco: this.formBuilder.group({
        cep: [null, Validators.required],
        numero: [null, Validators.required],
        complemento: [null],
        rua: [null, Validators.required],
        bairro: [null, Validators.required],
        cidade: [null, Validators.required],
        estado: [null, Validators.required]
      }),
      cargo: [null],
      tecnologias: [null],
      newsletter: ['s'],
      termos: [null, Validators.requiredTrue],
      frameworks: this.buildFrameworks()

    });

    //[Validators.required, Validators.minLength(3), Validators.maxLength(20)]
  }
  buildFrameworks(){
    const values = this.frameworks.map(v => new FormControl(false));
    return this.formBuilder.array(values);
    /*return this.formBuilder.array([
      new FormControl(false),
      new FormControl(false),
      new FormControl(false),
      new FormControl(false)
    ]);*/
  }

  get frameworksFormArray() {
    return this.formulario.controls['frameworks'] as FormArray;
  }

  onSubmit(): void {
    let valueSubmit = Object.assign({}, this.formulario.value);
    valueSubmit = Object.assign(valueSubmit, {
      frameworks: valueSubmit.frameworks.map((v: boolean, i: number)=> v? this.frameworks[i]: null).
      filter((v: boolean)=> v != null)
    })
    console.log(valueSubmit);


    if (this.formulario.valid) {
      this.http.post('https://httpbin.org/post', JSON.stringify(valueSubmit))
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

  verificaValidacoesForm(formGroup: FormGroup) {
    Object.keys(formGroup.controls).forEach(campo => {
      console.log(campo);
      const controle = formGroup.get(campo);
      controle?.markAsDirty();
      if (controle instanceof FormGroup) {
        this.verificaValidacoesForm(controle);
      }
    });
  }


  resetar(): void {
    this.formulario.reset();
  }

  verificaValidTouched(campo: string): any {
    //return this.formulario.controls[campo].invalid && this.formulario.controls[campo].touched;
    return this.formulario.get(campo)?.invalid && (this.formulario.get(campo)?.touched || this.formulario.get(campo)?.dirty);
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
  consultaCEP(): void {
    //let cep = this.formulario.controls['endereco'].value['cep'];

    let cep = this.formulario.get('endereco.cep')?.value;
    if (cep!= null && cep !== ''){
      this.cepService.consultaCEP(cep)?.subscribe(dados => this.populaDadosForm(dados));
  
    }
  }
  
  resetarDadosForm() {
    this.formulario.patchValue(
      {
        endereco: {
          complemento: null,
          rua: null,
          bairro: null,
          cidade: null,
          estado: null
        }
      });
  }
  populaDadosForm(dados: any) {
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
        endereco: {
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
  setarCargo(){
    const cargo = {nome: 'Dev', nivel: 'Pleno', desc: 'Dev Pl'};
    this.formulario.get('cargo')?.setValue(cargo);
  }

  compararCargos(obj1: any, obj2: any){
    return obj1 && obj2 ? (obj1.nome === obj2.nome && obj1.nivel === obj2.nivel): obj1 === obj2;
  }

  setarTecnologias(){
    this.formulario.get('tecnologias')?.setValue(['java', 'python', 'javascript']);
  }

}
