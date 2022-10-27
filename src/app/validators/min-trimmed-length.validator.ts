import { AbstractControl, ValidatorFn } from '@angular/forms';

export function minTrimmedLengthValidator(minLength: number): ValidatorFn {
  return (control: AbstractControl) => {
    return control.value.trim().length < minLength
      ? { minTrimmedLength: true }
      : null;
  };
}
