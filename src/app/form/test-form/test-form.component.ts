import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CustomErrorStateMatcher, minGreaterThanMaxPayment } from '../custom-validators';

@Component({
  selector: 'app-test-form',
  templateUrl: './test-form.component.html',
  styleUrls: ['./test-form.component.css'],
})
export class TestFormComponent {
  // only whole numbers are allowed
  wholeNumbers = '^[0-9]*$';

  // decimals with optional 2 decimal digits that are separated by dot
  numTwoDecimalDigits = '^\\d+\\.?\\d{0,2}$';

  matcher = new CustomErrorStateMatcher();

  constructor(private fb: FormBuilder) {}

  testForm: FormGroup = this.fb.group(
    {
      minPayment: [0, [Validators.required, Validators.pattern(this.numTwoDecimalDigits)]],
      totalPayment: [0, [Validators.required, Validators.pattern(this.numTwoDecimalDigits)]],
      investAmount: [0, [Validators.required, Validators.pattern(this.wholeNumbers)]],
    },
    { validators: minGreaterThanMaxPayment() }
  );

  //This can be moved in a separate service
  isPatterError(controlName: string): boolean {
    return (
      this.testForm.get(controlName)?.errors?.['pattern'] &&
      (this.testForm.get(controlName)?.dirty || this.testForm.get(controlName)?.touched)
    );
  }

  isRequiredError(controlName: string): boolean {
    return (
      this.testForm.get(controlName)?.errors?.['required'] &&
      (this.testForm.get(controlName)?.dirty || this.testForm.get(controlName)?.touched)
    );
  }

  isMinGreaterThanTotalError(): boolean {
    return this.testForm.errors?.['minGreaterThanTotalPayment'];
  }
}
