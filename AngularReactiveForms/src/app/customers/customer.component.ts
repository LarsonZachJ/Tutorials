import { Component, OnInit } from '@angular/core';
import { debounceTime } from 'rxjs/operators';
import { Customer } from './customer';
import {
  FormGroup,
  FormBuilder,
  Validators,
  AbstractControl,
  ValidatorFn,
  FormArray,
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
  confirmEmailMessage: string;
  lastNameMessage: string;
  firstNameMessage: string;
  ratingMessage: string;
  phoneMessage: string;

  private firstNameValidationMessages = {
    required: 'Please enter your first name.',
    minlength: 'The first name must be longer than 3 characters.',
  };

  private lastNameValidationMessages = {
    required: 'Please enter your last name.',
    maxlength: 'The last numbe must be less than 50 characters',
  };

  private emailValidationMessages = {
    required: 'Please enter your email address.',
    email: 'Please enter a valid email address.',
  };
  private confirmEmailValidationMessages = {
    required: 'Please confirm your email address',
    compareEmail: 'The confirmation does not match the email address',
  };

  private ratingValidationMessages = {
    range: 'Please rate your experience from 1 to 5',
  };

  private phoneValidationMessages = {
    required: 'Please enter your phone number.',
  };

  get addresses(): FormArray {
    return <FormArray>this.customerForm.get('addresses');
  }

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
      addresses: this._fb.array([this.buildAddress()]),
    });

    this.customerForm.get('notification').valueChanges.subscribe(changes => {
      this.setNotificiation(changes);
    });

    const emailControl = this.customerForm.get('emailGroup.email');
    emailControl.valueChanges
      .pipe(debounceTime(1000))
      .subscribe(changes => this.setEmailMessage(emailControl));

    const confirmEmailControl = this.customerForm.get(
      'emailGroup.confirmEmail'
    );
    const emailGroup = this.customerForm.get('emailGroup');
    confirmEmailControl.valueChanges
      .pipe(debounceTime(1000))
      .subscribe(changes =>
        this.setConfirmEmailMessage(emailGroup, confirmEmailControl)
      );

    const lastNameControl = this.customerForm.get('lastName');
    lastNameControl.valueChanges
      .pipe(debounceTime(1000))
      .subscribe(changes => this.setLastNameMessage(lastNameControl));

    const firstNameControl = this.customerForm.get('firstName');
    firstNameControl.valueChanges
      .pipe(debounceTime(1000))
      .subscribe(changes => this.setFirstNameMessage(firstNameControl));

    const ratingControl = this.customerForm.get('rating');
    ratingControl.valueChanges
      .pipe(debounceTime(1000))
      .subscribe(changes => this.setRatingMessage(ratingControl));
    const phoneControl = this.customerForm.get('phone');
    phoneControl.valueChanges
      .pipe(debounceTime(1000))
      .subscribe(changes => this.setPhoneMessage(phoneControl));
  }

  buildAddress(): FormGroup {
    return this._fb.group({
      addressType: ['home'],
      streetAddress1: '',
      streetAddress2: '',
      city: '',
      state: '',
      zipCode: '',
    });
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

  setPhoneMessage(control: AbstractControl): void {
    this.phoneMessage = '';

    if ((control.touched || control.dirty) && control.errors) {
      this.phoneMessage = Object.keys(control.errors)
        .map(key => (this.phoneMessage += this.phoneValidationMessages[key]))
        .join(' ');
    }
  }

  setRatingMessage(control: AbstractControl): void {
    this.ratingMessage = '';

    if ((control.touched || control.dirty) && control.errors) {
      this.ratingMessage = Object.keys(control.errors)
        .map(key => (this.ratingMessage += this.ratingValidationMessages[key]))
        .join(' ');
    }
  }

  setFirstNameMessage(control: AbstractControl): void {
    this.firstNameMessage = '';

    if ((control.touched || control.dirty) && control.errors) {
      this.firstNameMessage = Object.keys(control.errors)
        .map(
          key =>
            (this.firstNameMessage += this.firstNameValidationMessages[key])
        )
        .join(' ');
    }
  }

  setLastNameMessage(control: AbstractControl): void {
    this.lastNameMessage = '';

    if ((control.touched || control.dirty) && control.errors) {
      this.lastNameMessage = Object.keys(control.errors)
        .map(
          key => (this.lastNameMessage += this.lastNameValidationMessages[key])
        )
        .join(' ');
    }
  }

  setConfirmEmailMessage(
    emailGroupControl: AbstractControl,
    confirmEmailControl: AbstractControl
  ): void {
    this.confirmEmailMessage = '';

    if (
      (emailGroupControl.touched || emailGroupControl.dirty) &&
      emailGroupControl.errors
    ) {
      this.confirmEmailMessage = Object.keys(emailGroupControl.errors)
        .map(
          key =>
            (this.confirmEmailMessage += this.confirmEmailValidationMessages[
              key
            ])
        )
        .join(' ');
    }

    if (
      (confirmEmailControl.touched || confirmEmailControl.dirty) &&
      confirmEmailControl.errors
    ) {
      this.confirmEmailMessage = Object.keys(confirmEmailControl.errors)
        .map(
          key =>
            (this.confirmEmailMessage += this.confirmEmailValidationMessages[
              key
            ])
        )
        .join(' ');
    }
  }

  setEmailMessage(control: AbstractControl): void {
    this.emailMessage = '';

    if ((control.touched || control.dirty) && control.errors) {
      this.emailMessage = Object.keys(control.errors)
        .map(key => (this.emailMessage += this.emailValidationMessages[key]))
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
    this.setPhoneMessage(phoneControl);
  }
}
