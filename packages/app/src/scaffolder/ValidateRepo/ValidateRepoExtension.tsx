import React from "react";
import { FieldProps, FieldValidation } from "@rjsf/utils";
import { FormControl, FormHelperText, Input, InputLabel } from "@material-ui/core";

export const ValidateRepo = ({
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
      <InputLabel htmlFor="validateRepo">Project Repository Name</InputLabel>
      <Input
        id="validateRepo"
        aria-describedby="entityName"
        onChange={(e) => onChange(e.target?.value)}
      />
      <FormHelperText id="entityName">
        Project repository name must be lowercase and contain only letters, numbers, and hyphens
      </FormHelperText>   
    </FormControl>
  );
}

export const repoValidation = (value: string, validation: FieldValidation) => {
  // Regex check for single word with no spaces or dashes
  const validRepo = /^[a-z0-9-]+$/g.test(value);

  if (!validRepo) {
    validation.addError(
      "Project repository name must be lowercase and contain only letters, numbers, and hyphens",
    );
  }
};
