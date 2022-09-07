import { AbstractControl, FormArray, ValidatorFn } from "@angular/forms";

export class FormValidations {
    static requiredMinCheckbox(min: number = 1): ValidatorFn {
        const validator: ValidatorFn = (formArray: AbstractControl) => {
            /*
             if(formArray instanceof FormArray){ 
               const values = formArray.controls;
               let totalChecked = 0;
               for (let control of values){
                 if (control.value)
                   totalChecked++;
               }
           */
            // código comentado acima escrita de forma funcional.
            if (formArray instanceof FormArray) {
                const totalChecked = formArray.controls
                    .map(control => control.value).reduce((prev, next) => next ? prev + next : prev, 0);
                return totalChecked >= min ? null : { required: true };
            }
            throw new Error('formArray is not an instance of FormArray');
        }
        return validator;
    }
}