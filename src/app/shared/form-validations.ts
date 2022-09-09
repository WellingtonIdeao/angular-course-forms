import { AbstractControl, FormArray, FormControl, FormGroup, ValidatorFn } from "@angular/forms";

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

    static equalsTo(otherField: string): ValidatorFn{
        const validator: ValidatorFn = (formControl: AbstractControl)=>{
            if (otherField == null){
                throw new Error('É necessário informar  um campo.');
            }    
            if( !formControl || !(<FormGroup>formControl.root).controls){
                return null;
            }
            const field = (<FormGroup>formControl.root).get(otherField);
            if (!field){
                throw new Error('É necessário informar um campo válido');
            }
            if( field.value !== formControl.value){
                return {equalsTo: otherField}
            }else{
                return null;
            }

        } 
        return validator;
    }

    static  getErrorMsg(fieldName: string, validatorName: string, validatorValue?: any): any {
        const config: {[key:string]: string} = {
            'required': `${fieldName} é obrigatório.`,
            'minlength': `${fieldName} precisa ter no mínimo ${validatorValue.requiredLength} caracteres.`,
            'maxlength': `${fieldName} precisa ter no máximo ${validatorValue.requiredLength} caracteres.`,
            'cepInvalido': 'CEP Inválido.',
            'equalsTo': 'Emails não são iguais.',
            'email': `${fieldName} inválido`,
            'emailInvalido': `${fieldName} já cadastrado`
        };

        return config[validatorName];

    }
}    