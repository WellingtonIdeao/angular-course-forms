import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
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
      email: new FormControl(null)
    }); */

    this.formulario = this.formBuilder.group({
      nome: [null],
      email: [null]
    });
  }

  onSubmit(): void {
    console.log(this.formulario.value);
    
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
}
