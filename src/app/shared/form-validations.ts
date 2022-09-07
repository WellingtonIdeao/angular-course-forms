import { AbstractControl, FormArray, FormControl, ValidatorFn } from "@angular/forms";

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

    static cepValidator(control: FormControl){
        const cep = control.value;
        if (cep && cep!= '') {
            const validacep1 = /^[0-9]{8}$/;
            const validacep2 = /^[0-9]{5}-[0-9]{3}$/;
            let valido = validacep1.test(cep) || validacep2.test(cep); 
            return  valido ? null : {cepInvalido: true};  
        }
        return null;
    }
}