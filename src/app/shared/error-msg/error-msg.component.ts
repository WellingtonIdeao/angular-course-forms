import { Component, Input, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';

import { FormValidations } from '../form-validations';

@Component({
  selector: 'app-error-msg',
  templateUrl: './error-msg.component.html',
  styleUrls: ['./error-msg.component.css']
})
export class ErrorMsgComponent implements OnInit {


  @Input() control!: FormControl;
  @Input() label!: string;
  constructor() { }

  ngOnInit(): void {
  }

  get errorMessage() {
    for (let propertyName in this.control.errors){
      if(this.control.errors.hasOwnProperty(propertyName) &&  this.control.invalid && (this.control.touched || this.control.dirty)){
        //if(this.control.invalid && (this.control.touched || this.control.dirty)){ 
        return FormValidations.getErrorMsg(this.label, propertyName, this.control.errors[propertyName]);
      }
    }
    return null;
  }

}
