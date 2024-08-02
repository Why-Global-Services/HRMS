import { AbstractControl, ValidatorFn, Validators } from '@angular/forms';

export function panValidator(): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } | null => {
    const value: string = control.value;
    
    // Define your validation logic here
    const isValid = /^[A-Z]{5}\d{4}[A-Z]$/.test(value);
    // console.log(isValid ? null : { customValidation: { valid: false } },'',isValid,'',value)
    return isValid ? null : { customValidation: { valid: false } };
  };
}
