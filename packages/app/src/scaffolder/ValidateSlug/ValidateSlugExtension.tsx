import React from 'react';
import { FieldProps, FieldValidation } from '@rjsf/utils';
import {
  FormControl,
  FormHelperText,
  Input,
  InputLabel,
} from '@material-ui/core';

export const ValidateSlug = ({
  onChange,
  rawErrors,
  required,
  formData,
}: FieldProps<string>) => {
  return (
    <FormControl
      margin="normal"
      required={required}
      error={rawErrors !== undefined && rawErrors.length > 0 && !formData}
    >
      <InputLabel htmlFor="validateSlug">Project Slug</InputLabel>
      <Input
        id="validateSlug"
        aria-describedby="entityName"
        onChange={e => onChange(e.target?.value)}
      />
      <FormHelperText id="entityName">
        Project slug must be lowercase and contain only letters and numbers, no
        spaces or dashes
      </FormHelperText>
    </FormControl>
  );
};

export const slugValidation = (value: string, validation: FieldValidation) => {
  // Regex check for single word with no spaces or dashes
  const validSlug = /^[a-z0-9]+$/g.test(value);

  if (!validSlug) {
    validation.addError(
      'Project slug must be lowercase and contain only letters and numbers, no spaces or dashes',
    );
  }
};
