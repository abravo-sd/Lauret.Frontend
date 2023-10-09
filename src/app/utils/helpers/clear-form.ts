import { UntypedFormGroup } from '@angular/forms';

export const clearForm = (formGroup: UntypedFormGroup): void => {
  Object.keys(formGroup.controls).forEach((key) =>
    formGroup.get(key).value
      ? formGroup
          .get(key)
          .setValue(
            typeof formGroup.get(key).value === 'string' ? formGroup.get(key).value.trim() : formGroup.get(key).value
          )
      : null
  );
};
