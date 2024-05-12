import {
  AbstractControl,
  FormControl,
  FormGroupDirective,
  NgForm,
  ValidationErrors,
  ValidatorFn,
} from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';

export function minGreaterThanMaxPayment(): ValidatorFn {
  return (form: AbstractControl): ValidationErrors | null => {
    let isValid = true;

    const minPaymentControl = form.get('minPayment');
    const totalPaymentControl = form.get('totalPayment');

    if (Number(minPaymentControl?.value) > Number(totalPaymentControl?.value)) {
      isValid = false;
    }

    return isValid
      ? null
      : {
          minGreaterThanTotalPayment: true,
        };
  };
}

/**
 * CustomErrorStateMatcher is neccessary to display mat-error in Angular material for custom validators.
 * Since the form group has other controls as well, we need to check for invalidCtrl || isMinGreaterThanTotalPayment,
 * to avoid false positives
 */
export class CustomErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const invalidCtrl = !!(control && control.invalid);

    const isMinGreaterThanTotalPayment = !!(
      control &&
      control.parent &&
      control.parent.errors?.['minGreaterThanTotalPayment']
    );

    return invalidCtrl || isMinGreaterThanTotalPayment;
  }
}
