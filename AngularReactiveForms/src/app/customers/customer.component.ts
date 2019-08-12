import { Component, OnInit } from '@angular/core';

import { Customer } from './customer';
import {
  FormGroup,
  FormBuilder,
  Validators,
  AbstractControl,
  ValidatorFn,
} from '@angular/forms';

function ratingRange(min: number, max: number): ValidatorFn {
  return (c: AbstractControl): { [key: string]: boolean } | null => {
    if (
      c.value !== null &&
      (isNaN(c.value) || c.value < min || c.value > max)
    ) {
      return { range: true };
    }
    return null;
  };
}

function compareEmail(c: AbstractControl): { [key: string]: boolean } | null {
  const email = c.get('email');
  const confirmEmail = c.get('confirmEmail');

  if (email.pristine || confirmEmail.pristine) {
    return null;
  }
  if (email.value === confirmEmail.value) {
    return null;
  }
  return { compareEmail: true };
}

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.css'],
})
export class CustomerComponent implements OnInit {
  emailMessage: string;

  private validationMessages = {
    required: 'Please enter your email address.',
    email: 'Please enter a valid email address.',
  };
  customer = new Customer();

  customerForm: FormGroup;

  constructor(private _fb: FormBuilder) {}

  ngOnInit() {
    this.customerForm = this._fb.group({
      firstName: ['', [Validators.required, Validators.minLength(3)]],
      // lastName: { value: 'n/a', disabled: true },
      lastName: ['', [Validators.required, Validators.maxLength(50)]],

      emailGroup: this._fb.group(
        {
          email: ['', [Validators.required, Validators.email]],
          confirmEmail: ['', [Validators.required]],
        },
        { validator: compareEmail }
      ),
      phone: [''],
      notification: ['email'],
      rating: [null, ratingRange(1, 5)],
      sendCatalog: true,
    });

    this.customerForm.get('notification').valueChanges.subscribe(changes => {
      this.setNotificiation(changes);
    });

    const emailControl = this.customerForm.get('emailGroup.email');
    emailControl.valueChanges.subscribe(changes =>
      this.setMessage(emailControl)
    );
  }
  populateTestData(): void {
    this.customerForm.patchValue({
      firstName: 'Jack',
      lastName: 'Harkness',
      sendCatalog: false,
    });
  }

  save() {
    console.log(this.customerForm);
    console.log('Saved: ' + JSON.stringify(this.customerForm.value));
  }

  setMessage(control: AbstractControl): void {
    this.emailMessage = '';

    if ((control.touched || control.dirty) && control.errors) {
      this.emailMessage = Object.keys(control.errors)
        .map(key => (this.emailMessage += this.validationMessages[key]))
        .join(' ');
    }
  }

  setNotificiation(notifyVia: string): void {
    const phoneControl = this.customerForm.get('phone');
    if (notifyVia === 'text') {
      phoneControl.setValidators(Validators.required);
    } else {
      phoneControl.clearValidators();
    }
    phoneControl.updateValueAndValidity();
  }
}
