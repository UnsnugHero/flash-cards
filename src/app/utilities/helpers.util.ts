// Form Related

import { FormGroup } from '@ngneat/reactive-forms';

// Made this silly method since doing formGroup.value directly doesn't
// work with ngneat forms and I don't feel like figuring out why right now
export function getValueOfFormGroup<T>(formGroup: FormGroup<T>): T {
  return formGroup.value;
}
