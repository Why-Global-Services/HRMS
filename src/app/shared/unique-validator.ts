import { AbstractControl, ValidatorFn } from '@angular/forms';

export function uniqueValidator(emailControlName: string, confirmEmailControlName: string): ValidatorFn {
  return (formGroup: AbstractControl): { [key: string]: any } | null => {
    const emailControl = formGroup.get(emailControlName);
    const confirmEmailControl = formGroup.get(confirmEmailControlName);

    if (!emailControl || !confirmEmailControl) {
      return null;
    }

    const emailValue = emailControl.value;
    const confirmEmailValue = confirmEmailControl.value;

    if (emailValue === confirmEmailValue) {
      return { uniqueEmail: true };
    }

    return null;
  };
}
