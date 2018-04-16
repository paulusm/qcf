import { AbstractControl, ValidatorFn } from '@angular/forms';
//import libphonenumber from 'google-libphonenumber';

export class PhoneValidator {

  static validCountryPhone = (countryControl: AbstractControl): ValidatorFn => {
    let subscribe: boolean = false;

    return (phoneControl: AbstractControl): {[key: string]: boolean} => {
      if (!subscribe) {
        subscribe = true;
        countryControl.valueChanges.subscribe(() => {
          phoneControl.updateValueAndValidity();
        });
      }

     
      return null;
    };
  };
}
