import React from "react";
import { useField } from "formik";
import { TextField, TextFieldProps } from "@mui/material";

interface TextfieldWrapperProps
  extends Omit<TextFieldProps, "error" | "helperText"> {
  name: string;
}

const TextfieldWrapper: React.FC<TextfieldWrapperProps> = ({
  name,
  ...otherProps
}) => {
  const [field, meta] = useField<string>(name);

  const configTextfield: TextFieldProps = {
    ...field,
    ...otherProps,
    fullWidth: true,
    variant: "outlined",
  };

  if (meta && meta.touched && meta.error) {
    configTextfield.error = true;
    configTextfield.helperText = meta.error;
  }

  return <TextField {...configTextfield} />;
};

export default TextfieldWrapper;
